import { Schema } from "mongoose"

export const PayoutSchema = new Schema({
    sellerReference: Number,
    amount: Number,
    currency: String
});
