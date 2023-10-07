"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const verifyAuthorization = (...roles) => {
    return (req, res, next) => {
        if (req.user) {
            const { role } = req.user;
            if (!roles.includes(role)) {
                throw new apiError_1.default(http_status_1.default.FORBIDDEN, "Access forbidden!");
            }
        }
        next();
    };
};
exports.default = verifyAuthorization;
