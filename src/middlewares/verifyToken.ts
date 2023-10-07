import { RequestHandler } from "express";
import ApiError from "../errors/apiError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";

const verifyToken: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const verifiedUser = jwt.verify(
      token,
      config.accessTokenSecret
    ) as JwtPayload;

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken;
