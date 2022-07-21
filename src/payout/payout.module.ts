import { Module } from '@nestjs/common';
import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { Payout } from './schema/payout.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Payout',
        schema: Payout
    }])],
    controllers: [PayoutController],
    providers: [PayoutService],
    exports: [PayoutService],
})

export class PayoutModule {}
