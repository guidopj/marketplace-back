export class CreateSoldItemDto {
    name: string;
    priceCurrency: CurrencyEnum;
    priceAmount: number;
    sellerReference: number;
}

enum CurrencyEnum {
    Dollars = 'USD',
    Euros = 'EUR',
    Pence = 'GBP',
}