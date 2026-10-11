import axios from "axios";
import moment from "moment";
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";

/**
 * Service to process natural language voice commands via Gemini AI
 */
class AiService {
  /**
   * Process a user voice command through Gemini and execute intent logic
   * @param {string} command - User spoken text
   * @param {string} assistantName - Name of the assistant
   * @param {string} userName - Name of the user
   * @returns {Promise<{type: string, userInput: string, response: string}>}
   */
  async processCommand(command, assistantName = "Assistant", userName = "User") {
    if (!command || !command.trim()) {
      throw new ApiError(400, "Voice command cannot be empty");
    }

    const apiUrl = env.GEMINI_API_URL;
    if (!apiUrl) {
      throw new ApiError(500, "GEMINI_API_URL is not configured in backend environment");
    }

    const prompt = `You are a helpful, intelligent voice assistant named "${assistantName}" created by "${userName}".
You must behave like a voice-enabled assistant.

Your task is to understand the user's natural language input and respond ONLY with a valid JSON object in this exact schema:
{
  "type": "general" | "google-search" | "youtube-search" | "youtube-play" | "get-time" | "get-date" | "get-day" | "get-month" | "calculator-open" | "instagram-open" | "facebook-open" | "weather-show",
  "userInput": "<clean search or query string without assistant name or search prefixes>",
  "response": "<a short, conversational, voice-friendly response under 2 sentences to read out loud>"
}

Intent descriptions:
- "general": general knowledge, factual query, or conversational banter. Provide concise spoken answer in "response".
- "google-search": user specifically requests a web search. "userInput" must contain only the search query.
- "youtube-search": user wants to search something on YouTube. "userInput" contains only query.
- "youtube-play": user wants to play music or video directly on YouTube. "userInput" contains song/video name.
- "calculator-open": user wants to open the calculator.
- "instagram-open": user wants to open Instagram.
- "facebook-open": user wants to open Facebook.
- "weather-show": user wants to check weather forecast.
- "get-time": user asks for current time.
- "get-date": user asks for today's date.
- "get-day": user asks what day it is.
- "get-month": user asks for current month.

Important rules:
- If asked who created or made you, mention "${userName}".
- Return ONLY raw JSON without markdown code fences or comments.

User Input: "${command}"`;

    try {
      const response = await axios.post(
        apiUrl,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );

      const rawText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Clean markdown code blocks if returned
      const cleaned = rawText
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

      const jsonMatch = cleaned.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        return {
          type: "general",
          userInput: command,
          response: `I heard: ${command}. How else can I help you?`,
        };
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return this.formatAssistantResponse(parsed, command);
    } catch (error) {
      console.error("AI Service Error:", error.message);
      // Graceful fallback for offline/rate-limit issues so UI does not crash
      return {
        type: "general",
        userInput: command,
        response: "I'm having trouble processing that right now, but I'm here to help. Could you repeat that?",
      };
    }
  }

  /**
   * Enriches intent results with real-time date/time calculations
   */
  formatAssistantResponse(gemResult, originalCommand) {
    const type = gemResult.type || "general";
    const userInput = gemResult.userInput || originalCommand;

    switch (type) {
      case "get-date":
        return {
          type,
          userInput,
          response: `Today's date is ${moment().format("MMMM Do, YYYY")}`,
        };
      case "get-time":
        return {
          type,
          userInput,
          response: `The current time is ${moment().format("h:mm A")}`,
        };
      case "get-day":
        return {
          type,
          userInput,
          response: `Today is ${moment().format("dddd")}`,
        };
      case "get-month":
        return {
          type,
          userInput,
          response: `The current month is ${moment().format("MMMM")}`,
        };
      case "google-search":
      case "youtube-search":
      case "youtube-play":
      case "calculator-open":
      case "instagram-open":
      case "facebook-open":
      case "weather-show":
      case "general":
      default:
        return {
          type,
          userInput,
          response: gemResult.response || "Here is what I found.",
        };
    }
  }
}

export default new AiService();
