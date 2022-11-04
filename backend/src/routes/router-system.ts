import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import { CosignatureSignedTransaction, SignedTransaction, PublicAccount, NetworkType } from 'symbol-sdk';
import { System, VerifiedSss } from '../services/System';
import { operations } from '../@types/swagger';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  cosig_system: '/cosig',
  verify_token: '/verify-token',
  announce_aggregate_bonded: '/announce-aggregate-bonded',
} as const;

type RequestVerifyToken = Request<never, never, operations['verifyUser']['requestBody']['content']['application/json']>;
type ResponseVerifyToken = operations['verifyUser']['responses']['200']['content']['application/json'];

//type RequestAnnounceAggregateBonded = Request<never, never, operations['announceAggregateBonded']['requestBody']['content']['application/json']>;
//type ResponseAnnounceAggregateBonded = operations['announceAggregateBonded']['responses']['200']['content']['application/json'];


/** Cosignate Transaction by System. */
router.post(p.cosig_system, (req: Request<SignedTransaction>, res: Response<CosignatureSignedTransaction>) => {
  const { signedTransaction } = req.body;
  res.status(OK);
  res.send(System.cosignateBySystem(signedTransaction));
});

/** Verify ActiveAccountToken from SSS. */
router.post(p.verify_token, (req: RequestVerifyToken, res: Response<ResponseVerifyToken>, next) => {
  const { public_key: userPublicKey, token } = req.body;
  if (!process.env.NETWORK_TYPE || Number(process.env.NETWORK_TYPE).toString() === 'NaN') {
    throw new Error('System Error: is not degined server side network_type');
  }
  try {
    System.verifyToken(userPublicKey, token, Number(process.env.NETWORK_TYPE));
    res.status(OK).send({ data: { status: 'ok', message: 'ok' } });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post(p.announce_aggregate_bonded, (req: Request, res: Response) => {
//router.post(p.announce_aggregate_bonded, (req: RequestAnnounceAggregateBonded, res: Response<ResponseAnnounceAggregateBonded>) => {
  const { signedAggTransaction, signedHashLockTransaction, nodeInfo, networkType} = req.body;
  System.announceAggregateBonded(signedAggTransaction, signedHashLockTransaction, nodeInfo, networkType)
  res.status(OK).send({ data: { status: 'ok', message: 'ok' } });
})

export default router;
