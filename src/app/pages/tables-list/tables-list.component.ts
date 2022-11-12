import { TableService } from 'src/app/services/table.service';
import { Component, OnInit } from '@angular/core';
import { TABLE } from 'src/app/models/table.model';

@Component({
  selector: 'app-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss'],
})
export class TablesListComponent implements OnInit {
  tables: TABLE[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getTables().subscribe((docArray: Array<any>) => {
      this.tables = docArray.map((doc) => {
        return {
          data: doc.payload.doc.data(),
          id: doc.payload.doc.id,
        } as TABLE;
      });
    });
  }
}
