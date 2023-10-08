"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizeSearchAndFilter = void 0;
const organizeSearchAndFilter = (searchAndFilter, searchableFields, filterableFields) => {
    const { search } = searchAndFilter, filters = __rest(searchAndFilter, ["search"]);
    filterableFields.pop();
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: searchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filters).length) {
        andConditions.push({
            AND: Object.keys(filters).map((field) => ({
                [field]: {
                    equals: searchAndFilter[field],
                },
            })),
        });
    }
    return andConditions.length ? { AND: andConditions } : {};
};
exports.organizeSearchAndFilter = organizeSearchAndFilter;
