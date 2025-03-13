import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Briefcase,
  Calendar,
  ChevronDown,
  ExternalLink,
  MapPin,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { motion } from "framer-motion";

interface Achievement {
  id: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  logo: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  companyUrl?: string;
}

interface ExperienceSectionProps {
  title?: string;
  description?: string;
  experiences?: Experience[];
}

const ExperienceSection = ({
  title = "Professional Experience",
  description = "My professional journey as a frontend developer, showcasing my roles and achievements at various companies.",
  experiences = [
    {
      id: "1",
      company: "LATAM Airlines",
      position: "Desenvolvedor Frontend Sênior",
      logo: "https://logodownload.org/wp-content/uploads/2019/06/latam-logo-1.png",
      startDate: "Jan 2023",
      endDate: "Presente",
      location: "São Paulo, SP (Híbrido)",
      description:
        "Liderança no desenvolvimento frontend do sistema de reservas e check-in online da LATAM, com foco em otimização de performance e melhorias de acessibilidade em toda a plataforma.",
      achievements: [
        {
          id: "1a",
          description:
            "Liderou a migração de componentes legados para React, resultando em 45% de melhoria no desempenho de renderização.",
        },
        {
          id: "1b",
          description:
            "Implementou recursos avançados de acessibilidade que aumentaram a conformidade com WCAG de 78% para 98%.",
        },
        {
          id: "1c",
          description:
            "Arquitetou e implementou um design system utilizado por mais de 50 desenvolvedores em múltiplas equipes de produto.",
        },
        {
          id: "1d",
          description:
            "Reduziu o tamanho do bundle em 35% através de estratégias de code splitting e lazy loading.",
        },
      ],
      technologies: [
        "React",
        "TypeScript",
        "Redux",
        "AWS",
        "Jest",
        "Playwright",
        "Webpack",
      ],
      companyUrl: "https://www.latamairlines.com/br/pt",
    },
    {
      id: "2",
      company: "Contabilizei",
      position: "Tech Lead Frontend",
      logo: "https://logodownload.org/wp-content/uploads/2019/08/contabilizei-logo.png",
      startDate: "Abr 2022",
      endDate: "Dez 2022",
      location: "Curitiba, PR (Híbrido)",
      description:
        "Liderou o desenvolvimento frontend da plataforma de contabilidade online, com foco na otimização da experiência do usuário e ferramentas para empreendedores e contadores.",
      achievements: [
        {
          id: "2a",
          description:
            "Reconstruiu a biblioteca de componentes React resultando em um aumento de 28% na produtividade dos desenvolvedores e redução de 40% nas inconsistências de UI.",
        },
        {
          id: "2b",
          description:
            "Implementou uma estratégia abrangente de testes que reduziu bugs pós-lançamento em 65%.",
        },
        {
          id: "2c",
          description:
            "Otimizou a experiência mobile, aumentando o engajamento em dispositivos móveis em 52% ano a ano.",
        },
      ],
      technologies: [
        "React",
        "JavaScript",
        "Redux",
        "GraphQL",
        "Jest",
        "Cypress",
        "AWS",
      ],
      companyUrl: "https://www.contabilizei.com.br",
    },
    {
      id: "3",
      company: "Creditas",
      position: "Desenvolvedor Frontend Sênior",
      logo: "https://logodownload.org/wp-content/uploads/2019/08/creditas-logo.png",
      startDate: "Jul 2021",
      endDate: "Mar 2022",
      location: "São Paulo, SP (Remoto)",
      description:
        "Desenvolveu e manteve recursos-chave para as aplicações web da Creditas, com foco na criação de interfaces intuitivas e responsivas para a experiência de empréstimos online.",
      achievements: [
        {
          id: "3a",
          description:
            "Implementou sistema de simulação de empréstimos em tempo real utilizado por mais de 500 mil usuários mensalmente.",
        },
        {
          id: "3b",
          description:
            "Reduziu o tempo de carregamento inicial em 60% através de otimizações de performance e refatoração de código.",
        },
        {
          id: "3c",
          description:
            "Colaborou com a equipe de design para implementar um novo design system que melhorou a consistência da UI em todas as plataformas.",
        },
      ],
      technologies: [
        "React",
        "TypeScript",
        "GraphQL",
        "Styled Components",
        "Jest",
        "React Testing Library",
        "Storybook",
      ],
      companyUrl: "https://www.creditas.com",
    },
    {
      id: "4",
      company: "Quinto Andar",
      position: "Desenvolvedor Frontend",
      logo: "https://logodownload.org/wp-content/uploads/2019/09/quintoandar-logo.png",
      startDate: "Ago 2020",
      endDate: "Jun 2021",
      location: "São Paulo, SP (Remoto)",
      description:
        "Desenvolveu recursos interativos para a plataforma de aluguel de imóveis, com foco em performance e experiência do usuário na busca e visualização de propriedades.",
      achievements: [
        {
          id: "4a",
          description:
            "Implementou designs responsivos que melhoraram o engajamento mobile em 45%.",
        },
        {
          id: "4b",
          description:
            "Desenvolveu um componente de visualização 3D de imóveis que aprimorou a experiência do usuário durante a navegação.",
        },
        {
          id: "4c",
          description:
            "Criou visualizações de dados interativas para análise de mercado imobiliário utilizadas por milhares de corretores.",
        },
      ],
      technologies: [
        "JavaScript",
        "React",
        "Redux",
        "SASS",
        "HTML5",
        "CSS3",
        "D3.js",
        "Webpack",
      ],
      companyUrl: "https://www.quintoandar.com.br",
    },
    {
      id: "5",
      company: "Hotmart",
      position: "Engenheiro de UI",
      logo: "https://logodownload.org/wp-content/uploads/2019/08/hotmart-logo.png",
      startDate: "Fev 2019",
      endDate: "Jul 2020",
      location: "Belo Horizonte, MG (Presencial)",
      description:
        "Contribuiu para o desenvolvimento e manutenção da interface da plataforma Hotmart, com foco na implementação de UI e garantia de compatibilidade entre dispositivos.",
      achievements: [
        {
          id: "5a",
          description:
            "Contribuiu para o redesign da experiência de navegação, melhorando as pontuações de satisfação do usuário em 25%.",
        },
        {
          id: "5b",
          description:
            "Implementou melhorias de acessibilidade que trouxeram a plataforma em conformidade com os padrões WCAG 2.1.",
        },
        {
          id: "5c",
          description:
            "Desenvolveu componentes de UI reutilizáveis que reduziram o tempo de desenvolvimento para novos recursos em 40%.",
        },
      ],
      technologies: [
        "JavaScript",
        "React",
        "Node.js",
        "HTML5",
        "CSS3",
        "Jest",
        "Enzyme",
        "Jenkins",
      ],
      companyUrl: "https://www.hotmart.com",
    },
    {
      id: "6",
      company: "Resultados Digitais",
      position: "Desenvolvedor Frontend",
      logo: "https://logodownload.org/wp-content/uploads/2019/09/resultados-digitais-logo.png",
      startDate: "Mai 2018",
      endDate: "Jan 2019",
      location: "Florianópolis, SC (Remoto)",
      description:
        "Trabalhou no desenvolvimento do RD Station, implementando designs responsivos e melhorando a experiência geral do usuário na plataforma de marketing digital.",
      achievements: [
        {
          id: "6a",
          description:
            "Construiu um editor de landing pages drag-and-drop que reduziu o tempo de criação em 60%.",
        },
        {
          id: "6b",
          description:
            "Otimizou o fluxo de automação de marketing resultando em um aumento de 15% nas taxas de conversão.",
        },
        {
          id: "6c",
          description:
            "Implementou padrões de design responsivo que melhoraram a usabilidade móvel em todos os módulos da plataforma.",
        },
      ],
      technologies: [
        "JavaScript",
        "React",
        "Node.js",
        "GraphQL",
        "Styleguide",
        "SCSS",
        "Jest",
      ],
      companyUrl: "https://resultadosdigitais.com.br",
    },
    {
      id: "7",
      company: "Conta Azul",
      position: "Desenvolvedor Frontend Júnior",
      logo: "https://logodownload.org/wp-content/uploads/2019/08/conta-azul-logo.png",
      startDate: "Jun 2017",
      endDate: "Abr 2018",
      location: "Joinville, SC (Presencial)",
      description:
        "Auxiliou no desenvolvimento das interfaces de contabilidade e finanças da Conta Azul, com foco na criação de experiências de usuário intuitivas e seguras.",
      achievements: [
        {
          id: "7a",
          description:
            "Contribuiu para a implementação de formulários responsivos que melhoraram a conversão mobile em 22%.",
        },
        {
          id: "7b",
          description:
            "Ajudou a desenvolver documentação interativa que reduziu tickets de suporte em 30%.",
        },
        {
          id: "7c",
          description:
            "Implementou melhorias de UI que aprimoraram a clareza da visualização de dados financeiros.",
        },
      ],
      technologies: [
        "JavaScript",
        "Angular",
        "TypeScript",
        "SCSS",
        "HTML5",
        "Jasmine",
        "Karma",
      ],
      companyUrl: "https://contaazul.com",
    },
  ],
}: ExperienceSectionProps) => {
  return (
    <section
      id="experience"
      className="py-20 bg-gradient-to-b from-purple-50 to-white dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50 transition-all duration-300">
                <CardHeader className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-gray-700 flex items-center justify-center shadow-md border border-gray-100 dark:border-gray-600">
                      <img
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="text-xl font-bold dark:text-white">
                            {experience.position}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800 dark:text-gray-200">
                              {experience.company}
                            </span>
                            {experience.companyUrl && (
                              <a
                                href={experience.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          <span>
                            {experience.startDate} - {experience.endDate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {experience.description}
                  </p>

                  <Accordion
                    type="single"
                    collapsible
                    className="border-t border-gray-200 dark:border-gray-700 pt-4"
                  >
                    <AccordionItem
                      value={`achievements-${experience.id}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="py-2 text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300">
                        <span className="text-sm font-semibold">
                          Key Achievements
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {experience.achievements.map((achievement) => (
                            <li
                              key={achievement.id}
                              className="text-gray-700 dark:text-gray-300"
                            >
                              {achievement.description}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2 text-purple-700 dark:text-purple-400">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
