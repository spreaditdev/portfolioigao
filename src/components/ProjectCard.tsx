import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
import ThreeDCard from "./3DCard";

interface Technology {
  name: string;
  color?: string;
}

interface ProjectCardProps {
  id?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: Technology[];
  demoUrl?: string;
  repoUrl?: string;
  onClick?: () => void;
}

const ProjectCard = ({
  id = "1",
  title = "E-Commerce Dashboard",
  description = "A responsive dashboard for managing online store inventory, sales, and customer data with real-time analytics.",
  imageUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
  technologies = [
    { name: "React", color: "bg-blue-100 text-blue-800" },
    { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
    { name: "Tailwind", color: "bg-cyan-100 text-cyan-800" },
  ],
  demoUrl = "https://example.com",
  repoUrl = "https://github.com",
  onClick = () => {},
}: ProjectCardProps) => {
  return (
    <ThreeDCard
      className="w-full max-w-[350px] h-[400px] overflow-hidden flex flex-col bg-white dark:bg-gray-800 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50 transition-all duration-300 rounded-xl"
      intensity={15}
    >
      <Card className="w-full h-full border-none shadow-none bg-transparent">
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-xl">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        <CardHeader className="p-4 pb-0">
          <h3 className="text-xl font-bold truncate dark:text-white">
            {title}
          </h3>
        </CardHeader>

        <CardContent className="p-4 flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
            {description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={tech.color || "bg-gray-100 text-gray-800"}
              >
                {tech.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            className="text-xs bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-purple-300/50 transition-all"
            onClick={onClick}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            Detalhes
          </Button>
          <div className="flex gap-2">
            {demoUrl && (
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Live Demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
            {repoUrl && (
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Source Code"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </ThreeDCard>
  );
};

export default ProjectCard;
