import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, ArrowLeft, ArrowRight } from "lucide-react";

interface Technology {
  name: string;
  color?: string;
}

interface ProjectImage {
  src: string;
  alt: string;
}

interface ProjectModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  project?: {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    technologies: Technology[];
    images: ProjectImage[];
    liveUrl?: string;
    githubUrl?: string;
    features?: string[];
    challenges?: string[];
  };
}

const ProjectModal = ({
  isOpen = true,
  onClose = () => {},
  project = {
    id: "1",
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive dashboard for managing online store operations",
    longDescription:
      "This project is a full-featured e-commerce dashboard that provides store owners with real-time analytics, inventory management, order processing, and customer relationship tools. Built with performance and usability in mind, it features a responsive design that works across all devices.",
    technologies: [
      { name: "React", color: "bg-blue-100 text-blue-800" },
      { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
      { name: "Tailwind CSS", color: "bg-teal-100 text-teal-800" },
      { name: "Next.js", color: "bg-gray-100 text-gray-800" },
      { name: "Chart.js", color: "bg-green-100 text-green-800" },
      { name: "Supabase", color: "bg-purple-100 text-purple-800" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        alt: "Dashboard overview",
      },
      {
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        alt: "Analytics page",
      },
      {
        src: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=800&q=80",
        alt: "Order management",
      },
    ],
    liveUrl: "https://example.com/demo",
    githubUrl: "https://github.com/username/project",
    features: [
      "Real-time sales analytics and reporting",
      "Inventory management with low stock alerts",
      "Order processing and fulfillment tracking",
      "Customer management and segmentation",
      "Responsive design for all devices",
    ],
    challenges: [
      "Implementing real-time data synchronization",
      "Optimizing performance for large datasets",
      "Creating an intuitive and accessible UI",
    ],
  },
}: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white dark:bg-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl dark:shadow-purple-900/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold dark:text-white">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400 mt-2">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        {/* Project Images Carousel */}
        <div className="relative mt-4 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-video shadow-lg dark:shadow-gray-900/50">
          <img
            src={project.images[currentImageIndex].src}
            alt={project.images[currentImageIndex].alt}
            className="w-full h-full object-cover"
          />

          {/* Navigation arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl dark:text-gray-300 transition-all"
              onClick={prevImage}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl dark:text-gray-300 transition-all"
              onClick={nextImage}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
            {currentImageIndex + 1} / {project.images.length}
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-6 space-y-6">
          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  className={
                    tech.color ||
                    "bg-purple-100 text-purple-800 dark:bg-purple-900/70 dark:text-purple-300"
                  }
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Long Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-400">
              About the Project
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {project.longDescription}
            </p>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-400">
                Key Features
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-700 dark:text-purple-400">
                Technical Challenges
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex-col sm:flex-row gap-3">
          {project.githubUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(project.githubUrl, "_blank")}
              className="border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/50 rounded-xl shadow-lg hover:shadow-purple-300/30 dark:hover:shadow-purple-900/30 transition-all"
            >
              <Github className="mr-2 h-4 w-4" />
              View Source Code
            </Button>
          )}
          {project.liveUrl && (
            <Button
              onClick={() => window.open(project.liveUrl, "_blank")}
              className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 rounded-xl shadow-lg hover:shadow-purple-300/50 dark:hover:shadow-purple-900/50 transition-all"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
