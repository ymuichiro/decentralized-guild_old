import { NetworkType } from 'symbol-sdk/dist/src/model/network/NetworkType';

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: 'development' | 'production';
        VITE_API_BASE_URL?: string;
        VITE_NETWORK_TYPE?: NetworkType;
        VITE_SYSTEM_PUBLICKEY?: string;
      }
    }
  }
}
