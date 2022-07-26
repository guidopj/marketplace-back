import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemController } from './item/item.controller';
import { ItemModule } from './item/item.module';
import { PayoutController } from './payout/payout.controller';
import { PayoutModule } from './payout/payout.module';

@Module({
  imports: [
    ItemModule,
    PayoutModule,
  ],
  controllers: [AppController, ItemController, PayoutController],
  providers: [AppService],
})
export class AppModule {}
