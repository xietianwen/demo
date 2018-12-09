import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { MouvementsRoutingModule } from './mouvements-routing.module';
import { MouvementDetailComponent } from './mouvement-detail/mouvement-detail.component';
import { MouvementListComponent } from './mouvement-list/mouvement-list.component';
import { MouvementPeseeComponent } from './mouvement-pesee/mouvement-pesee.component';
import { MouvementEditComponent } from './mouvement-edit/mouvement-edit.component';

@NgModule({
  declarations: [MouvementDetailComponent, MouvementListComponent, MouvementPeseeComponent, MouvementEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MouvementsRoutingModule
  ]
})
export class MouvementsModule { }
