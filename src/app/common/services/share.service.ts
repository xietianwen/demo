import { Injectable, OnInit } from '@angular/core';
import { OnlineStatusType, OnlineStatusService } from 'ngx-online-status';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfflineDBService } from './offline-db.service';
import { from } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Mouvement } from 'src/app/mouvements/mouvement';

const httpOptions = {
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
  status: OnlineStatusType = OnlineStatusType.ONLINE;

  constructor(private onlineStatusService: OnlineStatusService,
    private http: HttpClient,
    private offlineDbService: OfflineDBService) {
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC ShareService');
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
      this.synchroniseDataToServer().then(() => {
        window.location.reload();
      });
    });
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
