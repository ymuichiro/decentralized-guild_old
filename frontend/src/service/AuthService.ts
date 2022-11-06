import { ApiService } from './ApiService';
import SystemService from './SystemService';

/**
 * システムの認証サービス
 */
export class AuthService extends SystemService {
  public static async login() {
    try {
      const token = await this.getActiveAccountToken();
      const { publicKey: public_key } = this.getActivePublicAccount();
      return await ApiService.verifyUser({ public_key, token });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err);
        console.error(err.message);
      }
      throw new Error(
        '署名に失敗しました。やり直すか SSS の設定が正しいか確認下さい',
      );
    }
  }

  public static async getUser() {
    const account = this.getActivePublicAccount();
    return await ApiService.getUser({ public_key: account.publicKey });
  }
}
