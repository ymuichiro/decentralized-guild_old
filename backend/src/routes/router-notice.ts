import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { operations } from '../@types/swagger';
import { Notice } from '../services/Databases';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  notices: '/notices',
  notice: '/notice',
} as const;

type RequestGetNotices = Request<never, never, never, operations['getNotices']['parameters']['query']>;
type ResponseGetNotices = operations['getNotices']['responses']['200']['content']['application/json'];
type RequestGetNotice = Request<never, never, never, operations['getNotice']['parameters']['query']>;
type ResponseGetNotice = operations['getNotice']['responses']['200']['content']['application/json'];

/** get my notices */
router.get(p.notices, (req: RequestGetNotices, res: Response<ResponseGetNotices>, next) => {
  Notice.list(req.query.public_key)
    .then((r) => res.status(OK).json({ data: r }))
    .catch(next);
});

/** get my notices */
router.get(p.notice, (req: RequestGetNotice, res: Response<ResponseGetNotice>, next) => {
  Notice.find(req.query.noticeId)
    .then((r) => res.status(OK).json({ data: r }))
    .catch(next);
});

export default router;
