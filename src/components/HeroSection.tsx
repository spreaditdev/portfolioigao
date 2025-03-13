import React, { useRef } from "react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import FloatingElements from "./FloatingElements";
import AnimatedText from "./AnimatedText";
import ThreeDCard from "./3DCard";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  name?: string;
  title?: string;
  summary?: string;
  imageUrl?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  onContactClick?: () => void;
  onProjectsClick?: () => void;
}

const HeroSection = ({
  name = "Igor Costa Oliveira",
  title,
  summary,
  imageUrl = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80",
  socialLinks = {
    github: "https://github.com/igorcosta",
    linkedin: "https://linkedin.com/in/igorcosta",
    twitter: "https://twitter.com/igorcosta",
  },
  onContactClick = () => {},
  onProjectsClick = () => {},
}: HeroSectionProps) => {
  const { t } = useTranslation();

  const defaultTitle = t("hero.title");
  const defaultSummary = t("hero.summary");

  const displayTitle = title || defaultTitle;
  const displaySummary = summary || defaultSummary;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden"
    >
      {/* Floating background elements */}
      <FloatingElements count={20} />

      <motion.div
        className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 z-10"
        style={{ y, opacity }}
      >
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            <AnimatedText
              text={`${t("hero.greeting")} ${name}`}
              type="chars"
              animation="wave"
              className=""
              staggerChildren={0.05}
            />
          </h1>

          <motion.h2
            className="text-xl md:text-2xl font-medium text-purple-600 dark:text-purple-400 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          >
            {displayTitle}
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
          >
            {displaySummary}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          >
            <Button
              size="lg"
              onClick={onProjectsClick}
              className="rounded-full px-8 bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-300/50 transition-all"
            >
              {t("hero.viewProjects")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onContactClick}
              className="rounded-full px-8 border-purple-600 text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-purple-300/30 transition-all"
            >
              {t("hero.contact")}
            </Button>
          </motion.div>

          <motion.div
            className="flex gap-4 mt-8 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
          >
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        >
          <ThreeDCard
            className="rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
            intensity={20}
            glare={true}
          >
            <img
              src={imageUrl}
              alt={`${name} - ${title}`}
              className="w-full h-full object-cover"
            />
          </ThreeDCard>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          {t("hero.scrollToExplore")}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="h-5 w-5 text-purple-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
