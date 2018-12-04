import { Component } from '@angular/core';
import { Mouvement } from './mouvements/mouvement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jason-project-v1';
  testMov: Mouvement = new Mouvement(1111, 'XXXXX');
}
