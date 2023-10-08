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
exports.CategoryControllers = void 0;
const category_service_1 = require("./category.service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_service_1.categoryServices.createCategory(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category created successfully!",
        data: category,
    });
}));
const getAllCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_service_1.categoryServices.getAllCategories();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Categories fetched successfully!",
        data: categories,
    });
}));
const getACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_service_1.categoryServices.getACategory(req.params.id);
    if (!category) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category fetched successfully!",
        data: category,
    });
}));
const updateACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Category = yield category_service_1.categoryServices.getACategory(req.params.id);
    if (!Category) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    const updatedData = yield category_service_1.categoryServices.updateACategory(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category updated successfully!",
        data: updatedData,
    });
}));
const deleteACategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Category = yield category_service_1.categoryServices.getACategory(req.params.id);
    if (!Category) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Category not found!");
    }
    const updatedData = yield category_service_1.categoryServices.deleteACategory(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category deleted successfully!",
        data: updatedData,
    });
}));
exports.CategoryControllers = {
    createCategory,
    getAllCategory,
    getACategory,
    updateACategory,
    deleteACategory,
};
