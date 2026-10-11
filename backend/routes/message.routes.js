import express from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
  togglePinMessage,
} from "../controllers/message.controller.js";
import isAuth from "../middlewares/auth.middleware.js";

const messageRouter = express.Router();

messageRouter.post("/", isAuth, sendMessage);
messageRouter.get("/:conversationId", isAuth, getMessages);
messageRouter.delete("/:id", isAuth, deleteMessage);
messageRouter.patch("/:id/pin", isAuth, togglePinMessage);

export default messageRouter;
