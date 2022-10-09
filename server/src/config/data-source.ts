import { DataSource } from "typeorm";
import { __prod__ } from "../utils/constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: !__prod__,
  logging: !__prod__,
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  ssl: __prod__ ? { rejectUnauthorized: false } : undefined,
});
