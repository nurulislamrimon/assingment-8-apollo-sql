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
exports.bookControllers = void 0;
const book_service_1 = require("./book.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../shared/pick"));
const book_constants_1 = require("./book.constants");
const constants_1 = require("../../shared/constants");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield book_service_1.BookServices.createBook(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book created successfully!",
        data: Book,
    });
}));
const getAllBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constants_1.bookFilterableFields);
    const options = (0, pick_1.default)(req.query, constants_1.paginationOptions);
    const result = yield book_service_1.BookServices.getAllBooks(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books fetched successfully!",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
const getABook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield book_service_1.BookServices.getABook(req.params.id);
    if (!Book) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book fetched successfully!",
        data: Book,
    });
}));
const updateABook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield book_service_1.BookServices.getABook(req.params.id);
    if (!Book) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    const updatedData = yield book_service_1.BookServices.updateABook(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book updated successfully!",
        data: updatedData,
    });
}));
const deleteABook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Book = yield book_service_1.BookServices.getABook(req.params.id);
    if (!Book) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    const updatedData = yield book_service_1.BookServices.deleteABook(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Book is deleted successfully!",
        data: updatedData,
    });
}));
// ============================================
// category based book search using category id
// ============================================
const getBookByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, constants_1.paginationOptions);
    const result = yield book_service_1.BookServices.getBookByCategoryId(req.params.categoryId, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Books with associated category data fetched successfully!",
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
exports.bookControllers = {
    createBook,
    getAllBook,
    getABook,
    updateABook,
    deleteABook,
    getBookByCategoryId,
};
