"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createOrder = (userId, orderedBooks) => __awaiter(void 0, void 0, void 0, function* () {
    let orderId = "";
    yield prisma_1.default.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield transaction.order.create({
            data: { userId, status: "pending" },
        });
        orderId = order.id;
        for (const orderedBook of orderedBooks) {
            yield transaction.orderedBook.create({
                data: {
                    orderId: order.id,
                    bookId: orderedBook.bookId,
                    quantity: orderedBook.quantity,
                },
            });
        }
    }));
    const orderReturn = prisma_1.default.order.findUnique({
        where: { id: orderId },
        include: {
            orderedBooks: {
                select: { id: true, orderId: true, bookId: true, quantity: true },
            },
        },
    });
    return orderReturn;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.findMany({
        include: {
            orderedBooks: {
                select: { id: true, orderId: true, bookId: true, quantity: true },
            },
        },
    });
    return order;
});
const getOrdersOfSpecificCustomer = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const Order = yield prisma_1.default.order.findMany({
        where: {
            userId,
        },
        include: {
            orderedBooks: true,
        },
    });
    return Order;
});
exports.orderServices = {
    createOrder,
    getAllOrders,
    getOrdersOfSpecificCustomer,
};
