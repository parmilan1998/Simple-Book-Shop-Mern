"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("../controllers/book.controller");
const bookRouter = (0, express_1.Router)();
bookRouter.route("/").get(book_controller_1.getBooks).post(book_controller_1.createBook);
bookRouter.route("/:id").get(book_controller_1.getBookById).put(book_controller_1.updateBook).delete(book_controller_1.deleteBook);
exports.default = bookRouter;
