"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.userServices.getAllUser();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Users retrived successfully!",
        data: users,
    });
}));
const getAUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userServices.getAUser(req.params.id);
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User getched successfully!",
        data: user,
    });
}));
const updateAUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userServices.getAUser(req.params.id);
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const updatedData = yield user_service_1.userServices.updateAUser(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User updated successfully!",
        data: updatedData,
    });
}));
const deleteAUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.userServices.getAUser(req.params.id);
    if (!user) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const updatedData = yield user_service_1.userServices.deleteAUser(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully!",
        data: updatedData,
    });
}));
exports.userControllers = {
    getAllUser,
    getAUser,
    updateAUser,
    deleteAUser,
};
