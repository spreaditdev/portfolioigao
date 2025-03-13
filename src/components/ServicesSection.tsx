import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Code, Layout, Smartphone, Zap, Palette, Database } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface ServicesSectionProps {
  title?: string;
  description?: string;
  services?: Service[];
  onContactClick?: () => void;
}

const ServicesSection = ({
  title = "Serviços Oferecidos",
  description = "Soluções personalizadas para atender às suas necessidades de desenvolvimento web e design.",
  services = [
    {
      id: "1",
      title: "Desenvolvimento Frontend",
      description:
        "Criação de interfaces modernas, responsivas e de alto desempenho utilizando as mais recentes tecnologias web.",
      icon: <Code className="h-10 w-10" />,
      features: [
        "Desenvolvimento com React, Vue ou Angular",
        "Aplicações responsivas para todos os dispositivos",
        "Animações e interações fluidas",
        "Integração com APIs e serviços",
      ],
    },
    {
      id: "2",
      title: "Design de UI/UX",
      description:
        "Design de interfaces intuitivas e atraentes que proporcionam uma experiência excepcional ao usuário.",
      icon: <Layout className="h-10 w-10" />,
      features: [
        "Wireframes e protótipos interativos",
        "Design de interfaces modernas",
        "Testes de usabilidade",
        "Sistemas de design consistentes",
      ],
    },
    {
      id: "3",
      title: "Desenvolvimento Mobile",
      description:
        "Aplicativos móveis nativos e híbridos para iOS e Android com foco em desempenho e experiência do usuário.",
      icon: <Smartphone className="h-10 w-10" />,
      features: [
        "Aplicativos React Native e Flutter",
        "Interfaces nativas para iOS e Android",
        "Integração com recursos do dispositivo",
        "Publicação nas lojas de aplicativos",
      ],
    },
    {
      id: "4",
      title: "Otimização de Performance",
      description:
        "Análise e otimização de aplicações web para melhorar o tempo de carregamento e a experiência geral do usuário.",
      icon: <Zap className="h-10 w-10" />,
      features: [
        "Auditoria de desempenho detalhada",
        "Otimização de código e assets",
        "Implementação de lazy loading",
        "Estratégias de cache avançadas",
      ],
    },
    {
      id: "5",
      title: "Design de Sistemas",
      description:
        "Criação de sistemas de design escaláveis e consistentes para equipes e produtos em crescimento.",
      icon: <Palette className="h-10 w-10" />,
      features: [
        "Bibliotecas de componentes reutilizáveis",
        "Documentação detalhada",
        "Tokens de design",
        "Integração com ferramentas de design",
      ],
    },
    {
      id: "6",
      title: "Desenvolvimento Backend",
      description:
        "Implementação de APIs robustas e escaláveis para suportar suas aplicações frontend.",
      icon: <Database className="h-10 w-10" />,
      features: [
        "APIs RESTful e GraphQL",
        "Integração com bancos de dados",
        "Autenticação e autorização",
        "Arquitetura de microsserviços",
      ],
    },
  ],
  onContactClick = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  },
}: ServicesSectionProps) => {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white dark:bg-gray-800 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50 transition-all duration-300 rounded-xl transform hover:-translate-y-2">
                <CardHeader className="pb-0">
                  <div className="w-16 h-16 rounded-lg bg-purple-100 dark:bg-purple-900/70 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 shadow-md dark:shadow-purple-900/30">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold dark:text-white">
                    {service.title}
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="mr-2 mt-1 bg-purple-100 dark:bg-purple-900/70 rounded-full p-0.5 shadow-sm">
                          <svg
                            className="h-3 w-3 text-purple-600 dark:text-purple-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/50"
                    onClick={onContactClick}
                  >
                    Solicitar Serviço
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
