import { Router } from "express";
import v1bookRouter from "./book-route";
import v1userRouter from "./user-route";
import v1authRouter from "./auth-route";

const router = Router();

router.use("/books", v1bookRouter);
router.use("/users", v1userRouter);
router.use("/auth", v1authRouter);

export default router;
