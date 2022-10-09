import app from "./app";
import { AppDataSource } from "./config/data-source";

const startServer = async (port: number) => {
  await AppDataSource.initialize();

  return app.listen(port, () => {
    console.info(`Server up on port ${port}`);
  });
};

const PORT = parseInt(process.env.PORT ?? "4000", 10);

startServer(PORT);
