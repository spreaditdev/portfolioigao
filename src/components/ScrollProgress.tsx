import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  color?: string;
  height?: number;
  zIndex?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = "#9333ea",
  height = 4,
  zIndex = 100,
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0"
      style={{
        scaleX,
        transformOrigin: "left",
        backgroundColor: color,
        height,
        zIndex,
      }}
    />
  );
};

export default ScrollProgress;
