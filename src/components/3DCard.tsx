import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  border?: boolean;
  shadow?: boolean;
  glare?: boolean;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = "",
  intensity = 15,
  border = true,
  shadow = true,
  glare = true,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    // Calculate mouse position relative to card center (in percentage, -50% to 50%)
    const centerX = (e.clientX - rect.left) / rect.width - 0.5;
    const centerY = (e.clientY - rect.top) / rect.height - 0.5;

    // Set rotation based on mouse position and intensity
    setRotateX(-centerY * intensity); // Negative because we want to rotate up when mouse is at the top
    setRotateY(centerX * intensity);

    // Store mouse position for glare effect
    setMouseX(centerX);
    setMouseY(centerY);

    // Calculate glare position (0% to 100%)
    setGlarePosition({
      x: (centerX + 0.5) * 100,
      y: (centerY + 0.5) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset rotations when mouse leaves
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className} ${border ? "border border-purple-200/50 dark:border-purple-800/30" : ""} ${shadow ? "shadow-xl" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
    >
      {/* Card content */}
      <div className="relative z-10">{children}</div>

      {/* Glare effect */}
      {glare && isHovered && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Edge highlight effect */}
      {border && isHovered && (
        <>
          <div
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            style={{ transform: `translateX(${mouseX * 100}%)` }}
          />
          <div
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
            style={{ transform: `translateY(${mouseY * 100}%)` }}
          />
        </>
      )}
    </motion.div>
  );
};

export default ThreeDCard;
