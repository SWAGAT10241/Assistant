import express from "express";
import {
  getCurrentUser,
  updateAssistant,
  askToAssistant,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { aiLimiter } from "../middlewares/rateLimiter.middleware.js";
import {
  askCommandValidator,
  updateAssistantValidator,
} from "../validations/user.validation.js";

const userRouter = express.Router();

// Current user profile (supporting both /current and /me)
userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/me", isAuth, getCurrentUser);

// Update assistant configuration (image and/or name)
userRouter.post(
  "/update",
  isAuth,
  upload.single("assistantImage"),
  validate(updateAssistantValidator),
  updateAssistant
);
userRouter.put(
  "/update",
  isAuth,
  upload.single("assistantImage"),
  validate(updateAssistantValidator),
  updateAssistant
);

// Ask assistant AI command with dedicated AI Rate Limiter
userRouter.post(
  "/asktoassistant",
  isAuth,
  aiLimiter,
  validate(askCommandValidator),
  askToAssistant
);
userRouter.post(
  "/ask",
  isAuth,
  aiLimiter,
  validate(askCommandValidator),
  askToAssistant
);

export default userRouter;
