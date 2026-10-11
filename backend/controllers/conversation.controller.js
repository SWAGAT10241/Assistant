import conversationService from "../services/conversation.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createConversation = asyncHandler(async (req, res) => {
  const { assistantId } = req.body;
  const conversation = await conversationService.createConversation(
    req.userId,
    assistantId
  );
  return res.status(201).json(
    new ApiResponse(201, conversation, "Conversation created successfully")
  );
});

export const getConversations = asyncHandler(async (req, res) => {
  const conversations = await conversationService.getConversations(req.userId);
  return res.status(200).json(
    new ApiResponse(200, conversations, "Conversations fetched successfully")
  );
});

export const getConversationById = asyncHandler(async (req, res) => {
  const conversation = await conversationService.getConversationById(
    req.userId,
    req.params.id
  );
  return res.status(200).json(
    new ApiResponse(200, conversation, "Conversation fetched successfully")
  );
});

export const updateConversation = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const conversation = await conversationService.updateConversation(
    req.userId,
    req.params.id,
    title
  );
  return res.status(200).json(
    new ApiResponse(200, conversation, "Conversation updated successfully")
  );
});

export const deleteConversation = asyncHandler(async (req, res) => {
  const result = await conversationService.deleteConversation(
    req.userId,
    req.params.id
  );
  return res.status(200).json(
    new ApiResponse(200, result, "Conversation deleted successfully")
  );
});
