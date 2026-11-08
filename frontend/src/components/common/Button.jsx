import * as React from "react";
import { Button as ShadcnButton } from "../ui/button";
import Spinner from "./Spinner";
import { cn } from "../../lib/utils";

/**
 * Common Button component powered by shadcn/ui.
 */
export const Button = React.forwardRef(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "default",
      size = "default",
      disabled = false,
      loading = false,
      className = "",
      icon: Icon,
      ...rest
    },
    ref
  ) => {
    // Map legacy variants to shadcn variants
    const variantMap = {
      primary: "default",
      secondary: "secondary",
      outline: "outline",
      glass: "glass",
      danger: "destructive",
      destructive: "destructive",
      ghost: "ghost",
      link: "link",
      default: "default",
    };

    const sizeMap = {
      sm: "sm",
      md: "default",
      lg: "lg",
      icon: "icon",
      default: "default",
    };

    const mappedVariant = variantMap[variant] || "default";
    const mappedSize = sizeMap[size] || "default";

    return (
      <ShadcnButton
        ref={ref}
        type={type}
        onClick={onClick}
        variant={mappedVariant}
        size={mappedSize}
        disabled={disabled || loading}
        className={cn(className)}
        {...rest}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Spinner size="sm" className="border-current border-t-transparent" />
            <span>Loading...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            {children}
          </span>
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = "Button";
export default Button;
