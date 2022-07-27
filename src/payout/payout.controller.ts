import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { CreateSoldItemDto } from '../item/dto/item.dto';
import { PayoutService } from './payout.service';
import { Payout } from './interface/payout';

@Controller('payout')
export class PayoutController {

    constructor(private payoutService: PayoutService){}

    @Post()
    createPayout(@Body() soldItems: CreateSoldItemDto[]): Promise<Payout[]> {
        return this.payoutService.createPayout(soldItems);
    }

    @Get()
    getPayouts(): Promise<Payout[]> {
        return this.payoutService.getPayouts();
    }

    @Get(':payoutId')
    getPayout(@Param('payoutId') payoutId: string): Promise<Payout> {
        return this.payoutService.getPayout(payoutId);
    }

    @Delete(':payoutId')
    deletePayout(@Param('payoutId') payoutId: string): Promise<number> {
        return this.payoutService.deletePayout(payoutId);
    }

    @Delete()
    deletePayouts(): Promise<number> {
        return this.payoutService.deletePayouts();
    }
}
