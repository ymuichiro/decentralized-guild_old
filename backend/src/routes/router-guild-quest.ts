import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { operations } from '../@types/swagger';
import { GuildQuest } from '../services/Databases';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  guild_quest: '/guild/quest',
  guild_quests: '/guild/quests',
} as const;

type RequestGetGuildQuest = Request<never, never, never, operations['getGuildQuest']['parameters']['query']>;
type ResponseGetGuildQuest = operations['getGuildQuest']['responses']['200']['content']['application/json'];
// prettier-ignore
type RequestAddGuildQuest = Request<never, never, operations['addGuildQuest']['requestBody']['content']['application/json']>;
type ResponseAddGuildQuest = operations['addGuildQuest']['responses']['200']['content']['application/json'];
type RequestGetGuildQuests = Request<never, never, never, operations['getGuildQuests']['parameters']['query']>;
type ResponseGetGuildQuests = operations['getGuildQuests']['responses']['200']['content']['application/json'];

/** Get quest info. */
router.get(p.guild_quest, (req: RequestGetGuildQuest, res: Response<ResponseGetGuildQuest>, next) => {
  GuildQuest.find(req.query.quest_id)
    .then((r) => res.status(OK).json({ data: r }))
    .catch(next);
});

/** Set quest info. */
router.post(p.guild_quest, (req: RequestAddGuildQuest, res: Response<ResponseAddGuildQuest>, next) => {
  const { nominate_guild_id, title, reward, description, requester_public_key } = req.body;
  GuildQuest.insert({ nominate_guild_id, title, reward, description, requester_public_key })
    .then(() => res.json({ data: { status: 'ok', message: 'success' } }))
    .catch(next);
});

/** Get quest list. */
router.get(p.guild_quests, (req: RequestGetGuildQuests, res: Response<ResponseGetGuildQuests>, next) => {
  GuildQuest.list(req.query.nominate_guild_id)
    .then((r) => res.json({ data: r }))
    .catch(next);
});

export default router;
