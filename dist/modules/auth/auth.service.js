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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const config_1 = __importDefault(require("../../config/config"));
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, user = __rest(payload, ["password"]);
    const encryptedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.salt));
    const users = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, user), { password: encryptedPassword }),
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return users;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    return user;
});
const isPasswordMatched = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const isPasswordMatched = yield bcrypt_1.default.compare(password, hashedPassword);
    return isPasswordMatched;
});
exports.userServices = {
    signup,
    getUserByEmail,
    isPasswordMatched,
};
