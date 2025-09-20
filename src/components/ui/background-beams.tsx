"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function BackgroundBeams({ className }: { className?: string }) {
  const beamsRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (!isClient) return;
    const beams = beamsRef.current;
    if (!beams) return;

    const createBeam = () => {
      const beam = document.createElement("div");
      beam.className = "absolute opacity-30 bg-gradient-to-r from-transparent via-primary/50 to-transparent";
      
      // Random positioning and sizing
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const width = Math.random() * 200 + 100;
      const height = Math.random() * 3 + 1;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      beam.style.left = `${startX}%`;
      beam.style.top = `${startY}%`;
      beam.style.width = `${width}px`;
      beam.style.height = `${height}px`;
      beam.style.transform = `rotate(${Math.random() * 45 - 22.5}deg)`;
      beam.style.animation = `beamMove ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      beams.appendChild(beam);
      
      // Remove beam after animation completes
      setTimeout(() => {
        if (beam.parentNode) {
          beam.parentNode.removeChild(beam);
        }
      }, (duration + delay) * 1000);
    };

    // Create initial beams
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createBeam(), i * 100);
    }

    // Create new beams periodically
    const interval = setInterval(createBeam, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!isClient) {
    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        style={{
          background: `radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)`,
        }}
      />
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes beamMove {
          0% {
            opacity: 0;
            transform: translateX(-100px) scale(0);
          }
          50% {
            opacity: 0.8;
            transform: translateX(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateX(100px) scale(0);
          }
        }
      `}</style>
      <div
        ref={beamsRef}
        className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
        style={{
          background: `radial-gradient(circle at center, transparent 0%, hsl(var(--background)) 100%)`,
        }}
      />
    </>
  );
}