import {
  getActiveAccountToken,
  getActivePublicKey,
  requestSign,
  requestSignWithCosignatories,
  setTransaction,
} from 'sss-module';
import { Account } from 'symbol-sdk/dist/src/model/account';
import {
  AggregateTransaction,
  AggregateTransactionCosignature,
  CosignatureSignedTransaction,
  SignedTransaction,
  Transaction,
  TransactionType,
} from 'symbol-sdk/dist/src/model/transaction';
import { TEST_DATA } from '../config';
import { announceAggregateBonded } from '../contracts/announce';
import { hashLockTransaction } from '../contracts/hashLockTransaction';
import { Network, NodeInfo } from '../models/Network';
import { SystemFee } from '../models/Tax';
import { ApiService } from './ApiService';

export default class SystemService {
  protected constructor() {}

  /**
   * システムアカウントのパブリックキーを取得します。
   */
  protected static getSystemPublicKey(): string {
    if (import.meta.env.VITE_SYSTEM_PUBLICKEY) {
      return import.meta.env.VITE_SYSTEM_PUBLICKEY;
    }
    throw new Error('System Error: `VITE_SYSTEM_PUBLICKEY` is not defined.');
  }

  /**
   * ギルドオーナーアカウントのパブリックキーを取得します。
   */
  protected static getGuildOwnerPublicKey(): string {
    return TEST_DATA.GUILD_OWNER.KEY.PUBLIC;
  }

  /**
   * システム手数料を取得する。本番環境の場合、システムより徴収する
   */
  protected static async getSystemFees(): Promise<SystemFee> {
    // if (process.env.NODE_ENV === "production") {
    // TODO: 実装
    // } else {
    return TEST_DATA.FEE;
    // }
  }

  /**
   * WRPモザイクIDを取得する。
   */
  protected static getWrpMosaicId(): string {
    return TEST_DATA.SYSTEM.WRP_MOSAIC_ID;
  }

  /**
   * ギルドポイントモザイクIDを取得する。
   */
  protected static getGuildPointMosaicId(): string {
    return TEST_DATA.SYSTEM.GUILD_POINT_MOSAIC_ID;
  }

  /**
   * SSS よりトークンを取得する
   */
  protected static async getActiveAccountToken(): Promise<string> {
    if (import.meta.env.VITE_SYSTEM_PUBLICKEY) {
      return await getActiveAccountToken(import.meta.env.VITE_SYSTEM_PUBLICKEY);
    }
    throw new Error('System Error: `VITE_SYSTEM_PUBLICKEY` is not defined.');
  }

  /**
   * Get the public key of the account registered with the SSS.
   * SSS に登録されているアカウントの公開鍵を取得します。
   */
  protected static getActivePublicKey() {
    return getActivePublicKey();
  }

  /**
   * 指定されたアカウントで署名 --> HashLock --> アナウンスを行う
   * 一旦以下では仮で固定のアカウントを利用
   * ハッシュロックも行う
   * Sign with the specified account.
   */
  protected static async sendAggregateTransaction(
    transaction: Transaction,
    node: NodeInfo,
    network: Network,
  ) {
    // アグリゲートトランザクションのSSSへのセット、署名
    setTransaction(transaction);
    const singedTransaction = await requestSign();

    return await new Promise<SignedTransaction>((resolve) => {
      setTimeout(async () => {
        const hashlockTransaction = await hashLockTransaction(
          singedTransaction,
          network,
        );

        // ハッシュロックトランザクションのSSSへのセット、署名
        setTransaction(hashlockTransaction);
        const signedHashLockTransaction = await requestSign();

        await announceAggregateBonded(
          singedTransaction,
          signedHashLockTransaction,
          node,
          network,
        );
        resolve(signedHashLockTransaction);
      }, 1000);
    });
  }

  /**
   * 連署者のアカウントを取得可能時に利用。アナウンスまで行う
   */
  protected static async sendWithCosigTransaction(
    transaction: AggregateTransaction,
    cosignature: Account,
    node: NodeInfo,
    network: Network,
  ) {
    setTransaction(transaction);
    const signedAggTransaction = await requestSignWithCosignatories([
      cosignature,
    ]);

    // アグボンはハッシュロックも署名が必要なため二度SSSで署名が必要。少しラグを設けないとバグるためのsetTimeout
    return await new Promise<SignedTransaction>((resolve) => {
      setTimeout(async () => {
        const hashlockTransaction = await hashLockTransaction(
          signedAggTransaction,
          network,
        );
        setTransaction(hashlockTransaction);
        const signedHashLockTransaction = await requestSign();

        await announceAggregateBonded(
          signedAggTransaction,
          signedHashLockTransaction,
          node,
          network,
        );
        resolve(signedHashLockTransaction);
      }, 1000);
    });
  }

  /**
   * システムの連署を自動的に取得し、アナウンスまで行う
   */

  /*
   protected static async sendWithCosigBySystemTransaction(
    signedTransaction: SignedTransaction,
    node: NodeInfo,
    network: Network,
  ) {
    const cosignatureSignedTransaction: CosignatureSignedTransaction = 
      await (await apiClient.post('api/cosig', {signedTransaction: signedTransaction})).data;
    const signedAggregateTransactionNotComplete = AggregateTransaction.createFromPayload(signedTransaction.payload);
    const aggregateTransactionCosignature = 
      new AggregateTransactionCosignature(
        cosignatureSignedTransaction.signature,
        PublicAccount.createFromPublicKey(cosignatureSignedTransaction.signerPublicKey, signedAggregateTransactionNotComplete.networkType)
      );
    const completeAggregate = signedAggregateTransactionNotComplete.addCosignatures([aggregateTransactionCosignature]);
    const hash = 
      Transaction.createTransactionHash(
        completeAggregate.serialize(),
        Array.prototype.slice.call(Buffer.from(TEST_DATA.NETWORK.generationHash, 'hex'), 0)
      );
    const signedCompleteTransaction = new SignedTransaction(completeAggregate.serialize(), hash, signedTransaction.signerPublicKey, TransactionType.AGGREGATE_COMPLETE, network.type);
    announceTransaction(signedCompleteTransaction, node);
  }
*/

  /**
   * トランザクションにSSSで署名し、SignedTransactionを返す
   */
  protected static async sign(
    transaction: Transaction,
  ): Promise<SignedTransaction> {
    setTransaction(transaction);
    return await requestSign();
  }
}
