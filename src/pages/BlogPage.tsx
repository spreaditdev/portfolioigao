import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const blogPosts: BlogPost[] = [
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
  {
    id: "4",
    title: "Introdução ao TypeScript para desenvolvedores React",
    excerpt:
      "Um guia prático para começar a usar TypeScript em seus projetos React e aproveitar ao máximo a tipagem estática.",
    date: "22 Mar 2023",
    readTime: "15 min",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80",
    categories: ["TypeScript", "React", "Frontend"],
    slug: "typescript-para-react",
  },
  {
    id: "5",
    title: "Gerenciamento de estado com Redux Toolkit",
    excerpt:
      "Aprenda a simplificar o gerenciamento de estado em aplicações React complexas usando Redux Toolkit.",
    date: "05 Mar 2023",
    readTime: "14 min",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&q=80",
    categories: ["React", "Redux", "Estado"],
    slug: "redux-toolkit-gerenciamento-estado",
  },
  {
    id: "6",
    title: "Criando temas escuros com Tailwind CSS",
    excerpt:
      "Um tutorial passo a passo para implementar um sistema de tema escuro/claro em seu site usando Tailwind CSS.",
    date: "18 Fev 2023",
    readTime: "9 min",
    imageUrl:
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=600&q=80",
    categories: ["CSS", "Tailwind", "Design"],
    slug: "tema-escuro-tailwind",
  },
  {
    id: "7",
    title: "Testes automatizados em aplicações React",
    excerpt:
      "Estratégias e ferramentas para implementar testes unitários, de integração e end-to-end em seus projetos React.",
    date: "30 Jan 2023",
    readTime: "16 min",
    imageUrl:
      "https://images.unsplash.com/photo-1562516155-e0c1ee44059b?w=600&q=80",
    categories: ["Testes", "React", "Jest"],
    slug: "testes-automatizados-react",
  },
  {
    id: "8",
    title: "Construindo APIs com Node.js e Express",
    excerpt:
      "Um guia completo para criar APIs RESTful robustas e escaláveis usando Node.js, Express e MongoDB.",
    date: "12 Jan 2023",
    readTime: "18 min",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    categories: ["Backend", "Node.js", "API"],
    slug: "apis-nodejs-express",
  },
];

const allCategories = [
  "Todos",
  ...Array.from(new Set(blogPosts.flatMap((post) => post.categories))),
];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  // Filter posts based on search term and active category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === "Todos" || post.categories.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Blog & Artigos
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Compartilho meus conhecimentos, experiências e dicas sobre
              desenvolvimento web, design e tecnologia.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-full border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                />
              </div>
              <div className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="rounded-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/50"
                  onClick={() => setSearchTerm("")}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>

            {/* Categories */}
            <Tabs defaultValue="Todos" className="w-full">
              <TabsList className="flex flex-wrap justify-start mb-8 bg-transparent">
                {allCategories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setActiveCategory(category)}
                    className="px-4 py-2 m-1 rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white shadow-md hover:shadow-lg transition-all"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="h-full flex flex-col bg-white dark:bg-gray-800 hover:shadow-xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/50 transition-all duration-300 rounded-xl transform hover:-translate-y-2"
                >
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
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Nenhum artigo encontrado
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Tente ajustar seus filtros de busca ou categorias.
              </p>
              <Button
                variant="outline"
                className="rounded-full border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/50"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("Todos");
                }}
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
