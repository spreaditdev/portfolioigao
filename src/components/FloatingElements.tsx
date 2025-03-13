import React from "react";
import { motion } from "framer-motion";

interface FloatingElementsProps {
  count?: number;
  colors?: string[];
  shapes?: ("circle" | "square" | "triangle" | "donut")[];
  minSize?: number;
  maxSize?: number;
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({
  count = 15,
  colors = ["#9333ea", "#a855f7", "#c084fc", "#e9d5ff"],
  shapes = ["circle", "square", "triangle", "donut"],
  minSize = 10,
  maxSize = 40,
  className = "",
}) => {
  // Generate random elements
  const elements = Array.from({ length: count }).map((_, index) => {
    const size = Math.floor(Math.random() * (maxSize - minSize)) + minSize;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const depth = Math.random();
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    return { id: index, size, shape, color, left, top, depth, duration, delay };
  });

  const renderShape = (shape: string, size: number, color: string) => {
    switch (shape) {
      case "circle":
        return (
          <div
            className="rounded-full"
            style={{ width: size, height: size, backgroundColor: color }}
          />
        );
      case "square":
        return (
          <div
            className="rounded-md"
            style={{ width: size, height: size, backgroundColor: color }}
          />
        );
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
            }}
          />
        );
      case "donut":
        return (
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: size, height: size, backgroundColor: color }}
          >
            <div
              className="rounded-full"
              style={{
                width: size * 0.5,
                height: size * 0.5,
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute opacity-30"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            zIndex: Math.floor(element.depth * 10),
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(element.id) * 50, 0],
            rotate: [0, 360],
            scale: [1, element.depth + 0.5, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {renderShape(element.shape, element.size, element.color)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
