import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MouvementDetailComponent } from './mouvement-detail/mouvement-detail.component';
import { MouvementListComponent } from './mouvement-list/mouvement-list.component';
import { MouvementPeseeComponent } from './mouvement-pesee/mouvement-pesee.component';
import { AuthGuard } from '../auth/auth.guard';
import { MouvementDetailResolverService } from './mouvement-detail/mouvement-detail-resolver.service';
import { MouvementEditComponent } from './mouvement-edit/mouvement-edit.component';

// const mouvementsRoutes: Routes = [
//   {
//     path: 'mouvements',
//     component: MouvementListComponent,
//     canActivate: [AuthGuard],
//     children: [
//       {
//         path: '',
//         canActivateChild: [AuthGuard],
//         children: [
//           { path: ':id', component: MouvementDetailComponent },
//           { path: 'pesee', component: MouvementPeseeComponent }
//         ],
//       }
//     ]
//   }
// ];

const mouvementsRoutes: Routes = [
  {
    path: 'mouvements/add',
    component: MouvementEditComponent
  },
  {
    path: 'mouvements',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: MouvementListComponent
  },
  {
    path: 'mouvements/detail',
    component: MouvementDetailComponent,
    resolve: {
      mov: MouvementDetailResolverService
    }
  },
  {
    path: 'mouvements/pesee',
    component: MouvementPeseeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(mouvementsRoutes)],
  exports: [RouterModule]
})
export class MouvementsRoutingModule { }
