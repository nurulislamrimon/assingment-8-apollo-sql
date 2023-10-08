import { Request, Response } from "express";
import { BookServices } from "./book.service";
import sendResponse from "../../shared/sendResponse";
import { Book } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import pick from "../../shared/pick";
import { bookFilterableFields } from "./book.constants";
import { paginationOptions } from "../../shared/constants";

const createBook = catchAsync(async (req: Request, res: Response) => {
  const Book = await BookServices.createBook(req.body);
  sendResponse<Book>(res, {
    statusCode: 200,
    success: true,
    message: "Book created successfully!",
    data: Book,
  });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, paginationOptions);
  const result = await BookServices.getAllBooks(filters, options);
  sendResponse<Book[]>(res, {
    statusCode: 200,
    success: true,
    message: "Books fetched successfully!",
    meta: result?.meta,
    data: result?.data,
  });
});

const getABook = catchAsync(async (req: Request, res: Response) => {
  const Book = await BookServices.getABook(req.params.id);
  if (!Book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }
  sendResponse<Partial<Book> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Book fetched successfully!",
    data: Book,
  });
});

const updateABook = catchAsync(async (req: Request, res: Response) => {
  const Book = await BookServices.getABook(req.params.id);
  if (!Book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }
  const updatedData = await BookServices.updateABook(req.params.id, req.body);
  sendResponse<Partial<Book> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Book updated successfully!",
    data: updatedData,
  });
});

const deleteABook = catchAsync(async (req: Request, res: Response) => {
  const Book = await BookServices.getABook(req.params.id);
  if (!Book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }
  const updatedData = await BookServices.deleteABook(req.params.id);
  sendResponse<Partial<Book> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Book is deleted successfully!",
    data: updatedData,
  });
});

// ============================================
// category based book search using category id
// ============================================

const getBookByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationOptions);
  const result = await BookServices.getBookByCategoryId(
    req.params.categoryId,
    options
  );
  sendResponse<Book[] | null>(res, {
    statusCode: 200,
    success: true,
    message: "Books with associated category data fetched successfully!",
    meta: result?.meta,
    data: result?.data,
  });
});

export const bookControllers = {
  createBook,
  getAllBook,
  getABook,
  updateABook,
  deleteABook,
  getBookByCategoryId,
};
