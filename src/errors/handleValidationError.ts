import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { IErrorResponse } from "../interfaces/error";

const handleValidationError = (
  error: PrismaClientValidationError
): IErrorResponse => {
  const statusCode = 400;
  const errorMessages = [
    {
      path: "",
      message: error.message,
    },
  ];
  return {
    statusCode,
    message: "validation error!",
    errorMessages,
  };
};

export default handleValidationError;
