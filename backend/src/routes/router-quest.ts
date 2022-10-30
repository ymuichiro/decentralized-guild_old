import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { operations } from '../@types/swagger';
import { Quest } from '../services/Databases';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  quest: '/quest',
  quests: '/quests',
} as const;

type RequestGetQuest = Request<never, never, never, operations['getQuest']['parameters']['query']>;
type ResponseGetQuest = operations['getQuest']['responses']['200']['content']['application/json'];
type RequestAddQuest = Request<never, never, operations['addQuest']['requestBody']['content']['application/json']>;
type ResponseAddQuest = operations['addQuest']['responses']['200']['content']['application/json'];
type RequestGetQuests = Request<never, never, never, never>;
type ResponseGetQuests = operations['getQuests']['responses']['200']['content']['application/json'];

/** Get quest info. */
router.get(p.quest, (req: RequestGetQuest, res: Response<ResponseGetQuest>, next) => {
  Quest.find(req.query.quest_id)
    .then((r) => res.status(OK).json({ data: r }))
    .catch(next);
});

/** Set quest info. */
router.post(p.quest, (req: RequestAddQuest, res: Response<ResponseAddQuest>, next) => {
  const { nominate_guild_id, title, reward, description, requester_public_key } = req.body;
  Quest.insert({ nominate_guild_id, title, reward, description, requester_public_key })
    .then(() => res.json({ data: { status: 'ok', message: 'success' } }))
    .catch(next);
});

/** Get quest list. */
router.get(p.quests, (_: RequestGetQuests, res: Response<ResponseGetQuests>, next) => {
  Quest.list()
    .then((r) => res.json({ data: r }))
    .catch(next);
});

export default router;
