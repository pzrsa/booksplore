import express from "express";
import users from "./routes/users";

const API_ROUTES = {
  "/users": users,
};

const buildApp = (): express.Application => {
  const app = express();

  for (const [route, router] of Object.entries(API_ROUTES)) {
    app.use(route, router);
  }

  return app;
};

export default buildApp();
