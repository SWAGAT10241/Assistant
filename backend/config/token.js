import jwt from "jsonwebtoken";
import env from "./env.js";
import ApiError from "../utils/apiError.js";

const genToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    throw new ApiError(500, "Failed to generate authentication token", [
      error.message,
    ]);
  }
};

export default genToken;