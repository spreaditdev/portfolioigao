import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true));
        el.addEventListener("mouseleave", () => setLinkHovered(false));
      });
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    // Set up link hover detection after a short delay to ensure DOM is ready
    const timeout = setTimeout(handleLinkHoverEvents, 1000);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      clearTimeout(timeout);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(147, 51, 234, 0.3)",
      mixBlendMode: "difference" as "difference",
    },
    clicked: {
      height: 28,
      width: 28,
      x: position.x - 14,
      y: position.y - 14,
      backgroundColor: "rgba(147, 51, 234, 0.6)",
    },
    hovered: {
      height: 48,
      width: 48,
      x: position.x - 24,
      y: position.y - 24,
      backgroundColor: "rgba(147, 51, 234, 0.4)",
      mixBlendMode: "difference" as "difference",
    },
    hidden: {
      opacity: 0,
    },
  };

  const dotVariants = {
    default: {
      x: position.x - 4,
      y: position.y - 4,
      height: 8,
      width: 8,
      backgroundColor: "rgba(147, 51, 234, 0.8)",
    },
    clicked: {
      height: 6,
      width: 6,
      x: position.x - 3,
      y: position.y - 3,
    },
    hovered: {
      height: 0,
      width: 0,
      opacity: 0,
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <>
      <motion.div
        className="cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        variants={cursorVariants}
        animate={
          hidden
            ? "hidden"
            : clicked
              ? "clicked"
              : linkHovered
                ? "hovered"
                : "default"
        }
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        variants={dotVariants}
        animate={
          hidden
            ? "hidden"
            : clicked
              ? "clicked"
              : linkHovered
                ? "hovered"
                : "default"
        }
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
    </>
  );
};

export default CustomCursor;
