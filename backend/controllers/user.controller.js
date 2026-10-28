import userService from "../services/user.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Controller to fetch the currently authenticated user's profile
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.userId);
  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});

/**
 * Controller to update assistant configuration (name and avatar)
 */
export const updateAssistant = asyncHandler(async (req, res) => {
  const { assistantName, imageUrl } = req.body;
  const user = await userService.updateAssistant(req.userId, {
    assistantName,
    imageUrl,
    file: req.file,
  });

  return res.status(200).json(
    new ApiResponse(200, user, "Assistant configuration updated successfully")
  );
});

/**
 * Controller to process a natural language query for the assistant
 */
export const askToAssistant = asyncHandler(async (req, res) => {
  const { command } = req.body;
  const result = await userService.askAssistant(req.userId, command);

  return res.status(200).json(
    new ApiResponse(200, result, "Command processed successfully")
  );
});