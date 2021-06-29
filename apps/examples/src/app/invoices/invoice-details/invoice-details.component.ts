import { Component, OnInit } from '@angular/core';
import { Invoice, PaymentState } from '../../models/invoice';
import { InvoiceService } from '../../services/invoice.service';
import { FormConfig } from '../../shared/form/form-config';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice;
  config: FormConfig<Invoice>;
  paymentStates = PaymentState;

  constructor(
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.config = FormConfig.create<Invoice>({
      value: (value) => this.invoice = value,
      new: () => new Invoice(),
      load: (id: number) => this.invoiceService.getById(id),
      create: (invoice) => this.invoiceService.create(invoice),
      update: (invoice) => this.invoiceService.update(invoice),
      validate: (invoice) => invoice.invoiceNumber !== "RANDOM"
    });
  }
}
