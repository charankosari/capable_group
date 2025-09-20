"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface GlowingCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingCard({ 
  children, 
  className = "", 
  glowColor = "hsl(var(--primary))" 
}: GlowingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden group ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovering
            ? `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}15, transparent 40%)`
            : "transparent",
        }}
      />
      
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isHovering
            ? `linear-gradient(90deg, transparent, ${glowColor}30, transparent)`
            : "transparent",
          padding: "1px",
        }}
      >
        <div className="h-full w-full bg-background rounded-lg" />
      </div>

      {/* Content */}
      <Card className="relative z-10 border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
        {children}
      </Card>
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, ${glowColor}10 60deg, transparent 120deg)`,
          transform: `rotate(${mousePosition.x / 5}deg)`,
        }}
      />
    </motion.div>
  );
}
