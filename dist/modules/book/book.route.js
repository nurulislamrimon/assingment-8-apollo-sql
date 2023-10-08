"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const verifyAuthorization_1 = __importDefault(require("../../middlewares/verifyAuthorization"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post("/create-book", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin"), book_controller_1.bookControllers.createBook);
router.get("/", book_controller_1.bookControllers.getAllBook);
router.get("/:id", book_controller_1.bookControllers.getABook);
router.patch("/:id", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin"), book_controller_1.bookControllers.updateABook);
router.delete("/:id", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin"), book_controller_1.bookControllers.deleteABook);
// ============================================
// category based book search using category id
// ============================================
router.get("/:categoryId/category", book_controller_1.bookControllers.getBookByCategoryId);
exports.bookRouter = router;
