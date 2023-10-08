"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const verifyAuthorization_1 = __importDefault(require("../../middlewares/verifyAuthorization"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/create-order", verifyToken_1.default, (0, verifyAuthorization_1.default)("customer"), order_controller_1.OrderControllers.createOrder);
router.get("/", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin", "customer"), order_controller_1.OrderControllers.getAllOrder);
exports.orderRouter = router;
