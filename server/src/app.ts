import dotenv from "dotenv";
import express, { Application } from "express";
import session from "express-session";
import mountPassport from "./config/passport";
import mountRoutes from "./routes";
import { __prod__ } from "./utils/constants";

dotenv.config();

const buildApp = (): express.Application => {
  const app: Application = express();

  app.use(
    session({
      secret: process.env.SESSION_SECRET as string,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        signed: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        secure: __prod__,
      },
    })
  );

  mountRoutes(app);
  mountPassport(app);

  return app;
};

export default buildApp();
