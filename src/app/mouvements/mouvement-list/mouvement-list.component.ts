import { Component, OnInit } from '@angular/core';

import { Mouvement } from '../mouvement';
import { MouvementService } from '../mouvement.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { switchMap, map, filter, tap } from 'rxjs/operators';
import { ShareService } from 'src/app/common/services/share.service';
import { SynchroniseStatusType } from 'src/app/common/enums/OnlineStatusType';
import { MouvementsModule } from '../mouvements.module';

@Component({
  selector: 'app-mouvementes',
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.scss']
})
export class MouvementListComponent implements OnInit {
  mouvementes$: Observable<Mouvement[]>;
  selectedId: number;
  sessionId: Observable<{}>;
  token: Observable<string>;

  constructor(
    private service: MouvementService,
    private route: ActivatedRoute,
    private shareService: ShareService,
  ) { }

  ngOnInit() {
    // Capture the session ID if available
    this.sessionId = this.route
      .queryParamMap
      .pipe(map(params => params.get('session_id') || 'None'));

    console.log('this.route.queryParamMap :', this.route.queryParamMap);
    console.log('this.route.fragment :', this.route.fragment);

    // Capture the fragment if available
    this.token = this.route
      .fragment
      .pipe(map(fragment => fragment || 'None'));

    this.reloadMouvementData();
    this.initRefreshDataListenner();
  }

  initRefreshDataListenner() {
    // online => offline => reloadData with db offline
    this.shareService.statusChanged.subscribe((statusChanged) => {
      if (statusChanged && !this.shareService.isConnected) {
        this.reloadMouvementData();
      }
    });

    // offline => online => reloadData after synchronised
    this.shareService.statusSynchronise.subscribe((statusSynchronise) => {
      if (statusSynchronise === SynchroniseStatusType.Synchronised) {
        console.log('initRefreshDataListenner statusSynchronise :', statusSynchronise);
        this.reloadMouvementData();
      }
    });
  }

  reloadMouvementData() {
   this.mouvementes$ = from(this.service.getMouvementes())
   .pipe(
      tap(xx => console.log('getMouvementessssssssssssssssssssssss:', xx)),
      map(mouvemnts => mouvemnts.filter(m => m.action !== 'Delete'))
   );
  }

  deleteMouvement(mov: Mouvement) {
    console.log('mov :', mov);
    this.service.deleteMouvement(mov.offlineId).then(() => {
      // TODO Txie
      this.mouvementes$ = this.mouvementes$.pipe(
        map(mouvements => mouvements.filter(m => m.offlineId !== mov.offlineId))
      );
    });
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
