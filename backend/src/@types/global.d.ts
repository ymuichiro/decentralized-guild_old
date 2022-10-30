declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV?: "development" | "production";
        DATABASE_HOST?: string;
        DATABASE_NAME?: string;
        DATABASE_USER_NAME?: string;
        DATABASE_USER_PASS?: string;
        DATABASE_TZ?: string;
        NETWORK_TYPE?: number;
      }
    }
  }
}

declare module 'express-async-errors';