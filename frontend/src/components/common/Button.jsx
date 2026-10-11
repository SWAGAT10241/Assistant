import React from "react";
import Spinner from "./Spinner";

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  icon: Icon,
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-white text-gray-900 hover:bg-gray-100 shadow-md shadow-black/20 hover:shadow-lg font-semibold",
    secondary:
      "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-900/40",
    outline:
      "border-2 border-white/60 text-white hover:bg-white/10 hover:border-white",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
    danger:
      "bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-950",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm h-9",
    md: "px-6 py-2.5 text-base h-12 min-w-[140px]",
    lg: "px-8 py-3.5 text-lg h-14 min-w-[200px]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Spinner size="sm" className="border-gray-900 border-t-transparent" />
          <span>Loading...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          {Icon && <Icon className="w-5 h-5" />}
          {children}
        </span>
      )}
    </button>
  );
}

export default Button;
