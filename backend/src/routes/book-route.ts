import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book-controller";
import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const bookRouter: Router = Router();

// 📚 Public: all users can view
bookRouter.route("/").get(getBooks);

bookRouter.route("/:id").get(getBookById);

// 🔒 Protected: only admin & manager can create, update, delete
bookRouter
  .route("/")
  .post(authMiddleware, authorizeRoles("admin", "manager"), createBook);

bookRouter
  .route("/:id")
  .put(authMiddleware, authorizeRoles("admin", "manager"), updateBook)
  .delete(authMiddleware, authorizeRoles("admin", "manager"), deleteBook);

export default bookRouter;
