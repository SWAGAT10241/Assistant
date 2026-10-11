import Assistant from "../models/assistant.model.js";
import ApiError from "../utils/apiError.js";

class AssistantService {
  async createAssistant(userId, data) {
    const { name, description, icon, avatar, systemPrompt, defaultModel } = data;

    if (!name || !name.trim()) {
      throw new ApiError(400, "Assistant name is required");
    }

    const assistant = await Assistant.create({
      userId,
      name: name.trim(),
      description,
      icon,
      avatar,
      systemPrompt,
      defaultModel: defaultModel || "gemini-flash",
    });

    return assistant;
  }

  async getAssistants(userId) {
    return await Assistant.find({ userId }).sort({ createdAt: -1 });
  }

  async getAssistantById(userId, id) {
    const assistant = await Assistant.findOne({ _id: id, userId });
    if (!assistant) {
      throw new ApiError(404, "Assistant not found");
    }
    return assistant;
  }

  async updateAssistant(userId, id, updateData) {
    const assistant = await Assistant.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!assistant) {
      throw new ApiError(404, "Assistant not found");
    }

    return assistant;
  }

  async deleteAssistant(userId, id) {
    const assistant = await Assistant.findOneAndDelete({
      _id: id,
      userId,
      isDefault: false,
    });

    if (!assistant) {
      throw new ApiError(404, "Assistant not found or default assistant cannot be deleted");
    }

    return { message: "Assistant deleted successfully" };
  }

  async toggleVisibility(userId, id) {
    const assistant = await Assistant.findOne({ _id: id, userId });
    if (!assistant) {
      throw new ApiError(404, "Assistant not found");
    }

    assistant.visibility = assistant.visibility === "private" ? "public" : "private";
    await assistant.save();
    return assistant;
  }
}

export default new AssistantService();
