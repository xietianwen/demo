import { Component, OnInit } from '@angular/core';
import { Mouvement } from './mouvements/mouvement';

import { ConnectionService } from 'ng-connection-service';
import { OnlineStatusType } from './common/enums/OnlineStatusType';
import { ShareService } from './common/services/share.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  status: OnlineStatusType;
  title = 'jason-project-v1';
  testMov: Mouvement = new Mouvement(1111, 'XXXXX', 1000);

  constructor(private shareService: ShareService) {
  }

  ngOnInit(): void {
    this.status = this.shareService.status;
    this.shareService.statusChanged.subscribe(changed => {
      this.status = this.shareService.status;
      console.log('this.status :', this.shareService.status);
    });
  }
}
