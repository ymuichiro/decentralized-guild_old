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
  questSetHash: '/quest/set-hash',
  quests: '/quests',
} as const;

type RequestGetQuest = Request<never, never, never, operations['getQuest']['parameters']['query']>;
type ResponseGetQuest = operations['getQuest']['responses']['200']['content']['application/json'];
type RequestAddQuest = Request<never, never, operations['addQuest']['requestBody']['content']['application/json']>;
type ResponseAddQuest = operations['addQuest']['responses']['200']['content']['application/json'];
// prettier-ignore
type RequestSetHashQuest = Request<never, never, operations['setQuestHash']['requestBody']['content']['application/json']>;
type ResponseSetHashQuest = operations['setQuestHash']['responses']['200']['content']['application/json'];
// prettier-ignore
type RequestUpdateQuest = Request<never, never, operations['updateQuest']['requestBody']['content']['application/json']>;
type ResponseUpdateQuest = operations['updateQuest']['responses']['200']['content']['application/json'];
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

/** Update transaction hash when quest recieved */
router.post(p.questSetHash, (req: RequestSetHashQuest, res: Response<ResponseSetHashQuest>, next) => {
  const { quest_id, transaction_hash, worker_public_key } = req.body;
  Quest.find(quest_id)
    .then((field) => {
      if (field?.transaction_hash || field?.worker_public_key) {
        throw new Error('TransactionHash is already registered in the specified QuestID.');
      }
      return Quest.setWorkerAndTransactionHash(quest_id, transaction_hash, worker_public_key);
    })
    .then(() => {
      res.status(OK).json({ data: { message: 'ok', status: 'ok' } });
    })
    .catch(next);
});

/** Update your Quest registration. TransactionHash cannot be updated */
router.put(p.quest, (req: RequestUpdateQuest, res: Response<ResponseUpdateQuest>, next) => {
  const { quest_id, ...field } = req.body;
  Quest.find(quest_id)
    .then((sqlField) => {
      if (!sqlField) throw new Error('Specified Quest ID not found');
      return Quest.update(quest_id, {
        nominate_guild_id: field.nominate_guild_id || sqlField.nominate_guild_id,
        title: field.title || sqlField.title,
        description: field.description || sqlField.description,
        reward: field.reward === null || field.reward === undefined ? sqlField.reward : field.reward,
      });
    })
    .then(() => {
      res.status(OK).json({ data: { message: 'ok', status: 'ok' } });
    })
    .catch(next);
});

/** Get quest list. */
router.get(p.quests, (_: RequestGetQuests, res: Response<ResponseGetQuests>, next) => {
  Quest.list()
    .then((r) => res.json({ data: r }))
    .catch(next);
});

export default router;
