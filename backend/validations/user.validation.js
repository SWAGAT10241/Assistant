import { isNonEmptyString } from "../middlewares/validate.middleware.js";

export const askCommandValidator = (req) => {
  const errors = [];
  const { command } = req.body || {};

  if (!isNonEmptyString(command)) {
    errors.push("Command text is required.");
  }

  return errors;
};

export const updateAssistantValidator = (req) => {
  const errors = [];
  const { assistantName, imageUrl } = req.body || {};

  if (assistantName !== undefined && !isNonEmptyString(assistantName)) {
    errors.push("Assistant name cannot be empty.");
  }

  if (imageUrl !== undefined && typeof imageUrl !== "string") {
    errors.push("Image URL must be a string.");
  }

  return errors;
};

