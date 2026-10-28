import apiClient from "./apiClient";

export const conversationApi = {
  /**
   * Create a new conversation thread with an assistant
   * @param {{ assistantId: string }} data
   */
  async createConversation(data) {
    const response = await apiClient.post("/api/conversations", data);
    return response.data?.data || response.data;
  },

  /**
   * Fetch all conversation threads for current user
   */
  async getConversations() {
    const response = await apiClient.get("/api/conversations");
    return response.data?.data || response.data;
  },

  /**
   * Fetch a single conversation thread by ID
   * @param {string} id
   */
  async getConversationById(id) {
    const response = await apiClient.get(`/api/conversations/${id}`);
    return response.data?.data || response.data;
  },

  /**
   * Update conversation title
   * @param {string} id
   * @param {{ title: string }} data
   */
  async updateConversation(id, data) {
    const response = await apiClient.put(`/api/conversations/${id}`, data);
    return response.data?.data || response.data;
  },

  /**
   * Delete conversation thread
   * @param {string} id
   */
  async deleteConversation(id) {
    const response = await apiClient.delete(`/api/conversations/${id}`);
    return response.data?.data || response.data;
  },
};

export default conversationApi;

