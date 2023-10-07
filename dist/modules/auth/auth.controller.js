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
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const generateToken_1 = __importDefault(require("../../shared/generateToken"));
const signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.userServices.signup(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User created successfully!",
        data: user,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const isUserExist = yield auth_service_1.userServices.getUserByEmail(email);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found!");
    }
    const isPasswordMatched = yield auth_service_1.userServices.isPasswordMatched(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "User or password doesn't matched!");
    }
    const accessToken = (0, generateToken_1.default)(isUserExist);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User signin successfully!",
        token: accessToken,
    });
}));
exports.userControllers = {
    signup,
    login,
};
