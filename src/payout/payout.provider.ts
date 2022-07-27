import { Payout } from '../entities/payout.entity';
import { PAYOUT_REPOSITORY } from 'src/enums/payoutEnums';

export const payoutProviders = [
  {
    provide: PAYOUT_REPOSITORY,
    useValue: Payout,
  },
];