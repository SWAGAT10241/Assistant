import axios from "axios";
import envConfig from "../config/env.config";

const apiClient = axios.create({
  baseURL: envConfig.API_BASE_URL,
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to normalize errors and unpack responses
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Extract server message cleanly
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "An unexpected server error occurred. Please try again.";

    const formattedError = new Error(message);
    formattedError.statusCode = error.response?.status || 500;
    formattedError.raw = error;
    formattedError.response = error.response;

    return Promise.reject(formattedError);
  }
);

export default apiClient;
