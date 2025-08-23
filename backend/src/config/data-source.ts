import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "../entities/book-entity";
import config from "../config/env";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: config.DATABASE_URL,
  synchronize: config.NODE_ENV === "development",
  logging: config.NODE_ENV === "development",
  entities: [Book],
});
