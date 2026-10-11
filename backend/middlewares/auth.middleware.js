import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const isAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers?.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Authentication token missing. Please sign in.");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(401, "User session not found or user deleted.");
    }

    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(401, "Invalid or expired token. Please sign in again.");
  }
});

export default isAuth;
