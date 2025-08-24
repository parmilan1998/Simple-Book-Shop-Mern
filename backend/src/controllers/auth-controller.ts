import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import { hashPassword, verifyPassword } from "../utils/password";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt";
import { AuthUser } from "../middleware/auth.middleware";
import { RefreshToken } from "../entities/refreshToken";
import config from "../config/env";

const userRepository = AppDataSource.getRepository(User);
const refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

interface RegisterRequestBody {
  email: string;
  password: string;
  role?: "user" | "admin" | "manager";
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// ✅ Register user
export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await hashPassword(password);

    const newUser = userRepository.create({
      email,
      password: hashed,
      role: role || "user",
    });

    await userRepository.save(newUser);

    return res.status(201).json({
      message: "User registered successfully",
      statusCode: 20000,
      user: { id: newUser.id, email: newUser.email, role: newUser.role },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Login user
export const login = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload: AuthUser = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Delete all previous refresh tokens for this user
    await refreshTokenRepository.delete({ user: { id: user.id } });

    // Save new refresh token in DB
    const expiresAt = new Date();
    const expiryDays = parseInt(config.REFRESH_TOKEN_EXPIRY as string, 10);
    expiresAt.setDate(expiresAt.getDate() + expiryDays);

    const newRefreshToken = refreshTokenRepository.create({
      token: refreshToken,
      user,
      expiresAt,
    });
    await refreshTokenRepository.save(newRefreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
      statusCode: 20000,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ Refresh token
export const refresh = async (req: Request, res: Response) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const payload = verifyToken(token, true);
    if (!payload) return res.status(401).json({ message: "Invalid token" });

    const user = await userRepository.findOne({ where: { id: payload.id } });
    if (!user) return res.status(401).json({ message: "User not found" });

    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Access token refreshed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Auth controller: logout
export const logout = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Delete all refresh tokens for this user
    await refreshTokenRepository.delete({ user: { id: userId } });

    // Clear cookies
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
