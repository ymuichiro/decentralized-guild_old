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
  public static verifyUser(public_key: string, token: string) {
    return this.apiClient.post<
      never,
      operations['verifyUser']['responses']['200']['content']['application/json'],
      operations['verifyUser']['requestBody']['content']['application/json']
    >('/user/verify', { public_key, token });
  }

  public static getUser(public_key: string) {
    const params: operations['getUser']['parameters']['query'] = {
      public_key,
    };
    return this.apiClient.get<
      never,
      operations['getUser']['responses']['200']['content']['application/json']
    >('/user', { params });
  }
}
