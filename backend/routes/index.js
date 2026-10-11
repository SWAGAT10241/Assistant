import express from "express";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";
import assistantRouter from "./assistant.routes.js";
import conversationRouter from "./conversation.routes.js";
import messageRouter from "./message.routes.js";

const apiRouter = express.Router();

// Health Check
apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Virtual Assistant API",
  });
});

// Resource routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/users", userRouter); // Plural alias
apiRouter.use("/assistants", assistantRouter);
apiRouter.use("/conversations", conversationRouter);
apiRouter.use("/messages", messageRouter);

export default apiRouter;
