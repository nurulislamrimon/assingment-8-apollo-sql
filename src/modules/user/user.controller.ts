import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getAllUser();
  sendResponse<Partial<User>[]>(res, {
    statusCode: 200,
    success: true,
    message: "Users retrived successfully!",
    data: users,
  });
});

export const userControllers = {
  getAllUser,
};
