import assistantService from "../services/assistant.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createAssistant = asyncHandler(async (req, res) => {
  const assistant = await assistantService.createAssistant(req.userId, req.body);
  return res.status(201).json(
    new ApiResponse(201, assistant, "Assistant created successfully")
  );
});

export const getAssistants = asyncHandler(async (req, res) => {
  const assistants = await assistantService.getAssistants(req.userId);
  return res.status(200).json(
    new ApiResponse(200, assistants, "Assistants fetched successfully")
  );
});

export const getAssistantById = asyncHandler(async (req, res) => {
  const assistant = await assistantService.getAssistantById(req.userId, req.params.id);
  return res.status(200).json(
    new ApiResponse(200, assistant, "Assistant fetched successfully")
  );
});

export const updateAssistant = asyncHandler(async (req, res) => {
  const assistant = await assistantService.updateAssistant(
    req.userId,
    req.params.id,
    req.body
  );
  return res.status(200).json(
    new ApiResponse(200, assistant, "Assistant updated successfully")
  );
});

export const deleteAssistant = asyncHandler(async (req, res) => {
  const result = await assistantService.deleteAssistant(req.userId, req.params.id);
  return res.status(200).json(new ApiResponse(200, result, "Assistant deleted successfully"));
});

export const toggleVisibility = asyncHandler(async (req, res) => {
  const assistant = await assistantService.toggleVisibility(req.userId, req.params.id);
  return res.status(200).json(
    new ApiResponse(200, assistant, "Visibility toggled successfully")
  );
});
