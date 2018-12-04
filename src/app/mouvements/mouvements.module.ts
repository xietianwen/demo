import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MouvementsRoutingModule } from './mouvements-routing.module';
import { MouvementDetailComponent } from './mouvement-detail/mouvement-detail.component';
import { MouvementListComponent } from './mouvement-list/mouvement-list.component';

@NgModule({
  declarations: [MouvementDetailComponent, MouvementListComponent],
  imports: [
    CommonModule,
    MouvementsRoutingModule
  ]
})
export class MouvementsModule { }
