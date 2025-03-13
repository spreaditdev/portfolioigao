import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items?: NavItem[];
  resumeUrl?: string;
}

const Navbar = ({
  items: propItems,
  resumeUrl = "/resume.pdf",
}: NavbarProps) => {
  const { t } = useTranslation();

  const defaultItems = [
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.skills"), href: "#skills" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.blog"), href: "#blog" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const items = propItems || defaultItems;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling
  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white dark:bg-gray-900 ${
        isScrolled
          ? "shadow-lg shadow-purple-200/20 dark:shadow-purple-900/20 py-2"
          : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-xl font-bold text-primary">
          <span className="font-extrabold">Igor Costa</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all font-medium relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Resume Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-300/50 transition-all"
                  >
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t("nav.resume")}
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t("nav.downloadResume")}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="flex items-center gap-2"
          >
            <ThemeToggle />
            <LanguageSelector />
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="md:hidden text-purple-600 dark:text-purple-400 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className={`md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-xl overflow-hidden ${!isMobileMenuOpen && "hidden"}`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 py-3">
          <ul className="space-y-3">
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-all font-medium"
                >
                  {item.label}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: items.length * 0.05 + 0.1 }}
            >
              <Button
                asChild
                className="w-full justify-center mt-2 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-300/50 transition-all"
                size="sm"
              >
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t("nav.downloadResume")}
                </a>
              </Button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: items.length * 0.05 + 0.2 }}
              className="flex justify-center pt-2 gap-2"
            >
              <ThemeToggle />
              <LanguageSelector />
            </motion.li>
          </ul>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
