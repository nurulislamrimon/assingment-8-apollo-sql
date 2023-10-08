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
exports.BookServices = void 0;
const prisma_1 = __importDefault(require("../../shared/prisma"));
const calculatedPagination_1 = require("../../shared/calculatedPagination");
const organizeSearchAndFilter_1 = require("../../shared/organizeSearchAndFilter");
const book_constants_1 = require("./book.constants");
const createBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.create({ data: payload });
    return book;
});
const getAllBooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const calculatedPaginationOptions = (0, calculatedPagination_1.calculatedPagination)(options);
    const whereCondition = (0, organizeSearchAndFilter_1.organizeSearchAndFilter)(filters, book_constants_1.bookSearchableFields, book_constants_1.bookFilterableFields);
    const books = yield prisma_1.default.book.findMany({ where: whereCondition });
    const total = yield prisma_1.default.book.count({ where: whereCondition });
    const totalPage = Math.ceil(total / calculatedPaginationOptions.size);
    return {
        meta: {
            page: calculatedPaginationOptions.page,
            size: calculatedPaginationOptions.size,
            total,
            totalPage,
        },
        data: books,
    };
});
const getABook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return Book;
});
const updateABook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return Book;
});
const deleteABook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return Book;
});
// ============================================
// category based book search using category id
// ============================================
const getBookByCategoryId = (categoryId, options) => __awaiter(void 0, void 0, void 0, function* () {
    const calculatedPaginationOptions = (0, calculatedPagination_1.calculatedPagination)(options);
    const categoryWithAllBooks = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        skip: calculatedPaginationOptions.skip,
        take: calculatedPaginationOptions.size,
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    const totalPage = Math.ceil(total / calculatedPaginationOptions.size);
    return {
        meta: {
            page: calculatedPaginationOptions.page,
            size: calculatedPaginationOptions.size,
            total,
            totalPage,
        },
        data: categoryWithAllBooks,
    };
});
exports.BookServices = {
    createBook,
    getAllBooks,
    getABook,
    updateABook,
    deleteABook,
    getBookByCategoryId,
};
