import React, { useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Briefcase,
  Code,
  User,
  Mail,
  Download,
  Layers,
  FileCode,
} from "lucide-react";

interface SidebarProps {
  resumeUrl?: string;
}

const Sidebar = ({ resumeUrl = "/resume.pdf" }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sidebarItems = [
    { icon: <Home size={20} />, label: "Início", section: "hero" },
    { icon: <Briefcase size={20} />, label: "Projetos", section: "projects" },
    { icon: <Code size={20} />, label: "Habilidades", section: "skills" },
    { icon: <User size={20} />, label: "Experiência", section: "experience" },
    { icon: <Layers size={20} />, label: "Serviços", section: "services" },
    { icon: <FileCode size={20} />, label: "Blog", section: "blog" },
    { icon: <Mail size={20} />, label: "Contato", section: "contact" },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ width: isCollapsed ? 60 : 200 }}
          animate={{ width: isCollapsed ? 60 : 200 }}
          exit={{ width: 60 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white dark:bg-gray-900 rounded-r-xl shadow-lg overflow-hidden flex flex-col h-auto py-4"
        >
          <div className="flex justify-end px-2 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {isCollapsed ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </Button>
          </div>

          <div className="flex flex-col space-y-2 px-2">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`flex items-center justify-${isCollapsed ? "center" : "start"} w-full rounded-lg py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 transition-all`}
                onClick={() => scrollToSection(item.section)}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </Button>
            ))}

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <Button
                variant="ghost"
                className={`flex items-center justify-${isCollapsed ? "center" : "start"} w-full rounded-lg py-2 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:text-purple-700 dark:hover:text-purple-300 transition-all`}
                asChild
              >
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span className="mr-3">
                    <Download size={20} />
                  </span>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium"
                    >
                      Currículo
                    </motion.span>
                  )}
                </a>
              </Button>

              <div className="mt-4 flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Sidebar;
