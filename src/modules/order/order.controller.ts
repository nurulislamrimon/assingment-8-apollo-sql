import { NextFunction, Request, RequestHandler, Response } from "express";
import { orderServices } from "./order.service";
import sendResponse from "../../shared/sendResponse";
import { Order } from "@prisma/client";
import catchAsync from "../../shared/catchAsync";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const orderedBooks = req.body.orderedBooks;
  if (!orderedBooks) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "Ordered books not found!");
  }
  const order = await orderServices.createOrder(
    req?.user?.userId,
    orderedBooks
  );

  sendResponse<Order>(res, {
    statusCode: 200,
    success: true,
    message: "Order created successfully!",
    data: order,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  let orders;
  if (req?.user?.role === "admin") {
    orders = await orderServices.getAllOrders();
  } else {
    orders = await orderServices.getOrdersOfSpecificCustomer(req?.user?.userId);
  }
  sendResponse<Partial<Order[]> | null>(res, {
    statusCode: 200,
    success: true,
    message: "Orders retrieved successfully!",
    data: orders,
  });
});

export const OrderControllers = {
  createOrder,
  getAllOrder,
};
