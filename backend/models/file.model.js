import mongoose from "mongoose";
const fileSchema = new mongoose.Schema(
  {
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
    },
    cloudinaryUrl: {
      type: String,
    },
    publicId: {
      type: String,
    },
    mimeType: {
      type: String,
    },
    size: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

const File = mongoose.model("File", fileSchema);
export default File;
