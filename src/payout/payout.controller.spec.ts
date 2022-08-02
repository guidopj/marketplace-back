import { Test, TestingModule } from '@nestjs/testing';

import { PayoutController } from './payout.controller';
import { PayoutService } from './payout.service'
import { CreateSoldItemDto } from '../item/dto/item.dto';
import { USD } from '../enums/currenciesEnums'
import { Payout } from './interface/payout';

describe('PayoutController', () => {

  let payoutController: PayoutController;
  let items: CreateSoldItemDto[] = [
    {
      name: 'item 1',
      priceCurrency: USD,
      priceAmount: 1000,
      sellerReference: 1,
    }
  ]

  let payouts: Payout[] = [
    {
      id: 1,
      sellerReference: 1,
      amount: 1000,
      currency: USD,
    }
  ]

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PayoutController],
      providers: [
        {
          provide: PayoutService,
          useValue: {
            createPayout: jest.fn(() => payouts),
          },
        },
      ],
    }).compile();

    payoutController = app.get<PayoutController>(PayoutController);
  });

  it('createPayout', () => {
    expect(payoutController.createPayout(items)).toEqual(payouts);
  });
});
