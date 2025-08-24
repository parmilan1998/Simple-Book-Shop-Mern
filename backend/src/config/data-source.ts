import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "../entities/book-entity";
import config from "../config/env";
import { User } from "../entities/user.entity";
import { RefreshToken } from "../entities/refreshToken";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL as string,
  synchronize: (config.NODE_ENV as string) === "development",
  logging: (config.NODE_ENV as string) === "development",
  entities: [Book, User, RefreshToken],
});
