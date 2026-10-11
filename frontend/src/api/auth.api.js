import apiClient from "./apiClient";

export const authApi = {
  /**
   * Register a new user
   * @param {{ name: string, email: string, password: string }} data
   */
  async register(data) {
    const response = await apiClient.post("/api/auth/register", data);
    return response.data?.data || response.data;
  },

  /**
   * Log in user
   * @param {{ email: string, password: string }} data
   */
  async login(data) {
    const response = await apiClient.post("/api/auth/login", data);
    return response.data?.data || response.data;
  },

  /**
   * Log out current user
   */
  async logout() {
    const response = await apiClient.post("/api/auth/logout");
    return response.data;
  },

  /**
   * Get current authenticated user session
   */
  async getCurrentUser() {
    const response = await apiClient.get("/api/user/current");
    return response.data?.data || response.data;
  },
};

export default authApi;
