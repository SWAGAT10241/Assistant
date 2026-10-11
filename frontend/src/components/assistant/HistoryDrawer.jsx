import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FiLogOut, FiSettings, FiClock } from "react-icons/fi";
import Button from "../common/Button";

export function HistoryDrawer({
  isOpen,
  onClose,
  userName,
  history = [],
  onCustomize,
  onLogout,
}) {
  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Slide-out Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[380px] bg-gray-950/90 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col gap-6 z-50 transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h2 className="text-white text-lg font-bold">Control Panel</h2>
            <p className="text-gray-400 text-xs">Logged in as {userName || "User"}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <RxCross1 className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-3">
          <Button
            variant="glass"
            size="md"
            icon={FiSettings}
            onClick={() => {
              onClose();
              onCustomize();
            }}
            className="w-full justify-start text-left"
          >
            Customize Assistant
          </Button>

          <Button
            variant="danger"
            size="md"
            icon={FiLogOut}
            onClick={onLogout}
            className="w-full justify-start text-left"
          >
            Log Out
          </Button>
        </div>

        {/* History Header */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <FiClock className="text-blue-400 w-4 h-4" />
          <h3 className="text-white font-semibold text-sm">Voice Command History</h3>
          <span className="ml-auto text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">
            {history?.length || 0}
          </span>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5">
          {history && history.length > 0 ? (
            history.map((command, idx) => (
              <div
                key={idx}
                className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl p-3 text-sm text-gray-200 transition-colors"
              >
                <p className="line-clamp-2">"{command}"</p>
              </div>
            ))
          ) : (
            <div className="h-40 flex flex-col items-center justify-center text-center text-gray-400 text-xs">
              <p>No recent voice commands.</p>
              <p className="mt-1 text-gray-400">Say your assistant's name to begin!</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default HistoryDrawer;
