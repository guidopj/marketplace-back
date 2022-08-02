import { Test, TestingModule } from '@nestjs/testing';

import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ITEM_REPOSITORY } from '../enums/itemEnums';

describe('ItemController', () => {
  let controller: ItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ItemService,
          useValue: ITEM_REPOSITORY,
        },
      ],
      controllers: [ItemController],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
