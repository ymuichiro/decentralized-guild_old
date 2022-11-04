import { atom } from 'recoil';
import { components } from '../../@types/swagger';
import { PublicAccount } from 'symbol-sdk/dist/src/model/account/PublicAccount';

export const userPublicAccountState = atom<PublicAccount | null>({
  key: 'userPublicAccountState',
  default: null,
});

export const userInformationState = atom<components['schemas']['User'] | null>({
  key: 'userInformationState',
  default: null,
});
