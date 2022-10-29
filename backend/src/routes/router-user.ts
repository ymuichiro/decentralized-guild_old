import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { operations } from '../@types/swagger';
import { User } from '../services/Databases';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  user: '/user',
  users: '/users',
} as const;

type RequestGetUser = Request<never, never, never, operations['getUser']['parameters']['query']>;
type ResponseGetUser = operations['getUser']['responses']['200']['content']['application/json'];
/**
 * Get user info.
 */
router.get(p.user, (req: RequestGetUser, res: Response<ResponseGetUser>, next) => {
  User.find(req.query.public_key)
    .then((r) => {
      if (r) {
        r.created = new Date(r.created).getTime();
        res.status(OK).json({ data: r });
      } else {
        res.status(OK).json({ data: r });
      }
    })
    .catch(next);
});

type RequestAddUser = Request<never, never, operations['addUser']['requestBody']['content']['application/json'], never>;
type ResponseAddUser = operations['addUser']['responses']['200']['content']['application/json'];
/**
 * Set user info.
 */
router.post(p.user, (req: RequestAddUser, res: Response<ResponseAddUser>, next) => {
  const { public_key, icon, name } = req.body;
  User.insert(public_key, name, icon)
    .then(() => {
      res.status(OK).json({ data: { public_key, name, icon } });
    })
    .catch(next);
});

type RequestGetUsers = Request<never, never, never, never>;
type ResponseGetUsers = operations['getUsers']['responses']['200']['content']['application/json'];
/**
 * Get Users List
 */
router.get(p.users, (_: RequestGetUsers, res: Response<ResponseGetUsers>, next) => {
  User.list()
    .then((r) => {
      res.status(OK).json({ data: r });
    })
    .catch(next);
});

export default router;
