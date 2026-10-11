import express from "express";
import {
  createAssistant,
  getAssistants,
  getAssistantById,
  updateAssistant,
  deleteAssistant,
  toggleVisibility,
} from "../controllers/assistant.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const assistantRouter = express.Router();

assistantRouter.post("/", isAuth, createAssistant);
assistantRouter.get("/", isAuth, getAssistants);
assistantRouter.get("/:id", isAuth, getAssistantById);
assistantRouter.put("/:id", isAuth, updateAssistant);
assistantRouter.delete("/:id", isAuth, deleteAssistant);
assistantRouter.patch("/:id/visibility", isAuth, toggleVisibility);

export default assistantRouter;
