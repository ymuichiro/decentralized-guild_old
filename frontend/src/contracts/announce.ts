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
) {
  try {
    const result = await ApiService.announceAggregateBonded(
      signedAggTransaction,
      signedHashLockTransaction,
    )
    console.log(result);
  } catch {
    throw new Error('アナウンスに失敗しました');
  }
};
