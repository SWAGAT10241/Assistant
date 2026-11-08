import React from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import aiImg from "../../assets/ai.gif";
import userImg from "../../assets/user.gif";
import { cn } from "../../lib/utils";

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
          className={cn(
            "absolute -inset-4 rounded-3xl blur-2xl transition-all duration-700",
            isSpeaking
              ? "bg-purple-600/40 opacity-100 scale-105 animate-pulse"
              : isListening
              ? "bg-primary/40 opacity-100 scale-105 animate-pulse"
              : "bg-primary/10 opacity-30"
          )}
        />

        <Card
          string="tilt"
          string-tilt-max="10"
          className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-3xl overflow-hidden border-2 border-border/80 shadow-2xl bg-card/80 backdrop-blur-xl cursor-pointer p-0"
        >
          <img
            src={assistantImage || aiImg}
            alt={assistantName || "Assistant"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Status Badge using shadcn Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Badge
              variant="outline"
              className="px-3.5 py-1.5 rounded-full bg-background/80 backdrop-blur-md border-border/80 flex items-center gap-2 shadow-lg"
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  isSpeaking
                    ? "bg-purple-400 animate-ping"
                    : isListening
                    ? "bg-emerald-400 animate-pulse"
                    : "bg-primary"
                )}
              />
              <span className="text-xs font-semibold tracking-wide uppercase">
                {isSpeaking ? "Speaking" : isListening ? "Listening..." : "Ready"}
              </span>
            </Badge>
          </div>
        </Card>
      </div>

      {/* Assistant Title */}
      <div className="text-center space-y-1">
        <h2 className="text-foreground text-3xl font-bold tracking-tight">
          {assistantName ? `I'm ${assistantName}` : "I'm your Assistant"}
        </h2>
        <p className="text-muted-foreground text-sm">
          {isSpeaking
            ? "Responding to your query..."
            : isListening
            ? `Say "${assistantName || "Assistant"}" to give a command`
            : "Click or speak to give a command"}
        </p>
      </div>

      {/* Transcript or AI Response speech bubble using shadcn Card */}
      {(userText || aiText) && (
        <div className="w-full px-4 animate-in fade-in-50 zoom-in-95 duration-200">
          <Card className="p-4 bg-card/80 backdrop-blur-xl border-border/70 text-center shadow-xl max-w-md mx-auto">
            {userText && (
              <p className="text-muted-foreground italic text-sm">
                "{userText}"
              </p>
            )}
            {aiText && (
              <p className="text-foreground font-medium text-base mt-1">
                {aiText}
              </p>
            )}
          </Card>
        </div>
      )}

      {/* Audio Wave / State Gif */}
      <div className="h-16 flex items-center justify-center">
        {isSpeaking ? (
          <img
            src={aiImg}
            alt="Speaking audio wave"
            className="h-14 opacity-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
          />
        ) : (
          <img
            src={userImg}
            alt="Listening indicator"
            className={cn(
              "h-14 transition-opacity duration-300",
              isListening ? "opacity-90" : "opacity-30"
            )}
          />
        )}
      </div>
    </div>
  );
}

export default VoiceVisualizer;
