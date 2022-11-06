declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: 'development' | 'production';
        MYSQL_DATABASE?: string;
        MYSQL_USER?: string;
        MYSQL_PASSWORD?: string;
        DATABASE_HOST?: string;
        TZ?: string;
        PORT?: string;
        NETWORK_TYPE?: string;
        SYSTEM_PUBLICKEY?: string;
        GENERATION_HASH?: string;
        NODE?: string;
      }
    }
  }
}

declare module 'express-async-errors';
