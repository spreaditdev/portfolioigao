import { useState, useEffect } from "react";
import { projectService, type Project } from "../services/projectService";
import { useAuth } from "./useAuth";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await projectService.getProjects(user.id);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Erro desconhecido ao buscar projetos"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user?.id]);

  const createProject = async (project: Omit<Project, "id">) => {
    if (!user?.id) throw new Error("Usuário não autenticado");

    setLoading(true);
    try {
      const newProject = await projectService.createProject(user.id, project);
      setProjects((prev) => [newProject, ...prev]);
      return newProject;
    } catch (err) {
      console.error("Erro ao criar projeto:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, project: Partial<Project>) => {
    setLoading(true);
    try {
      const updatedProject = await projectService.updateProject(id, project);
      setProjects((prev) =>
        prev.map((proj) => (proj.id === id ? updatedProject : proj)),
      );
      return updatedProject;
    } catch (err) {
      console.error("Erro ao atualizar projeto:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    try {
      await projectService.deleteProject(id);
      setProjects((prev) => prev.filter((proj) => proj.id !== id));
    } catch (err) {
      console.error("Erro ao excluir projeto:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
  };
}
