import { CookieOptions } from 'express';

export type CookieProperies = {
  key: string;
  secret: string;
  options: CookieOptions;
};
