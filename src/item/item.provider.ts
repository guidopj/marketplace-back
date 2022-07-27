import { Item } from '../entities/item.entity';
import { ITEM_REPOSITORY } from 'src/enums/itemEnums';

export const itemProviders = [
  {
    provide: ITEM_REPOSITORY,
    useValue: Item,
  },
];