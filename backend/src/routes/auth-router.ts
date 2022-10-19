import { Request, Response, Router } from 'express';
import { CookieProperies } from '../models/cookie';
import { ParamsDictionary } from 'express-serve-static-core';
import { LoginRequestBody } from '../models/request';
import { ParamMissingError, UnauthorizedError } from '../shared/errors';
import { generateHash } from '../shared/salt';
import StatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { verifyToken } from '../services/auth-services';

// Constants
const router = Router();

// Paths
export const p = {
  login: '/login',
  logout: '/logout',
  isLogin: '/is_login',
} as const;

if (process.env.COOKIE_SECRET === undefined) {
  console.warn('COOKIE_SECRET is not defined. There is a security risk.');
}

/**
 * Cookie properies
 */
export const cookieProps: CookieProperies = Object.freeze({
  key: 'ExpressGeneratorTx',
  secret: process.env.COOKIE_SECRET || 'secret',
  options: {
    httpOnly: true,
    signed: true,
    maxAge: Number(process.env.COOKIE_EXP),
    domain: process.env.COOKIE_DOMAIN,
    secure: process.env.SECURE_COOKIE === 'true',
  },
});

/**
 * Login a user
 */
router.post(p.login, async (req: Request<ParamsDictionary, any, LoginRequestBody>, res: Response) => {
  const { id, password } = req.body;
  // check request
  if (!(id && password)) throw new ParamMissingError();
  // load user data & compare
  const user = (() => generateHash('test'))(); // dummy
  if (user === undefined) throw new UnauthorizedError();
  if (!(await bcrypt.compare(password, user))) throw new UnauthorizedError();
  // issue jwt token
  const secret = process.env.JWT_SECRET;
  if (secret === undefined) throw new ParamMissingError();
  const token = jwt.sign({ id }, secret, { algorithm: 'HS256', expiresIn: '10m' });
  res.status(StatusCodes.OK).json({ id, token });
});

/**
 * Logout the user.
 */
router.post(p.logout, verifyToken, (req: Request, res: Response) => {
  const { key, options } = cookieProps;
  res.clearCookie(key, options);
  req.session.destroy(() => {});
  return res.status(StatusCodes.OK).json({ message: 'success' });
});

/**
 * check login status
 */
router.get(p.isLogin, (req: Request, res: Response) => {
  console.log(new Date().getTime(), 'isLogin');
  console.log(req.session);
  res.status(StatusCodes.OK).send('<h1>isLogin</h1>');
});

export default router;
