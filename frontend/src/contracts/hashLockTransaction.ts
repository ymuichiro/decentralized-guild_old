import { Mosaic, MosaicId } from "symbol-sdk/dist/src/model/mosaic";
import { UInt64 } from "symbol-sdk/dist/src/model/UInt64";
import { Network } from "../models/Network";
import {
  Deadline,
  HashLockTransaction,
  LockFundsTransaction,
  SignedTransaction,
} from "symbol-sdk/dist/src/model/transaction";

/**
 * ハッシュロックトランザクションを生成する
 */
export const hashLockTransaction = async function (
  signedAggTransaction: SignedTransaction,
  network: Network
): Promise<LockFundsTransaction> {
  // 作成
  return HashLockTransaction.create(
    Deadline.create(network.epochAdjustment),
    new Mosaic(
      new MosaicId(network.currencyMosaicId),
      UInt64.fromUint(10 * Math.pow(10, network.networkCurrencyDivisibility))
    ),
    UInt64.fromUint(5760),
    signedAggTransaction,
    network.type
  ).setMaxFee(100) as LockFundsTransaction;
};
