import { Document } from "mongoose";

export interface Payout extends Document {
    id?: number;
    sellerReference: Number;
    amount: Number;
    currency: String;
}

enum CurrencyEnum {
    Dollars = 'USD',
    Euros = 'EUR',
    Pence = 'GBP',
}