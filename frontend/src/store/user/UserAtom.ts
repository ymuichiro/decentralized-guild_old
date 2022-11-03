import { atom } from 'recoil';

import { PublicAccount } from 'symbol-sdk';

export interface UserInformation {
  publicKey: string;
  name: string;
  icon: string;
}

export const userPublicAccountState = atom<PublicAccount | null>({
  key: 'userPublicAccountState',
  default: null,
});

export const userInformationState = atom<UserInformation | null>({
  key: 'userInformationState',
  default: null,
});
