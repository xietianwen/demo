import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MouvementService } from '../mouvement.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Mouvement } from '../mouvement';

@Component({
  selector: 'app-mouvement-edit',
  templateUrl: './mouvement-edit.component.html',
  styleUrls: ['./mouvement-edit.component.scss']
})
export class MouvementEditComponent implements OnInit {
  isEdit: boolean;

  mouvementForm = this.fb.group({
    Name: ['', Validators.required],
    Poids: ['']
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: MouvementService
  ) { }

  ngOnInit() {
    console.log('urlllllllllllllllllllllll:',this.route.snapshot.url);
    this.isEdit =  this.route.snapshot.url.filter(p => p.path=='add').length == 0;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.mouvementForm.value);

    const newMov: Mouvement = this.mouvementForm.value as Mouvement;
    console.log('new Mouvement :',newMov);

    this.service.addMouvement(newMov)
    .subscribe(mov => {
      this.router.navigate(['/mouvements']);
    });
    
  }
}
