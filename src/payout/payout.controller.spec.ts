import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose'

import { PayoutController } from './payout.controller';
import { PayoutName } from './interface/payout';
import { PayoutService } from './payout.service';

describe('PayoutController', () => {
  let controller: PayoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayoutController],
      providers: [PayoutService, { provide: getModelToken(PayoutName), useValue: jest.fn() }],
    }).compile();

    controller = module.get<PayoutController>(PayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
