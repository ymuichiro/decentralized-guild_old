/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_NETWORK_TYPE: string;
  readonly VITE_SYSTEM_PUBLICKEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
