"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("./middlewares/errorHandler");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send({
        success: true,
        data: "Welcome to book catallog server!",
    });
});
app.use("/api/v1", routes_1.default);
// not found route error handler
app.use(errorHandler_1.errorHandler.routeNotFoundErrorHandler);
// global error handler
app.use(errorHandler_1.errorHandler.globalErrorHandler);
exports.default = app;
