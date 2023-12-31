"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatedPagination = void 0;
const calculatedPagination = (options) => {
    const page = Number(options.page || 1);
    const size = Number(options.size || 10);
    const skip = (page - 1) * size;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
    };
};
exports.calculatedPagination = calculatedPagination;
