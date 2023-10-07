import app from "./app";
import config from "./config/config";

const run = async () => {
  const server = app.listen(config.port, () => {
    console.log(`server running at port: ${config.port}`);
  });

  // close server gracefully
  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    if (server) {
      server.close(() => {
        console.log("server closed");
      });
    }
    process.exit(1);
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
};
run();
