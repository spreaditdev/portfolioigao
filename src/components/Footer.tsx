import React from "react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react";

interface FooterProps {
  copyrightText?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  attributions?: string[];
  onScrollToTop?: () => void;
}

const Footer = ({
  copyrightText = "© 2023 Igor Costa Oliveira. All rights reserved.",
  socialLinks = {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    email: "mailto:developer@example.com",
  },
  attributions = [
    "Built with React, TypeScript, and Tailwind CSS",
    "Icons by Lucide",
  ],
  onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
}: FooterProps) => {
  return (
    <footer className="w-full py-6 px-4 md:px-8 bg-black text-white">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            <p>{copyrightText}</p>
            <div className="mt-2 text-xs text-gray-400">
              {attributions.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Social Media Links */}
            <TooltipProvider>
              {socialLinks.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-gray-300 hover:text-white hover:bg-purple-800 transition-all duration-300 hover:-translate-y-1"
                      asChild
                    >
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {socialLinks.linkedin && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-gray-300 hover:text-white hover:bg-purple-800 transition-all duration-300 hover:-translate-y-1"
                      asChild
                    >
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {socialLinks.twitter && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-gray-300 hover:text-white hover:bg-purple-800 transition-all duration-300 hover:-translate-y-1"
                      asChild
                    >
                      <a
                        href={socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Twitter</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {socialLinks.email && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full text-gray-300 hover:text-white hover:bg-purple-800 transition-all duration-300 hover:-translate-y-1"
                      asChild
                    >
                      <a href={socialLinks.email}>
                        <Mail className="h-5 w-5" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Email</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Back to top button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onScrollToTop}
                    className="h-9 w-9 rounded-full border-purple-700 text-gray-300 hover:text-white hover:bg-purple-800 ml-2 transition-all duration-300 hover:-translate-y-1"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Back to top</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
