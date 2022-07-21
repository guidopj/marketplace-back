import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payout } from './interface/payout';
import { CreateSoldItemDto } from '../item/dto/item.dto';
import { CreatePayoutDto } from './dto/payout.dto';

@Injectable()
export class PayoutService {

    constructor(@InjectModel('Payout') private payoutModel: Model<Payout>){}

    async getPayouts(){
        return await this.payoutModel.find();
    }

    async getPayout(id: string){
        return await this.payoutModel.findById(id);
    }

    async createPayout(soldItems: CreateSoldItemDto[]){
        const result: Payout[] = [];
        for (let item of soldItems) {
            const newPayoutDto = new CreatePayoutDto();
            newPayoutDto.sellerReference = item.sellerReference;
            newPayoutDto.amount = item.priceAmount;
            newPayoutDto.currency = item.priceCurrency;
            const payout = new this.payoutModel(newPayoutDto);
            result.push(payout);
            await payout.save();
        }

        return result; 
    }
}
