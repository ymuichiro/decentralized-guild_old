import { joinGuildAggregateTransaction } from '../contracts/joinGuildAggregateTransaction';
import { establishGuildTransaction } from '../contracts/establishGuildTransaction';
import { Network, NodeInfo } from '../models/Network';
import SystemService from './SystemService';

/**
 * ギルド関連のサービス
 * Services for applicants who are not guild owners
 */
export default class GuildService extends SystemService {
  constructor() {
    super();
  }

  /**
   * ギルドユーザーよりギルドオーナーへ参加リクエストを行う（Request to join the guild owner）
   * 1. Worker のブラウザ内で本関数を呼び出し
   * 2. ギルドモザイク送付のアグリゲートボンデッドトランザクションを作成 --> アナウンス
   * 3. サーバー側へ処理結果を共有。ギルドオーナーへシステム上の通知を発行
   */
  public static async joinRequest(
    guildOwnerPublicKey: string,
    guildMosaicId: string,
    node: NodeInfo,
    network: Network,
  ) {
    const systemFees = await this.getSystemFees();
    const applicantPublicKey = this.getActivePublicKey();
    const contract = await joinGuildAggregateTransaction(
      applicantPublicKey,
      guildOwnerPublicKey,
      guildMosaicId,
      systemFees,
      network,
    );
    return await this.sendAggregateTransaction(contract, node, network);
  }

  /**
   * ギルドオーナー希望者によるギルドの作成
   */
  public static async establishGuild(
    guildOwnerPublicKey: string,
    guildMosaicId: string,
    guildOwnerMosaicIdsMetadataKey: string,
    mosaicSupplyAmount: number,
    network: Network,
  ) {
    const applicantPublicKey = this.getActivePublicKey();
    const systemPublicKey = this.getSystemPublicKey();
    // 一旦認識合わせ後
    // await establishGuildTransaction();
    // await this.sendToCosigTransaction();
  }
}
