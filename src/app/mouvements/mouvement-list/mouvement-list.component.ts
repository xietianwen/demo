import { Component, OnInit } from '@angular/core';

import { Mouvement } from '../mouvement';
import { MouvementService } from '../mouvement.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mouvementes',
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.scss']
})
export class MouvementListComponent implements OnInit {
  mouvementes$: Observable<Mouvement[]>;
  selectedId: number;

  constructor(
    private service: MouvementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
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
