import { Injectable } from '@angular/core';
import idb from 'idb';

@Injectable({
  providedIn: 'root'
})
export class OfflineDBService {
  private dbName = 'jason-offlineDb';
  private version = 3;
  private dbPromise: any = null;

  constructor() {
    this.createEmptyDB().then(() => this.createTestData());
  }

  createEmptyDB(): Promise<any> {
    const self = this;
    return idb.open(self.dbName, self.version, function (upgradeDb) {
      self.createDbTables(upgradeDb);
    });
  }

  createDbTables(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('books')) {
      upgradeDb.createObjectStore('books', { keyPath: 'offlineId', autoIncrement: true });
    }

    if (!upgradeDb.objectStoreNames.contains('mouvement')) {
      upgradeDb.createObjectStore('mouvement', { keyPath: 'offlineId' });
    }
  }

  add(storeName: string, records: any[]): Promise<any> {
    const self = this;
    return new Promise(function (resolve, reject) {
      idb.open(self.dbName).then(function (dbCx) {  // idbCx is a DB connection
        const tx = dbCx.transaction(storeName, 'readwrite');
        const os = tx.objectStore(storeName);
        // Promise.all takes a list of promises and resolves if all of them do
        return Promise.all(records.map(rec => os.add(rec)))
          .then(function () { return tx.complete; });
      })
      .then(resolve)
      .catch(function (err) {
        reject(err);
      });
    });
  }

  clearDB(): Promise<any> {
    const self = this;
    return new Promise(function (resolve) {
      idb.open(self.dbName).then(function (idbCx) {  // idbCx is a DB connection
        const storeNameList: Array<string> = new Array<string>();
        const storeNames = idbCx.objectStoreNames;
        if (storeNames && storeNames.length > 0) {
          for (let i = 0; i < storeNames.length; i++) {
            storeNameList.push(storeNames[i]);
          }
        }
        const tx = idbCx.transaction(storeNameList, 'readwrite');
        // Promise.all takes a list of promises and resolves if all of them do
        return Promise.all(Array.from(idbCx.objectStoreNames,
          osName => tx.objectStore(osName).clear()))
          .then(function () { return tx.complete; });

      }).catch(function (err) {
        console.log(err);
      }).then(resolve);
    });
  }

  createTestData() {
    this.clearDB();
    this.add('books', [
      { id: '006251587X', title: 'Weaving the Web', year: 2000, edition: 2 },
      { id: '0465026567', title: 'Gödel, Escher, Bach', year: 1999 },
      { id: '0465030793', title: 'I Am a Strange Loop', year: 2008 }
    ]);
  }

}


  // add: function ( tableName, records) {
  //   return new Promise( function (resolve, reject) {
  //     idb.open( IDB.dbName).then( function (idbCx) {  // idbCx is a DB connection
  //       var tx = idbCx.transaction( tableName, 'readwrite');
  //       var os = tx.objectStore( tableName);
  //       // Promise.all takes a list of promises and resolves if all of them do
  //       return Promise.all( records.map( rec => {return os.add( rec);}))
  //           .then( function () {return tx.complete;});
  //     }).then( resolve)
  //     .catch( function (err) {
  //       reject( err);
  //     });
  //   });
  // }





  // const idbKeyval = {
  //   get(key) {
  //     return dbPromise.then(db => {
  //       return db.transaction('keyval')
  //         .objectStore('keyval').get(key);
  //     });
  //   },
  //   set(key, val) {
  //     return dbPromise.then(db => {
  //       const tx = db.transaction('keyval', 'readwrite');
  //       tx.objectStore('keyval').put(val, key);
  //       return tx.complete;
  //     });
  //   },
  //   delete(key) {
  //     return dbPromise.then(db => {
  //       const tx = db.transaction('keyval', 'readwrite');
  //       tx.objectStore('keyval').delete(key);
  //       return tx.complete;
  //     });
  //   },
  //   clear() {
  //     return dbPromise.then(db => {
  //       const tx = db.transaction('keyval', 'readwrite');
  //       tx.objectStore('keyval').clear();
  //       return tx.complete;
  //     });
  //   },
  //   keys() {
  //     return dbPromise.then(db => {
  //       const tx = db.transaction('keyval');
  //       const keys = [];
  //       const store = tx.objectStore('keyval');

  //       // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
  //       // openKeyCursor isn't supported by Safari, so we fall back
  //       (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
  //         if (!cursor) return;
  //         keys.push(cursor.key);
  //         cursor.continue();
  //       });

  //       return tx.complete.then(() => keys);
  //     });
  //   }
  // };



// @Injectable({
//   providedIn: 'root'
// })
// export class OfflineDBService {
//   private dbName = 'jason-offlineDb';
//   private version = 1;
//   private db: any = null;

//   constructor() { }
//   public open(): Promise<any> {
//     return idb.open(this.dbName, this.version, (upgradeDb) => {
//       this.db = upgradeDb;
//       const storeNames = upgradeDb.objectStoreNames;
//       if (storeNames && storeNames.length > 0) {
//         for (let i = 0; i < storeNames.length; i++) {
//           upgradeDb.deleteObjectStore(storeNames[i]);
//           console.log('deleteObjectStore table', storeNames[i]);
//         }
//         // 创建数据库表
//         this.createViewDB();
//       }
//       // tableNames.forEach( function (tableName) {
//       //   if (!upgradeDb.objectStoreNames.contains( tableName)) {
//       //     upgradeDb.createObjectStore( tableName, {keyPath:'id'});
//       //   }
//       // })
//     }).then((existDb) => {this.db = existDb; return this.db; });
//   }

//   public close(): void {
//       this.db.close();
//   }

//   public deleteDB(): Promise<any> {
//       this.db.close();
//       return this.db.delete(this.dbName);
//   }

//   private createViewDB(): void {
//     const store = this.db.createObjectStore(
//       'mouvement',
//       { keyPath: 'mouId' }
//     );

//     store.createIndex(
//       'mouvement',
//       'mouId',
//       { unique: true }
//     );
//   }
// }
