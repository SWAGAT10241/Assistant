import { isEmail, isNonEmptyString } from "../middlewares/validate.middleware.js";

export const registerValidator = (req) => {
  const errors = [];
  const { name, email, password } = req.body || {};

  if (!isNonEmptyString(name)) {
    errors.push("Full name is required.");
  }

  if (!isEmail(email)) {
    errors.push("A valid email address is required.");
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  return errors;
};

export const loginValidator = (req) => {
  const errors = [];
  const { email, password } = req.body || {};

  if (!isEmail(email)) {
    errors.push("A valid email address is required.");
  }

  if (!isNonEmptyString(password)) {
    errors.push("Password is required.");
  }

  return errors;
};

