import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript'

import { ItemService } from './item.service';
import { databaseProviders } from '../databases/database.providers';
import { USD } from '../enums/currenciesEnums'
import { CreateSoldItemDto } from '../item/dto/item.dto';
import { ITEM_REPOSITORY } from '../enums/itemEnums';
import { ItemEntity } from '../entities/item.entity';

describe('ItemService', () => {
  let service: ItemService;
  let memDb: Sequelize;

  beforeAll(async () => {
    // Initiate Sequelize with SQLite and our models
    memDb = await databaseProviders[0].useFactory();
  });
  afterAll(() => memDb.close());

  afterEach(async () => {
    // clean out the database after every test
    await memDb.truncate();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, { provide: ITEM_REPOSITORY, useValue: ItemEntity}],
    }).compile();

    service = module.get<ItemService>(ItemService);
  });

  it('createItem', async () => {

    const item: CreateSoldItemDto = {
      name: 'item 1',
      priceCurrency: USD,
      priceAmount: 100,
      sellerReference: 1,
    };

    const createdItem = await service.createItem(item);
    expect(createdItem.name).toBe(item.name);
    expect(createdItem.priceAmount).toBe(item.priceAmount);
    expect(createdItem.priceCurrency).toBe(item.priceCurrency);
  });
});
