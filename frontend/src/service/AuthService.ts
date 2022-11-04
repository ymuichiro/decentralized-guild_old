import { ApiService } from './ApiService';
import SystemService from './SystemService';

/**
 * システムの認証サービス
 */
export class AuthService extends SystemService {
  public static async login() {
    try {
      const token = await this.getActiveAccountToken();
      const publicKey = this.getActivePublicKey();
      return await ApiService.verifyUser(publicKey, token);
    } catch {
      throw new Error(
        '署名に失敗しました。やり直すか SSS の設定が正しいか確認下さい',
      );
    }
  }

  /** ユーザーの登録有無を確認する */
  public static async userRegistrationConfirmation() {
    const publicKey = this.getActivePublicKey();
    const user = await ApiService.getUser(publicKey);
    return user.data ? true : false;
  }
}
