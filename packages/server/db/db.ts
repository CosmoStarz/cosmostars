import dotenv from "dotenv";
import pino from "pino";
import { Sequelize } from "sequelize-typescript";

dotenv.config();

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST
} = process.env;
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
export const sequelize = new Sequelize(
  POSTGRES_DB ?? "db",
  POSTGRES_USER ?? "user",
  POSTGRES_PASSWORD ?? "password",
  {
    host: POSTGRES_HOST ?? "localhost",
    port: Number(POSTGRES_PORT ?? 5432),
    dialect: "postgres",
    models: [__dirname + "/models"],
    logging: sql => logger.info(sql)
  }
);
