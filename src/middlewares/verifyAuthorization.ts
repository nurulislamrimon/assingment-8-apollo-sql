import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";

const verifyAuthorization = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const { role } = req.user;
      if (!roles.includes(role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Access forbidden!");
      }
    }
    next();
  };
};

export default verifyAuthorization;
