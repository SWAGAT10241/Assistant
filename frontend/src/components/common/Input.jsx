import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
  icon: Icon,
  className = "",
  autoComplete,
  id,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <div className="relative w-full">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
          className={`w-full h-14 bg-white/5 border-2 rounded-full px-5 text-white text-base placeholder-gray-400 outline-none transition-colors duration-200 backdrop-blur-sm ${
            Icon ? "pl-12" : ""
          } ${isPasswordField ? "pr-12" : ""} ${
            error
              ? "border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400"
              : "border-white/30 hover:border-white/60 focus:border-white focus:bg-white/10"
          }`}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white p-1 rounded-full focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <IoMdEyeOff className="w-5 h-5" />
            ) : (
              <IoMdEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {error && <span className="text-red-400 text-xs px-3">*{error}</span>}
    </div>
  );
}

export default Input;
