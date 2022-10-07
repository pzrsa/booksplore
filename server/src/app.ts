import express from "express";
import mountRoutes from "./routes";

const buildApp = (): express.Application => {
  const app = express();

  mountRoutes(app);

  return app;
};

export default buildApp();
