import { Network } from '../models/Network';
import SystemService from './SystemService';
import { apiClient } from './ApiService';

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
      const token = await this.getActiveAccountToken();
      const publicKey = this.getActivePublicKey();

      const verifiedSss: VerifiedSss = 
        await (await apiClient.post('api/verify-token', {publicKey, token, network: network.type})).data;
      // 署名は正しいです
      console.log(verifiedSss);
      // とりあえず画像の①だけですが、DB触ると時間かかりそうなので一旦ここまでｗ
      // ②についてはRDBを確認するのか、ブロックチェーンを確認するのかが分からず
    } catch {
      // 署名は正しくありませんでした
    }
  }
}
