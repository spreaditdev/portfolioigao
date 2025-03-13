import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

const ParallaxEffect: React.FC<ParallaxProps> = ({
  children,
  offset = 50,
  className = "",
  direction = "up",
}) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { scrollY } = useScroll();

  // Calculate the element's position relative to the viewport
  useEffect(() => {
    if (!ref) return;

    const setValues = () => {
      const { top } = ref.getBoundingClientRect();
      setElementTop(top + window.scrollY);
      setClientHeight(window.innerHeight);
    };

    setValues();
    window.addEventListener("resize", setValues);
    return () => window.removeEventListener("resize", setValues);
  }, [ref]);

  // Calculate the range of the parallax effect
  const initial = elementTop - clientHeight;
  const final = elementTop + offset;

  // Create transform values based on direction
  let transformValue;
  switch (direction) {
    case "up":
      transformValue = useTransform(scrollY, [initial, final], [offset, 0]);
      break;
    case "down":
      transformValue = useTransform(scrollY, [initial, final], [-offset, 0]);
      break;
    case "left":
      transformValue = useTransform(scrollY, [initial, final], [offset, 0]);
      break;
    case "right":
      transformValue = useTransform(scrollY, [initial, final], [-offset, 0]);
      break;
    default:
      transformValue = useTransform(scrollY, [initial, final], [offset, 0]);
  }

  return (
    <motion.div
      ref={setRef}
      style={{
        y: direction === "up" || direction === "down" ? transformValue : 0,
        x: direction === "left" || direction === "right" ? transformValue : 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxEffect;
