"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const verifyToken_1 = __importDefault(require("../../middlewares/verifyToken"));
const verifyAuthorization_1 = __importDefault(require("../../middlewares/verifyAuthorization"));
const router = express_1.default.Router();
router.get("/", verifyToken_1.default, (0, verifyAuthorization_1.default)("admin"), user_controller_1.userControllers.getAllUser);
exports.userRouter = router;
