import apiClient from "./apiClient";

export const assistantApi = {
  /**
   * Update assistant configuration (image file or URL, and name)
   * @param {{ assistantName: string, file?: File, imageUrl?: string }} data
   */
  async updateAssistant({ assistantName, file, imageUrl }) {
    const formData = new FormData();
    if (assistantName) {
      formData.append("assistantName", assistantName);
    }
    if (file) {
      formData.append("assistantImage", file);
    } else if (imageUrl) {
      formData.append("imageUrl", imageUrl);
    }

    const response = await apiClient.post("/api/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data?.data || response.data;
  },

  /**
   * Send a voice/text command to the assistant
   * @param {string} command
   */
  async askAssistant(command) {
    const response = await apiClient.post("/api/user/asktoassistant", {
      command,
    });
    return response.data?.data || response.data;
  },
};

export default assistantApi;
