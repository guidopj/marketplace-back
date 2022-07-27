import { Controller, Get, Body, Post } from '@nestjs/common';

import { ItemService } from './item.service';
import { Item } from './interfaces/item';
import { CreateSoldItemDto } from '../item/dto/item.dto';

@Controller('item')
export class ItemController {

    constructor(private itemService: ItemService){}

    @Get()
    findAll(): Promise<Item[]> {
        return this.itemService.getItems();
    }

    @Post()
    createItem(@Body() soldItem: CreateSoldItemDto): Promise<Item> {
        return this.itemService.createItem(soldItem);
    }
}
