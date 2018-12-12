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
import { OfflineDBService } from './common/services/offline-db.service';
import { OnlineStatusModule } from 'ngx-online-status';

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
    OnlineStatusModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(udpate: SwUpdate, push: SwPush, snackbar: MatSnackBar, offlineDBService: OfflineDBService) {
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    // offlineDBService.open();

    udpate.available.subscribe(update => {
      console.log('update available');
      /*
      const snack = snackbar.open('Update available ', 'Reload');
      snack.onAction()
      .subscribe(() => {
        window.location.reload();
      });
      */
    });

    push.messages.subscribe(msg => {
      console.log(msg);
      snackbar.open(JSON.stringify(msg));
    });

    const snack = snackbar.open('Clear DB ?', 'Clear');
      snack.onAction()
      .subscribe(() => {
        offlineDBService.clearDB();
      });

    const snack2 = snackbar.open('createTestData DB ?', 'Create');
    snack2.onAction()
      .subscribe(() => {
        offlineDBService.createTestData();
        offlineDBService.createTestData();
        offlineDBService.createTestData();
      });
  }
}
