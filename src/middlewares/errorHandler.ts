import { ErrorRequestHandler, RequestHandler } from "express";
import httpStatus from "http-status";
import { IErrorMessage } from "../interfaces/error";
const routeNotFoundErrorHandler: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
};
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessages: IErrorMessage[] = [];
  if (error instanceof Error) {
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  }
  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
  });
};

export const errorHandler = { routeNotFoundErrorHandler, globalErrorHandler };
