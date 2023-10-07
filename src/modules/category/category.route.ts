import express from "express";

import verifyToken from "../../middlewares/verifyToken";
import verifyAuthorization from "../../middlewares/verifyAuthorization";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.post(
  "/create-category",
  verifyToken,
  verifyAuthorization("admin"),
  CategoryControllers.createCategory
);

router.get("/", CategoryControllers.getAllCategory);

router.get("/:id", CategoryControllers.getACategory);

router.patch(
  "/:id",
  verifyToken,
  verifyAuthorization("admin"),
  CategoryControllers.updateACategory
);

router.delete(
  "/:id",
  verifyToken,
  verifyAuthorization("admin"),
  CategoryControllers.deleteACategory
);

export const categoryRouter = router;
