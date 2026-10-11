import mongoose from "mongoose";
const memorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: "chat",
    },
  },
  {
    timestamps: true,
  },
);

const Memory = mongoose.model("Memory", memorySchema);
export default Memory;
