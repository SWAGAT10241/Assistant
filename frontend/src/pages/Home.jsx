import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgMenuRight } from "react-icons/cg";
import useAuth from "../hooks/useAuth";
import useSpeechAssistant from "../hooks/useSpeechAssistant";
import VoiceVisualizer from "../components/assistant/VoiceVisualizer";
import HistoryDrawer from "../components/assistant/HistoryDrawer";

export function Home() {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCommandSuccess = (transcript) => {
    // Append newly recorded command to local user history immediately
    if (user && transcript) {
      setUser((prev) => ({
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
      {/* Header Menu Button */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 transition-colors z-30 cursor-pointer shadow-lg"
        aria-label="Open control panel"
      >
        <CgMenuRight className="w-6 h-6" />
      </button>

      {/* Browser Speech API Warning if unsupported */}
      {!isSupported && (
        <div className="absolute top-6 left-6 right-20 bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm px-4 py-2.5 rounded-2xl backdrop-blur-md z-20">
          ⚠️ Speech Recognition is not supported on this browser. For voice features, please use Google Chrome or Edge.
        </div>
      )}

      {/* Microphone Permission Warning */}
      {speechError && (
        <div className="absolute top-20 left-6 right-6 max-w-lg mx-auto bg-red-500/20 border border-red-500/40 text-red-200 text-xs sm:text-sm px-4 py-2.5 rounded-2xl backdrop-blur-md z-20 text-center">
          {speechError}
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
