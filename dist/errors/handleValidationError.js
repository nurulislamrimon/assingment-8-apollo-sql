"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    const statusCode = 400;
    const errorMessages = [
        {
            path: "",
            message: error.message,
        },
    ];
    return {
        statusCode,
        message: "validation error!",
        errorMessages,
    };
};
exports.default = handleValidationError;
