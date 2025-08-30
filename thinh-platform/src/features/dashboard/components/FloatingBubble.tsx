"use client";

import { useState } from "react";

interface BubbleData {
  id: string;
  title: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  size: number;
}

interface FloatingBubbleProps {
  data: BubbleData;
  isDragging: boolean;
  onMouseDown: () => void;
}

export function FloatingBubble({ data, isDragging, onMouseDown }: FloatingBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`absolute cursor-grab active:cursor-grabbing transition-all duration-300 select-none ${
        isDragging ? "z-50 scale-110" : "z-20"
      } ${isHovered ? "scale-105" : ""}`}
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        transform: `translate(-50%, -50%)`,
        width: `${data.size}px`,
        height: `${data.size}px`,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Bubble */}
      <div
        className={`relative w-full h-full rounded-full bg-gradient-to-br ${data.color} 
          shadow-2xl border border-white/30 overflow-hidden select-none
          ${isDragging ? "shadow-blue-400/50" : ""}
          ${isHovered ? "shadow-lg" : ""}
          transition-all duration-300`}
        style={{
          boxShadow: `
            ${isDragging ? "0 0 40px rgba(59, 130, 246, 0.7)" : "0 12px 40px rgba(0, 0, 0, 0.4)"},
            inset 0 2px 0 rgba(255, 255, 255, 0.3),
            inset 0 -2px 0 rgba(0, 0, 0, 0.2)
          `,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      >
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-full select-none" />
        
        {/* Content */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center h-full text-white select-none"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          <div className={`text-4xl mb-2 drop-shadow-lg transition-transform duration-300 select-none ${
            isHovered ? "scale-110" : ""
          }`}>
            {data.icon}
          </div>
          <div className={`text-sm font-semibold text-center drop-shadow-md transition-all duration-300 select-none ${
            isHovered ? "text-white/90" : ""
          }`}>
            {data.title}
          </div>
        </div>
      </div>

      {/* Outer Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.color} blur-xl opacity-30 select-none
          ${isDragging ? "opacity-50 scale-125" : ""}
          transition-all duration-300`}
        style={{
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.25 : 1})`,
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        }}
      />
    </div>
  );
}
