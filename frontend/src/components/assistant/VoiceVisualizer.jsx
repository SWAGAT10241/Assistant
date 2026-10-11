import React from "react";
import aiImg from "../../assets/ai.gif";
import userImg from "../../assets/user.gif";

export function VoiceVisualizer({
  assistantImage,
  assistantName,
  isListening,
  isSpeaking,
  userText,
  aiText,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg mx-auto z-10">
      {/* Avatar Container with Animated Glow */}
      <div className="relative group">
        {/* Glow rings */}
        <div
          className={`absolute -inset-4 rounded-3xl blur-xl transition-all duration-700 ${
            isSpeaking
              ? "bg-purple-600/40 opacity-100 scale-105 animate-pulse"
              : isListening
              ? "bg-blue-600/40 opacity-100 scale-105 animate-pulse"
              : "bg-blue-900/20 opacity-40"
          }`}
        />

        <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black/60 backdrop-blur-md">
          <img
            src={assistantImage || aiImg}
            alt={assistantName || "Assistant"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Status Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isSpeaking
                  ? "bg-purple-400 animate-ping"
                  : isListening
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-blue-400"
              }`}
            />
            <span className="text-white text-xs font-medium tracking-wide uppercase">
              {isSpeaking ? "Speaking" : isListening ? "Listening..." : "Ready"}
            </span>
          </div>
        </div>
      </div>

      {/* Assistant Title */}
      <div className="text-center">
        <h2 className="text-white text-2xl font-bold tracking-tight">
          {assistantName ? `I'm ${assistantName}` : "I'm your Assistant"}
        </h2>
        <p className="text-blue-300/80 text-sm mt-1">
          {isSpeaking
            ? "Responding to your query..."
            : isListening
            ? `Say "${assistantName || "Assistant"}" to give a command`
            : "Click to start voice command"}
        </p>
      </div>

      {/* Transcript or AI Response speech bubble */}
      {(userText || aiText) && (
        <div className="w-full px-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center text-white text-base shadow-lg animate-fadeIn max-w-md mx-auto">
            {userText && <p className="text-gray-300 italic">"{userText}"</p>}
            {aiText && <p className="text-white font-medium">{aiText}</p>}
          </div>
        </div>
      )}

      {/* Audio Wave / State Gif */}
      <div className="h-16 flex items-center justify-center">
        {isSpeaking ? (
          <img src={aiImg} alt="Speaking audio wave" className="h-14 opacity-90" />
        ) : (
          <img
            src={userImg}
            alt="Listening indicator"
            className={`h-14 transition-opacity duration-300 ${
              isListening ? "opacity-90" : "opacity-40"
            }`}
          />
        )}
      </div>
    </div>
  );
}

export default VoiceVisualizer;
