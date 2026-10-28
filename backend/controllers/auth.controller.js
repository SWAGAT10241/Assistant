import authService from "../services/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import env from "../config/env.js";

/**
 * Cookie security options based on environment
 */
const getCookieOptions = () => ({
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  secure: env.NODE_ENV === "production",
  path: "/",
});

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.cookie("token", result.token, getCookieOptions());

  return res.status(201).json(
    new ApiResponse(201, result, "User registered successfully")
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.cookie("token", result.token, getCookieOptions());

  return res.status(200).json(
    new ApiResponse(200, result, "Logged in successfully")
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", getCookieOptions());

  return res.status(200).json(
    new ApiResponse(200, null, "Logout successful")
  );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.userId);
  return res.status(200).json(
    new ApiResponse(200, user, "User fetched successfully")
  );
});

// Aliases for backwards compatibility
export const signUp = register;
export const Login = login;
export const LogOut = logout;
