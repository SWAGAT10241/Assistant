import { v2 as cloudinary } from "cloudinary";
import env from "./env.js";
import uploadService from "../services/upload.service.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Backward compatibility export
 */
export const uploadOnCloudinary = (filePath) => uploadService.uploadToCloudinary(filePath);

export default cloudinary;
