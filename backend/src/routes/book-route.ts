import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book-controller";

const bookRouter = Router();

bookRouter.route("/").get(getBooks).post(createBook);
bookRouter.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

export default bookRouter;
