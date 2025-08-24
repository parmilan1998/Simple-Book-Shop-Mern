import jwt, { SignOptions } from "jsonwebtoken";
import config from "../config/env";
import { AuthUser } from "src/middleware/auth.middleware";

// Generate access token
export const generateAccessToken = (
  payload: AuthUser,
  expiresIn: string | number = config.ACCESS_TOKEN_EXPIRY
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, options);
};

// Generate refresh token
export const generateRefreshToken = (
  payload: AuthUser,
  expiresIn: string | number = config.REFRESH_TOKEN_EXPIRY
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, config.REFRESH_TOKEN_SECRET, options);
};

// Verify token
export const verifyToken = (
  token: string,
  isRefresh: boolean = false
): AuthUser | null => {
  try {
    const secret = isRefresh
      ? config.REFRESH_TOKEN_SECRET
      : config.ACCESS_TOKEN_SECRET;

    const decoded = jwt.verify(token, secret);
    return decoded as AuthUser;
  } catch {
    return null;
  }
};
