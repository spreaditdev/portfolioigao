import { useState } from "react";
import {
  contactService,
  type ContactMessage,
} from "../services/contactService";

export function useContact() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitContactForm = async (contactData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const result = await contactService.submitContactForm(contactData);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getContactMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const messages = await contactService.getContactMessages();
      return messages;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (
    id: string,
    status: "new" | "read" | "replied" | "archived",
  ) => {
    setLoading(true);
    setError(null);
    try {
      await contactService.updateContactStatus(id, status);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteContactMessage = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await contactService.deleteContactMessage(id);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    submitContactForm,
    getContactMessages,
    updateContactStatus,
    deleteContactMessage,
  };
}
