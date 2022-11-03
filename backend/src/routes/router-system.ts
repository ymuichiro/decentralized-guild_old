import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
import {
  CosignatureSignedTransaction,
  SignedTransaction,
} from 'symbol-sdk';
import { System ,VerifiedSss } from '../services/System';

// Constants
const router = Router();
const { OK } = StatusCodes;

// Paths
export const p = {
  cosig_system: '/cosig',
  verify_token: '/verify-token',
} as const;

/** Cosignate Transaction by System. */
router.post(p.cosig_system, (req: Request<SignedTransaction>, res: Response<CosignatureSignedTransaction>) => {
  const { signedTransaction } = req.body;
  res.status(OK);
  res.send(System.cosignateBySystem(signedTransaction));
});

/** Verify ActiveAccountToken from SSS. */
router.post(p.verify_token, (req: Request<string>, res: Response<VerifiedSss>) => {
  const { userPublicKey, token, network } = req.body;
  res.status(OK);
  res.send(System.verifyToken(userPublicKey, token, network));
});

export default router;
