import { Request, Response } from "express";
import { userServices } from "./auth.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import generateToken from "../../shared/generateToken";

const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.signup(req.body);
  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: 200,
    message: "User created successfully!",
    data: user,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const isUserExist = await userServices.getUserByEmail(email);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  const isPasswordMatched = await userServices.isPasswordMatched(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "User or password doesn't matched!"
    );
  }

  const accessToken = generateToken(isUserExist);

  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: 200,
    message: "User signin successfully!",
    token: accessToken,
  });
});

export const userControllers = {
  signup,
  login,
};
