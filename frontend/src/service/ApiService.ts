import { operations } from '../@types/swagger';
import axios, { AxiosInstance } from 'axios';

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
      throw new Error ("サーバー側でのユーザー情報の検証に失敗しました");
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
}
