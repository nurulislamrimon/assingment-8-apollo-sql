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
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const orderedBooks = req.body.orderedBooks;
    if (!orderedBooks) {
        throw new apiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Ordered books not found!");
    }
    const order = yield order_service_1.orderServices.createOrder((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId, orderedBooks);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Order created successfully!",
        data: order,
    });
}));
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    let orders;
    if (((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin") {
        orders = yield order_service_1.orderServices.getAllOrders();
    }
    else {
        orders = yield order_service_1.orderServices.getOrdersOfSpecificCustomer((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId);
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Orders retrieved successfully!",
        data: orders,
    });
}));
exports.OrderControllers = {
    createOrder,
    getAllOrder,
};
