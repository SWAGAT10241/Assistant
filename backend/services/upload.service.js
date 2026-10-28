import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import ApiError from "../utils/apiError.js";

/**
 * Service to handle asset uploads to Cloudinary storage
 */
class UploadService {
  /**
   * Upload a local temporary file to Cloudinary and clean up the local file
   * @param {string} filePath - Path to local file
   * @param {string} [folder="virtual_assistant"] - Cloudinary destination folder
   * @returns {Promise<string|null>} Secure public URL of uploaded file
   */
  async uploadToCloudinary(filePath, folder = "virtual_assistant") {
    if (!filePath) return null;

    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
        folder,
      });

      // Cleanup local temp file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      return uploadResult.secure_url;
    } catch (error) {
      // Ensure temp file is removed even on failure
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      console.error("Cloudinary upload failed:", error.message);
      throw new ApiError(500, "Failed to upload file to Cloudinary", [error.message]);
    }
  }
}

export const uploadService = new UploadService();
export default uploadService;

