import { NetworkType } from 'symbol-sdk/dist/src/model/network/NetworkType';

declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: 'development' | 'production';
        API_BASE_URL?: string;
        NETWORK_TYPE?: NetworkType;
      }
    }
  }
}
