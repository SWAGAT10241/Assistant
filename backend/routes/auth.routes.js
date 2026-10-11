import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

// Register (supporting both /register and /signup)
authRouter.post("/register", register);
authRouter.post("/signup", register);

// Login (supporting both /login and /signin)
authRouter.post("/login", login);
authRouter.post("/signin", login);

// Logout (supporting both POST and GET)
authRouter.post("/logout", logout);
authRouter.get("/logout", logout);

// Profile
authRouter.get("/me", isAuth, getCurrentUser);

export default authRouter;
