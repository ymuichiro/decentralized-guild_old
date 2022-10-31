import { atom } from 'recoil';

import { PublicAccount } from 'symbol-sdk';
import { User } from '@models/User';

export const userPublicAccountState = atom<PublicAccount | null>({
  key: 'userPublicAccountState',
  default: null,
});

export const userInformationState = atom<User | null>({
  key: 'userInformationState',
  default: null,
});
