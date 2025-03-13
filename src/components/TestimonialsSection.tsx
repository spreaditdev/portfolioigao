import React from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  avatar: string;
  content: string;
}

interface TestimonialsSectionProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

const TestimonialsSection = ({
  title = "O que dizem sobre mim",
  description = "Feedback de clientes e colegas com quem tive o prazer de trabalhar em diversos projetos.",
  testimonials = [
    {
      id: "1",
      name: "Ana Silva",
      position: "Gerente de Produto",
      company: "TechCorp",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      content:
        "João é um desenvolvedor excepcional que entrega consistentemente código de alta qualidade. Sua atenção aos detalhes e compromisso com a acessibilidade elevaram significativamente a qualidade de nossos produtos.",
    },
    {
      id: "2",
      name: "Carlos Mendes",
      position: "CTO",
      company: "StartupX",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      content:
        "Contratar João para nosso projeto foi uma das melhores decisões que tomamos. Ele não apenas implementou todas as funcionalidades que precisávamos, mas também sugeriu melhorias que não havíamos considerado.",
    },
    {
      id: "3",
      name: "Mariana Costa",
      position: "Designer de UX",
      company: "DesignLab",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
      content:
        "Como designer, é um prazer trabalhar com um desenvolvedor que se preocupa tanto com a experiência do usuário. João traduz perfeitamente designs em código, mantendo a fidelidade visual e adicionando animações que enriquecem a experiência.",
    },
    {
      id: "4",
      name: "Rafael Oliveira",
      position: "Gerente de Projetos",
      company: "WebSolutions",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael",
      content:
        "João não é apenas um excelente desenvolvedor técnico, mas também um grande comunicador e colaborador. Ele mantém todos informados sobre o progresso e é proativo na resolução de problemas antes que se tornem obstáculos.",
    },
  ],
}: TestimonialsSectionProps) => {
  return (
    <section
      id="testimonials"
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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/2 pl-4"
              >
                <div className="p-1">
                  <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-purple-600 dark:text-purple-400 mb-4">
                        <Quote className="h-8 w-8" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic mb-6 flex-grow">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center mt-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold dark:text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonial.position}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static transform-none bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900 text-purple-600 dark:text-purple-400" />
            <CarouselNext className="static transform-none bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900 text-purple-600 dark:text-purple-400" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
