import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Phone,
  Clock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de e-mail válido" }),
  subject: z.string().min(5, {
    message: "Assunto deve ter pelo menos 5 caracteres",
  }),
  message: z.string().min(10, {
    message: "Mensagem deve ter pelo menos 10 caracteres",
  }),
  budget: z.string().optional(),
  deadline: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [formStatus, setFormStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      budget: "",
      deadline: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setFormStatus("submitting");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", data);
      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Entre em Contato
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tem um projeto em mente ou quer discutir potenciais oportunidades?
              Preencha o formulário abaixo ou entre em contato diretamente
              através dos meus canais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              <Card className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-6 dark:text-white">
                  Informações de Contato
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <a
                        href="mailto:desenvolvedor@exemplo.com"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        desenvolvedor@exemplo.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Telefone
                      </p>
                      <a
                        href="tel:+5511999999999"
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                      >
                        +55 (11) 99999-9999
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Localização
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        São Paulo, SP - Brasil
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Horário de Trabalho
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Segunda - Sexta: 9:00 - 17:00
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-medium mb-4 dark:text-white">
                    Conecte-se Comigo
                  </h4>
                  <div className="flex space-x-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://github.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 p-3 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300"
                          >
                            <Github className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GitHub</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://linkedin.com/in/username"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 p-3 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300"
                          >
                            <Linkedin className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>LinkedIn</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href="https://twitter.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 p-3 rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-1 duration-300"
                          >
                            <Twitter className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Twitter</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </Card>

              {/* Map placeholder */}
              <Card className="bg-white dark:bg-gray-800 overflow-hidden rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488551516!2d-46.92498792500001!3d-23.681531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1656543245123!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de localização"
                  ></iframe>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-6 dark:text-white">
                  Envie-me uma Mensagem
                </h3>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">
                              Nome
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Seu nome"
                                {...field}
                                className="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">
                              E-mail
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="seu.email@exemplo.com"
                                {...field}
                                className="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-300">
                            Assunto
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Sobre o que é isso?"
                              {...field}
                              className="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">
                              Orçamento (opcional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Seu orçamento para o projeto"
                                {...field}
                                className="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="dark:text-gray-300">
                              Prazo (opcional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Prazo desejado para o projeto"
                                {...field}
                                className="rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="dark:text-gray-300">
                            Mensagem
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Descreva seu projeto ou ideia em detalhes..."
                              className="min-h-[150px] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-300/50 transition-all rounded-xl"
                      disabled={formStatus === "submitting"}
                    >
                      {formStatus === "idle" && (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Enviar Mensagem
                        </>
                      )}
                      {formStatus === "submitting" && "Enviando..."}
                      {formStatus === "success" && (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" /> Mensagem
                          Enviada
                        </>
                      )}
                      {formStatus === "error" && (
                        <>
                          <AlertCircle className="mr-2 h-4 w-4" /> Tentar
                          Novamente
                        </>
                      )}
                    </Button>

                    {formStatus === "success" && (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-600 dark:text-green-400 text-sm text-center mt-4">
                        <CheckCircle2 className="h-5 w-5 mx-auto mb-2" />
                        <p>
                          Obrigado pela sua mensagem! Entrarei em contato em
                          breve.
                        </p>
                      </div>
                    )}
                    {formStatus === "error" && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center mt-4">
                        <AlertCircle className="h-5 w-5 mx-auto mb-2" />
                        <p>
                          Houve um erro ao enviar sua mensagem. Por favor, tente
                          novamente.
                        </p>
                      </div>
                    )}
                  </form>
                </Form>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
