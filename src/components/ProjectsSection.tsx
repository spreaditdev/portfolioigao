import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

interface Technology {
  name: string;
  color?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  technologies: Technology[];
  category: string[];
  demoUrl?: string;
  repoUrl?: string;
  images: { src: string; alt: string }[];
  features?: string[];
  challenges?: string[];
}

interface ProjectsSectionProps {
  title?: string;
  description?: string;
  projects?: Project[];
}

const ProjectsSection = ({
  title = "My Projects",
  description = "A showcase of my recent work and personal projects. Each project demonstrates different skills and technologies I've worked with.",
  projects = [
    {
      id: "1",
      title: "E-Commerce Dashboard",
      description:
        "A responsive dashboard for managing online store inventory, sales, and customer data with real-time analytics.",
      longDescription:
        "This project is a full-featured e-commerce dashboard that provides store owners with real-time analytics, inventory management, order processing, and customer relationship tools. Built with performance and usability in mind, it features a responsive design that works across all devices.",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "TypeScript", color: "bg-blue-100 text-blue-800" },
        { name: "Tailwind", color: "bg-cyan-100 text-cyan-800" },
      ],
      category: ["Frontend", "Web App"],
      demoUrl: "https://example.com/demo",
      repoUrl: "https://github.com/username/project",
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
    {
      id: "2",
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing my projects, skills, and professional experience with a modern, responsive design.",
      longDescription:
        "This portfolio website serves as a central hub for my professional presence online. It features a clean, modern design with smooth animations and a responsive layout that works well on all devices. The site is built with performance and accessibility in mind.",
      imageUrl:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&q=80",
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "Next.js", color: "bg-gray-100 text-gray-800" },
        { name: "Tailwind", color: "bg-cyan-100 text-cyan-800" },
      ],
      category: ["Frontend", "Personal"],
      demoUrl: "https://example.com/portfolio",
      repoUrl: "https://github.com/username/portfolio",
      images: [
        {
          src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
          alt: "Portfolio home page",
        },
        {
          src: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&q=80",
          alt: "Projects section",
        },
        {
          src: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
          alt: "Contact page",
        },
      ],
      features: [
        "Interactive project gallery",
        "Responsive design for all devices",
        "Dark/light mode toggle",
        "Contact form with validation",
        "Animated page transitions",
      ],
      challenges: [
        "Creating smooth animations without affecting performance",
        "Implementing accessible design features",
        "Optimizing images for fast loading",
      ],
    },
    {
      id: "3",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      longDescription:
        "This task management application helps teams organize their work with a visual, kanban-style interface. It features real-time updates, drag-and-drop task management, team collaboration tools, and integrations with popular services. The app is built with a focus on usability and performance.",
      imageUrl:
        "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=500&q=80",
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "Firebase", color: "bg-yellow-100 text-yellow-800" },
        { name: "Material UI", color: "bg-indigo-100 text-indigo-800" },
      ],
      category: ["Frontend", "Web App", "Mobile"],
      demoUrl: "https://example.com/taskapp",
      repoUrl: "https://github.com/username/taskapp",
      images: [
        {
          src: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
          alt: "Task board view",
        },
        {
          src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
          alt: "Calendar view",
        },
        {
          src: "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?w=800&q=80",
          alt: "Mobile view",
        },
      ],
      features: [
        "Drag-and-drop task management",
        "Real-time collaboration",
        "Task assignment and tracking",
        "Due date reminders and notifications",
        "Mobile-responsive design",
      ],
      challenges: [
        "Implementing real-time updates with Firebase",
        "Creating a smooth drag-and-drop interface",
        "Designing an intuitive mobile experience",
      ],
    },
    {
      id: "4",
      title: "Weather Forecast App",
      description:
        "A weather application providing current conditions and forecasts with location-based services and interactive maps.",
      longDescription:
        "This weather forecast application provides users with accurate, up-to-date weather information for any location. It features current conditions, hourly and 7-day forecasts, radar maps, and severe weather alerts. The app uses geolocation services to automatically detect the user's location.",
      imageUrl:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&q=80",
      technologies: [
        { name: "JavaScript", color: "bg-yellow-100 text-yellow-800" },
        { name: "Weather API", color: "bg-blue-100 text-blue-800" },
        { name: "CSS3", color: "bg-blue-100 text-blue-800" },
      ],
      category: ["Frontend", "API Integration"],
      demoUrl: "https://example.com/weather",
      repoUrl: "https://github.com/username/weather",
      images: [
        {
          src: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80",
          alt: "Weather app main screen",
        },
        {
          src: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&q=80",
          alt: "Forecast view",
        },
        {
          src: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
          alt: "Weather map",
        },
      ],
      features: [
        "Current weather conditions",
        "7-day and hourly forecasts",
        "Interactive weather maps",
        "Location-based services",
        "Severe weather alerts",
      ],
      challenges: [
        "Integrating with third-party weather APIs",
        "Handling different time zones and locations",
        "Creating responsive weather visualizations",
      ],
    },
  ],
}: ProjectsSectionProps) => {
  // Extract unique categories from projects
  const allCategories = [
    "Todos",
    ...new Set(projects.flatMap((project) => project.category)),
  ];

  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category.includes(activeCategory));

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="Todos" className="mb-12">
          <TabsList className="flex justify-center flex-wrap gap-2 mb-8">
            {allCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setActiveCategory(category)}
                className="px-4 py-2 rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white shadow-md hover:shadow-lg transition-all"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  technologies={project.technologies}
                  demoUrl={project.demoUrl}
                  repoUrl={project.repoUrl}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
            project={{
              id: selectedProject.id,
              title: selectedProject.title,
              description: selectedProject.description,
              longDescription: selectedProject.longDescription,
              technologies: selectedProject.technologies,
              images: selectedProject.images,
              liveUrl: selectedProject.demoUrl,
              githubUrl: selectedProject.repoUrl,
              features: selectedProject.features,
              challenges: selectedProject.challenges,
            }}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
