import React from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  type?: "words" | "chars" | "lines";
  animation?: "fade" | "slide" | "bounce" | "scale" | "wave";
  staggerChildren?: number;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  once = true,
  type = "words",
  animation = "fade",
  staggerChildren = 0.03,
  delay = 0,
}) => {
  // Split text into array based on type
  const splitText = () => {
    switch (type) {
      case "chars":
        return text.split("");
      case "lines":
        return text.split("\n");
      case "words":
      default:
        return text.split(" ");
    }
  };

  const items = splitText();

  // Define animation variants
  const getAnimationVariant = () => {
    switch (animation) {
      case "slide":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1 },
        };
      case "bounce":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 10,
            },
          },
        };
      case "scale":
        return {
          hidden: { scale: 0.5, opacity: 0 },
          visible: { scale: 1, opacity: 1 },
        };
      case "wave":
        return {
          hidden: { y: 20, opacity: 0 },
          visible: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
              delay: i * staggerChildren,
              type: "spring",
              stiffness: 100,
              damping: 10,
            },
          }),
        };
      case "fade":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = getAnimationVariant();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={itemVariants}
          className="inline-block"
          style={{ marginRight: type === "words" ? "0.25em" : undefined }}
        >
          {item}
          {type === "lines" && i < items.length - 1 ? <br /> : ""}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
