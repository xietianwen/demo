import { Component, OnInit } from '@angular/core';

import { Mouvement } from '../mouvement';
import { MouvementService } from '../mouvement.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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
    private route: ActivatedRoute
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

    this.mouvementes$ = this.route.paramMap.pipe(
      switchMap(params => {
        // (+) before `params.get()` turns the string into a number
        this.selectedId = +params.get('id');
        return this.service.getMouvementes();
      })
    );
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
