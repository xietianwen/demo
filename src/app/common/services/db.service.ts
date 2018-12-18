import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { ShareService } from './share.service';
import { OfflineDBService } from './offline-db.service';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  constructor(private http: HttpClient,
    private shareService: ShareService,
    // httpErrorHandler: HttpErrorHandler,
    private offlineDbService: OfflineDBService) {


    }
}
