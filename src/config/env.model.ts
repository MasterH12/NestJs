export interface Env {
  PORT: number;
  ENV: string;
  JWT_SECRET: string;
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_DB: string;
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
  OPEN_API_KEY: string;
}
