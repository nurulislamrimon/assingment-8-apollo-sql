import { Order, OrderedBook } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IOrderedBookInput } from "./order.interfaces";

const createOrder = async (
  userId: string,
  orderedBooks: IOrderedBookInput[]
): Promise<Order | null> => {
  let orderId = "";
  await prisma.$transaction(async (transaction) => {
    const order = await transaction.order.create({
      data: { userId, status: "pending" },
    });
    orderId = order.id;
    for (const orderedBook of orderedBooks) {
      await transaction.orderedBook.create({
        data: {
          orderId: order.id,
          bookId: orderedBook.bookId,
          quantity: orderedBook.quantity,
        },
      });
    }
  });
  const orderReturn = prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderedBooks: {
        select: { id: true, orderId: true, bookId: true, quantity: true },
      },
    },
  });
  return orderReturn;
};

const getAllOrders = async (): Promise<Partial<Order[]> | null> => {
  const order = await prisma.order.findMany({
    include: {
      orderedBooks: {
        select: { id: true, orderId: true, bookId: true, quantity: true },
      },
    },
  });
  return order;
};

const getOrdersOfSpecificCustomer = async (
  userId: string
): Promise<Partial<Order[]> | null> => {
  const Order = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderedBooks: true,
    },
  });
  return Order;
};

export const orderServices = {
  createOrder,
  getAllOrders,
  getOrdersOfSpecificCustomer,
};
