import { Component } from '@angular/core';
import { Mouvement } from './mouvements/mouvement';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  status: OnlineStatusType;
  OnlineStatusType = OnlineStatusType;
  title = 'jason-project-v1';
  testMov: Mouvement = new Mouvement(1111, 'XXXXX',1000);

  constructor(private onlineStatusService: OnlineStatusService) {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // use status
      this.status = status;
    });
  }
}
