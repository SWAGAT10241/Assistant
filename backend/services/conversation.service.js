import Conversation from "../models/conversation.model.js";
import Assistant from "../models/assistant.model.js";
import Message from "../models/message.model.js";
import ApiError from "../utils/apiError.js";

class ConversationService {
  async createConversation(userId, assistantId) {
    if (!assistantId) {
      throw new ApiError(400, "Assistant ID is required");
    }

    const assistant = await Assistant.findOne({ _id: assistantId, userId });
    if (!assistant) {
      throw new ApiError(404, "Assistant not found or unauthorized");
    }

    const conversation = await Conversation.create({
      assistantId,
      title: "New Conversation",
      lastMessage: "",
    });

    return conversation;
  }

  async getConversations(userId) {
    const assistants = await Assistant.find({ userId }).select("_id");
    const assistantIds = assistants.map((a) => a._id);

    return await Conversation.find({ assistantId: { $in: assistantIds } })
      .populate("assistantId", "name avatar icon")
      .sort({ updatedAt: -1 });
  }

  async getConversationById(userId, conversationId) {
    const conversation = await Conversation.findById(conversationId).populate("assistantId");
    if (!conversation) {
      throw new ApiError(404, "Conversation not found");
    }

    if (conversation.assistantId?.userId?.toString() !== userId.toString()) {
      throw new ApiError(403, "Unauthorized to access this conversation");
    }

    return conversation;
  }

  async updateConversation(userId, conversationId, title) {
    if (!title || !title.trim()) {
      throw new ApiError(400, "Conversation title is required");
    }

    const conversation = await this.getConversationById(userId, conversationId);
    conversation.title = title.trim();
    await conversation.save();

    return conversation;
  }

  async deleteConversation(userId, conversationId) {
    await this.getConversationById(userId, conversationId);

    await Message.deleteMany({ conversationId });
    await Conversation.findByIdAndDelete(conversationId);

    return { message: "Conversation and messages deleted successfully" };
  }
}

export default new ConversationService();
