export class Invoice {
    id: number;
    invoiceNumber: string;
    amount: number;
    paymentState: PaymentState
}

export enum PaymentState{
    Pending,
    Payed,
    Late
}
