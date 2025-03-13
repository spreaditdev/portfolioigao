import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: "new" | "read" | "replied" | "archived";
  createdAt?: string;
}

export const contactService = {
  async submitContactForm(
    contactData: Omit<ContactMessage, "id" | "status" | "createdAt">,
  ): Promise<ContactMessage> {
    try {
      const newContact = {
        id: uuidv4(),
        name: contactData.name,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
        status: "new" as const,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from("contacts")
        .insert(newContact)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error("Falha ao enviar mensagem de contato");

      // Send email notification
      await this.sendEmailNotification(contactData);

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        status: data.status,
        createdAt: data.created_at,
      };
    } catch (error) {
      console.error("Erro ao enviar mensagem de contato:", error);
      throw error;
    }
  },

  async sendEmailNotification(contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<void> {
    try {
      // Using Supabase Edge Functions to send email
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          to: "igorhawking@gmail.com",
          from: contactData.email,
          subject: `Novo contato do portfólio: ${contactData.subject}`,
          name: contactData.name,
          message: contactData.message,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Erro ao enviar notificação por email:", error);
      // Don't throw here to prevent blocking the contact form submission
      // Just log the error and continue
    }
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (!data) return [];

      return data.map((contact) => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        status: contact.status,
        createdAt: contact.created_at,
      }));
    } catch (error) {
      console.error("Erro ao buscar mensagens de contato:", error);
      throw error;
    }
  },

  async updateContactStatus(
    id: string,
    status: "new" | "read" | "replied" | "archived",
  ): Promise<void> {
    try {
      const { error } = await supabase
        .from("contacts")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Erro ao atualizar status da mensagem de contato:", error);
      throw error;
    }
  },

  async deleteContactMessage(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Erro ao excluir mensagem de contato:", error);
      throw error;
    }
  },
};
