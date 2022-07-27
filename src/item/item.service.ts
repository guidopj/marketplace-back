import { Injectable, Inject } from '@nestjs/common';

import { ITEM_REPOSITORY } from 'src/enums/itemEnums';
import { Item } from 'src/entities/item.entity';
import { CreateSoldItemDto } from '../item/dto/item.dto';

@Injectable()
export class ItemService {
    constructor(@Inject(ITEM_REPOSITORY) private itemModel: typeof Item){}

    async getItems(){
        return await this.itemModel.findAll();
    }

    async createItem(item: CreateSoldItemDto){
        const newItemDto = new CreateSoldItemDto();
        newItemDto.sellerReference = item.sellerReference;
        newItemDto.priceCurrency = item.priceCurrency;
        newItemDto.priceAmount = item.priceAmount;
        const payout = new this.itemModel(newItemDto);
        return await payout.save();
    }
}
