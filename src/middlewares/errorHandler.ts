import { ErrorRequestHandler, RequestHandler } from "express";
import httpStatus from "http-status";
import { IErrorMessage } from "../interfaces/error";
import config from "../config/config";
import handleValidationError from "../errors/handleValidationError";
import ApiError from "../errors/apiError";
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
  let stack = config.env !== "Production" ? error.stack : undefined;
  if (error.name === "PrismaClientValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = error.message ? [{ path: "", message: error.message }] : [];
  }
  res.status(statusCode).send({
    success: false,
    message,
    errorMessages,
    stack,
  });
};

export const errorHandler = { routeNotFoundErrorHandler, globalErrorHandler };
