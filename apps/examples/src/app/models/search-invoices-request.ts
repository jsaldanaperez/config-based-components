import { Criteria } from './criteria';
import { PaymentState } from './invoice';

export class SearchInvoicesRequest extends Criteria {
    paymentStates: PaymentState[] = [];
}
