import { Injectable, Inject } from '@nestjs/common';

import { CreateSoldItemDto } from '../item/dto/item.dto';
import { CreatePayoutDto } from './dto/payout.dto';
import { AMOUNT_LIMIT } from '../enums/payoutEnums';
import { PAYOUT_REPOSITORY } from '../enums/payoutEnums';
import { Payout } from 'src/entities/payout.entity';

@Injectable()
export class PayoutService {

    constructor(@Inject(PAYOUT_REPOSITORY) private payoutModel: typeof Payout){}

    async getPayouts(){
        return await this.payoutModel.findAll();
    }

    async getPayout(id: string){
        return await this.payoutModel.findByPk(id);
    }

    async deletePayout(id: string){
        return await this.payoutModel.destroy({
            where: {
              id
            }
        })
    }

    async deletePayouts(){
        return await this.payoutModel.destroy({
            truncate: true
          });
    }

    async savePayout(item: CreateSoldItemDto, currentAmount: number){
        const newPayoutDto = new CreatePayoutDto();
        newPayoutDto.sellerReference = item.sellerReference;
        newPayoutDto.currency = item.priceCurrency;
        newPayoutDto.amount = currentAmount;
        const payout = new this.payoutModel(newPayoutDto);
        return await payout.save();
    }

    async createPayout(soldItems: CreateSoldItemDto[]): Promise<Payout[]> {
        const result: Payout[] = [];
        const hasSingleItem = soldItems.length === 1;

        let totalAmount = soldItems.reduce((acc, item) => {
            return acc + item.priceAmount;
        }, 0);

        const payoutsAmount = hasSingleItem ? soldItems.length : Math.ceil(totalAmount / AMOUNT_LIMIT);
        let currentAmount = totalAmount;

        if(hasSingleItem){
            const payout = await this.savePayout(soldItems[0], soldItems[0].priceAmount);
            result.push(payout);
            return result;
        } else {
            for(let payoutIdx = 0; payoutIdx < payoutsAmount; payoutIdx++){
                let payout = null;
                if(currentAmount < AMOUNT_LIMIT){
                    payout = await this.savePayout(soldItems[payoutIdx], currentAmount)
                } else {
                    payout = await this.savePayout(soldItems[payoutIdx], AMOUNT_LIMIT)
                    currentAmount -= AMOUNT_LIMIT;
                }
                result.push(payout);
            }
            return result;
        }
    }
}
