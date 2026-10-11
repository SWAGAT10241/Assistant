import express from "express";
import {
  getCurrentUser,
  updateAssistant,
  askToAssistant,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

// Current user profile (supporting both /current and /me)
userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/me", isAuth, getCurrentUser);

// Update assistant configuration (image and/or name)
userRouter.post(
  "/update",
  isAuth,
  upload.single("assistantImage"),
  updateAssistant
);
userRouter.put(
  "/update",
  isAuth,
  upload.single("assistantImage"),
  updateAssistant
);

// Ask assistant AI command (supporting both /asktoassistant and /ask)
userRouter.post("/asktoassistant", isAuth, askToAssistant);
userRouter.post("/ask", isAuth, askToAssistant);

export default userRouter;