import { useState, useEffect } from "react";
import {
  experienceService,
  type Experience,
} from "../services/experienceService";
import { useAuth } from "./useAuth";

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const data = await experienceService.getExperiences(user.id);
        setExperiences(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar experiências:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Erro desconhecido ao buscar experiências"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [user?.id]);

  const createExperience = async (experience: Omit<Experience, "id">) => {
    if (!user?.id) throw new Error("Usuário não autenticado");

    setLoading(true);
    try {
      const newExperience = await experienceService.createExperience(
        user.id,
        experience,
      );
      setExperiences((prev) => [newExperience, ...prev]);
      return newExperience;
    } catch (err) {
      console.error("Erro ao criar experiência:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateExperience = async (
    id: string,
    experience: Partial<Experience>,
  ) => {
    setLoading(true);
    try {
      const updatedExperience = await experienceService.updateExperience(
        id,
        experience,
      );
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === id ? updatedExperience : exp)),
      );
      return updatedExperience;
    } catch (err) {
      console.error("Erro ao atualizar experiência:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteExperience = async (id: string) => {
    setLoading(true);
    try {
      await experienceService.deleteExperience(id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error("Erro ao excluir experiência:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    experiences,
    loading,
    error,
    createExperience,
    updateExperience,
    deleteExperience,
  };
}
