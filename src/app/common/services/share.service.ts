import { Injectable, OnInit } from '@angular/core';
import { OnlineStatusType, OnlineStatusService } from 'ngx-online-status';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OfflineDBService } from './offline-db.service';
import { from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mouvement } from 'src/app/mouvements/mouvement';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  url = environment.jasonApiUrl;
  status: OnlineStatusType = OnlineStatusType.ONLINE;

  constructor(private onlineStatusService: OnlineStatusService,
    private http: HttpClient,
    private offlineDbService: OfflineDBService) {
    console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC ShareService');
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
      this.synchroniseDataToServer();
    });
  }

  private synchroniseDataToServer() {
    if (this.status === OnlineStatusType.ONLINE) {
      // sychronise the data
      console.log('SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSynchrooooooooooooo');

      from(this.offlineDbService.getAll('Mouvement')).pipe(
        map(
          (mouvementArray: Object[]) => mouvementArray.map(m => Mouvement.fromJson(m))
        )
      );



      return this.http.post(this.url + '/Mouvement', null, httpOptions);
    }
  }
}
