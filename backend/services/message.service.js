import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import conversationService from "./conversation.service.js";
import ApiError from "../utils/apiError.js";

class MessageService {
  async sendMessage(userId, { conversationId, role, content, type = "text", attachments = [] }) {
    if (!conversationId || !content) {
      throw new ApiError(400, "Conversation ID and content are required");
    }

    // Verify user owns this conversation
    await conversationService.getConversationById(userId, conversationId);

    const message = await Message.create({
      conversationId,
      role: role || "user",
      content,
      type,
      attachments,
    });

    // Update conversation lastMessage
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: content.slice(0, 100),
    });

    return message;
  }

  async getMessages(userId, conversationId) {
    await conversationService.getConversationById(userId, conversationId);
    return await Message.find({ conversationId }).sort({ createdAt: 1 });
  }

  async deleteMessage(userId, messageId) {
    const message = await Message.findById(messageId);
    if (!message) {
      throw new ApiError(404, "Message not found");
    }

    await conversationService.getConversationById(userId, message.conversationId);
    await Message.findByIdAndDelete(messageId);

    return { message: "Message deleted successfully" };
  }

  async togglePinMessage(userId, messageId) {
    const message = await Message.findById(messageId);
    if (!message) {
      throw new ApiError(404, "Message not found");
    }

    await conversationService.getConversationById(userId, message.conversationId);
    message.isPinned = !message.isPinned;
    await message.save();

    return message;
  }
}

export default new MessageService();
