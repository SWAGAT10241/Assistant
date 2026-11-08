import * as React from "react";
import { Card } from "../ui/card";
import { cn } from "../../lib/utils";

/**
 * Reusable Avatar Selection Card powered by shadcn/ui Card.
 */
export const AvatarCard = React.forwardRef(
  (
    {
      image,
      isSelected = false,
      onSelect,
      alt = "Assistant Avatar",
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={onSelect}
        string="tilt"
        string-tilt-max="12"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.();
          }
        }}
        className={cn(
          "w-[75px] h-[145px] lg:w-[150px] lg:h-[250px] overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 select-none relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring p-0 border-2",
          isSelected
            ? "border-primary shadow-xl shadow-primary/30 ring-2 ring-primary scale-105 bg-primary/10"
            : "border-border/60 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/20 bg-card/60",
          className
        )}
        aria-label={`Select ${alt}`}
        {...rest}
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-primary/15 pointer-events-none" />
        )}
      </Card>
    );
  }
);

AvatarCard.displayName = "AvatarCard";
export default AvatarCard;
