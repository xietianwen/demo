import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Mouvement } from './Mouvement';
import { MouvementS } from './mock-mouvements';
import { MessageService } from '../common/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class MouvementService {

  constructor(private messageService: MessageService) { }

  getMouvementes(): Observable<Mouvement[]> {
    // TODO: send the message _after_ fetching the Mouvementes
    this.messageService.add('MouvementService: fetched Mouvementes');
    return of(MouvementS);
  }

  getMouvement(): Mouvement {
    // TODO: send the message _after_ fetching the Mouvementes
    this.messageService.add('MouvementService: fetched Mouvementes');
    return MouvementS[0];
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
