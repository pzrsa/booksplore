import { DataSource } from "typeorm";
import { Account } from "../entities/Account";
import { Session } from "../entities/Session";
import { User } from "../entities/User";
import { __prod__ } from "../utils/constants";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: !__prod__,
  logging: !__prod__,
  entities: [Account, User, Session],
  migrations: ["../migrations/*.ts"],
  ssl: __prod__ ? { rejectUnauthorized: false } : undefined,
});
