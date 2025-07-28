import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(
    __dirname,
    `../env/.env.${process.env.NODE_ENV || "development"}`
  ),
});

export const config = {
  mongoUri: (process.env.MONGO_URI as string) || "",
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV,
};
