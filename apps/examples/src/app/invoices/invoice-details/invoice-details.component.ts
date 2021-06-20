import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../models/invoice';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice;
  returnUrl: string | null;
  onBack = () => this.router.navigateByUrl(this.returnUrl ?? 'invoices');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as unknown as number;
    this.returnUrl = this.activatedRoute.snapshot.paramMap.get('returnUrl');
    this.invoiceService.getById(id).subscribe(invoice => this.invoice = invoice);
  }
}
