import app from "./app";

const startServer = async (port: number) => {
  return app.listen(port, () => {
    console.info(`Server up on port ${port}`);
  });
};

const PORT = parseInt(process.env.PORT ?? "4000", 10);

startServer(PORT);
