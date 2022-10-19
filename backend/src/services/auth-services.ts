import { NextFunction, Response, Request } from 'express';
import { UnauthorizedError } from '../shared/errors';
import jwt from 'jsonwebtoken';

/**
 * verify token（トークンの改竄検証）
 **/
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  // get token in request
  const secret = process.env.JWT_SECRET;
  const token = req.body.token || req.query.token || req.headers['x-access-token'] || undefined;
  console.log('token', token);
  if (token === undefined || secret === undefined) throw new UnauthorizedError();
  // auth jwt
  jwt.verify(token, secret, (err: any, decoded: any): void => {
    if (err) throw UnauthorizedError;
    (req as any).decoded = decoded;
    next();
  });
}
