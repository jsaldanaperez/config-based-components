import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { TableModule } from '../shared/table/table.module';
import { PaymentStateLabelComponent } from './payment-state-label/payment-state-label.component';


@NgModule({
  declarations: [
    InvoiceListComponent,
    PaymentStateLabelComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    TableModule
  ]
})
export class InvoicesModule { }
