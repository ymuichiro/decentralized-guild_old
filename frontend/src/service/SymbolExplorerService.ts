import { NetworkType } from 'symbol-sdk/dist/src/model/network';

/**
 * Symbol Explorer の URL を生成します
 */
export class SymbolExplorerService {
  static readonly TEST_NET = import.meta.env.VITE_SYMBOL_TESTNET_EXPLORER_URL;
  static readonly MAIN_NET = import.meta.env.VITE_SYMBOL_MAINNET_EXPLORER_URL;

  private static joinUrl(type: NetworkType, ...path: string[]): string {
    if (!this.MAIN_NET || !this.TEST_NET) {
      console.error(
        'システムエラー: エクスプローラーのURLが指定されていません',
      );
    }
    const base = type === NetworkType.MAIN_NET ? this.MAIN_NET : this.TEST_NET;
    const url = new URL(base);
    path.forEach((p) => {
      url.pathname = p;
    });
    return url.href;
  }

  /** get explorer url for transaction */
  static getUrlForTransaction(hash: string, type: NetworkType): string {
    return this.joinUrl(type, 'transactions', hash);
  }

  /** get explorer url for account */
  static getUrlForAccount(address: string, type: NetworkType): string {
    return this.joinUrl(type, 'accounts', address);
  }

  /** get explorer url for namespace */
  static getUrlForNamespace(id: string, type: NetworkType): string {
    return this.joinUrl(type, 'namespaces', id);
  }

  /** get explorer url for mosaic */
  static getUrlForMosaic(id: string, type: NetworkType): string {
    return this.joinUrl(type, 'mosaics', id);
  }

  /** get explorer url for block */
  static getUrlForBlock(height: string, type: NetworkType): string {
    return this.joinUrl(type, 'blocks', height);
  }
}
