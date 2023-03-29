import { Sequelize } from "sequelize-typescript";

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env;

export const sequelize = new Sequelize(
  POSTGRES_DB ?? "db",
  POSTGRES_USER ?? "user",
  POSTGRES_PASSWORD ?? "password",
  {
    host: POSTGRES_HOST ?? "localhost",
    port: Number(POSTGRES_PORT ?? 5432),
    dialect: "postgres",
  }
);
