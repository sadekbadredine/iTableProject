import { TableService } from 'src/app/services/table.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TABLE } from 'src/app/models/table.model';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore/';

@Component({
  selector: 'app-table-client',
  templateUrl: './table-client.component.html',
  styleUrls: ['./table-client.component.scss'],
})
export class TableClientComponent implements OnInit {
  tablesCollection!: AngularFirestoreCollection<TABLE>;
  tables!: Observable<Array<TABLE>> | any;
  screenOrientation!: string;
  table!: TABLE;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private ngFireStore: AngularFirestore,
    private routeSnapshot: ActivatedRoute,
    private tableService: TableService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    let orientation = window.screen.orientation;
    this.screenOrientation = orientation.type;
    orientation.addEventListener('change', (ev) => {
      this.screenOrientation = orientation.type;
    });
  }

  ngOnInit(): void {
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
    });
  }

  onMouseOver() {
    return 'black'
  }

  onCashCheckout() {
    this.router.navigate(['bill'], { relativeTo: this.route })
  }

  onTakeOrder() {
    this.router.navigate(['order'], { relativeTo: this.route })
  }

  onViewMenu() {
    this.document.location.href = 'http://fnb-chocolatebar.com/CBMENU.pdf';
  }

  onCallWaiter(table_id: string) {
    this.tableService.callWaiter(table_id)
   }
}
