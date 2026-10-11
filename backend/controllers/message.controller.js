import messageService from "../services/message.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const message = await messageService.sendMessage(req.userId, req.body);
  return res.status(201).json(
    new ApiResponse(201, message, "Message sent successfully")
  );
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await messageService.getMessages(
    req.userId,
    req.params.conversationId
  );
  return res.status(200).json(
    new ApiResponse(200, messages, "Messages fetched successfully")
  );
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const result = await messageService.deleteMessage(req.userId, req.params.id);
  return res.status(200).json(
    new ApiResponse(200, result, "Message deleted successfully")
  );
});

export const togglePinMessage = asyncHandler(async (req, res) => {
  const message = await messageService.togglePinMessage(req.userId, req.params.id);
  return res.status(200).json(
    new ApiResponse(200, message, "Message pin status updated")
  );
});
