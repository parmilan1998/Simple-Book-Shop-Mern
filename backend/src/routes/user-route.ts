import { Router } from "express";
import * as userController from "../controllers/user-controller";
import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router: Router = Router();

// Get all users → Only admin
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  userController.getUsers
);

// Get a single user by ID → Admin, manager, or the user themselves
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager", "user"),
  userController.getUserById
);

// Create a new user → Only admin
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  userController.createUser
);

// Update a user → Admin or manager
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "manager"),
  userController.updateUser
);

// Delete a user → Only admin
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  userController.deleteUser
);

export default router;
