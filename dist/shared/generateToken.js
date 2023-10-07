"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const generateToken = (payload, expiresIn = "1y") => {
    const { id: userId, role } = payload;
    const token = jsonwebtoken_1.default.sign({ userId, role }, config_1.default.accessTokenSecret, {
        expiresIn,
    });
    return token;
};
exports.default = generateToken;
