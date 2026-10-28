/**
 * Service to execute browser and system actions based on assistant AI intents
 */
class IntentExecutorService {
  /**
   * Dispatches and performs the appropriate browser action for an intent
   * @param {{ type: string, userInput: string }} intentPayload
   */
  execute(intentPayload) {
    if (!intentPayload || !intentPayload.type) return;

    const { type, userInput = "" } = intentPayload;
    const encodedQuery = encodeURIComponent(userInput.trim());

    switch (type) {
      case "google-search":
        window.open(`https://www.google.com/search?q=${encodedQuery}`, "_blank", "noopener,noreferrer");
        break;

      case "calculator-open":
        window.open("https://www.google.com/search?q=calculator", "_blank", "noopener,noreferrer");
        break;

      case "instagram-open":
        window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
        break;

      case "facebook-open":
        window.open("https://www.facebook.com", "_blank", "noopener,noreferrer");
        break;

      case "weather-show":
        window.open(
          encodedQuery
            ? `https://www.google.com/search?q=weather+${encodedQuery}`
            : "https://www.google.com/search?q=weather",
          "_blank",
          "noopener,noreferrer"
        );
        break;

      case "youtube-search":
      case "youtube-play":
        window.open(
          `https://www.youtube.com/results?search_query=${encodedQuery}`,
          "_blank",
          "noopener,noreferrer"
        );
        break;

      default:
        // No browser action required for general conversational queries
        break;
    }
  }
}

export const intentExecutorService = new IntentExecutorService();
export default intentExecutorService;

