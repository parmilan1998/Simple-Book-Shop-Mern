import { Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user.entity";
import { AuthRequest } from "../middleware/auth.middleware";
import { hashPassword } from "../utils/password";

const userRepository = AppDataSource.getRepository(User);

// Get all users → Admin or Manager
export const getUsers = async (_req: AuthRequest, res: Response) => {
  try {
    const users = await userRepository.find({
      select: ["id", "email", "role", "createdAt"],
    });
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Get a single user → Admin, Manager, or the user themselves
export const getUserById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // If role is "user", enforce self-only access
    if (req.user.role === "user" && req.user.id !== id) {
      return res
        .status(403)
        .json({ message: "Forbidden: cannot access other users" });
    }

    const user = await userRepository.findOne({
      where: { id: id },
      select: ["id", "email", "role", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Create new user → Only Admin
export const createUser = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = userRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    await userRepository.save(newUser);

    // Don’t return password
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Update user → Admin or Manager (password cannot be updated)
export const updateUser = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { password, role, ...updates } = req.body;

    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Only admins can update the role
    if (role && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update user roles" });
    }

    // Merge updates (exclude password)
    const mergedData = { ...updates, ...(role && { role }) };
    userRepository.merge(user, mergedData);

    const updatedUser = await userRepository.save(user);

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = updatedUser;
    return res.json(userWithoutPassword);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

// Delete user → Only Admin
export const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userRepository.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRepository.remove(user);
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
