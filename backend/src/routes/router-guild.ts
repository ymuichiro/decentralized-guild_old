import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { operations } from '../@types/swagger';
import { Guild } from '../services/Databases';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  guild: '/guild',
  guilds: '/guilds',
} as const;

type RequestGetGuild = Request<never, never, never, operations['getGuild']['parameters']['query']>;
type ResponseGetGuild = operations['getGuild']['responses']['200']['content']['application/json'];
type RequestAddGuild = Request<never, never, operations['addGuild']['requestBody']['content']['application/json'], never>;
type ResponseAddGuild = operations['addGuild']['responses']['200']['content']['application/json'];
type RequestGetGuilds = Request<never, never, never, never>;
type ResponseGetGuilds = operations['getGuilds']['responses']['200']['content']['application/json'];

/** Get Guild info. */
router.get(p.guild, (req: RequestGetGuild, res: Response<ResponseGetGuild>, next) => {
  Guild.find(req.query.guild_id)
    .then((r) => res.status(OK).json({ data: r }))
    .catch(next);
});

/** Set Guild info. */
router.post(p.guild, (req: RequestAddGuild, res: Response<ResponseAddGuild>, next) => {
  const { owner_public_key, icon, name } = req.body;
  Guild.insert(owner_public_key, name, icon)
    .then(() => res.status(OK).json({ data: { status: 'ok', message: 'success' } }))
    .catch(next);
});

/** Get Guilds List */
router.get(p.guilds, (_: RequestGetGuilds, res: Response<ResponseGetGuilds>, next) => {
  Guild.list()
    .then((r) => res.status(OK).json({ data: r }))
    .catch(next);
});

export default router;
