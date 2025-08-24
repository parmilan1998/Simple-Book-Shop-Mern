import { Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Book } from "../entities/book-entity";
import { User } from "../entities/user.entity";
import { AuthRequest } from "../middleware/auth.middleware";

const bookRepository = AppDataSource.getRepository(Book);
const userRepository = AppDataSource.getRepository(User);

// 📌 Create Book (Admin & Manager only)
export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { title, author, publishedYear } = req.body;

    const user = await userRepository.findOne({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newBook = bookRepository.create({
      title,
      author,
      publishedYear,
      user,
    });
    await bookRepository.save(newBook);

    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: "Error creating book", error });
  }
};

// 📌 Update Book (Admin & Manager only)
export const updateBook = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;
    const { title, author, publishedYear } = req.body;

    const book = await bookRepository.findOne({ where: { id } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.publishedYear = publishedYear ?? book.publishedYear;

    await bookRepository.save(book);

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error updating book", error });
  }
};

// 📌 Delete Book (Admin & Manager only)
export const deleteBook = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "admin" && req.user.role !== "manager") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { id } = req.params;

    const book = await bookRepository.findOne({ where: { id } });
    if (!book) return res.status(404).json({ message: "Book not found" });

    await bookRepository.remove(book);
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting book", error });
  }
};

// 📌 Get All Books (Any User)
export const getBooks = async (_req: AuthRequest, res: Response) => {
  try {
    const books = await bookRepository.find({ relations: ["user"] });
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error });
  }
};

// 📌 Get Book by ID (Any User)
export const getBookById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const book = await bookRepository.findOne({
      where: { id },
      relations: ["user"],
    });

    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book", error });
  }
};
