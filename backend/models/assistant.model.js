import mongoose from "mongoose";

const assistantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "Your personal AI operating system",
    },
    icon: {
      type: String,
    },
    avatar: {
      type: String,
    },
    systemPrompt: {
      type: String,
      default: "",
    },
    defaultModel: {
      type: String,
      default: "qwen3",
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Assistant = mongoose.model("Assistant", assistantSchema);
export default Assistant;
