import bcrypt from "bcryptjs";
import config from "../config/env";

const saltRounds: number = Number(config.SALT_ROUNDS as number);

// Hash a plain password
export const hashPassword = async (plainPassword: string): Promise<string> => {
  return await bcrypt.hash(plainPassword, saltRounds);
};

// Verify a plain password against a hashed password
export const verifyPassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
