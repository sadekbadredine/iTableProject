import { TableService } from 'src/app/services/table.service';
import { Component, Input, OnInit } from '@angular/core';
import { TABLE } from 'src/app/models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input()
  table!: TABLE;

  constructor(private tableService: TableService) {}

  ngOnInit(): void {}

  getBackgroundColor() {
    let color;
    switch (this.table.data.status) {
      case 'AVAILABLE':
        color = 'black';
        break;
      case 'UNAVAILABLE':
        color = 'white';
        break;
      case 'TAKE_ORDER':
        color = 'green';
        break;
      case 'CHECK_OUT':
        color = 'red';
        break;
      case 'CALL_WAITER':
        color = 'orange';
        break;
    }
    return color;
  }

  getFontColor() {
    return this.table.data.status == 'UNAVAILABLE' ? 'black' : 'white';
  }

  onOpenTable(table: any) {
    switch (table.data.status) {
      case 'AVAILABLE':
        this.tableService.openTable(table.id);
        break;
      case 'TAKE_ORDER':
        this.tableService.openTable(table.id);
        break;
      case 'CALL_WAITER':
        this.tableService.openTable(table.id);
        break;
      case 'CHECK_OUT':
        this.tableService.closeTable(table.id);
        break;
      case 'UNAVAILABLE':
        this.tableService.closeTable(table.id);
        break;
    }
  }
}
