import React from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";

const VARIANT_MAP = {
  error: {
    container: "bg-red-500/15 border-red-500/30 text-red-200",
    icon: FiAlertCircle,
    iconColor: "text-red-400",
  },
  warning: {
    container: "bg-amber-500/15 border-amber-500/30 text-amber-200",
    icon: FiAlertTriangle,
    iconColor: "text-amber-400",
  },
  success: {
    container: "bg-emerald-500/15 border-emerald-500/30 text-emerald-200",
    icon: FiCheckCircle,
    iconColor: "text-emerald-400",
  },
  info: {
    container: "bg-blue-500/15 border-blue-500/30 text-blue-200",
    icon: FiInfo,
    iconColor: "text-blue-400",
  },
};

/**
 * Reusable Alert banner component
 */
export function Alert({
  variant = "error",
  children,
  onDismiss,
  className = "",
}) {
  const currentVariant = VARIANT_MAP[variant] || VARIANT_MAP.error;
  const Icon = currentVariant.icon;

  if (!children) return null;

  return (
    <div
      role="alert"
      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-sm backdrop-blur-md transition-all duration-200 ${currentVariant.container} ${className}`}
    >
      <div className="flex items-center gap-2.5 flex-1">
        <Icon className={`w-5 h-5 shrink-0 ${currentVariant.iconColor}`} />
        <span className="leading-snug">{children}</span>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss alert"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default Alert;

