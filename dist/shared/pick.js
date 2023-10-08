"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj &&
            Object.keys(obj).some((objKey) => objKey.toLowerCase() === key.toString().toLowerCase())) {
            const matchingKey = Object.keys(obj).find((objKey) => objKey.toLowerCase() === key.toString().toLowerCase());
            if (matchingKey) {
                finalObj[key] = obj[matchingKey];
            }
        }
    }
    return finalObj;
};
exports.default = pick;
