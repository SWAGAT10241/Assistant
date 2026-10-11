import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import env from "./env.js";
import ApiError from "../utils/apiError.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "virtual_assistant",
    });

    // Remove temporary file from local storage after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return uploadResult.secure_url;
  } catch (error) {
    // Ensure temporary file is cleaned up even if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.error("Cloudinary upload failed:", error.message);
    throw new ApiError(500, "Failed to upload file to Cloudinary", [error.message]);
  }
};

export default uploadOnCloudinary;