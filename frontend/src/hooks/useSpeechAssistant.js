import { useState, useEffect, useRef, useCallback } from "react";
import assistantApi from "../api/assistant.api";

export function useSpeechAssistant({ assistantName = "Assistant", userName = "User", onCommandSuccess }) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [speechError, setSpeechError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false);
  const isMountedRef = useRef(true);

  /**
   * Speak response out loud using SpeechSynthesis
   */
  const speak = useCallback(
    (text, callback) => {
      if (!window.speechSynthesis || !text) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";

      // Select high quality voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find((v) => v.lang === "hi-IN") ||
        voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
        voices.find((v) => v.lang.startsWith("en"));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      isSpeakingRef.current = true;
      setIsSpeaking(true);

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        setAiText("");
        if (callback) callback();
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis error:", e);
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        if (callback) callback();
      };

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  /**
   * Start speech recognition
   */
  const startListening = useCallback(() => {
    if (!recognitionRef.current || isSpeakingRef.current || isRecognizingRef.current) {
      return;
    }
    try {
      recognitionRef.current.start();
    } catch (err) {
      if (err.name !== "InvalidStateError") {
        console.warn("Start recognition error:", err.message);
      }
    }
  }, []);

  /**
   * Stop speech recognition
   */
  const stopListening = useCallback(() => {
    if (recognitionRef.current && isRecognizingRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.warn("Stop recognition error:", err.message);
      }
    }
  }, []);

  /**
   * Execute browser actions based on assistant intent
   */
  const executeIntent = useCallback(
    (data) => {
      const { type, userInput, response } = data;

      // Speak response out loud, then resume listening
      speak(response, () => {
        if (isMountedRef.current) {
          setTimeout(() => startListening(), 800);
        }
      });

      if (!type) return;

      const encodedQuery = encodeURIComponent(userInput || "");

      switch (type) {
        case "google-search":
          window.open(`https://www.google.com/search?q=${encodedQuery}`, "_blank");
          break;
        case "calculator-open":
          window.open(`https://www.google.com/search?q=calculator`, "_blank");
          break;
        case "instagram-open":
          window.open(`https://www.instagram.com`, "_blank");
          break;
        case "facebook-open":
          window.open(`https://www.facebook.com`, "_blank");
          break;
        case "weather-show":
          window.open(`https://www.google.com/search?q=weather`, "_blank");
          break;
        case "youtube-search":
        case "youtube-play":
          window.open(
            `https://www.youtube.com/results?search_query=${encodedQuery}`,
            "_blank"
          );
          break;
        default:
          break;
      }
    },
    [speak, startListening]
  );

  // Initialize Speech Recognition
  useEffect(() => {
    isMountedRef.current = true;
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setSpeechError(
        "Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onstart = () => {
      isRecognizingRef.current = true;
      setIsListening(true);
      setSpeechError(null);
    };

    recognition.onend = () => {
      isRecognizingRef.current = false;
      setIsListening(false);
      // Auto-restart if still mounted and not speaking
      if (isMountedRef.current && !isSpeakingRef.current) {
        setTimeout(() => {
          if (isMountedRef.current && !isSpeakingRef.current) {
            startListening();
          }
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      isRecognizingRef.current = false;
      setIsListening(false);

      if (event.error === "not-allowed") {
        setSpeechError("Microphone access was denied. Please allow microphone permissions.");
      } else if (event.error !== "aborted") {
        // Attempt restart for non-fatal errors
        if (isMountedRef.current && !isSpeakingRef.current) {
          setTimeout(() => {
            if (isMountedRef.current) startListening();
          }, 1200);
        }
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();

      const triggerName = (assistantName || "assistant").toLowerCase();
      const spokeTrigger = transcript.toLowerCase().includes(triggerName);

      // Trigger if user called assistant name or speaks directly
      if (spokeTrigger || triggerName === "assistant") {
        stopListening();
        setUserText(transcript);

        try {
          const data = await assistantApi.askAssistant(transcript);
          setAiText(data.response || "Here is what I found.");
          setUserText("");
          executeIntent(data);
          if (onCommandSuccess) onCommandSuccess(transcript);
        } catch (err) {
          const errorMsg = err.message || "I encountered an error understanding that.";
          speak(errorMsg);
          setAiText(errorMsg);
        }
      }
    };

    // Initial greeting
    const timer = setTimeout(() => {
      if (userName && window.speechSynthesis) {
        speak(`Hello ${userName}, how can I help you today?`, () => {
          startListening();
        });
      } else {
        startListening();
      }
    }, 800);

    return () => {
      isMountedRef.current = false;
      clearTimeout(timer);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [assistantName, userName, executeIntent, onCommandSuccess, speak, startListening, stopListening]);

  return {
    isListening,
    isSpeaking,
    userText,
    aiText,
    speechError,
    isSupported,
    startListening,
    stopListening,
    speak,
  };
}

export default useSpeechAssistant;
