import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send({
    success: true,
    data: "Welcome to book catallog server!",
  });
});
// app.use("/api/v1");

// not found route error handler
app.use(errorHandler.routeNotFoundErrorHandler);
// global error handler
app.use(errorHandler.globalErrorHandler);

export default app;
