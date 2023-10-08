import express from "express";
import { userRouter } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { categoryRouter } from "../modules/category/category.route";
import { bookRouter } from "../modules/book/book.route";
import { orderRouter } from "../modules/order/order.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/categories",
    route: categoryRouter,
  },
  {
    path: "/books",
    route: bookRouter,
  },
  {
    path: "/orders",
    route: orderRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
