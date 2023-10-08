import express from "express";

import verifyToken from "../../middlewares/verifyToken";
import verifyAuthorization from "../../middlewares/verifyAuthorization";
import { OrderControllers } from "./order.controller";

const router = express.Router();

router.post(
  "/create-order",
  verifyToken,
  verifyAuthorization("customer"),
  OrderControllers.createOrder
);

router.get(
  "/",
  verifyToken,
  verifyAuthorization("admin", "customer"),
  OrderControllers.getAllOrder
);

export const orderRouter = router;
