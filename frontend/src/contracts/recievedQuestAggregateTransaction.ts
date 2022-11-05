import { PublicAccount } from "symbol-sdk/dist/src/model/account";
import { PlainMessage } from "symbol-sdk/dist/src/model/message";
import { Mosaic, MosaicId } from "symbol-sdk/dist/src/model/mosaic";
import {
  AggregateTransaction,
  Deadline,
  TransferTransaction,
} from "symbol-sdk/dist/src/model/transaction";
import { UInt64 } from "symbol-sdk/dist/src/model/UInt64";
import { Network } from "../models/Network";

/**
 * クエスト受注時コントラクト
 * @param contractId
 * @param requesterPublicKey
 * @param workerPublicKey
 * @param systemPublicKey
 * @param depositFeeAmount
 * @param network
 * @returns
 */
export const recievedQuestAggregateTransaction = function (
  contractId: string,
  requesterPublicKey: string,
  workerPublicKey: string,
  systemPublicKey: string,
  depositFeeAmount: number,
  network: Network
) {
  const requesterPublic = PublicAccount.createFromPublicKey(
    requesterPublicKey,
    network.type
  );
  const workerPublic = PublicAccount.createFromPublicKey(
    workerPublicKey,
    network.type
  );
  const systemPublic = PublicAccount.createFromPublicKey(
    systemPublicKey,
    network.type
  );
  const transgerTransaction1 = TransferTransaction.create(
    Deadline.createEmtpy(),
    systemPublic.address,
    [
      new Mosaic(
        new MosaicId(network.currencyMosaicId),
        UInt64.fromUint(depositFeeAmount)
      ),
    ],
    PlainMessage.create(contractId),
    network.type
  );
  const transgerTransaction2 = TransferTransaction.create(
    Deadline.createEmtpy(),
    systemPublic.address,
    [
      new Mosaic(
        new MosaicId(network.currencyMosaicId),
        UInt64.fromUint(depositFeeAmount)
      ),
    ],
    PlainMessage.create(contractId),
    network.type
  );
  const aggregateTransaction = AggregateTransaction.createBonded(
    Deadline.create(network.epochAdjustment),
    [
      transgerTransaction1.toAggregate(workerPublic),
      transgerTransaction2.toAggregate(requesterPublic),
    ],
    network.type,
    []
  ).setMaxFeeForAggregate(100, 1);
  return aggregateTransaction;
};
