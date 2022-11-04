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
        PORT?: number;
        NETWORK_TYPE?: number;
        SYSTEM_PUBLICKEY?: string;
      }
    }
  }
}

declare module 'express-async-errors';
