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
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface ContactSectionProps {
  email?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const ContactSection = ({
  email = "igorhawking@gmail.com",
  socialLinks = {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username",
  },
}: ContactSectionProps) => {
  const [formStatus, setFormStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const { t } = useTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setFormStatus("submitting");
    try {
      // Send data to Supabase via contactService
      const { contactService } = await import("../services/contactService");
      await contactService.submitContactForm({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      });

      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            {t("contact.title")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-6 dark:text-white">
              {t("contact.sendMessage")}
            </h3>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">
                        {t("contact.name")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("contact.name")}
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
                        {t("contact.email")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="seu.email@email.com"
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">
                        {t("contact.subject")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("contact.subject")}
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
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-gray-300">
                        {t("contact.message")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("contact.message")}
                          className="min-h-[120px] rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                      <Send className="mr-2 h-4 w-4" /> {t("contact.send")}
                    </>
                  )}
                  {formStatus === "submitting" && t("contact.sending")}
                  {formStatus === "success" && (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
                      {t("contact.sent")}
                    </>
                  )}
                  {formStatus === "error" && (
                    <>
                      <AlertCircle className="mr-2 h-4 w-4" />{" "}
                      {t("contact.tryAgain")}
                    </>
                  )}
                </Button>

                {formStatus === "success" && (
                  <p className="text-green-600 text-sm text-center mt-2">
                    {t("contact.thankYou")}
                  </p>
                )}
                {formStatus === "error" && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    {t("contact.error")}
                  </p>
                )}
              </form>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            className="flex flex-col justify-between"
          >
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300 mb-6">
              <h3 className="text-xl font-semibold mb-6 dark:text-white">
                {t("contact.info")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                  <a
                    href={`mailto:${email}`}
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6 dark:text-white">
                {t("contact.connectWithMe")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t("contact.followSocial")}
              </p>

              <div className="flex space-x-4">
                <TooltipProvider>
                  {socialLinks.github && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={socialLinks.github}
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
                  )}

                  {socialLinks.linkedin && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={socialLinks.linkedin}
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
                  )}

                  {socialLinks.twitter && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={socialLinks.twitter}
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
                  )}
                </TooltipProvider>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/30 transition-all duration-300 mt-6">
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                {t("contact.workingHours")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("contact.workingHoursValue")}
                <br />
                {t("contact.responseTime")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
