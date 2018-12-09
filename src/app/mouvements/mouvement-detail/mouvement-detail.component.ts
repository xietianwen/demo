import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MouvementService } from '../mouvement.service';
import { switchMap } from 'rxjs/operators';
import { Mouvement } from '../mouvement';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mouvement-detail',
  templateUrl: './mouvement-detail.component.html',
  styleUrls: ['./mouvement-detail.component.scss']
})
export class MouvementDetailComponent implements OnInit {
  mouvement: Mouvement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MouvementService
  ) { }

  // ngOnInit() {
  //   this.mouvement$ = this.route.paramMap.pipe(
  //     switchMap((params: ParamMap) =>
  //       this.service.getMouvement(params.get('id')))
  //   );
  // }

  ngOnInit() {
    this.route.data.subscribe((data: { mov: Mouvement }) => {
      this.mouvement = data.mov;
    });
  }

  gotoMouvements(mov: Mouvement) {
    const movId = mov ? mov.Id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/mouvements', { id: movId, foo: 'foo' }]);
  }

}
