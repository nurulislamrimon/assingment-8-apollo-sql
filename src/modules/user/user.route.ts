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
router.get(
  "/:id",
  verifyToken,
  verifyAuthorization("admin"),
  userControllers.getAUser
);
router.patch(
  "/:id",
  verifyToken,
  verifyAuthorization("admin"),
  userControllers.updateAUser
);
router.delete(
  "/:id",
  verifyToken,
  verifyAuthorization("admin"),
  userControllers.deleteAUser
);

export const userRouter = router;
