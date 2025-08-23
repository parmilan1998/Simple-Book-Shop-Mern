import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });

const config: any = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,

  DATABASE_HOST: process.env.DB_HOST,
  DATABASE_PORT: process.env.DB_PORT,
  DATABASE_USER: process.env.DB_USER,
  DB_PASSWORD: String(process.env.DB_PASSWORD),
  DATABASE_NAME: process.env.DB_NAME,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
};

export default config;
