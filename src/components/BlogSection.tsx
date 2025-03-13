import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  categories: string[];
  slug: string;
}

interface BlogSectionProps {
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

const BlogSection = ({
  title = "Blog & Artigos",
  description = "Compartilho meus conhecimentos, experiências e dicas sobre desenvolvimento web, design e tecnologia.",
  posts = [
    {
      id: "1",
      title: "Como criar animações eficientes com Framer Motion",
      excerpt:
        "Aprenda a criar animações fluidas e de alto desempenho em seus projetos React usando a biblioteca Framer Motion.",
      date: "15 Jun 2023",
      readTime: "8 min",
      imageUrl:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
      categories: ["React", "Animação", "Frontend"],
      slug: "animacoes-framer-motion",
    },
    {
      id: "2",
      title: "Otimizando o desempenho de aplicações React",
      excerpt:
        "Estratégias e técnicas para melhorar significativamente o desempenho de suas aplicações React em produção.",
      date: "28 Mai 2023",
      readTime: "12 min",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
      categories: ["React", "Performance", "Otimização"],
      slug: "otimizando-desempenho-react",
    },
    {
      id: "3",
      title: "Construindo interfaces acessíveis com React",
      excerpt:
        "Um guia completo sobre como criar interfaces web acessíveis e inclusivas usando React e bibliotecas modernas.",
      date: "10 Abr 2023",
      readTime: "10 min",
      imageUrl:
        "https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=600&q=80",
      categories: ["Acessibilidade", "React", "UI/UX"],
      slug: "interfaces-acessiveis-react",
    },
  ],
}: BlogSectionProps) => {
  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950"
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
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col bg-white dark:bg-gray-800 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50 transition-all duration-300 rounded-xl transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-xl">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-0 left-0 w-full p-4 flex flex-wrap gap-2">
                    {post.categories.map((category, idx) => (
                      <Badge key={idx} className="bg-purple-600 text-white">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                <CardHeader className="p-4 pb-0">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold line-clamp-2 dark:text-white">
                    {post.title}
                  </h3>
                </CardHeader>

                <CardContent className="p-4 flex-grow">
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="link"
                    className="p-0 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                    asChild
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center"
                    >
                      Ler artigo completo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="rounded-full px-8 border-purple-600 text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-purple-300/30 transition-all"
            asChild
          >
            <Link to="/blog">Ver todos os artigos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
