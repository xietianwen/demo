import { Component, OnInit } from '@angular/core';
import { Mouvement } from './mouvements/mouvement';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { ShareService } from './common/services/share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  status: OnlineStatusType;
  OnlineStatusType = OnlineStatusType;
  title = 'jason-project-v1';
  testMov: Mouvement = new Mouvement(1111, 'XXXXX', 1000);

  constructor(private statusService: OnlineStatusService, private shareService: ShareService ) {
  }
  ngOnInit(): void {
    this.statusService.status.subscribe(s => {
      this.status = s;
    });
  }
}
