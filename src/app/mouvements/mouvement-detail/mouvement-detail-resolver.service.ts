import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, EMPTY, from } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Mouvement } from '../mouvement';
import { MouvementService } from '../mouvement.service';

@Injectable({
  providedIn: 'root'
})
export class MouvementDetailResolverService implements Resolve<Mouvement> {

  constructor(private ms: MouvementService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mouvement> | Observable<never> {
    // TODO Txie
    const offlineId = route.queryParamMap.get('offlineId');
    return from(this.ms.getMouvement(parseInt(offlineId, 10)));
    /*
    return this.ms.getMouvement(id).pipe(
      take(1),
      mergeMap(mov => {
        if (mov) {
          return of(mov);
        } else { // id not found
          this.router.navigate(['/mouvements']);
          return EMPTY;
        }
      })
    );
    */
  }
}
