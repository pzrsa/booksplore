import { DataSource } from "typeorm";
import { Account } from "../entities/Account";
import { User } from "../entities/User";
import { __prod__ } from "../utils/constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: !__prod__,
  logging: !__prod__,
  entities: [Account, User],
  migrations: ["../migrations/*.ts"],
  ssl: __prod__ ? { rejectUnauthorized: false } : undefined,
});
