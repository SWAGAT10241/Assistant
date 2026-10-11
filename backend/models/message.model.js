import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    isPinned: {
      type: Boolean,
      default: false,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["text", "image", "pdf", "audio"],
      default: "text",
    },
    attachments: [
      {
        url: String,
        fileType: String,
        fileName: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
