import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/compat/firestore/';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { MatSelect } from '@angular/material/select';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-order',
  templateUrl: './table-order.component.html',
  styleUrls: ['./table-order.component.scss']
})
export class TableOrderComponent implements OnInit {
  products!: Observable<Array<any>> | any;
  table!: { id: any; data: any; };
  orderForm!: FormGroup;
  tablesCollection: any;
  selected: any[] = [];
  tables: any;

  constructor(
    private tableService: TableService,
    private ngFireStore: AngularFirestore,
    private routeSnapshot: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getTableId()
    this.tableService.getProducts().subscribe((docArray: Array<any>) => {
      this.products = docArray.map((doc) => {
        return {
          data: doc.payload.doc.data(),
          id: doc.payload.doc.id,
        } as any;
      });
      this.initForm();
    });
  }

  getTableId() {
    this.tablesCollection = this.ngFireStore.collection('table_list', (ref) => {
      return ref.where('id', '==', +this.routeSnapshot.snapshot.params['id']);
    }); //reference
    this.tables = this.tablesCollection.snapshotChanges();
    this.tables.subscribe((_table: Array<any>) => {
      let document = _table[0];
      this.table = {
        id: document.payload.doc.id,
        data: document.payload.doc.data(),
      };
    });
  }

  onSelectItem(item: any) {
    this.selected.push({ item: item })
  }

  onSelectQuantity(quantity: number, index: number, itemPrice: MatSelect) {
    if (quantity > 0) {
      this.selected[index].item.price = itemPrice.value * quantity
      this.selected[index].item = { ...this.selected[index].item, quantity: quantity }
    }
  }

  getPrice(index: number) {
    if (this.selected.length === 0 || !this.selected[index]) {
      return 0
    } else {
      return this.selected[index].item.price
    }
  }

  addItem() {
    (<FormArray>this.orderForm.get('items')).push(
      new FormGroup({
        product: new FormControl(),
        quantity: new FormControl()
      })
    );
  }

  onDeleteItem(index: number) {
    (<FormArray>this.orderForm.get('items')).removeAt(index);
    this.selected.splice(index, 1)
  }

  private initForm() {
    let orderItems = new FormArray(new Array<any>)
    orderItems.push(
      new FormGroup({
        product: new FormControl(),
        quantity: new FormControl(),
      })
    )
    this.orderForm = new FormGroup({
      items: orderItems
    })

  }

  showDeleteIcon() {
    return (this.orderForm.get('items') as FormArray).controls.length === 1
      ? false
      : true
  }

  get itemsCtrls() {
    return (this.orderForm.get('items') as FormArray).controls;
  }

  onTakeOrder() {
    if (this.orderForm.value.items[this.orderForm.value.items.length - 1].product !== null) {
      this.tableService.takeOrder(this.table.id)
      this.tableService.addTableOrder(this.selected, this.table.id)
      this.router.navigate(['..'], { relativeTo: this.routeSnapshot })
    }
  }

  onGoBack() {
    this.router.navigate(['..'], { relativeTo: this.routeSnapshot })
  }
}
