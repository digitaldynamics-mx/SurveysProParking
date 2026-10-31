/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ADMIN_PASSWORD: string;
  readonly DATABASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
