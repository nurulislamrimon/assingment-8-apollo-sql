import { NextFunction, Request, RequestHandler, Response } from "express";
import { categoryServices } from "./category.service";
import sendResponse from "../../shared/sendResponse";
import { Category } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryServices.createCategory(req.body);
  sendResponse<Category>(res, {
    statusCode: 200,
    success: true,
    message: "Category created successfully!",
    data: category,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const categories = await categoryServices.getAllCategories();
  sendResponse<Partial<Category[]> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Categories fetched successfully!",
    data: categories,
  });
});

const getACategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryServices.getACategory(req.params.id);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }
  sendResponse<Partial<Category> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Category fetched successfully!",
    data: category,
  });
});

const updateACategory = catchAsync(async (req: Request, res: Response) => {
  const Category = await categoryServices.getACategory(req.params.id);
  if (!Category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }
  const updatedData = await categoryServices.updateACategory(
    req.params.id,
    req.body
  );
  sendResponse<Partial<Category> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully!",
    data: updatedData,
  });
});

const deleteACategory = catchAsync(async (req: Request, res: Response) => {
  const Category = await categoryServices.getACategory(req.params.id);
  if (!Category) {
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!");
  }
  const updatedData = await categoryServices.deleteACategory(req.params.id);
  sendResponse<Partial<Category> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully!",
    data: updatedData,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategory,
  getACategory,
  updateACategory,
  deleteACategory,
};
