"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
const createBook = async (req, res) => {
    try {
        const { title, author, publishedYear } = req.body;
        if (!title || !author || !publishedYear) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const book = await book_model_1.Book.create({ title, author, publishedYear });
        return res.status(201).json(book);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.createBook = createBook;
const getBooks = async (_req, res) => {
    try {
        const books = await book_model_1.Book.find();
        return res.status(200).json({ count: books.length, data: books });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    try {
        const book = await book_model_1.Book.findById(req.params.id);
        if (!book)
            return res.status(404).json({ message: "Book not found" });
        return res.status(200).json(book);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res) => {
    try {
        const { title, author, publishedYear } = req.body;
        if (!title || !author || !publishedYear) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const updated = await book_model_1.Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated)
            return res.status(404).json({ message: "Book not found" });
        return res.status(200).json(updated);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        const deleted = await book_model_1.Book.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ message: "Book not found" });
        return res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
exports.deleteBook = deleteBook;
