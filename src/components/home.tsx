import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import BlogSection from "./BlogSection";
import TestimonialsSection from "./TestimonialsSection";
import ServicesSection from "./ServicesSection";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background dark:bg-gray-950">
      <Navbar />
      <Sidebar />
      <HeroSection
        name="Igor Costa Oliveira"
        title={t("hero.title")}
        summary={t("hero.summary")}
        imageUrl="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&q=80"
        socialLinks={{
          github: "https://github.com/igorcosta",
          linkedin: "https://linkedin.com/in/igorcosta",
          twitter: "https://twitter.com/igorcosta",
        }}
        onContactClick={() => scrollToSection("contact")}
        onProjectsClick={() => scrollToSection("projects")}
      />
      <ProjectsSection
        title={t("projects.title")}
        description={t("projects.description")}
        projects={[
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
        ]}
      />
      <SkillsSection
        title={t("skills.title")}
        subtitle={t("skills.subtitle")}
      />
      <ExperienceSection
        title={t("experience.title")}
        description={t("experience.description")}
      />
      <ServicesSection onContactClick={() => scrollToSection("contact")} />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection
        email="igorhawking@gmail.com"
        socialLinks={{
          github: "https://github.com/igorcosta",
          linkedin: "https://linkedin.com/in/igorcosta",
          twitter: "https://twitter.com/igorcosta",
        }}
      />
      <Footer
        copyrightText={t("footer.copyright")}
        socialLinks={{
          github: "https://github.com/igorcosta",
          linkedin: "https://linkedin.com/in/igorcosta",
          twitter: "https://twitter.com/igorcosta",
          email: "mailto:igorhawking@gmail.com",
        }}
        attributions={[t("footer.builtWith"), t("footer.iconsBy")]}
      />
    </div>
  );
}

export default Home;
