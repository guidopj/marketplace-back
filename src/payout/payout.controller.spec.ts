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

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  describe("postPayout", () => {
    it("should return one saved payout", async () => {
      const itemsSold: CreateSoldItemDto[] = [
        ItemDTOStub(100)
      ]
      const createdPayouts = await controller.createPayout(itemsSold);
      expect(createdPayouts.length).toBe(1);
      expect(createdPayouts[0].amount).toBe(100);
    });

    it("should return the one saved payout with more than 1 millon as an amount", async () => {
      const itemsSold: CreateSoldItemDto[] = [
        ItemDTOStub(1200000)
      ]
      const createdPayouts = await controller.createPayout(itemsSold);
      expect(createdPayouts.length).toBe(1);
      expect(createdPayouts[0].amount).toBe(1200000);
    });

    it("should return the two saved payout splitted as having more than 1 millon as an amount sum", async () => {
      const itemsSold: CreateSoldItemDto[] = [
        ItemDTOStub(1200000),
        ItemDTOStub(500)
      ]
      const createdPayouts = await controller.createPayout(itemsSold);
      expect(createdPayouts.length).toBe(2);
      expect(createdPayouts[0].amount).toBe(1000000);
      expect(createdPayouts[1].amount).toBe(200500);
    });

    it("should return the two previously saved payouts", async () => {
      const itemsSold: CreateSoldItemDto[] = [
        ItemDTOStub(1200000),
        ItemDTOStub(500)
      ]
      await controller.createPayout(itemsSold);
      const payouts = await controller.getPayouts();
      expect(payouts.length).toBe(2);
    });

    it("should return a specific payout previously saved", async () => {
      const itemsSold: CreateSoldItemDto[] = [
        ItemDTOStub(1200000),
      ]
      const payouts = await controller.createPayout(itemsSold);
      let payout = await controller.getPayout(payouts[0].id.toString());
      expect(payout).not.toBeNull();
    });

    it("should delete a specific payout previously saved", async () => {
      const itemsSold: CreateSoldItemDto[] = [
        ItemDTOStub(1200000),
      ]
      const createdPayouts = await controller.createPayout(itemsSold);
      await controller.deletePayout(createdPayouts[0].id.toString());
      const payouts = await controller.getPayouts();
      expect(payouts.length).toBe(0);
    });
  });
});
