import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input as ShadcnInput } from "../ui/input";
import { cn } from "../../lib/utils";

/**
 * Common Input component powered by shadcn/ui.
 */
export const Input = React.forwardRef(
  (
    {
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
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const inputType = isPasswordField
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className={cn("w-full flex flex-col gap-1.5", className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground/90">
            {label} {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div className="relative w-full">
          {Icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
              <Icon className="w-4 h-4" />
            </div>
          )}

          <ShadcnInput
            id={id}
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={autoComplete}
            className={cn(
              "h-12 rounded-xl text-foreground placeholder:text-muted-foreground",
              Icon && "pl-10",
              isPasswordField && "pr-10",
              error && "border-destructive focus-visible:ring-destructive"
            )}
            {...rest}
          />

          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-full focus:outline-none transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          )}
        </div>

        {error && <span className="text-destructive text-xs px-1">*{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
