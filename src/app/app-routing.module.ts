import { TableClientComponent } from './pages/table-client/table-client.component';
import { TablesListComponent } from './pages/tables-list/tables-list.component';
import { TableOrderComponent } from './pages/table-order/table-order.component';
import { TableBillComponent } from './pages/table-bill/table-bill.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: TablesListComponent },
  { path: 'table/:id', component: TableClientComponent },
  { path: 'table/:id/order', component: TableOrderComponent },
  { path: 'table/:id/bill', component: TableBillComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
