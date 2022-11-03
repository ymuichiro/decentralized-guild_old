import { PublicAccount } from "symbol-sdk/dist/src/model/account";
import { Network } from "../models/Network";
import { Mosaic, MosaicId } from "symbol-sdk/dist/src/model/mosaic";
import { UInt64 } from "symbol-sdk/dist/src/model/UInt64";
import { PlainMessage } from "symbol-sdk/dist/src/model/message";
import { SystemFee } from "../models/Tax";
import {
  AggregateTransaction,
  Deadline,
  MosaicSupplyRevocationTransaction,
  TransferTransaction,
} from "symbol-sdk/dist/src/model/transaction";
import { Evaluation } from '../models/Quest'
/**
 * Quest完了時のコントラクト
 * Requester,Workerの評価に合わせてトランザクションが変化する
 */
export const completeOrderTransaction = function (
  requesterPublicKey: string,
  workerPublicKey: string,
  guildOwnerPublicKey: string,
  systemPublicKey: string,
  reward: number,
  wrpMosaicId: string,
  guildPointMosaicId: string,
  requesterJudgement: Evaluation,
  workerJudgement: Evaluation,
  systemFee: SystemFee,
  network: Network,
): AggregateTransaction {
  /*
    コントラクト作成
  */
  const requesterPublicAccount = PublicAccount.createFromPublicKey(
    requesterPublicKey,
    network.type
  );
  const workerPublicAccount = PublicAccount.createFromPublicKey(
    workerPublicKey,
    network.type
  );
  const guildOwnerPublicAccount = PublicAccount.createFromPublicKey(
    guildOwnerPublicKey,
    network.type
  );
  const systemPublicAccount = PublicAccount.createFromPublicKey(
    systemPublicKey,
    network.type
  );

  // Requester --> Worker: Send Reward XYM 
  const payRewardTransaction = TransferTransaction.create(
    Deadline.createEmtpy(),
    workerPublicAccount.address,
    [new Mosaic(new MosaicId(network.currencyMosaicId), UInt64.fromUint(reward * network.networkCurrencyDivisibility))],
    PlainMessage.create("pay reward"),
    network.type
  );

  // System --> Requester: Return Deposit
  const returnDepositToRequesterTransaction = TransferTransaction.create(
    Deadline.createEmtpy(),
    requesterPublicAccount.address,
    [new Mosaic(new MosaicId(network.currencyMosaicId), UInt64.fromUint(systemFee.deposit * network.networkCurrencyDivisibility))],
    PlainMessage.create("return deposit"),
    network.type
  );

  // System --> Worker: Return Deposit
  const returnDepositToWorkerTransaction = TransferTransaction.create(
    Deadline.createEmtpy(),
    workerPublicAccount.address,
    [new Mosaic(new MosaicId(network.currencyMosaicId), UInt64.fromUint(systemFee.deposit * network.networkCurrencyDivisibility))],
    PlainMessage.create("return deposit"),
    network.type
  );

  // アグリゲートボンデッドトランザクションを作成する
  let aggTx = AggregateTransaction.createComplete(
    Deadline.create(network.epochAdjustment),
    [
      payRewardTransaction.toAggregate(requesterPublicAccount),
      returnDepositToRequesterTransaction.toAggregate(systemPublicAccount),
      returnDepositToWorkerTransaction.toAggregate(systemPublicAccount),
    ],
    network.type,
    []
  )

  // Requesterの評価が良であればWRPを付与する
  if(requesterJudgement == Evaluation.GOOD) {
    const sendWrpRequesterTransaction = TransferTransaction.create(
      Deadline.createEmtpy(),
      requesterPublicAccount.address,
      [new Mosaic(new MosaicId(wrpMosaicId), UInt64.fromUint(1))],
      PlainMessage.create('Send WRP'),
      network.type
    )
    aggTx.innerTransactions.push(sendWrpRequesterTransaction.toAggregate(systemPublicAccount))
  // Requesterの評価が悪であればWRPを没収する
  } else {
    const RevokeWrpRequesterTransaction = MosaicSupplyRevocationTransaction.create(
      Deadline.createEmtpy(),
      requesterPublicAccount.address,
      new Mosaic(new MosaicId(wrpMosaicId), UInt64.fromUint(1)),
      network.type
    )
    aggTx.innerTransactions.push(RevokeWrpRequesterTransaction.toAggregate(systemPublicAccount))
  }

  // Workerの評価が良であればWRPを付与する
  if(workerJudgement == Evaluation.GOOD) {
    const sendWrpWorkerTransaction = TransferTransaction.create(
      Deadline.createEmtpy(),
      workerPublicAccount.address,
      [new Mosaic(new MosaicId(wrpMosaicId), UInt64.fromUint(1))],
      PlainMessage.create('Send WRP'),
      network.type
    )
    aggTx.innerTransactions.push(sendWrpWorkerTransaction.toAggregate(systemPublicAccount))

    // Workerの評価が良であればGuildPointをGuildに付与する
    const sendGuildPointTransaction = TransferTransaction.create(
      Deadline.createEmtpy(),
      guildOwnerPublicAccount.address,
      [new Mosaic(new MosaicId(guildPointMosaicId), UInt64.fromUint(1))],
      PlainMessage.create('Send Guild Point'),
      network.type
    )
    aggTx.innerTransactions.push(sendGuildPointTransaction.toAggregate(systemPublicAccount))
  // Workerの評価が悪であればWRPを没収する
  } else {
    const RevokeWrpWorkerTransaction = MosaicSupplyRevocationTransaction.create(
      Deadline.createEmtpy(),
      workerPublicAccount.address,
      new Mosaic(new MosaicId(wrpMosaicId), UInt64.fromUint(1)),
      network.type
    )
    aggTx.innerTransactions.push(RevokeWrpWorkerTransaction.toAggregate(systemPublicAccount))

    // Workerの評価が悪であればGuildPointをGuildから没収する
    const RevokeGuildPointTransaction = MosaicSupplyRevocationTransaction.create(
      Deadline.createEmtpy(),
      guildOwnerPublicAccount.address,
      new Mosaic(new MosaicId(guildPointMosaicId), UInt64.fromUint(1)),
      network.type
    )
    aggTx.innerTransactions.push(RevokeGuildPointTransaction.toAggregate(systemPublicAccount))
  }
  aggTx.setMaxFeeForAggregate(100, 1);
  // 作成完了したコントラクトを返却
  return aggTx;
};
