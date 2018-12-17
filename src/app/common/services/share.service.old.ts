import { Injectable, OnInit, NgZone } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfflineDBService } from './offline-db.service';
import { OnlineStatusType } from '../enums/OnlineStatusType';
import { Observable, of } from 'rxjs';

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
  status: OnlineStatusType = navigator.onLine ? OnlineStatusType.ONLINE : OnlineStatusType.OFFLINE;
  statusChanged: Observable<boolean> = of(false);
  isConnected: boolean;

  constructor(private connectionService: ConnectionService,
    private http: HttpClient,
    private offlineDbService: OfflineDBService,
    private zone: NgZone) {
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC ShareService');
    this.status = navigator.onLine ? OnlineStatusType.ONLINE : OnlineStatusType.OFFLINE;
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC ShareService this.status :', this.status);

    this.connectionService.monitor().subscribe((isConnected: boolean) => {
      this.isConnected = isConnected;
      this.initStatusChanged(isConnected);
      this.statusChanged.subscribe(changed => {
        if (changed) {

          console.log('changeddddddddddddddddddddddddddddddddddddddd:',changed);
          this.status = this.isConnected ? OnlineStatusType.ONLINE : OnlineStatusType.OFFLINE;
          this.synchroniseDataToServer().then(() => {
            if (this.status === OnlineStatusType.ONLINE) {
              // window.location.reload();
            }
          });
        }
      });
    });
  }

  private initStatusChanged(isConnected: boolean) {
    this.statusChanged = of((this.status === (isConnected ? OnlineStatusType.ONLINE : OnlineStatusType.OFFLINE)));
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

        if (returnFromSynchro && returnFromSynchro['success']) {
          console.log('successssssssssss', returnFromSynchro);
          this.refreshMouvementDataOffline(returnFromSynchro['data']['mouvementList']);
        }
      } else {
        this.synchroDataFromServer();
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
