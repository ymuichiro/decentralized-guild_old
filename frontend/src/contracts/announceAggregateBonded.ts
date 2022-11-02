import { RepositoryFactoryHttp } from "symbol-sdk/dist/src/infrastructure/RepositoryFactoryHttp";
import { PublicAccount } from "symbol-sdk/dist/src/model/account";
import { SignedTransaction } from "symbol-sdk/dist/src/model/transaction";
import { Network, NodeInfo } from "../models/Network";
import { filter, delay, mergeMap } from "rxjs";

/**
 * アグリゲートボンデッドトランザクションをアナウンスする
 */
export const announceAggregateBonded = async function (
  signedAggTransaction: SignedTransaction,
  signedHashLockTransaction: SignedTransaction,
  nodeInfo: NodeInfo,
  network: Network
) {
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
};
