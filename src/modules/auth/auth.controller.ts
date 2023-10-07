import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./auth.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";

const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.signup(req.body);
  sendResponse<Partial<User>>(res, {
    success: true,
    statusCode: 200,
    message: "User created successfully!",
    data: user,
  });
});

export const userControllers = {
  signup,
};
