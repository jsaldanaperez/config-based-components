import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice';
import { SearchInvoicesRequest } from '../../models/search-invoices-request';
import { InvoiceService } from '../../services/invoice.service';
import { TableConfig } from '../../shared/table/table-config';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {
  config: TableConfig<SearchInvoicesRequest, Invoice>;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.config = new TableConfig<SearchInvoicesRequest, Invoice>({
      search: (criteria) => this.invoiceService.search(criteria)
    })
  }
}
