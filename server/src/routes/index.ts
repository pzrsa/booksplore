import { Application } from "express";
import users from "./users";

const APP_START_TIME = Date.now();
const API_ROUTES = {
  "/users": users,
};

const mountRoutes = (app: Application) => {
  app.get("/", async (_, res) => {
    res.json({ message: "ok", uptime: Date.now() - APP_START_TIME });
  });

  for (const [route, router] of Object.entries(API_ROUTES)) {
    app.use(route, router);
  }
};

export default mountRoutes;
