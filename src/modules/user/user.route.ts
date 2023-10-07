import express from "express";
import { userControllers } from "./user.controller";
import verifyToken from "../../middlewares/verifyToken";
import verifyAuthorization from "../../middlewares/verifyAuthorization";

const router = express.Router();

router.get(
  "/",
  verifyToken,
  verifyAuthorization("admin"),
  userControllers.getAllUser
);

export const userRouter = router;
