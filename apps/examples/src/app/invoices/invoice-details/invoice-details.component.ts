import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Invoice, PaymentState } from '../../models/invoice';
import { InvoiceService } from '../../services/invoice.service';
import { FormConfig } from '../../shared/form/form-config';
 

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit {
  config: FormConfig<Invoice>;
  paymentStates = PaymentState;
  invalidInvoiceNumber: boolean;
  invoiceNumber = new FormControl();

  constructor(
    private invoiceService: InvoiceService) { } 

  ngOnInit(): void {
    this.config = FormConfig.create<Invoice>({
      form:  new FormGroup({
        'id': new FormControl(''),
        'invoiceNumber': new FormControl('', [Validators.required, Validators.maxLength(7), this.customValidator()]),
        'amount': new FormControl('', [Validators.max(200)]),
        'paymentState': new FormControl()
      }),
      load: (id: number) => this.invoiceService.getById(id),
      create: (invoice) => this.invoiceService.create(invoice),
      update: (invoice) => this.invoiceService.update(invoice)
    });
  } 

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isInvalid = control.value === 'RANDOM';
      return isInvalid ? { randomErrorId: {value: control.value}} : null;
    };
  }
}
