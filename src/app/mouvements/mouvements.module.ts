import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { MouvementsRoutingModule } from './mouvements-routing.module';
import { MouvementDetailComponent } from './mouvement-detail/mouvement-detail.component';
import { MouvementListComponent } from './mouvement-list/mouvement-list.component';

@NgModule({
  declarations: [MouvementDetailComponent, MouvementListComponent],
  imports: [
    CommonModule,
    FormsModule,
    MouvementsRoutingModule
  ]
})
export class MouvementsModule { }
