import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Invoice, PaymentState } from '../models/invoice';
import { SearchInvoicesRequest } from '../models/search-invoices-request';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: Invoice[];

  constructor(){
    this.invoices = [ 
      { id: 1, amount: 150.3, paymentState: PaymentState.Payed, invoiceNumber: 'ES00001' }, 
      { id: 2, amount: 300.6, paymentState: PaymentState.Late, invoiceNumber: 'ES00002' }, 
      { id: 3, amount: 450.90000000000003, paymentState: PaymentState.Pending, invoiceNumber: 'ES00003' }, 
      { id: 4, amount: 601.2, paymentState: PaymentState.Payed, invoiceNumber: 'ES00004' }, 
      { id: 5, amount: 751.5, paymentState: PaymentState.Payed, invoiceNumber: 'ES00005' }, 
      { id: 6, amount: 901.8000000000001, paymentState: PaymentState.Late, invoiceNumber: 'ES00006' }, 
      { id: 7, amount: 1052.1000000000001, paymentState: PaymentState.Payed, invoiceNumber: 'ES00007' }, 
      { id: 8, amount: 1202.4, paymentState: PaymentState.Pending, invoiceNumber: 'ES00008' }, 
      { id: 9, amount: 1352.7, paymentState: PaymentState.Late, invoiceNumber: 'ES00009' } ]
  }

  getById(id: number){
    const index = this.findIndex(id); 
    return of(this.invoices[index]).pipe(delay(500));
  }

  search(request: SearchInvoicesRequest): Observable<Invoice[]>{

    const searchTerm = request.searchTerm;
    let filteredInvoices = this.invoices;
    if(searchTerm){
      filteredInvoices = filteredInvoices.filter(x => x.invoiceNumber.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1)
    }

    if(request.paymentStates?.length){
      filteredInvoices = filteredInvoices.filter(x => request.paymentStates.indexOf(x.paymentState) !== -1);
    }

    if(request.minAmount){
      filteredInvoices = filteredInvoices.filter(x => x.amount >= request.minAmount);
    }

    if(request.maxAmount){
      filteredInvoices = filteredInvoices.filter(x => x.amount <= request.maxAmount);
    }

    return of(filteredInvoices).pipe(delay(800))
  }

  private findIndex = (id: number) => this.invoices.findIndex(x => x.id == id);
}
