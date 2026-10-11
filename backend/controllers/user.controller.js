import userService from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.userId);
  // Support both direct object and standard wrapper
  return res.status(200).json(user);
});

export const updateAssistant = asyncHandler(async (req, res) => {
  const { assistantName, imageUrl } = req.body;
  const user = await userService.updateAssistant(req.userId, {
    assistantName,
    imageUrl,
    file: req.file,
  });

  return res.status(200).json(user);
});

export const askToAssistant = asyncHandler(async (req, res) => {
  const { command } = req.body;
  const result = await userService.askAssistant(req.userId, command);

  // Return formatted intent and speech response for frontend
  return res.status(200).json(result);
});

// Also create a file user.controllers.js re-exporting this to prevent any broken import