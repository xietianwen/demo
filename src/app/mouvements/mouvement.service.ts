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

  getMouvementes(): Observable<Mouvement[]> {
    this.messageService.add('MouvementService: fetched Mouvementes');
    if (this.shareService.status === OnlineStatusType.OFFLINE) {
      return from(this.offlineDbService.getAll('mouvement'));
    } else {
      return this.http.get<Mouvement[]>(this.url).pipe(
        // map((mouvements: Mouvement[]) => mouvements.map(m => Mouvement.fromJson(m))),
        tap(
          data => console.log('data :', data)
        )
      );
    }
  }

  getMouvement(id: number | string) {
    console.log('getMouvement');
    // TODO: send the message _after_ fetching the Mouvementes
    this.messageService.add('MouvementService: fetched Mouvementes');
    return this.getMouvementes().pipe(
      tap(
        data => {
          console.log('getMouvement data :', data);
          console.log('data.find(m => m.Id === +id)', data.find(m => m.id === +id));
        }
      ),
      map((mouvements: Mouvement[]) => mouvements.find(m => m.id === +id))
    );
  }

  addMouvement(mouvement: Mouvement): Observable<any> {
    console.log('addMouvement this.shareService.status :', this.shareService.status);
    if (this.shareService.status === OnlineStatusType.OFFLINE) {
      mouvement.action = 'Add';
      return from(this.offlineDbService.add('mouvement', mouvement));
    } else {
      return this.http.post<Mouvement>(this.url, mouvement, httpOptions);
    }
  }

  async updateMouvement(mouvement: Mouvement): Promise<any> {
    if(this.shareService.isConnected)
      await this.http.put<Mouvement>(this.url+'/'+mouvement.id, mouvement, httpOptions).toPromise();

    const existMouvement = await this.offlineDbService.findByPropertyValue('mouvement','id',mouvement.id) as Mouvement;
    
    if(existMouvement != null && existMouvement.offlineId > 0)
    {
      Object.assign(existMouvement,mouvement);
      this.offlineDbService.update('mouvement', existMouvement,!this.shareService.isConnected);
    }
  }
}
