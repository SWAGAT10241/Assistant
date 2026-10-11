import User from "../models/user.model.js";
import uploadOnCloudinary from "../config/cloudinary.js";
import aiService from "./ai.service.js";
import ApiError from "../utils/apiError.js";

class UserService {
  /**
   * Retrieve current user profile
   */
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user.toJSON();
  }

  /**
   * Update assistant avatar and name
   */
  async updateAssistant(userId, { assistantName, imageUrl, file }) {
    let assistantImage = imageUrl;

    if (file && file.path) {
      assistantImage = await uploadOnCloudinary(file.path);
    }

    const updateData = {};
    if (assistantName !== undefined && assistantName !== null) {
      updateData.assistantName = assistantName.trim();
    }
    if (assistantImage !== undefined && assistantImage !== null) {
      updateData.assistantImage = assistantImage;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    return updatedUser.toJSON();
  }

  /**
   * Process voice command, store in history, and return AI response
   */
  async askAssistant(userId, command) {
    if (!command || !command.trim()) {
      throw new ApiError(400, "Command cannot be empty");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Keep history capped at latest 50 commands for scalability
    user.history.unshift(command.trim());
    if (user.history.length > 50) {
      user.history = user.history.slice(0, 50);
    }
    await user.save();

    const result = await aiService.processCommand(
      command,
      user.assistantName || "Assistant",
      user.name || "User"
    );

    return result;
  }
}

export default new UserService();
