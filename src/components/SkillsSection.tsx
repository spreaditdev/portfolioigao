import React from "react";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Code,
  Cloud,
  FileCode,
  Layers,
  Palette,
  Server,
  Smartphone,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Skill {
  name: string;
  icon: React.ReactNode;
  proficiency: number;
  color: string;
  description?: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  categories?: SkillCategory[];
  title?: string;
  subtitle?: string;
}

const SkillsSection = ({
  categories = [
    {
      name: "Frontend",
      skills: [
        {
          name: "React",
          icon: <Code className="h-5 w-5" />,
          proficiency: 90,
          color: "bg-blue-500",
          description:
            "Desenvolvimento de componentes UI complexos e gerenciamento de estado",
        },
        {
          name: "Angular",
          icon: <FileCode className="h-5 w-5" />,
          proficiency: 85,
          color: "bg-red-600",
          description: "Aplicações corporativas com TypeScript",
        },
        {
          name: "Vue",
          icon: <Palette className="h-5 w-5" />,
          proficiency: 80,
          color: "bg-green-500",
          description:
            "Framework JavaScript progressivo para interfaces de usuário",
        },
        {
          name: "Next.js",
          icon: <Zap className="h-5 w-5" />,
          proficiency: 85,
          color: "bg-black",
          description:
            "Renderização do lado do servidor e geração de sites estáticos",
        },
        {
          name: "Vite",
          icon: <Zap className="h-5 w-5" />,
          proficiency: 90,
          color: "bg-purple-500",
          description: "Ferramentas de frontend de última geração",
        },
      ],
    },
    {
      name: "Mobile",
      skills: [
        {
          name: "React Native",
          icon: <Smartphone className="h-5 w-5" />,
          proficiency: 85,
          color: "bg-blue-600",
          description: "Desenvolvimento de aplicativos móveis multiplataforma",
        },
        {
          name: "Expo",
          icon: <Smartphone className="h-5 w-5" />,
          proficiency: 80,
          color: "bg-gray-700",
          description: "Desenvolvimento simplificado com React Native",
        },
        {
          name: "Ionic",
          icon: <Smartphone className="h-5 w-5" />,
          proficiency: 75,
          color: "bg-blue-700",
          description: "Desenvolvimento de aplicativos móveis híbridos",
        },
      ],
    },
    {
      name: "Backend",
      skills: [
        {
          name: "C#",
          icon: <Server className="h-5 w-5" />,
          proficiency: 80,
          color: "bg-purple-600",
          description: "Desenvolvimento de aplicações empresariais",
        },
        {
          name: "Azure",
          icon: <Cloud className="h-5 w-5" />,
          proficiency: 75,
          color: "bg-blue-600",
          description: "Serviços em nuvem e implantação",
        },
      ],
    },
  ],
  title = "Skills & Expertise",
  subtitle = "A comprehensive overview of my technical skills and proficiency levels",
}: SkillsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section
      id="skills"
      className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950 w-full"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <h3 className="text-xl font-bold mb-6 pb-2 border-b border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-400">
                {category.name}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div
                                className={`p-1.5 rounded-md text-white ${skill.color}`}
                              >
                                {skill.icon}
                              </div>
                              <span className="font-medium dark:text-white">
                                {skill.name}
                              </span>
                            </div>
                            <Badge
                              variant="secondary"
                              className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            >
                              {skill.proficiency}%
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <p>
                            {skill.description ||
                              `Proficiency in ${skill.name}`}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Progress
                      value={skill.proficiency}
                      className="h-1.5"
                      style={{
                        backgroundColor: "rgba(229, 231, 235, 0.5)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
