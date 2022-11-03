import { PublicAccount } from "symbol-sdk/dist/src/model/account";
import { Network } from "../models/Network";
import { Mosaic, MosaicId } from "symbol-sdk/dist/src/model/mosaic";
import { UInt64 } from "symbol-sdk/dist/src/model/UInt64";
import { PlainMessage } from "symbol-sdk/dist/src/model/message";
import { SystemFee } from "../models/Tax";
import {
  AggregateTransaction,
  Deadline,
  TransferTransaction,
} from "symbol-sdk/dist/src/model/transaction";

/**
 * ギルド参加申請を行う際のコントラクト
 * モザイクIDは下位ギルドモザイクトークンを指定する
 */
export const joinGuildAggregateTransaction = async function (
  applicantPublicKey: string,
  guildOwnerPublicKey: string,
  lowGuildMosaicId: string,
  systemFee: SystemFee,
  network: Network
): Promise<AggregateTransaction> {
  /*
    コントラクト作成
  */
  const applicantPublicAccount = PublicAccount.createFromPublicKey(
    applicantPublicKey,
    network.type
  );
  const ownerPublicAccount = PublicAccount.createFromPublicKey(
    guildOwnerPublicKey,
    network.type
  );

  // Guild Owner --> 下位ギルドモザイクトークン Worker
  const guildMosaicTransfer = TransferTransaction.create(
    Deadline.createEmtpy(),
    applicantPublicAccount.address,
    [new Mosaic(new MosaicId(lowGuildMosaicId), UInt64.fromUint(1))],
    PlainMessage.create("give guild mosaic"),
    network.type
  );

  // TODO: これ何か用確認
  const dummy = TransferTransaction.create(
    Deadline.createEmtpy(),
    ownerPublicAccount.address,
    [],
    PlainMessage.create("applicant"),
    network.type
  );

  // アグリゲートボンデッドトランザクションを作成する
  let aggTx = AggregateTransaction.createBonded(
    Deadline.create(network.epochAdjustment),
    [
      guildMosaicTransfer.toAggregate(ownerPublicAccount),
      dummy.toAggregate(applicantPublicAccount),
    ],
    network.type,
    []
  ).setMaxFeeForAggregate(100, 1);

  // システムが徴収する手数料を作成する
  if (systemFee.createAccount !== 0) {
    const taxTx = TransferTransaction.create(
      Deadline.createEmtpy(),
      ownerPublicAccount.address,
      [
        new Mosaic(
          new MosaicId(network.currencyMosaicId),
          UInt64.fromUint(systemFee.createAccount)
        ),
      ],
      PlainMessage.create("Create Account Fee"),
      network.type
    );
    aggTx.innerTransactions.push(taxTx.toAggregate(applicantPublicAccount));
    aggTx = aggTx.setMaxFeeForAggregate(100, 1);
  }

  // 作成完了したコントラクトを返却
  return aggTx;
};
