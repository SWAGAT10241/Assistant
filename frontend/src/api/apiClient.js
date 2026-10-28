import axios from "axios";
import envConfig from "../config/env.config";

/**
 * Pre-configured Axios instance for all backend API communication
 */
const apiClient = axios.create({
  baseURL: envConfig.API_BASE_URL,
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to normalize errors and enrich metadata
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle offline / connection refused
    if (!error.response) {
      const offlineMsg = error.code === "ECONNABORTED"
        ? "Request timed out. Please check your network connection."
        : "Unable to reach server. Please check your internet connection.";

      const networkError = new Error(offlineMsg);
      networkError.statusCode = 0;
      networkError.isNetworkError = true;
      return Promise.reject(networkError);
    }

    // Extract server message cleanly
    const serverData = error.response.data;
    let message =
      serverData?.message ||
      serverData?.error ||
      error.message ||
      "An unexpected server error occurred. Please try again.";

    // If server provided array of validation errors, join them
    if (Array.isArray(serverData?.errors) && serverData.errors.length > 0) {
      message = serverData.errors.join(". ");
    }

    const formattedError = new Error(message);
    formattedError.statusCode = error.response.status;
    formattedError.errors = serverData?.errors || [];
    formattedError.raw = error;
    formattedError.response = error.response;

    return Promise.reject(formattedError);
  }
);

export default apiClient;
