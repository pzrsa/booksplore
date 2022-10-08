import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import "./config/passport";
import mountPassport from "./config/passport";
import mountRoutes from "./routes";

dotenv.config();

const buildApp = (): express.Application => {
  const app = express();

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
      },
    })
  );

  mountRoutes(app);
  mountPassport(app);

  return app;
};

export default buildApp();
