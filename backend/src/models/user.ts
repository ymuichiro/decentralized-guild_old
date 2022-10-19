/* eslint-disable no-unused-vars */

export enum UserRoles {
  Standard,
  Admin1,
}

export type IUser = {
  id: number;
  name: string;
  email: string;
  pwdHash: string;
  role: UserRoles;
};
