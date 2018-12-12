import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';

import { Mouvement } from './Mouvement';
import { MessageService } from '../common/services/message.service';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfflineDBService } from '../common/services/offline-db.service';
import { environment } from 'src/environments/environment';
import { OnlineStatusType } from 'ngx-online-status';
import { ShareService } from '../common/services/share.service';
// import { HandleError, HttpErrorHandler } from '../common/services/http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

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
      return this.http.get<Mouvement[]>(this.url);
    }
  }

  getMouvement(id: number | string) {
    console.log('getMouvement');
    // TODO: send the message _after_ fetching the Mouvementes
    this.messageService.add('MouvementService: fetched Mouvementes');
    return this.getMouvementes().pipe(
      map((mouvements: Mouvement[]) => mouvements.find(m => m.Id === +id))
    );
  }

  addMouvement(mouvement: Mouvement): Observable<any> {
    if (this.shareService.status === OnlineStatusType.OFFLINE) {
      mouvement.Action = 'Add';
      return from(this.offlineDbService.add('mouvement', mouvement));
    } else {
      return this.http.post<Mouvement>(this.url, mouvement, httpOptions);
    }
  }
}
