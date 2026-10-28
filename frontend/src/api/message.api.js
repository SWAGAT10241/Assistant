import apiClient from "./apiClient";

export const messageApi = {
  /**
   * Send a new message to a conversation thread
   * @param {{ conversationId: string, role?: string, content: string, type?: string }} data
   */
  async sendMessage(data) {
    const response = await apiClient.post("/api/messages", data);
    return response.data?.data || response.data;
  },

  /**
   * Fetch all messages in a conversation
   * @param {string} conversationId
   */
  async getMessages(conversationId) {
    const response = await apiClient.get(`/api/messages/${conversationId}`);
    return response.data?.data || response.data;
  },

  /**
   * Delete a message by ID
   * @param {string} id
   */
  async deleteMessage(id) {
    const response = await apiClient.delete(`/api/messages/${id}`);
    return response.data?.data || response.data;
  },

  /**
   * Toggle pinned status of a message
   * @param {string} id
   */
  async togglePinMessage(id) {
    const response = await apiClient.patch(`/api/messages/${id}/pin`);
    return response.data?.data || response.data;
  },
};

export default messageApi;

