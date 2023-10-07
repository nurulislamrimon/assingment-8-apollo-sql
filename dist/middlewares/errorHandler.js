"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../config/config"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const routeNotFoundErrorHandler = (req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).send({
        success: false,
        message: "Not Found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: "API Not Found",
            },
        ],
    });
    next();
};
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorMessages = [];
    let stack = config_1.default.env !== "Production" ? error.stack : undefined;
    if (error.name === "PrismaClientValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (error instanceof apiError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = error.message ? [{ path: "", message: error.message }] : [];
    }
    else if (error instanceof Error) {
        message = error.message;
        errorMessages = error.message ? [{ path: "", message: error.message }] : [];
    }
    res.status(statusCode).send({
        success: false,
        message,
        errorMessages,
        stack,
    });
};
exports.errorHandler = { routeNotFoundErrorHandler, globalErrorHandler };
