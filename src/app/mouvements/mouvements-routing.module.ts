import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MouvementDetailComponent } from './mouvement-detail/mouvement-detail.component';
import { MouvementListComponent } from './mouvement-list/mouvement-list.component';

const mouvementsRoutes: Routes = [
  { path: 'mouvements',  component: MouvementListComponent },
  { path: 'mouvement/:id', component: MouvementDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(mouvementsRoutes)],
  exports: [RouterModule]
})
export class MouvementsRoutingModule { }
