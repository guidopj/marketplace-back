import { Sequelize } from 'sequelize-typescript';
import { Payout } from '../entities/payout.entity';
import { Item } from '../entities/item.entity';
import { SEQUELIZE_PROVIDER } from '../enums/databaseEnums';

export const databaseProviders = [
  {
    provide: SEQUELIZE_PROVIDER,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'marketplace',
      });
      sequelize.addModels([Payout, Item]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
