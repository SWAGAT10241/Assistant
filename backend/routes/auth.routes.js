import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authLimiter } from "../middlewares/rateLimiter.middleware.js";
import {
  registerValidator,
  loginValidator,
} from "../validations/auth.validation.js";

const authRouter = express.Router();

// Register with strict rate limiting & validation
authRouter.post(
  "/register",
  authLimiter,
  validate(registerValidator),
  register
);
authRouter.post(
  "/signup",
  authLimiter,
  validate(registerValidator),
  register
);

// Login with strict rate limiting & validation
authRouter.post(
  "/login",
  authLimiter,
  validate(loginValidator),
  login
);
authRouter.post(
  "/signin",
  authLimiter,
  validate(loginValidator),
  login
);

// Logout (supporting both POST and GET)
authRouter.post("/logout", logout);
authRouter.get("/logout", logout);

// Profile
authRouter.get("/me", isAuth, getCurrentUser);

export default authRouter;
