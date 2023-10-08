"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const verifyAuthorization_1 = __importDefault(require("../../middlewares/verifyAuthorization"));
const category_controller_1 = require("./category.controller");
const router = express_1.default.Router();
router.post("/create-category", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin"), category_controller_1.CategoryControllers.createCategory);
router.get("/", category_controller_1.CategoryControllers.getAllCategory);
router.get("/:id", category_controller_1.CategoryControllers.getACategory);
router.patch("/:id", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin"), category_controller_1.CategoryControllers.updateACategory);
router.delete("/:id", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin"), category_controller_1.CategoryControllers.deleteACategory);
exports.categoryRouter = router;
