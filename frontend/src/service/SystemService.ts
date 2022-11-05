import { Account, PublicAccount } from 'symbol-sdk/dist/src/model/account';
import {
  getActiveAccountToken,
  getActivePublicKey,
  getActiveNetworkType,
  getActiveName,
  requestSign,
  requestSignWithCosignatories,
  setTransaction,
} from 'sss-module';
import {
  AggregateTransaction,
  SignedTransaction,
  Transaction,
  CosignatureSignedTransaction,
  TransactionType,
} from 'symbol-sdk/dist/src/model/transaction';
import { ApiService } from './ApiService'
import { TEST_DATA } from '../config';
import { announceAggregateBonded, announceTransaction } from '../contracts/announce';
import { hashLockTransaction } from '../contracts/hashLockTransaction';
import { Network, NodeInfo } from '../models/Network';
import { SystemFee } from '../models/Tax';

export default class SystemService {
  protected constructor() {}

  /**
   * システムアカウントのパブリックキーを取得します。
   */
  protected static getSystemPublicAccount() {
    if (import.meta.env.VITE_SYSTEM_PUBLICKEY) {
      return PublicAccount.createFromPublicKey(
        import.meta.env.VITE_SYSTEM_PUBLICKEY,
        getActiveNetworkType(),
      );
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
   * SSS に登録されているアカウントを取得します
   */
  public static getActivePublicAccount() {
    const publicKey = getActivePublicKey();
    const networkType = getActiveNetworkType();
    return PublicAccount.createFromPublicKey(publicKey, networkType);
  }

  /**
   * 現在のアカウントの名前を取得する
   */
  public static getActiveAccountNameFromSSS() {
    return getActiveName();
  }

  /**
   * 指定されたアカウントで署名 --> HashLock --> アナウンスを行う
   * 一旦以下では仮で固定のアカウントを利用
   * ハッシュロックも行う
   * Sign with the specified account.
   */
  protected static async sendAggregateTransaction(
    transaction: AggregateTransaction,
    node: NodeInfo,
    network: Network,
  ) {
    const singedTransaction = await this.sign(transaction);

    return await new Promise<SignedTransaction>((resolve) => {
      setTimeout(async () => {
        const hashlockTransaction = hashLockTransaction(
          singedTransaction,
          network,
        );

        // ハッシュロックトランザクションのSSSへのセット、署名
        const signedHashLockTransaction = await this.sign(hashlockTransaction);

        await announceAggregateBonded(
          singedTransaction,
          signedHashLockTransaction,
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
        const hashlockTransaction = hashLockTransaction(
          signedAggTransaction,
          network,
        );
        const signedHashLockTransaction = await this.sign(hashlockTransaction);

        await announceAggregateBonded(
          signedAggTransaction,
          signedHashLockTransaction,
        );
        resolve(signedHashLockTransaction);
      }, 1000);
    });
  }

  /**
   * システムの連署を自動的に取得し、アナウンスまで行う
   */
   protected static async sendWithCosigBySystemTransaction(
    signedTransaction: SignedTransaction,
    node: NodeInfo,
    network: Network,
  ) {
    const signature = (await ApiService.cosigBySystem(signedTransaction)).data;
    let signedPayload = signedTransaction.payload;
    const hash = 
      Transaction.createTransactionHash(
        signedPayload,
        Array.prototype.slice.call(Buffer.from(TEST_DATA.NETWORK.generationHash, 'hex'), 0)
    );
    const cosignSignedTxs = [
        new CosignatureSignedTransaction(hash, signature, SystemService.getSystemPublicAccount().publicKey)
    ];

    cosignSignedTxs.forEach((cosignedTx) => {
      signedPayload += cosignedTx.version.toHex() + cosignedTx.signerPublicKey + cosignedTx.signature;
    });

    const size = `00000000${(signedPayload.length / 2).toString(16)}`;
    const formatedSize = size.substring(size.length - 8, size.length - 8 + size.length);
    const littleEndianSize1 = formatedSize.substring(6, 8) + formatedSize.substring(4, 6) + formatedSize.substring(2, 4) + formatedSize.substring(0, 2);
    signedPayload = littleEndianSize1 + signedPayload.substring(8, signedPayload.length);
    const signedCompleteTransaction = new SignedTransaction(signedPayload, hash, signedTransaction.signerPublicKey, TransactionType.AGGREGATE_COMPLETE, network.type);
    announceTransaction(signedCompleteTransaction, node);
  }

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
