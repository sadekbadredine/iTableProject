import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

import { TableClientComponent } from './pages/table-client/table-client.component';
import { TablesListComponent } from './pages/tables-list/tables-list.component';
import { TableOrderComponent } from './pages/table-order/table-order.component';
import { TableBillComponent } from './pages/table-bill/table-bill.component';
import { TableComponent } from './components/table/table.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    TableClientComponent,
    TablesListComponent,
    TableOrderComponent,
    TableBillComponent,
    TableComponent,
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    BrowserModule,
    MatCardModule,
    MatTableModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
