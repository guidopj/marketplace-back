import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript'

import { PayoutService } from './payout.service';
import { databaseProviders } from '../databases/database.providers';
import { Payout } from './interface/payout';
import { USD } from '../enums/currenciesEnums';
import { CreateSoldItemDto } from '../item/dto/item.dto';
import { PAYOUT_REPOSITORY } from '../enums/payoutEnums';
import { PayoutEntity } from '../entities/payout.entity';

describe('PayoutService', () => {
  let service: PayoutService;
  let memDb: Sequelize;

  let payouts: Payout[] = [{
    id: 1,
    sellerReference: 1,
    amount: 1000,
    currency: USD,
  }];

  beforeAll(async () => {
    // Initiate Sequelize with SQLite and our models
    memDb = await databaseProviders[0].useFactory();
  });
  afterAll(() => memDb.close());

  afterEach(async () => {
    // clean out the database after every test
    await memDb.truncate();
  });

  let soldItems: CreateSoldItemDto[] = [
    {
      name: 'item1',
      priceCurrency: USD,
      priceAmount: 1000,
      sellerReference: 1
    }
  ]

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PayoutService, { provide: PAYOUT_REPOSITORY, useValue: PayoutEntity}],
    }).compile();

    service = app.get<PayoutService>(PayoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createPayout', async () => {
    const createdPayout = await service.createPayout(soldItems);
    console.log('createdPayout', createdPayout)
    expect(createdPayout.length).toBe(1);
    expect(createdPayout[0].amount).toBe(1000);
  });
});
