import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiError from "./apiError.js";

/**
 * Generate a signed JWT token for an authenticated user
 * @param {string} userId - User ID to encode
 * @param {string} [expiresIn="7d"] - Token validity period
 * @returns {string} Signed JWT string
 */
export const generateToken = (userId, expiresIn = "7d") => {
  try {
    return jwt.sign({ userId }, env.JWT_SECRET, { expiresIn });
  } catch (error) {
    throw new ApiError(500, "Failed to generate authentication token", [
      error.message,
    ]);
  }
};

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT string to verify
 * @returns {{ userId: string }} Decoded token payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token. Please sign in again.");
  }
};

export default generateToken;

