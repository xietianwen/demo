import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MouvementsModule } from './mouvements/mouvements.module';
import { AuthModule } from './auth/auth.module';
import { ServiceWorkerModule, SwUpdate, SwPush } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    CrisisListComponent,
    HeroListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    HttpClientModule,
    MouvementsModule,
    AuthModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(udpate: SwUpdate, push: SwPush, snackbar: MatSnackBar) {
    udpate.available.subscribe(update => {
      console.log('update available');
      const snack = snackbar.open('Update available ', 'Reload');
      snack.onAction()
      .subscribe(() => {
        window.location.reload();
      });
    });

    push.messages.subscribe(msg => {
      console.log(msg);
      snackbar.open(JSON.stringify(msg));
    });
  }
}
