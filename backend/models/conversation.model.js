import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    assistantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assistant",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    lastMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
