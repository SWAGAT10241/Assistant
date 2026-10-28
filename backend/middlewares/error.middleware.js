import ApiError from "../utils/apiError.js";
import env from "../config/env.js";

/**
 * 404 Not Found Middleware for unmatched routes
 */
export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Route not found - ${req.originalUrl}`);
  next(error);
};

/**
 * Centralized Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  let error = err;

  // Handle Mongoose CastError (e.g. invalid ObjectId)
  if (err.name === "CastError") {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // Handle Mongoose Validation Errors
  else if (err.name === "ValidationError") {
    const messages = Object.values(err.errors || {}).map((e) => e.message);
    error = new ApiError(400, "Validation Error", messages);
  }

  // Handle Mongoose duplicate key error (code 11000)
  else if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    error = new ApiError(400, `An account with that ${field} already exists.`);
  }

  // Handle JWT errors
  else if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid authorization token");
  } else if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Authorization token has expired. Please sign in again.");
  }

  // Handle Multer upload errors
  else if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      error = new ApiError(400, "File size exceeds the 5MB upload limit.");
    } else {
      error = new ApiError(400, `File upload error: ${err.message}`);
    }
  }

  // Normalize unknown errors to ApiError
  else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    statusCode: error.statusCode,
    success: false,
    message: error.message,
    errors: error.errors || [],
    ...(env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export default errorHandler;
