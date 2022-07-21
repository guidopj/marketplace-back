export class CreatePayoutDto {
    sellerReference: number;
    amount: number;
    currency: string;
}

enum CurrencyEnum {
    Dollars = 'USD',
    Euros = 'EUR',
    Pence = 'GBP',
}