import { operations } from '../@types/swagger';
import axios, { AxiosInstance } from 'axios';
import { SignedTransaction, NetworkType } from 'symbol-sdk';

export class ApiService {
  private static apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /** SSS を用いてユーザー情報が正しいか検証する */
  public static async verifyUser(body: operations['verifyUser']['requestBody']['content']['application/json']) {
    try {
      const res = await this.apiClient.post('/user/verify', body);
      return {
        ...res,
        ...res.data as operations['verifyUser']['responses']['200']['content']['application/json'],
      }
    } catch {
      throw new Error("サーバー側でのユーザー情報の検証に失敗しました");
    }
  }

  public static async getUser(params: operations['getUser']['parameters']['query']) {
    try {
      const res = await this.apiClient.get('/user', { params });
      return {
        ...res,
        ...res.data as operations['getUser']['responses']['200']['content']['application/json'],
      }
    } catch {
      throw new Error("ユーザー情報の取得に失敗しました。");
    }
  }

  /** ユーザー情報を登録する */
  public static async addUser(body: operations['addUser']['requestBody']['content']['application/json']) {
    try {
      const res = await this.apiClient.post('/user', body);
      return {
        ...res,
        ...res.data as operations['addUser']['responses']['200']['content']['application/json'],
      };
    } catch {
      throw new Error("ユーザー登録に失敗しました。やり直して下さい");
    }
  }

    /** クエストの詳細を取得する */
    public static async getQuest(params: operations["getQuest"]["parameters"]["query"]) {
      try {
        const res = await this.apiClient.get("/quest", {params});
        return {
          ...res,
          ...res.data as operations["getQuest"]["responses"]["200"]["content"]["application/json"],
        }
      } catch {
        throw new Error("サーバーへのクエスト登録に失敗しました。再度お試し下さい");
      }
    }

  /** 受注待ちのクエスト一覧を表示する */
  public static async getQuests() {
    try {
      const res = await this.apiClient.get("/quests");
      return {
        ...res,
        ...res.data as operations["getQuests"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーとの通信に失敗しました。再度お試しください");
    }
  }

  /** クエストを追加登録する */
  public static async addQuest(body: operations["addQuest"]["requestBody"]["content"]["application/json"]) {
    try {
      const res = await this.apiClient.post("/quest", body);
      return {
        ...res,
        ...res.data as operations["addQuest"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーへのクエスト登録に失敗しました。再度お試し下さい");
    }
  }

  /** クエストの登録内容を更新する */
  public static async updateQuest(body: operations["updateQuest"]["requestBody"]["content"]["application/json"]) {
    try {
      const res = await this.apiClient.put("/quest", body);
      return {
        ...res,
        ...res.data as operations["updateQuest"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーへのクエスト登録に失敗しました。再度お試し下さい");
    }
  }

  /** クエストの受注依頼の承認を登録する */
  public static async setQuestHash(body: operations["setQuestHash"]["requestBody"]["content"]["application/json"]) {
    try {
      const res = await this.apiClient.post("/quest/set-hash", body);
      return {
        ...res,
        ...res.data as operations["setQuestHash"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーへのクエスト登録に失敗しました。再度お試し下さい");
    }
  }
  /** クエストの詳細を取得する */
  public static async getGuildQuest(params: operations["getGuildQuest"]["parameters"]["query"]) {
    try {
      const res = await this.apiClient.get("/guild/quest", {params});
      return {
        ...res,
        ...res.data as operations["getGuildQuest"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーへのクエスト登録に失敗しました。再度お試し下さい");
    }
  }

  /** 受注待ちのクエスト一覧を表示する */
  public static async getGuildQuests() {
    try {
      const res = await this.apiClient.get("/guild/quests");
      return {
        ...res,
        ...res.data as operations["getGuildQuests"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーとの通信に失敗しました。再度お試しください");
    }
  }

  /** クエストを追加登録する */
  public static async addGuildQuest(body: operations["addGuildQuest"]["requestBody"]["content"]["application/json"]) {
    try {
      const res = await this.apiClient.post("/guild/quest", body);
      return {
        ...res,
        ...res.data as operations["addGuildQuest"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーへのクエスト登録に失敗しました。再度お試し下さい");
    }
  }

  /** ユーザーの通知情報を取得する */
  public static async getNotices(params:operations["getNotices"]["parameters"]["query"]){
    try {
      const res = await this.apiClient.post("/notices", params);
      return {
        ...res,
        ...res.data as operations["getNotices"]["responses"]["200"]["content"]["application/json"],
      }
    } catch {
      throw new Error("サーバーへのクエスト登録に失敗しました。再度お試し下さい");
    }
  }

  public static announceAggregateBonded(
    signedAggTransaction: SignedTransaction,
    signedHashLockTransaction: SignedTransaction,
    node: string,
    networkType: NetworkType
  ) {
    return this.apiClient.post<
    never,
    operations['announceAggregateBonded']['responses']['200']['content']['application/json'],
    operations['announceAggregateBonded']['requestBody']['content']['application/json']
  >('/announce-aggregate-bonded', {signedAggTransaction, signedHashLockTransaction, node, networkType})
  }
}
