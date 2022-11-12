import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TableService } from 'src/app/services/table.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table-bill',
  templateUrl: './table-bill.component.html',
  styleUrls: ['./table-bill.component.scss']
})
export class TableBillComponent implements OnInit {
  displayedColumns: string[] = ['item', 'quantity', 'price']
  table!: { id: any; data: any; };
  itemCollection: any[] = [];
  tablesCollection: any;
  showTable = false;
  tables: any;

  constructor(
    private ngFireStore: AngularFirestore,
    private routeSnapshot: ActivatedRoute,
    private tableService: TableService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTable();
  }

  getTable() {
    this.tablesCollection = this.ngFireStore.collection('table_list', (ref) => {
      return ref.where('id', '==', +this.routeSnapshot.snapshot.params['id']);
    }); //reference
    this.tables = this.tablesCollection.snapshotChanges();
    this.tables.subscribe((value: Array<any>) => {
      let document = value[0];
      this.table = {
        id: document.payload.doc.id,
        data: document.payload.doc.data(),
      };
      let tableData: any[] = []
      let totalPrice = 0
      let totalQuantitiy = 0
      this.table.data.order.forEach((element: any) => {
        totalPrice = totalPrice + element.item.price
        totalQuantitiy = totalQuantitiy + element.item.quantity
        tableData.push({
          item: element.item.name,
          quantity: element.item.quantity,
          price: element.item.price
        })
      });
      tableData.push({
        item: 'Total',
        quantity:totalQuantitiy,
        price:totalPrice
      })
      this.itemCollection = tableData;
      this.showTable = true
    });
  }

  onCheckOut() {
    this.tableService.checkOut(this.table.id)
    this.router.navigate(['..'], { relativeTo: this.routeSnapshot })
  }

  onGoBack() {
    this.router.navigate(['..'], { relativeTo: this.routeSnapshot })
  }

}
