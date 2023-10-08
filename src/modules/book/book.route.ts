import express from "express";

import verifyToken from "../../middlewares/verifyToken";
import verifyAuthorization from "../../middlewares/verifyAuthorization";
import { bookControllers } from "./book.controller";

const router = express.Router();

router.post(
  "/create-book",
  verifyToken,
  verifyAuthorization("admin"),
  bookControllers.createBook
);

router.get("/", bookControllers.getAllBook);

router.get("/:id", bookControllers.getABook);

router.patch(
  "/:id",
  verifyToken,
  verifyAuthorization("admin"),
  bookControllers.updateABook
);

router.delete(
  "/:id",
  verifyToken,
  verifyAuthorization("admin"),
  bookControllers.deleteABook
);

// ============================================
// category based book search using category id
// ============================================

router.get("/:categoryId/category", bookControllers.getBookByCategoryId);

export const bookRouter = router;
