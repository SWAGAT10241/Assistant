import React from "react";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut, Clock, X, Compass } from "lucide-react";
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Card } from "../ui/card";
import ThemeToggle from "../common/ThemeToggle";

export function HistoryDrawer({
  isOpen,
  onClose,
  userName,
  history = [],
  onCustomize,
  onLogout,
}) {
  const navigate = useNavigate();
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
        <DialogContent
          className="fixed top-0 right-0 left-auto translate-x-0 translate-y-0 h-full w-full sm:w-[400px] bg-background/95 backdrop-blur-2xl border-l border-border/70 p-6 flex flex-col gap-5 z-50 rounded-none sm:rounded-l-3xl shadow-2xl animate-in slide-in-from-right duration-300"
        >
          <DialogHeader className="flex flex-row items-center justify-between pb-2 text-left space-y-0">
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
                Control Panel
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Logged in as <span className="font-semibold text-foreground">{userName || "User"}</span>
              </DialogDescription>
            </div>
            <div className="flex items-center gap-1.5">
              <ThemeToggle className="h-8 w-8 rounded-full" />
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <Separator />

          {/* Quick Actions */}
          <div className="flex flex-col gap-2.5">
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onClose();
                navigate("/landing");
              }}
              className="w-full justify-start gap-3 h-12 rounded-xl text-foreground font-medium"
            >
              <Compass className="w-4 h-4 text-primary" />
              Product Overview & Features
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onClose();
                onCustomize();
              }}
              className="w-full justify-start gap-3 h-12 rounded-xl text-foreground font-medium"
            >
              <Settings className="w-4 h-4 text-primary" />
              Customize Assistant
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={onLogout}
              className="w-full justify-start gap-3 h-12 rounded-xl font-medium"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </Button>
          </div>

          <Separator />

          {/* History Header */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Clock className="text-primary w-4 h-4" />
              <h3 className="text-foreground font-semibold text-sm">
                Voice Command History
              </h3>
            </div>
            <Badge variant="secondary" className="px-2.5 py-0.5 text-xs font-mono">
              {history?.length || 0}
            </Badge>
          </div>

          {/* History List with ScrollArea */}
          <ScrollArea className="flex-1 pr-3 -mr-3">
            <div className="flex flex-col gap-2.5 pb-4">
              {history && history.length > 0 ? (
                history.map((command, idx) => (
                  <Card
                    key={idx}
                    className="p-3.5 bg-card/60 hover:bg-card/90 border-border/50 text-sm transition-colors rounded-xl"
                  >
                    <p className="text-foreground/90 leading-relaxed text-xs">
                      "{command}"
                    </p>
                  </Card>
                ))
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center text-muted-foreground text-xs gap-1">
                  <Clock className="w-8 h-8 opacity-30 mb-2" />
                  <p className="font-medium text-foreground/70">No recent voice commands.</p>
                  <p>Say your assistant's name to begin!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default HistoryDrawer;
