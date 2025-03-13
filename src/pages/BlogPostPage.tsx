import React from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ThumbsUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
  categories: string[];
  slug: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
}

// Mock data for blog posts
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Como criar animações eficientes com Framer Motion",
    excerpt:
      "Aprenda a criar animações fluidas e de alto desempenho em seus projetos React usando a biblioteca Framer Motion.",
    content: `
      <p>Framer Motion é uma biblioteca poderosa para React que facilita a criação de animações complexas e interativas. Neste artigo, vamos explorar como utilizar o Framer Motion para criar animações eficientes e de alto desempenho em seus projetos.</p>
      
      <h2>Por que usar Framer Motion?</h2>
      <p>Antes de mergulharmos nos detalhes técnicos, vamos entender por que o Framer Motion se destaca entre outras bibliotecas de animação:</p>
      <ul>
        <li>API declarativa e intuitiva</li>
        <li>Animações baseadas em física para movimentos naturais</li>
        <li>Suporte a gestos e interações</li>
        <li>Otimização de performance automática</li>
        <li>Transições entre componentes</li>
      </ul>
      
      <h2>Instalação e configuração básica</h2>
      <p>Para começar, instale o Framer Motion em seu projeto React:</p>
      <pre><code>npm install framer-motion</code></pre>
      <p>Ou se você estiver usando Yarn:</p>
      <pre><code>yarn add framer-motion</code></pre>
      
      <h2>Animações básicas</h2>
      <p>O componente principal do Framer Motion é o <code>motion</code>. Ele pode ser usado como prefixo para qualquer elemento HTML ou componente React:</p>
      <pre><code>
      import { motion } from 'framer-motion';

      function MyComponent() {
        return (
          &lt;motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          &gt;
            Olá, mundo!
          &lt;/motion.div&gt;
        );
      }
      </code></pre>
      
      <h2>Animações com variantes</h2>
      <p>Para animações mais complexas, você pode usar variantes para definir estados de animação:</p>
      <pre><code>
      const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            staggerChildren: 0.1
          }
        }
      };

      function MyComponent() {
        return (
          &lt;motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
          &gt;
            &lt;motion.h1 variants={variants}&gt;Título&lt;/motion.h1&gt;
            &lt;motion.p variants={variants}&gt;Parágrafo&lt;/motion.p&gt;
          &lt;/motion.div&gt;
        );
      }
      </code></pre>
      
      <h2>Animações baseadas em scroll</h2>
      <p>O Framer Motion também permite criar animações acionadas pelo scroll:</p>
      <pre><code>
      import { motion, useScroll } from 'framer-motion';

      function MyComponent() {
        const { scrollYProgress } = useScroll();
        
        return (
          &lt;motion.div
            style={{ 
              scaleX: scrollYProgress,
              transformOrigin: "left",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "5px",
              background: "blue"
            }}
          /&gt;
        );
      }
      </code></pre>
      
      <h2>Otimizando o desempenho</h2>
      <p>Embora o Framer Motion seja otimizado por padrão, aqui estão algumas dicas para melhorar ainda mais o desempenho:</p>
      <ul>
        <li>Use a propriedade <code>layoutId</code> para animações de layout compartilhadas</li>
        <li>Prefira animar propriedades CSS que não causam reflow (como opacity e transform)</li>
        <li>Use <code>AnimatePresence</code> para animar a saída de componentes</li>
        <li>Evite animar muitos elementos simultaneamente</li>
      </ul>
      
      <h2>Conclusão</h2>
      <p>O Framer Motion é uma ferramenta poderosa que pode elevar significativamente a experiência do usuário em suas aplicações React. Com sua API intuitiva e recursos avançados, você pode criar animações complexas com relativamente pouco código.</p>
      <p>Experimente incorporar algumas dessas técnicas em seu próximo projeto e observe como pequenas animações podem fazer uma grande diferença na percepção de qualidade de sua interface.</p>
    `,
    date: "15 Jun 2023",
    readTime: "8 min",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    categories: ["React", "Animação", "Frontend"],
    slug: "animacoes-framer-motion",
    author: {
      name: "João Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=João",
      bio: "Desenvolvedor Frontend especializado em React e animações web. Apaixonado por criar experiências de usuário fluidas e intuitivas.",
    },
  },
  {
    id: "2",
    title: "Otimizando o desempenho de aplicações React",
    excerpt:
      "Estratégias e técnicas para melhorar significativamente o desempenho de suas aplicações React em produção.",
    content: `
      <p>O desempenho é um aspecto crucial para o sucesso de qualquer aplicação web moderna. Neste artigo, vamos explorar várias estratégias e técnicas para otimizar o desempenho de aplicações React.</p>
      
      <h2>Por que a otimização de desempenho é importante?</h2>
      <p>Antes de mergulharmos nas técnicas específicas, é importante entender por que devemos nos preocupar com o desempenho:</p>
      <ul>
        <li>Melhor experiência do usuário</li>
        <li>Maior taxa de conversão</li>
        <li>Melhor SEO</li>
        <li>Menor consumo de dados para usuários móveis</li>
        <li>Maior acessibilidade em dispositivos de baixo desempenho</li>
      </ul>
      
      <h2>Medindo o desempenho</h2>
      <p>Antes de otimizar, precisamos medir. Aqui estão algumas ferramentas úteis:</p>
      <ul>
        <li>Chrome DevTools Performance tab</li>
        <li>React DevTools Profiler</li>
        <li>Lighthouse</li>
        <li>Web Vitals</li>
      </ul>
      
      <h2>Técnicas de otimização</h2>
      
      <h3>1. Memoização de componentes</h3>
      <p>Use React.memo para evitar renderizações desnecessárias:</p>
      <pre><code>
      const MyComponent = React.memo(function MyComponent(props) {
        // seu componente aqui
      });
      </code></pre>
      
      <h3>2. Hooks de memoização</h3>
      <p>Use useMemo e useCallback para memoizar valores e funções:</p>
      <pre><code>
      // Memoizar um valor computado
      const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

      // Memoizar uma função
      const memoizedCallback = useCallback(() => {
        doSomething(a, b);
      }, [a, b]);
      </code></pre>
      
      <h3>3. Virtualização de listas</h3>
      <p>Para listas longas, use bibliotecas como react-window ou react-virtualized:</p>
      <pre><code>
      import { FixedSizeList } from 'react-window';

      function MyList({ items }) {
        const Row = ({ index, style }) => (
          &lt;div style={style}&gt;{items[index]}&lt;/div&gt;
        );

        return (
          &lt;FixedSizeList
            height={500}
            width={300}
            itemSize={50}
            itemCount={items.length}
          &gt;
            {Row}
          &lt;/FixedSizeList&gt;
        );
      }
      </code></pre>
      
      <h3>4. Code splitting</h3>
      <p>Divida seu código em chunks menores usando import dinâmico:</p>
      <pre><code>
      import React, { lazy, Suspense } from 'react';

      const LazyComponent = lazy(() => import('./LazyComponent'));

      function MyComponent() {
        return (
          &lt;Suspense fallback={&lt;div&gt;Loading...&lt;/div&gt;}&gt;
            &lt;LazyComponent /&gt;
          &lt;/Suspense&gt;
        );
      }
      </code></pre>
      
      <h3>5. Otimização de imagens</h3>
      <p>Use formatos modernos como WebP, carregamento lazy e dimensões apropriadas:</p>
      <pre><code>
      import { LazyLoadImage } from 'react-lazy-load-image-component';

      function MyImage() {
        return (
          &lt;LazyLoadImage
            src="image.webp"
            alt="Descrição da imagem"
            width={300}
            height={200}
            effect="blur"
          /&gt;
        );
      }
      </code></pre>
      
      <h3>6. Evite prop drilling</h3>
      <p>Use Context API ou bibliotecas de gerenciamento de estado para evitar passar props através de muitos níveis:</p>
      <pre><code>
      import { createContext, useContext, useState } from 'react';

      const ThemeContext = createContext();

      function ThemeProvider({ children }) {
        const [theme, setTheme] = useState('light');
        return (
          &lt;ThemeContext.Provider value={{ theme, setTheme }}&gt;
            {children}
          &lt;/ThemeContext.Provider&gt;
        );
      }

      function useTheme() {
        return useContext(ThemeContext);
      }
      </code></pre>
      
      <h2>Otimizações avançadas</h2>
      
      <h3>1. Web Workers</h3>
      <p>Mova cálculos pesados para Web Workers para não bloquear a thread principal:</p>
      <pre><code>
      // Em worker.js
      self.addEventListener('message', (e) => {
        const result = heavyCalculation(e.data);
        self.postMessage(result);
      });

      // Em seu componente
      const worker = new Worker('./worker.js');
      worker.postMessage(data);
      worker.onmessage = (e) => {
        setResult(e.data);
      };
      </code></pre>
      
      <h3>2. Server-side rendering (SSR)</h3>
      <p>Use Next.js ou similar para renderizar o HTML inicial no servidor:</p>
      <pre><code>
      // Em Next.js
      export async function getServerSideProps() {
        const data = await fetchData();
        return { props: { data } };
      }

      function MyPage({ data }) {
        // Renderizado com dados já disponíveis
        return &lt;div&gt;{data.title}&lt;/div&gt;;
      }
      </code></pre>
      
      <h2>Conclusão</h2>
      <p>A otimização de desempenho é um processo contínuo. Comece medindo, identifique gargalos e aplique as técnicas mais apropriadas para seu caso específico. Lembre-se de que a otimização prematura pode levar a código mais complexo, então sempre meça o impacto de suas mudanças.</p>
      <p>Implementando essas estratégias, você pode criar aplicações React que não apenas parecem boas, mas também oferecem uma experiência rápida e fluida para seus usuários.</p>
    `,
    date: "28 Mai 2023",
    readTime: "12 min",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    categories: ["React", "Performance", "Otimização"],
    slug: "otimizando-desempenho-react",
    author: {
      name: "João Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=João",
      bio: "Desenvolvedor Frontend especializado em React e animações web. Apaixonado por criar experiências de usuário fluidas e intuitivas.",
    },
  },
];

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background dark:bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Artigo não encontrado
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              O artigo que você está procurando não existe ou foi removido.
            </p>
            <Button asChild>
              <Link to="/blog">Voltar para o Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back button */}
          <div className="mb-8">
            <Button
              variant="ghost"
              className="pl-0 text-gray-600 dark:text-gray-300 hover:bg-transparent hover:text-purple-600 dark:hover:text-purple-400"
              asChild
            >
              <Link to="/blog" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Blog
              </Link>
            </Button>
          </div>

          {/* Article header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category, idx) => (
                <Badge key={idx} className="bg-purple-600 text-white">
                  {category}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 dark:text-white">
              {post.title}
            </h1>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="mr-4">{post.date}</span>
              <Clock className="h-4 w-4 mr-1" />
              <span>{post.readTime} de leitura</span>
            </div>
          </div>

          {/* Featured image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Author info */}
          <div className="flex items-center mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold dark:text-white">{post.author.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {post.author.bio}
              </p>
            </div>
          </div>

          {/* Article content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-purple-600 dark:prose-a:text-purple-400 prose-img:rounded-xl mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article actions */}
          <div className="flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-700 py-4 my-8">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ThumbsUp className="h-4 w-4" />
                <span>Curtir</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Bookmark className="h-4 w-4" />
                <span>Salvar</span>
              </Button>
            </div>
          </div>

          {/* Related posts - placeholder */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Artigos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts
                .filter(
                  (relatedPost) =>
                    relatedPost.id !== post.id &&
                    relatedPost.categories.some((cat) =>
                      post.categories.includes(cat),
                    ),
                )
                .slice(0, 2)
                .map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-bold mb-1 line-clamp-2 dark:text-white">
                        <Link
                          to={`/blog/${relatedPost.slug}`}
                          className="hover:text-purple-600 dark:hover:text-purple-400"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{relatedPost.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {relatedPost.categories
                          .slice(0, 2)
                          .map((category, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs"
                            >
                              {category}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
