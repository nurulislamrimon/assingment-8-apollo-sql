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
exports.categoryServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const createCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Categorys = yield prisma_1.default.category.create({ data: payload });
    return Categorys;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const Category = yield prisma_1.default.category.findMany({});
    return Category;
});
const getACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Category = yield prisma_1.default.category.findUnique({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    return Category;
});
const updateACategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Category = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
        select: {
            id: true,
            title: true,
        },
    });
    return Category;
});
const deleteACategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Category = yield prisma_1.default.category.delete({
        where: {
            id,
        },
    });
    return Category;
});
exports.categoryServices = {
    createCategory,
    getAllCategories,
    getACategory,
    updateACategory,
    deleteACategory,
};
