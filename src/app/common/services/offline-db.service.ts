import { Injectable } from '@angular/core';
import idb from 'idb';
import { DB } from 'idb';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class OfflineDBService {
  private dbName = 'jason-offlineDb';
  private version = 4;
  private dbPromise: Promise<DB> = null;

  constructor() {
    this.dbPromise = this.createEmptyDB();
  }

  createEmptyDB(): Promise<DB> {
    const self = this;
    return idb.open(self.dbName, self.version, function (upgradeDb) {
      self.createDbObjectStores(upgradeDb);
    });
  }

  createDbObjectStores(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('books')) {
      upgradeDb.createObjectStore('books', { keyPath: 'offlineId', autoIncrement: true });
    }
    if (!upgradeDb.objectStoreNames.contains('mouvement')) {
      upgradeDb.createObjectStore('mouvement', { keyPath: 'offlineId', autoIncrement: true });
    }
  }

  add(storeName: string, record: any, dirtyData: boolean = false): Promise<void> {
    return this.dbPromise.then(async db => {
      if (dirtyData) {
        record.action = 'Add';
      }
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).add(record);
      return tx.complete;
    });
  }

  addAll(storeName: string, records: any[]): Promise<void> {
    return this.dbPromise.then(async db => {
      const tx = db.transaction(storeName, 'readwrite');
      const os = tx.objectStore(storeName);
      // Promise.all takes a list of promises and resolves if all of them do
      await Promise.all(records.map(rec => {
        console.log('line 40 ', rec);
        os.add(rec);
      }));
      return tx.complete;
    });
  }

  get(storeName, key): Promise<any> {
    return this.dbPromise.then(db => {
      return db.transaction(storeName, 'readonly')
        .objectStore(storeName).get(key);
    });
  }

  getAll(storeName): Promise<any[]> {
    return this.dbPromise.then(db => {
      return db.transaction(storeName, 'readonly')
        .objectStore(storeName).getAll();
    });
  }

  findByPropertyValue(storeName, propertyName, properyValue): Promise<any> {
    return this.dbPromise.then(db => {
      return db.transaction(storeName, 'readonly')
        .objectStore(storeName)
        .openCursor();
    }).then(function logItems(cursor) {
      if (!cursor) {
        return;
      }
      console.log('cursor :', cursor.value);
      if (cursor.value[propertyName] === properyValue) {
        return cursor.value;
      } else {
        return cursor.continue().then(logItems);
      }
    });
  }

  updateWithKey(storeName, key, val): Promise<void> {
    return this.dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(val, key);
      return tx.complete;
    });
  }

  update(storeName, val, dirtyData: boolean = false): Promise<void> {
    return this.dbPromise.then(db => {
      if (dirtyData) {
        val.action = 'Update';
      }
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(val);
      return tx.complete;
    });
  }

  delete(storeName: string, key, dirtyData: boolean = false): Promise<void> {
    if (dirtyData) {
      this.get(storeName, key).then((val) => {
        if (val != null) {
          val.action = 'Delete';
          this.dbPromise.then(db => {
            const tx = db.transaction(storeName, 'readwrite');
            tx.objectStore(storeName).put(val);
            return tx.complete;
          });
        }
      });
    } else {
      return this.dbPromise.then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).delete(key);
        return tx.complete;
      });
    }
  }

  clear(storeName: string): Promise<void> {
    return this.dbPromise.then(db => {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).clear();
      return tx.complete;
    });
  }

  keys(storeName: string): Promise<any[]> {
    return this.dbPromise.then(db => {
      const tx = db.transaction(storeName);
      const keys = [];
      const store = tx.objectStore(storeName);

      // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
      // openKeyCursor isn't supported by Safari, so we fall back
      (store.iterateKeyCursor || store.iterateCursor).call(store, cursor => {
        if (!cursor) { return; }
        keys.push(cursor.key);
        cursor.continue();
      });

      return tx.complete.then(() => keys);
    });
  }

  hasKey(storeName: string, key: string) {

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
          .then(function (res) {
            console.log('line 109 ', res);
            return tx.complete;
          });

      }).catch(function (err) {
        console.log(err);
      }).then(resolve);
    });
  }

  createTestData() {
    this.addAll('books', [
      { id: '006251587X', title: 'Weaving the Web', year: 2000, edition: 2 },
      { id: '0465026567', title: 'Gödel, Escher, Bach', year: 1999 },
      { id: '0465030793', title: 'I Am a Strange Loop', year: 2008 }
    ]);

    this.addAll('mouvement', [
      { name: '1', poids: 1, action: 'Add' },
      { name: '2', poids: 2, action: 'Add' },
      { name: '3', poids: 3, action: 'Add' },
      { name: '4', poids: 4, action: 'Add' },
      { name: '5', poids: 5, action: 'Add' }
    ]);
  }
}
