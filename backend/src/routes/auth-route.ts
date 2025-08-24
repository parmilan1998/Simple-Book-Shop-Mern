import { Router } from "express";
import * as authController from "../controllers/auth-controller";
import authMiddleware from "../middleware/auth.middleware";

const authRouter: Router = Router();

// Public routes
authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);

// Protected route example (logout)
authRouter.post("/logout", authMiddleware, authController.logout);

export default authRouter;
