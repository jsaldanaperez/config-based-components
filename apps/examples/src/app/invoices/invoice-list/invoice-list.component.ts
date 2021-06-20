import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice, PaymentState } from '../../models/invoice';
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
  paymentStates = [PaymentState.Pending, PaymentState.Payed, PaymentState.Late];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.config = new TableConfig<SearchInvoicesRequest, Invoice>({
      criteria: new SearchInvoicesRequest,
      search: (criteria) => this.invoiceService.search(criteria),
      details: (invoice) => this.router.navigate([invoice.id, { returnUrl: this.router.url}], {relativeTo: this.activatedRoute })
    })
  }

  onChange(criteria: SearchInvoicesRequest, state: PaymentState, event?: Event){
    const index = criteria.paymentStates.indexOf(state);
      if((<HTMLInputElement>event?.target).checked){
        criteria.paymentStates.push(state);
      }else{
        criteria.paymentStates.splice(index, 1);
      }
  }
}
