import { Module } from '@nestjs/common';

import { ItemService } from './item.service';
import { DatabaseModule } from 'src/databases/databases.module';
import { ItemController } from './item.controller';
import { itemProviders } from './item.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [
    ...itemProviders,
    ItemService
  ],
  exports: [ItemService],
})

export class ItemModule {}
