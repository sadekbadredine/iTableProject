import { TABLE } from '../models/table.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore/';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  tablesCollection!: AngularFirestoreCollection<TABLE>;
  productsCollection!: AngularFirestoreCollection<any>;
  products!: Observable<Array<any>> | any;
  tables!: Observable<Array<TABLE>> | any;
  showTable: Subject<boolean> = new Subject()
  table!: any;
  dotNetApi= 'https://api.genderize.io';
  
  constructor(private db: AngularFirestore) {
    this.tablesCollection = this.db.collection('table_list'); //reference
    this.tables = this.tablesCollection.snapshotChanges();
    this.productsCollection = this.db.collection('product_list');
    this.products = this.productsCollection.snapshotChanges();
  }

  getTables() {
    return this.tables;
  }

  getProducts() {
    return this.products;
  }

  addTableOrder(items: any, tableId: string) {
    this.db.collection('table_list').doc(tableId + '/').update({ order: items })
  }

  private updateTable(status: string, id: string) {
    this.db
      .collection('table_list')
      .doc(id + '/')
      .update({ status: status });
  }

  openTable(id: string) {
    this.updateTable('UNAVAILABLE', id);
  }

  callWaiter(table_id: string) {
    this.updateTable('CALL_WAITER', table_id);
  }

  closeTable(table_id: any) {
    this.updateTable('AVAILABLE', table_id);
  }

  checkOut(table_id: string) {
    this.db.collection('table_list').doc(table_id + '/').update({ order: [] })
    this.updateTable('CHECK_OUT', table_id);
  }

  takeOrder(table_id: string) {
    this.updateTable('TAKE_ORDER', table_id);
  }
}
