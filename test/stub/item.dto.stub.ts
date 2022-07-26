import { CreateSoldItemDto } from "src/item/dto/item.dto";

export function ItemDTOStub(priceAmount: number): CreateSoldItemDto {
    return {
        name: 'Item1',
        priceCurrency: "USD",
        priceAmount,
        sellerReference: 1
    };
}