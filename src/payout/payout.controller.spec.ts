import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose'
import { MongoMemoryServer } from "mongodb-memory-server";
import { connect, Connection, Model } from "mongoose";

import { PayoutController } from './payout.controller';
import { PayoutService } from './payout.service';
import { ItemDTOStub } from '../../test/stub/item.dto.stub';
import { CreateSoldItemDto } from "src/item/dto/item.dto";
import { Payout, PayoutName } from './interface/payout';
import { PayoutSchema } from './schema/payout.schema'

describe('PayoutController', () => {
  let controller: PayoutController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let payoutModel: Model<Payout>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    payoutModel = mongoConnection.model(PayoutName, PayoutSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayoutController],
      providers: [PayoutService, { provide: getModelToken(PayoutName), useValue: payoutModel }],
    }).compile();

    controller = module.get<PayoutController>(PayoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("postPayout", () => {
    it("should return the saved object", async () => {
      const itemsSold: CreateSoldItemDto[] = [
        ItemDTOStub(100)
      ]
      const createdPayouts = await controller.createPayout(itemsSold);
      expect(createdPayouts.length).toBe(1);
      expect(createdPayouts[0].amount).toBe(100);
    });
    /*it("should return ArticleAlreadyExists (Bad Request - 400) exception", async () => {
      await (new articleModel(ArticleDTOStub()).save());
      await expect(appController.postArticle(ArticleDTOStub()))
        .rejects
        .toThrow(ArticleAlreadyExists);
    });*/
  });
});
