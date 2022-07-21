import { Schema } from "mongoose"

export const Payout = new Schema({
    sellerReference: Number,
    amount: Number,
    currency: String
});
