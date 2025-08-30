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
  onMouseDown: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export function FloatingBubble({ data, isDragging, onMouseDown, onClick }: FloatingBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger click if not dragging
    if (!isDragging && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`absolute transition-all duration-300 select-none opacity-90 ${
        isDragging ? "z-50 scale-110 cursor-grabbing" : "z-20"
      } ${isHovered ? "scale-105" : ""} ${
        onClick ? "cursor-pointer" : "cursor-grab"
      }`}
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
      onClick={handleClick}
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

      {/* Special glow for clickable bubbles */}
      {onClick && (
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-md opacity-0 select-none
            ${isHovered ? "opacity-100" : ""}
            transition-all duration-300`}
          style={{
            transform: 'translate(-50%, -50%)',
            width: `${data.size + 30}px`,
            height: `${data.size + 30}px`,
          }}
        />
      )}

      {/* Special indicator for movies bubble */}
      {onClick && data.id === 'movies' && (
        <div
          className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-pulse select-none"
          style={{
            transform: 'translate(-50%, -50%)',
            width: `${data.size + 15}px`,
            height: `${data.size + 15}px`,
          }}
        />
      )}

      {/* Tooltip for clickable bubbles */}
      {onClick && isHovered && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap select-none z-50"
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
          }}
        >
          Click to explore {data.title}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
        </div>
      )}
    </div>
  );
}
