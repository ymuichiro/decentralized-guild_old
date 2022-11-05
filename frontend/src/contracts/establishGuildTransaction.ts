import { Convert, KeyGenerator } from "symbol-sdk/dist/src/core/format";
import { Account, PublicAccount } from "symbol-sdk/dist/src/model/account";
import { PlainMessage } from "symbol-sdk/dist/src/model/message";
import {
  Mosaic,
  MosaicFlags,
  MosaicId,
  MosaicNonce,
  MosaicSupplyChangeAction,
} from "symbol-sdk/dist/src/model/mosaic";
import {
  AccountMetadataTransaction,
  AggregateTransaction,
  Deadline,
  MosaicDefinitionTransaction,
  MosaicSupplyChangeTransaction,
  MultisigAccountModificationTransaction,
  TransferTransaction,
} from "symbol-sdk/dist/src/model/transaction";
import { UInt64 } from "symbol-sdk/dist/src/model/UInt64";
import { Network } from "../models/Network";

/**
 * ギルドを新規に設立する
 * @param guildOwnerPublicKey
 * @param systemPublicKey
 * @param guildMosaicId
 * @param guildOwnerMosaicIdsMetadataKey
 * @param mosaicSupplyAmount
 * @param network
 * @returns
 */
export const establishGuildTransaction = function (
  guildOwnerPublicKey: string,
  //systemPublicKey: string,
  //guildMosaicId: string,
  //guildOwnerMosaicIdsMetadataKey: string,
  mosaicSupplyAmount: number,
  network: Network
) {
  const guildMasterPubAcc = PublicAccount.createFromPublicKey(
    guildOwnerPublicKey,
    network.type
  );
  const guildOwnerAcc = Account.generateNewAccount(network.type);

  /*
  ハッカソンでは不要
  const systemPubAcc = PublicAccount.createFromPublicKey(
    systemPublicKey,
    network.type
  );
  */

  const multisigTransaction = MultisigAccountModificationTransaction.create(
    Deadline.createEmtpy(),
    1,
    1,
    [guildMasterPubAcc.address],
    [],
    network.type
  );
  const mosaicFeeTransaction = TransferTransaction.create(
    Deadline.createEmtpy(),
    guildOwnerAcc.address,
    [
      new Mosaic(
        new MosaicId(network.currencyMosaicId),
        UInt64.fromUint(100000000)
      ),
    ],
    PlainMessage.create("transfer create mosaic fee"),
    network.type
  );

  const nonce1 = MosaicNonce.createRandom();
  const mosaicId1 = MosaicId.createFromNonce(nonce1, guildOwnerAcc.address);
  const mosaicDefinitionTransaction1 = MosaicDefinitionTransaction.create(
    Deadline.createEmtpy(),
    nonce1,
    mosaicId1,
    MosaicFlags.create(false, false, true, true),
    0,
    UInt64.fromUint(0),
    network.type
  );
  const mosaicSupplyChangeTransaction1 = MosaicSupplyChangeTransaction.create(
    Deadline.createEmtpy(),
    mosaicDefinitionTransaction1.mosaicId,
    MosaicSupplyChangeAction.Increase,
    UInt64.fromUint(mosaicSupplyAmount * Math.pow(10, 0)),
    network.type
  );

  /*
  上位モザイクはハッカソンでは不要
  const nonce2 = MosaicNonce.createRandom();
  const mosaicId2 = MosaicId.createFromNonce(nonce2, guildOwnerAcc.address);
  const mosaicDefinitionTransaction2 = MosaicDefinitionTransaction.create(
    Deadline.createEmtpy(),
    nonce2,
    mosaicId2,
    MosaicFlags.create(false, true, true, false),
    0,
    UInt64.fromUint(0),
    network.type
  );
  const mosaicSupplyChangeTransaction2 = MosaicSupplyChangeTransaction.create(
    Deadline.createEmtpy(),
    mosaicDefinitionTransaction2.mosaicId,
    MosaicSupplyChangeAction.Increase,
    UInt64.fromUint(mosaicSupplyAmount * Math.pow(10, 0)),
    network.type
  );
  
  ひとまずギルドオーナー判別用モザイクは無し
  const guildMosaicTransaction = TransferTransaction.create(
    Deadline.createEmtpy(),
    guildOwnerAcc.address,
    [new Mosaic(new MosaicId(guildMosaicId), UInt64.fromUint(1))],
    PlainMessage.create("transfer guild mosaic"),
    network.type
  );
  
  同じくメタデータも不要、今後要検討。
  const value = mosaicId1.toHex() + "," + mosaicId2.toHex();
  const metadataTransaction = AccountMetadataTransaction.create(
    Deadline.createEmtpy(),
    guildOwnerAcc.address,
    KeyGenerator.generateUInt64Key(guildOwnerMosaicIdsMetadataKey),
    value.length,
    Convert.utf8ToUint8(value),
    network.type
  );
  */

  /*
  今はコンプリートだけどハッカソンが終わればボンデッド
  const aggregateTransaction = AggregateTransaction.createBonded(
  */
  const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(network.epochAdjustment),
    [
      multisigTransaction.toAggregate(guildOwnerAcc.publicAccount),
      mosaicFeeTransaction.toAggregate(guildMasterPubAcc),
      mosaicDefinitionTransaction1.toAggregate(guildOwnerAcc.publicAccount),
      mosaicSupplyChangeTransaction1.toAggregate(guildOwnerAcc.publicAccount),
    ],
    network.type,
    []
  ).setMaxFeeForAggregate(100, 1);

  const result = {
    aggregateTransaction,
    guildOwnerAcc,
  };
  return result;
};
