import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export interface AuthUser {
  id: string;
  role: "admin" | "manager" | "user";
  email: string;
}
export interface AuthRequest extends Request {
  user?: AuthUser;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // ✅ Read token from cookie or Authorization header
    const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Verify access token only (never refresh token)
    const decoded = verifyToken(token, false);
    if (!decoded)
      return res.status(401).json({ message: "Invalid or expired token" });

    // ✅ Attach user to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
