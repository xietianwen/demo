import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfflineDBService } from './offline-db.service';
import { OnlineStatusType, SynchroniseStatusType } from '../enums/OnlineStatusType';
import { Observable, of, Subject } from 'rxjs';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  urlSynchro = environment.jasonApiUrl + '/Synchronise';
  status: OnlineStatusType;
  statusChanged:  Subject<boolean> = new Subject<boolean>();
  statusSynchronise: Subject<SynchroniseStatusType> = new Subject<SynchroniseStatusType>();
  isConnected: boolean;

  constructor(private connectionService: ConnectionService,
    private http: HttpClient,
    private offlineDbService: OfflineDBService) {
      this.isConnected = navigator.onLine;
      this.status = navigator.onLine ? OnlineStatusType.ONLINE : OnlineStatusType.OFFLINE;
      this.statusSynchronise.next(SynchroniseStatusType.SyncroniseUndefined);

      this.connectionService.monitor().subscribe((isConnected: boolean) => {
        const changed = this.isConnected !== isConnected;
        this.isConnected = isConnected;
        this.status = isConnected ? OnlineStatusType.ONLINE : OnlineStatusType.OFFLINE;
        this.statusChanged.next(changed);

        if (changed && isConnected) {
          this.statusSynchronise.next(SynchroniseStatusType.Synchronising);
          this.synchroniseDataToServer().then(() => {
            if (this.status === OnlineStatusType.ONLINE) {
              this.statusSynchronise.next(SynchroniseStatusType.Synchronised);
              this.statusSynchronise.next(SynchroniseStatusType.SyncroniseUndefined);
            }
          });
        }
      });
  }

  public monitor(): Observable<boolean> {
    return this.connectionService.monitor();
  }

  public async synchroniseDataToServer() {
    if (this.status === OnlineStatusType.ONLINE) {
      // sychronise the data
      const offlineMouvement = await this.offlineDbService.getAll('mouvement');
      console.log('offlineMouvement :', offlineMouvement.filter(m => m.action == null));

      const dataToSend = offlineMouvement.filter(m => m.action != null);
      if (dataToSend.length > 0) {
        const returnFromSynchro = await this.http
          .post(this.urlSynchro, { 'mouvementListSync': offlineMouvement.filter(m => m.action != null) }, httpOptions)
          .toPromise();

        if (returnFromSynchro && returnFromSynchro['success'] && returnFromSynchro['success'] === true) {
          // this.refreshMouvementDataOffline(returnFromSynchro['data']['mouvementList']);
        }
      } else {
        // this.synchroDataFromServer();
      }
    }
  }

  private async synchroDataFromServer() {
    const result = await this.http.get(this.urlSynchro).toPromise();
    if (result && result['success']) {
      console.log('synchroDataFromServer success', result);
      return this.refreshMouvementDataOffline(result['data']['mouvementList']);
    }
  }

  private refreshMouvementDataOffline(mouvementList) {
    return this.offlineDbService
      .clearDB()
      .then(() => {
        return this.offlineDbService.addAll('mouvement', mouvementList);
      });
  }
}
