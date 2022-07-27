import { CreatePayoutDto } from "src/payout/dto/payout.dto";

export function PayoutDTOStub(): CreatePayoutDto {
    return {
        sellerReference: 1,
        amount: 10,
        currency: "USD",
    };
}