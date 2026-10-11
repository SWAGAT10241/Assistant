import express from "express";
import {
  createConversation,
  getConversationById,
  getConversations,
  updateConversation,
  deleteConversation,
} from "../controllers/conversation.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const conversationRouter = express.Router();

conversationRouter.post("/", isAuth, createConversation);
conversationRouter.get("/", isAuth, getConversations);
conversationRouter.get("/:id", isAuth, getConversationById);
conversationRouter.put("/:id", isAuth, updateConversation);
conversationRouter.delete("/:id", isAuth, deleteConversation);

export default conversationRouter;