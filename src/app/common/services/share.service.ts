import { Injectable, OnInit } from '@angular/core';
import { OnlineStatusType, OnlineStatusService } from 'ngx-online-status';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  status: OnlineStatusType = OnlineStatusType.ONLINE;
  constructor(private onlineStatusService: OnlineStatusService) {
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
    }
  }
}
