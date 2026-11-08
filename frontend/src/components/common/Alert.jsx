import * as React from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";
import { Alert as ShadcnAlert, AlertDescription } from "../ui/alert";
import { cn } from "../../lib/utils";

const VARIANT_CONFIG = {
  error: {
    shadcnVariant: "destructive",
    icon: AlertCircle,
  },
  warning: {
    shadcnVariant: "warning",
    icon: AlertTriangle,
  },
  success: {
    shadcnVariant: "success",
    icon: CheckCircle2,
  },
  info: {
    shadcnVariant: "info",
    icon: Info,
  },
  destructive: {
    shadcnVariant: "destructive",
    icon: AlertCircle,
  },
  default: {
    shadcnVariant: "default",
    icon: Info,
  },
};

/**
 * Common Alert banner component powered by shadcn/ui.
 */
export const Alert = React.forwardRef(
  ({ variant = "error", children, onDismiss, className = "", ...rest }, ref) => {
    const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.error;
    const Icon = config.icon;

    if (!children) return null;

    return (
      <ShadcnAlert
        ref={ref}
        variant={config.shadcnVariant}
        className={cn("flex items-center justify-between gap-3 pr-2", className)}
        {...rest}
      >
        <div className="flex items-center gap-3 flex-1">
          <Icon className="h-5 w-5 shrink-0" />
          <AlertDescription className="text-sm font-medium leading-normal">
            {children}
          </AlertDescription>
        </div>

        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded-full opacity-70 hover:opacity-100 hover:bg-background/40 transition-colors shrink-0"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </ShadcnAlert>
    );
  }
);

Alert.displayName = "Alert";
export default Alert;
