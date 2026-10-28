import ApiError from "../utils/apiError.js";

/**
 * Higher-order middleware function to run validator schemas on req
 * @param {Function} validatorFn - Function receiving req that returns an array of error messages
 */
export const validate = (validatorFn) => {
  return (req, res, next) => {
    const errors = validatorFn(req);
    if (errors && errors.length > 0) {
      throw new ApiError(400, "Validation Error", errors);
    }
    next();
  };
};

/**
 * Common input validation helpers
 */
export const isEmail = (str) => {
  if (typeof str !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
};

export const isNonEmptyString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

