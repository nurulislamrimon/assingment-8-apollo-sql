import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import { User } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getAllUser();
  sendResponse<Partial<User>[]>(res, {
    statusCode: 200,
    success: true,
    message: "Users retrived successfully!",
    data: users,
  });
});
const getAUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.getAUser(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  sendResponse<Partial<User> | null>(res, {
    statusCode: 200,
    success: true,
    message: "User getched successfully!",
    data: user,
  });
});
const updateAUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.getAUser(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  const updatedData = await userServices.updateAUser(req.params.id, req.body);
  sendResponse<Partial<User> | null>(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully!",
    data: updatedData,
  });
});
const deleteAUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userServices.getAUser(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  const updatedData = await userServices.deleteAUser(req.params.id);
  sendResponse<Partial<User> | null>(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully!",
    data: updatedData,
  });
});

export const userControllers = {
  getAllUser,
  getAUser,
  updateAUser,
  deleteAUser,
};
