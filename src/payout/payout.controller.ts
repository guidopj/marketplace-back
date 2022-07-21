import { Controller, Get, Post, Body, Req, Res, Param } from '@nestjs/common';
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
}
