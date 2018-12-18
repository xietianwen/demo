import { Injectable } from '@angular/core';

import { Observable, from, of } from 'rxjs';

import { Mouvement } from './Mouvement';
import { MessageService } from '../common/services/message.service';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfflineDBService } from '../common/services/offline-db.service';
import { environment } from 'src/environments/environment';
import { ShareService, httpOptions } from '../common/services/share.service';
import { OnlineStatusType } from '../common/enums/OnlineStatusType';
// import { HandleError, HttpErrorHandler } from '../common/services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MouvementService {
  url = environment.jasonApiUrl + '/mouvements';
  // private handleError: HandleError;
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private shareService: ShareService,
    // httpErrorHandler: HttpErrorHandler,
    private offlineDbService: OfflineDBService) {
    // this.handleError = httpErrorHandler.createHandleError('MouvementService');
  }

  async getMouvementes(): Promise<Mouvement[]> {
    this.messageService.add('MouvementService: fetched Mouvementes');
    if (this.shareService.status === OnlineStatusType.OFFLINE) {
      return this.offlineDbService.getAll('mouvement');
    } else {
      const mouvemntsFromServer = await this.http.get<Mouvement[]>(this.url).toPromise();
      await this.offlineDbService.clear('mouvement');
      this.offlineDbService.addAll('mouvement', mouvemntsFromServer);
      return this.offlineDbService.getAll('mouvement');
    }
  }

  async getMouvement(offlineId: number): Promise<Mouvement> {
    /*
    const mouvementList = await this.offlineDbService.getAll('mouvement') as Mouvement[];
    const mouvementOff = mouvementList.find(m => m.offlineId === offlineId);
    */
    const mouvementOff = await this.offlineDbService.get('mouvement', offlineId);
    if (this.shareService.isConnected) {
      // Synchro data
      const newMov = await this.http.get<Mouvement>(this.url + '/' + mouvementOff.id).toPromise();
      Object.assign(mouvementOff, newMov);
      await this.offlineDbService.update('mouvement', mouvementOff);
    }
    return mouvementOff;
  }

  private findById(mouvements: Mouvement[], id: number | string) {
    return this.shareService.isConnected
      ? mouvements.find(m => m.id === +id)
      : mouvements.find(m => m.offlineId === +id);
  }

  async addMouvement(mouvement: Mouvement): Promise<void> {
    if (this.shareService.isConnected) {
      const result = await this.http.post<Mouvement>(this.url, mouvement, httpOptions).toPromise();
      mouvement.id = result['createdId'];
      return this.offlineDbService.add('mouvement', mouvement);
    } else {
      return this.offlineDbService.add('mouvement', mouvement, true);
    }
  }

  async deleteMouvement(offlineId: number | string): Promise<any> {
    const mouvementOff = await this.offlineDbService.get('mouvement', offlineId) as Mouvement;
    if (this.shareService.isConnected) {
      await this.http.delete(this.url + '/' + mouvementOff.id, httpOptions).toPromise();
      this.offlineDbService.delete('mouvement', offlineId);
    } else {
      this.offlineDbService.delete('mouvement', offlineId, mouvementOff.id > 0);
    }
  }

  async updateMouvement(mouvement: Mouvement): Promise<any> {
    // online
    if (this.shareService.isConnected) {
      await this.http.put<Mouvement>(this.url + '/' + mouvement.id, mouvement, httpOptions).toPromise();
    }
    // offline
    const existMouvement = await this.offlineDbService.get('mouvement', mouvement.offlineId) as Mouvement;
    Object.assign(existMouvement, mouvement);
    const updateAction = ((existMouvement.action == null || existMouvement.action === undefined) && !this.shareService.isConnected);
    this.offlineDbService.update('mouvement', existMouvement, updateAction);
  }
}
