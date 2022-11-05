import {
  CosignatureTransaction,
  CosignatureSignedTransaction,
  SignedTransaction,
  AggregateTransaction,
  TransferTransaction,
  Account,
  NetworkType,
  PublicAccount,
  EncryptedMessage,
  RepositoryFactoryHttp,
  HashLockTransaction,
} from 'symbol-sdk';
import { filter, delay, mergeMap } from "rxjs";

export type VerifiedSss = {
  signerAddress: string;
  iat: number;
  verifierAddress: string;
  netWork: number;
};

export class System {
  static cosignateBySystem(signedTransaction: SignedTransaction): CosignatureSignedTransaction {
    try {
      const verify = this.verifyTransaction(signedTransaction);
      if (!verify) throw new Error('不正なトランザクションの可能性があります');
      const systemAccount = Account.createFromPrivateKey(process.env.SYSTEM_PRIVATEKEY!, signedTransaction.networkType);
      const cosignedSignedTransaction = CosignatureTransaction.signTransactionPayload(
        systemAccount,
        signedTransaction.payload,
        process.env.GENERATION_HASH!,
      );
      return cosignedSignedTransaction;
    } catch (e) {
      throw new Error((e as Error).stack);
    }
  }
  // 正しいトランザクションか検証する。もっとちゃんとしたほうがいいけどとりあえず。
  protected static verifyTransaction(signedTransaction: SignedTransaction) {
    const aggregateTransaction = AggregateTransaction.createFromPayload(signedTransaction.payload);
    const transferTransactions = aggregateTransaction.innerTransactions.filter((tx) => {
      return tx.type == 16724 && tx.signer?.publicKey == process.env.SYSTEM_PUBLICKEY;
    });
    const mosaicAmounts = transferTransactions.filter((tx) => {
      (tx as TransferTransaction).mosaics.filter((m) => {
        return m.amount.compact() > 1;
      });
    });
    if (mosaicAmounts.length > 1) return false;
    return true;
  }

  /**
   * 渡されたTokenをSystemアカウントにより復号し、署名が行えるか確認する
   */
  static verifyToken(userPublicKey: string, token: string, network: NetworkType): VerifiedSss {
    try {
      const userPublic = PublicAccount.createFromPublicKey(userPublicKey, network);
      const msg = new EncryptedMessage(token, userPublic);
      const verifier = Account.createFromPrivateKey(process.env.SYSTEM_PRIVATEKEY!, network);
      return JSON.parse(
        verifier.decryptMessage(msg, PublicAccount.createFromPublicKey(userPublicKey, network)).payload,
      ) as VerifiedSss;
    } catch (e) {
      console.error(e);
      throw new Error('署名検証に失敗しました');
    }
  }

  /**
   * アグリゲートボンデッドトランザクションのアナウンス
   */
   static announceAggregateBonded(
    signedAggTransactionPayload: string,
    signedHashLockTransactionPayload: string,
    node: string,
    networkType: NetworkType,
    generationHash: string
  ) {
    const generationHashArray = Array.prototype.slice.call(Buffer.from(generationHash, 'hex'), 0);
    const agg = AggregateTransaction.createFromPayload(signedAggTransactionPayload);
    const aggHash = AggregateTransaction.createTransactionHash(signedAggTransactionPayload, generationHashArray);
    if(!agg.signer) throw new Error('signer of aggregate transaction is undefined');
    const signedAggTransaction = new SignedTransaction(signedAggTransactionPayload, aggHash, agg.signer?.publicKey, agg.type, networkType);

    const hashlock = HashLockTransaction.createFromPayload(signedHashLockTransactionPayload);
    const hashlockHash = AggregateTransaction.createTransactionHash(signedHashLockTransactionPayload, generationHashArray);
    if(!hashlock.signer) throw new Error('signer of hashlock transaction is undefined');
    const signedHashLockTransaction = new SignedTransaction(signedHashLockTransactionPayload, hashlockHash, hashlock.signer?.publicKey, hashlock.type, networkType);

    const repositoryFactory = new RepositoryFactoryHttp(node);
    const listener = repositoryFactory.createListener();
    const transactionHttp = repositoryFactory.createTransactionRepository();
    const signer = PublicAccount.createFromPublicKey(
      signedHashLockTransaction.signerPublicKey,
      networkType
    );

    transactionHttp.announce(signedHashLockTransaction).subscribe({
      next: (x) => console.log(x),
      error: (err) => console.error(err),
    });

    listener.open().then(() => {
      console.log("listener open");
      listener.newBlock();
      listener
        .confirmed(signer.address)
        .pipe(
          filter((tx) => {
            return (
              tx.transactionInfo !== undefined &&
              tx.transactionInfo.hash === signedHashLockTransaction.hash
            );
          }),
          delay(5000),
          mergeMap((_) => {
            return transactionHttp.announceAggregateBonded(signedAggTransaction);
          })
        )
        .subscribe({
          next: (x) => {
            console.log("tx Ok!!!", x);
            listener.close();
          },
          error: (err) => {
            console.error(err);
            listener.close();
          },
        });
    });
  }
}
