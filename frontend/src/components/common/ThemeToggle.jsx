import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function ThemeToggle({ className, ...props }) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      string="magnetic"
      string-magnetic-strength="0.3"
      className={cn(
        "h-10 w-10 rounded-2xl bg-card/60 backdrop-blur-xl border-border/80 text-foreground hover:bg-card/90 transition-all cursor-pointer shadow-md",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode (currently ${theme})`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      {...props}
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="h-5 w-5 text-blue-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ThemeToggle;
