import { EncryptedMessage, PublicAccount, Account } from 'symbol-sdk';
import { Network } from '../models/Network';
import SystemService from './SystemService';

export type VerifiedSss = {
  signerAddress: string;
  iat: number;
  verifierAddress: string;
  netWork: number;
};

/**
 * システムの認証サービス
 */
export class AuthService extends SystemService {
  public static async login(network: Network) {
    try {
      // 本番フロント用
      const token = await this.getActiveAccountToken();
      const publicKey = this.getActivePublicKey();

      const verified = await AuthService.auth(publicKey, token, network);

      // 署名は正しいです
      console.log(verified);
      // とりあえず画像の①だけですが、DB触ると時間かかりそうなので一旦ここまでｗ
      // ②についてはRDBを確認するのか、ブロックチェーンを確認するのかが分からず
    } catch {
      // 署名は正しくありませんでした
    }
  }

  /**
   * 渡されたTokenをSSSExtentionにより復号し、署名が行えるか確認する
   */
  private static async auth(
    userPublicKey: string,
    token: string,
    network: Network,
  ): Promise<VerifiedSss> {
    try {
      const userPublic = PublicAccount.createFromPublicKey(
        userPublicKey,
        network.type,
      );
      const msg = new EncryptedMessage(token, userPublic);
      const verifier = Account.createFromPrivateKey(
        process.env.VERIFIER_PRIVATE_KEY!,
        network.type,
      );
      return JSON.parse(
        verifier.decryptMessage(
          msg,
          PublicAccount.createFromPublicKey(userPublicKey, network.type),
        ).payload,
      ) as VerifiedSss;
    } catch {
      throw new Error('署名検証に失敗しました');
    }
  }
}
