import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineDBService {
  constructor(private http: HttpClient) { }

  // get(storeName, key): Observable<any> {
  //   return this.dbPromise.then(db => {
  //     return db.transaction(storeName, 'readonly')
  //       .objectStore(storeName).get(key);
  //   });
  // }

  getAll(storeName, url): Observable<any[]> {
    return this.http.get<any[]>(url).pipe(
      // map((mouvements: Mouvement[]) => mouvements.map(m => Mouvement.fromJson(m))),
      tap(
        data => console.log('data :', data)
      )
    );
  }

}
