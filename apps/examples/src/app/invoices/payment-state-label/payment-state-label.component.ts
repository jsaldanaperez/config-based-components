import { Component, Input } from '@angular/core';
import { PaymentState } from '../../models/invoice';

@Component({
  selector: 'app-payment-state-label',
  templateUrl: './payment-state-label.component.html',
  styleUrls: ['./payment-state-label.component.scss']
})
export class PaymentStateLabelComponent{
  @Input() value: PaymentState;
  @Input() asBadge: boolean;
  paymentStates = PaymentState;
}
