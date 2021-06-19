import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Invoice, PaymentState } from '../models/invoice';
import { SearchInvoicesRequest } from '../models/search-invoices-request';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: Invoice[] = [];

  constructor(){
    for(let i = 1; i < 10; i++){
      this.invoices.push({
        id: i,
        amount: i * 150.3,
        paymentState: this.randomEnum(PaymentState),
        invoiceNumber: `ES0000${i}`
      })
    }
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

    return of(filteredInvoices).pipe(delay(800))
  }

  private randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
  }
}
