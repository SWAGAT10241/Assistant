import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { StringTilt, StringMagnetic, StringSpotlight } from "@fiddle-digital/string-tune";
import useAuth from "../hooks/useAuth";
import useSpeechAssistant from "../hooks/useSpeechAssistant";
import useStringTune from "../hooks/useStringTune";
import VoiceVisualizer from "../components/assistant/VoiceVisualizer";
import HistoryDrawer from "../components/assistant/HistoryDrawer";
import Alert from "../components/common/Alert";
import { Button } from "../components/ui/button";

export function Home() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Initialize StringTune modular animations for the interactive voice home view
  useStringTune([StringTilt, StringMagnetic, StringSpotlight]);

  const handleCommandSuccess = (transcript) => {
    // Append newly recorded command to local user history immediately
    if (transcript && updateUser) {
      updateUser((prev) => ({
        ...prev,
        history: [transcript, ...(prev?.history || [])],
      }));
    }
  };

  const {
    isListening,
    isSpeaking,
    userText,
    aiText,
    speechError,
    isSupported,
  } = useSpeechAssistant({
    assistantName: user?.assistantName || "Assistant",
    userName: user?.name || "User",
    onCommandSuccess: handleCommandSuccess,
  });

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black via-gray-950 to-[#02023d] flex flex-col justify-center items-center px-4 py-8 overflow-hidden relative select-none">
      {/* Header Menu Button powered by shadcn Button */}
      <Button
        variant="outline"
        size="icon"
        string="magnetic"
        string-magnetic-strength="0.3"
        onClick={() => setDrawerOpen(true)}
        className="absolute top-6 right-6 h-11 w-11 rounded-2xl bg-card/60 backdrop-blur-xl border-border/80 text-foreground hover:bg-card/90 transition-colors z-30 cursor-pointer shadow-xl"
        aria-label="Open control panel"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Browser Speech API Warning if unsupported */}
      {!isSupported && (
        <div className="absolute top-6 left-6 right-20 max-w-xl z-20">
          <Alert variant="warning">
            Speech Recognition is not supported on this browser. For voice features, please use Google Chrome or Edge.
          </Alert>
        </div>
      )}

      {/* Microphone Permission Warning */}
      {speechError && (
        <div className="absolute top-20 left-6 right-6 max-w-lg mx-auto z-20">
          <Alert variant="error">
            {speechError}
          </Alert>
        </div>
      )}

      {/* Central Interactive Voice Visualizer */}
      <VoiceVisualizer
        assistantImage={user?.assistantImage}
        assistantName={user?.assistantName}
        isListening={isListening}
        isSpeaking={isSpeaking}
        userText={userText}
        aiText={aiText}
      />

      {/* Side Control & History Drawer */}
      <HistoryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userName={user?.name}
        history={user?.history}
        onCustomize={() => navigate("/customize")}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default Home;
