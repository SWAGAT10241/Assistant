import authService from "../services/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: "none",
  secure: true,
};

export const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  res.cookie("token", result.token, cookieOptions);

  return res.status(201).json(
    new ApiResponse(201, result, "User registered successfully")
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.cookie("token", result.token, cookieOptions);

  return res.status(200).json(
    new ApiResponse(200, result, "Logged in successfully")
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

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

// Aliases for backwards compatibility with existing frontend code
export const signUp = register;
export const Login = login;
export const LogOut = logout;
