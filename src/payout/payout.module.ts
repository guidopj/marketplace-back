import { Module } from '@nestjs/common';

import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { PayoutSchema } from './schema/payout.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Payout',
        schema: PayoutSchema
    }])],
    controllers: [PayoutController],
    providers: [PayoutService],
    exports: [PayoutService],
})

export class PayoutModule {}
