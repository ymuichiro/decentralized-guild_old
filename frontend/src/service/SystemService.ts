import { getActivePublicKey } from 'sss-module';
import { Account } from 'symbol-sdk/dist/src/model/account';
import { TEST_DATA } from '../config';
import { announceAggregateBonded } from '../contracts/announceAggregateBonded';
import { createJoinHashLockTransaction } from '../contracts/createJoinHashLockTransaction';
import { Network, NodeInfo } from '../models/Network';
import { SystemFee } from '../models/Tax';
import {
  AggregateTransaction,
  SignedTransaction,
  Transaction,
} from 'symbol-sdk/dist/src/model/transaction';

export default class SystemService {
  protected constructor() {}

  /**
   * システムアカウントのパブリックキーを取得します。
   */
  protected static getSystemPublicKey(): string {
    if (process.env.SYSTEM_PUBLIC_KEY) {
      return process.env.SYSTEM_PUBLIC_KEY;
    }
    throw new Error(
      'System Error: `process.env.SYSTEM_PUBLIC_KEY` is not defined.',
    );
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
   * SSS よりトークンを取得する
   */
  protected static async getActiveAccountToken(): Promise<string> {
    // if(process.env.NODE_ENV === "production"){ // TODO: 別途実装
    // return await getActiveAccountToken("TEST_DATA.SYSTEM.KEY.PUBLIC");
    // }else {
    return TEST_DATA.AUTH.TOKEN;
    // }
  }

  /**
   * Get the public key of the account registered with the SSS.
   * SSS に登録されているアカウントの公開鍵を取得します。
   */
  protected static getActivePublicKey() {
    if (process.env.NODE_ENV === 'production') {
      return getActivePublicKey();
    } else {
      return TEST_DATA.WORKER.KEY.PUBLIC;
    }
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
    // if (process.env.NODE_ENV === "production") {
    // TODO: どうやって該当のアカウントを取得する？署名する？
    // } else {
    const applicantAccount = Account.createFromPrivateKey(
      TEST_DATA.WORKER.KEY.PRIVATE,
      network.type,
    );
    const singedTransaction = applicantAccount.sign(
      transaction,
      network.generationHash,
    );

    return await new Promise<SignedTransaction>((resolve) => {
      setTimeout(async () => {
        const hashlockTransaction = await createJoinHashLockTransaction(
          singedTransaction,
          network,
        );

        // 本番フロント用
        //setTransaction(hashlockTransaction);
        //const signedHashLockTransaction = await requestSign();

        // テスト用
        const signedHashLockTransaction = applicantAccount.sign(
          hashlockTransaction,
          network.generationHash,
        );
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
   * マルチシグ向け。アナウンスまで行う
   */
  protected static async sendToCosigTransaction(
    transaction: AggregateTransaction,
    guildOwnerPrivateKey: string,
    node: NodeInfo,
    network: Network,
  ) {
    const establisher = Account.createFromPrivateKey(
      TEST_DATA.WORKER.KEY.PRIVATE,
      network.type,
    );
    const guildOwner = Account.createFromPrivateKey(
      guildOwnerPrivateKey,
      network.type,
    );
    const signedAggTransaction = establisher.signTransactionWithCosignatories(
      transaction,
      [guildOwner],
      network.generationHash,
    );

    // アグボンはハッシュロックも署名が必要なため二度SSSで署名が必要。少しラグを設けないとバグるためのsetTimeout
    return await new Promise<SignedTransaction>((resolve) => {
      setTimeout(async () => {
        const hashlockTransaction = await createJoinHashLockTransaction(
          signedAggTransaction,
          network,
        );
        // 本番フロント用
        //setTransaction(hashlockTransaction);
        //const signedHashLockTransaction = await requestSign();

        // テスト用
        const signedHashLockTransaction = establisher.sign(
          hashlockTransaction,
          network.generationHash,
        );
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
}
