import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

const resolveAndValidateUploadPath = (filePath) => {
    const uploadRoot = path.resolve(process.env.UPLOAD_DIR || 'uploads');
    const resolvedFilePath = path.resolve(filePath);
    const relativePath = path.relative(uploadRoot, resolvedFilePath);

    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        throw new Error('Invalid file path');
    }

    return resolvedFilePath;
};

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const safeFilePath = resolveAndValidateUploadPath(filePath);

    try {
        const uploadResult = await cloudinary.uploader
        .upload(safeFilePath)
        fs.unlinkSync(safeFilePath)
        return uploadResult.secure_url;
    } catch (error) {
        if (fs.existsSync(safeFilePath)) {
            fs.unlinkSync(safeFilePath)
        }
        throw new Error("Cloudinary error")
    }
}

export default uploadOnCloudinary;