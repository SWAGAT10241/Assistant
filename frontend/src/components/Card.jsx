import React from "react";

export function Card({ image, isSelected = false, onSelect, alt = "Assistant Avatar" }) {
  return (
    <div
      onClick={onSelect}
      className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 select-none relative group ${
        isSelected
          ? "border-4 border-white shadow-2xl shadow-blue-500/50 scale-105"
          : "border-2 border-blue-900/40 hover:border-white/80 hover:shadow-xl hover:shadow-blue-950"
      }`}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      {isSelected && (
        <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
      )}
    </div>
  );
}

export default Card;