"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        success: data.success,
        statusCode: data.statusCode,
        message: data.message || null,
        meta: data.meta || null || undefined,
        token: data.token || null || undefined,
        data: data.data || null || undefined,
    };
    res.status(data.statusCode).send(responseData);
};
exports.default = sendResponse;
