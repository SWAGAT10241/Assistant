import React from "react";

export function Spinner({ size = "md", className = "" }) {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`inline-block rounded-full border-blue-500 border-t-transparent animate-spin ${sizeMap[size] || sizeMap.md} ${className}`}
      role="status"
      aria-label="loading"
    />
  );
}

export default Spinner;
