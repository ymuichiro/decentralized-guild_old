import { RepositoryFactoryHttp } from "symbol-sdk/dist/src/infrastructure/RepositoryFactoryHttp";
import { SignedTransaction } from "symbol-sdk/dist/src/model/transaction";
import { Network, NodeInfo } from "../models/Network";
import { ApiService } from '../service/ApiService';

/**
 * トランザクションをアナウンスする
 */
export const announceTransaction = async function (
  signedTransaction: SignedTransaction,
  nodeInfo: NodeInfo,
) {
  const repositoryFactory = new RepositoryFactoryHttp(nodeInfo.url);
  const transactionHttp = repositoryFactory.createTransactionRepository();
  transactionHttp.announce(signedTransaction).subscribe({
    next: (x) => console.log(x),
    error: (err) => console.error(err),
  });
};

/**
 * アグリゲートボンデッドトランザクションをアナウンスする
 */
export const announceAggregateBonded = async function (
  signedAggTransaction: SignedTransaction,
  signedHashLockTransaction: SignedTransaction,
  nodeInfo: NodeInfo,
  network: Network
) {
  try {
    const result = await ApiService.announceAggregateBonded(
      signedAggTransaction,
      signedHashLockTransaction,
      nodeInfo.url,
      network.type,
    )
    console.log(result);
  } catch {
    throw new Error('アナウンスに失敗しました');
  }
  /*
  const repositoryFactory = new RepositoryFactoryHttp(nodeInfo.url);
  const listener = repositoryFactory.createListener();
  const transactionHttp = repositoryFactory.createTransactionRepository();
  const signer = PublicAccount.createFromPublicKey(
    signedHashLockTransaction.signerPublicKey,
    network.type
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
          console.log(tx);
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
  */
};
