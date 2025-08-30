"use client";

import { useState, useEffect, useRef } from "react";
import { FloatingBubble } from "./FloatingBubble";

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

export function AnimatedDashboard() {
  const [bubbles, setBubbles] = useState<BubbleData[]>([
    {
      id: "movies",
      title: "Movies",
      icon: "🎬",
      color: "from-blue-500 to-blue-600",
      x: 50,
      y: 20,
      velocity: { x: 0.5, y: 0.3 },
      size: 120,
    },
    {
      id: "tasks",
      title: "Tasks",
      icon: "✅",
      color: "from-green-500 to-green-600",
      x: 20,
      y: 50,
      velocity: { x: -0.4, y: 0.6 },
      size: 120,
    },
    {
      id: "expenses",
      title: "Expenses",
      icon: "💰",
      color: "from-orange-500 to-orange-600",
      x: 80,
      y: 50,
      velocity: { x: 0.6, y: -0.2 },
      size: 120,
    },
    {
      id: "notes",
      title: "Notes",
      icon: "📝",
      color: "from-purple-500 to-purple-600",
      x: 50,
      y: 80,
      velocity: { x: -0.3, y: -0.5 },
      size: 120,
    },
  ]);

  const [draggedBubble, setDraggedBubble] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Time-based animation
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Animation loop with bubble gathering and collision avoidance
  useEffect(() => {
    const animate = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          if (draggedBubble === bubble.id) return bubble;

          // Center attraction
          const centerX = 50;
          const centerY = 50;
          const attractionForce = 0.015;
          const centerDirectionX = (centerX - bubble.x) * attractionForce;
          const centerDirectionY = (centerY - bubble.y) * attractionForce;

          // Collision avoidance
          let repulsionX = 0;
          let repulsionY = 0;
          const minDistance = 18;

          prevBubbles.forEach((otherBubble) => {
            if (otherBubble.id !== bubble.id && draggedBubble !== otherBubble.id) {
              const distance = Math.sqrt(
                Math.pow(bubble.x - otherBubble.x, 2) + Math.pow(bubble.y - otherBubble.y, 2)
              );
              
              if (distance < minDistance) {
                const repulsionForce = (minDistance - distance) * 0.08;
                const directionX = (bubble.x - otherBubble.x) / distance;
                const directionY = (bubble.y - otherBubble.y) / distance;
                
                repulsionX += directionX * repulsionForce;
                repulsionY += directionY * repulsionForce;
              }
            }
          });

          // Update velocity
          bubble.velocity.x += centerDirectionX + repulsionX;
          bubble.velocity.y += centerDirectionY + repulsionY;

          // Subtle wave motion
          bubble.velocity.x += Math.sin(time + bubble.id.charCodeAt(0)) * 0.005;
          bubble.velocity.y += Math.cos(time + bubble.id.charCodeAt(0)) * 0.005;

          // Position update
          let newX = bubble.x + bubble.velocity.x;
          let newY = bubble.y + bubble.velocity.y;

          // Boundary bounce
          if (newX <= 10 || newX >= 90) {
            bubble.velocity.x *= -0.8;
            newX = Math.max(10, Math.min(90, newX));
          }
          if (newY <= 10 || newY >= 90) {
            bubble.velocity.y *= -0.8;
            newY = Math.max(10, Math.min(90, newY));
          }

          // Velocity limits and friction
          bubble.velocity.x = Math.max(-1.5, Math.min(1.5, bubble.velocity.x));
          bubble.velocity.y = Math.max(-1.5, Math.min(1.5, bubble.velocity.y));
          bubble.velocity.x *= 0.98;
          bubble.velocity.y *= 0.98;

          return {
            ...bubble,
            x: newX,
            y: newY,
            velocity: bubble.velocity,
          };
        })
      );
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [draggedBubble, time]);

  // Mouse handlers for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !draggedBubble) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePos({ x, y });
      setBubbles((prev) =>
        prev.map((bubble) =>
          bubble.id === draggedBubble
            ? { ...bubble, x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
            : bubble
        )
      );
    };

    if (draggedBubble) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [draggedBubble]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (draggedBubble) {
        setDraggedBubble(null);
        setBubbles((prev) =>
          prev.map((bubble) =>
            bubble.id === draggedBubble
              ? {
                  ...bubble,
                  velocity: {
                    x: (mousePos.x - bubble.x) * 0.15,
                    y: (mousePos.y - bubble.y) * 0.15,
                  },
                }
              : bubble
          )
        );
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [draggedBubble, mousePos]);

  const handleBubbleMouseDown = (bubbleId: string) => {
    setDraggedBubble(bubbleId);
  };

  const bgX = 50 + Math.sin(time * 0.5) * 20;
  const bgY = 50 + Math.cos(time * 0.3) * 20;
  const titleScale = 1 + Math.sin(time * 2) * 0.02;

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i * 137.5) % 100}%`,
    top: `${(i * 73.3) % 100}%`,
    delay: `${(i * 0.3) % 2}s`,
    duration: `${2 + (i % 3)}s`,
    opacity: 0.1 + ((i % 3) * 0.1),
  }));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden select-none dashboard-container"
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          background: `radial-gradient(circle at ${bgX}% ${bgY}%, rgba(147, 51, 234, 0.3) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 1) 100%)`,
        }}
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <h1 
          className="text-6xl font-bold text-white text-center drop-shadow-2xl transition-all duration-1000"
          style={{
            textShadow: `
              0 0 20px rgba(255, 255, 255, 0.3),
              0 0 40px rgba(147, 51, 234, 0.5),
              0 0 60px rgba(147, 51, 234, 0.3)
            `,
            transform: `scale(${titleScale})`,
          }}
        >
          Thinh-Platform
        </h1>
      </div>

      {bubbles.map((bubble) => (
        <FloatingBubble
          key={bubble.id}
          data={bubble}
          isDragging={draggedBubble === bubble.id}
          onMouseDown={() => handleBubbleMouseDown(bubble.id)}
        />
      ))}

      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => {
          const orbY = 30 + Math.sin(time + i) * 20;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full blur-sm animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${orbY}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          );
        })}
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {bubbles.map((bubble1, i) =>
          bubbles.slice(i + 1).map((bubble2, j) => {
            const distance = Math.sqrt(
              Math.pow(bubble1.x - bubble2.x, 2) + Math.pow(bubble1.y - bubble2.y, 2)
            );
            
            if (distance < 30) {
              const opacity = Math.max(0, (30 - distance) / 30) * 0.3;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={`${bubble1.x}%`}
                  y1={`${bubble1.y}%`}
                  x2={`${bubble2.x}%`}
                  y2={`${bubble2.y}%`}
                  stroke="rgba(147, 51, 234, 0.3)"
                  strokeWidth={1}
                  opacity={opacity}
                  className="transition-opacity duration-500"
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
}
