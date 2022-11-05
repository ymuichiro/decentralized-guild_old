import { recievedQuestAggregateTransaction } from '../contracts/recievedQuestAggregateTransaction';
import { completeOrderTransaction } from '../contracts/completeOrderTransaction';
import { Network, NodeInfo } from '../models/Network';
import { SystemFee } from '../models/Tax';
import { Evaluation } from '../models/Quest';
import SystemService from './SystemService';
export default class QuestService extends SystemService {
  constructor() {
    super();
  }

  /**
   * クエストを登録する
   */
  public static async request() {
    // コントラクト不要。サーバーに登録するだけ
  }

  /**
   * クエストを受注する
   */
  public static async receivedQuest(
    contractId: string,
    requesterPublicKey: string,
    fee: SystemFee,
    node: NodeInfo,
    network: Network,
  ) {

    const workerAccount = this.getActivePublicAccount();
    const systemAccount = this.getSystemPublicAccount();
    const aggregateTransaction = recievedQuestAggregateTransaction(
      contractId,
      requesterPublicKey,
      workerAccount.publicKey,
      systemAccount.publicKey,
      fee.deposit,
      network,
    );

    // アグボンアナウンス --> ハッシュロック
    const signedTransaction = this.sendAggregateTransaction(
      aggregateTransaction,
      node,
      network,
    );

    // ここでDBのQuestを編集する --> API を用意しておくのでAPIを叩く想定で
    // ハッシュを登録しておくと後ほど検索に便利
    // insert...quest table, hash colom -> signedAggTransaction.hash
    // 書き方全然分からないのでこんなイメージでｗ
  }

  /**
   * クエストを完了する
   */
  public static async completeQuest(
    workerPublicKey: string,
    reward: number,
    requesterJudgement: Evaluation,
    workerJudgement: Evaluation,
    fee: SystemFee,
    node: NodeInfo,
    network: Network,
  ) {
    const aggregateTransaction = completeOrderTransaction(
      this.getActivePublicAccount().publicKey,
      workerPublicKey,
      this.getGuildOwnerPublicKey(),
      this.getSystemPublicAccount().publicKey,
      reward,
      this.getWrpMosaicId(),
      this.getGuildPointMosaicId(),
      requesterJudgement,
      workerJudgement,
      fee,
      network,
    );

    // アグボンアナウンス --> ハッシュロック
    const signedTransaction = await this.sign(aggregateTransaction);

    // ここでDBのQuestを編集する --> API を用意しておくのでAPIを叩く想定で
    // Questステータスを完了とする
  }
}
