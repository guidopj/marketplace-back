import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payout, PayoutName } from './interface/payout';
import { CreateSoldItemDto } from '../item/dto/item.dto';
import { CreatePayoutDto } from './dto/payout.dto';
import { AMOUNT_LIMIT } from '../enums/payoutEnums';

@Injectable()
export class PayoutService {

    constructor(@InjectModel(PayoutName) private payoutModel: Model<Payout>){}

    async getPayouts(){
        return await this.payoutModel.find();
    }

    async getPayout(id: string){
        return await this.payoutModel.findById(id);
    }

    async deletePayout(id: string){
        return await this.payoutModel.findByIdAndRemove(id);
    }

    async deletePayouts(){
        return await this.payoutModel.remove({});
    }

    async savePayout(item: CreateSoldItemDto, currentAmount: number){
        const newPayoutDto = new CreatePayoutDto();
        newPayoutDto.sellerReference = item.sellerReference;
        newPayoutDto.currency = item.priceCurrency;
        newPayoutDto.amount = currentAmount;
        const payout = new this.payoutModel(newPayoutDto);
        return await payout.save();
    }

    async splitPayouts(item: CreateSoldItemDto, currentAmount: number){
        const splittedPayouts = [];
        while(currentAmount > AMOUNT_LIMIT){
            let payout = await this.savePayout(item, AMOUNT_LIMIT);
            currentAmount -= AMOUNT_LIMIT;
            splittedPayouts.push(payout);
        }
        return {splittedPayouts, currentAmount};
    }

    async createPayout(soldItems: CreateSoldItemDto[]): Promise<Payout[]> {
        let result: Payout[] = [];
        const hasSingleItem = soldItems.length === 1;
        let payout = null;

        let totalAmount = soldItems.reduce((acc, item) => {
            return acc + item.priceAmount;
        }, 0);

        let currentAmount = totalAmount;
        if(hasSingleItem){
            payout = await this.savePayout(soldItems[0], soldItems[0].priceAmount);
            result.push(payout);
            return result;
        } else {
            if(currentAmount > AMOUNT_LIMIT){
                let payouts = await this.splitPayouts(soldItems[0], currentAmount);
                result = result.concat(payouts.splittedPayouts);
                currentAmount = payouts.currentAmount
            }
            
            if(currentAmount > 0){
                payout = await this.savePayout(soldItems[0], currentAmount)
                result.push(payout);
            }
            return result;
        }
    }
}
