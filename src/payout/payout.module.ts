import { Module } from '@nestjs/common';

import { PayoutService } from './payout.service';
import { PayoutController } from './payout.controller';
import { payoutProviders } from './payout.provider';
import { DatabaseModule } from 'src/databases/databases.module';

@Module({
    imports: [DatabaseModule],
    controllers: [PayoutController],
    providers: [
        ...payoutProviders,
        PayoutService
    ],
    exports: [PayoutService],
})

export class PayoutModule {}
