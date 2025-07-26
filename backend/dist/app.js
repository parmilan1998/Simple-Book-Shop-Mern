"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const colors_1 = __importDefault(require("colors"));
const body_parser_1 = __importDefault(require("body-parser"));
const book_route_1 = __importDefault(require("./routes/book-route"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Base route
app.get("/", (_req, res) => {
    console.log("API is running...", colors_1.default.blue.bold);
    res.send("Book API is running...");
});
// Book API route
app.use("/api/v1/books", book_route_1.default);
exports.default = app;
