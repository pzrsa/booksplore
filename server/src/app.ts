import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import "./config/passport";
import mountPassport from "./config/passport";
import mountRoutes from "./routes";

dotenv.config();

const buildApp = (): express.Application => {
  const app = express();

  app.use(session({ secret: "lol", resave: true, saveUninitialized: true }));

  mountRoutes(app);
  mountPassport(app);

  return app;
};

export default buildApp();
