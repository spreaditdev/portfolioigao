import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  technologies: Technology[];
  category: string[];
  demoUrl?: string;
  repoUrl?: string;
  images: ProjectImage[];
  features?: string[];
  challenges?: string[];
}

export interface Technology {
  name: string;
  color?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
}

export const projectService = {
  async getProjects(userId: string): Promise<Project[]> {
    try {
      // Buscar projetos
      const { data: projects, error: projError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (projError) throw projError;
      if (!projects) return [];

      // Buscar dados relacionados para cada projeto
      const result = await Promise.all(
        projects.map(async (proj) => {
          // Buscar categorias
          const { data: categories, error: catError } = await supabase
            .from("project_categories")
            .select("category")
            .eq("project_id", proj.id);

          if (catError) throw catError;

          // Buscar tecnologias
          const { data: technologies, error: techError } = await supabase
            .from("project_technologies")
            .select("*")
            .eq("project_id", proj.id);

          if (techError) throw techError;

          // Buscar imagens
          const { data: images, error: imgError } = await supabase
            .from("project_images")
            .select("*")
            .eq("project_id", proj.id);

          if (imgError) throw imgError;

          // Buscar features
          const { data: features, error: featError } = await supabase
            .from("project_features")
            .select("description")
            .eq("project_id", proj.id);

          if (featError) throw featError;

          // Buscar desafios
          const { data: challenges, error: chalError } = await supabase
            .from("project_challenges")
            .select("description")
            .eq("project_id", proj.id);

          if (chalError) throw chalError;

          // Formatar dados para o formato esperado pelo frontend
          return {
            id: proj.id,
            title: proj.title,
            description: proj.description,
            longDescription: proj.long_description,
            imageUrl: proj.image_url,
            technologies:
              technologies?.map((tech) => ({
                name: tech.name,
                color: tech.color,
              })) || [],
            category: categories?.map((cat) => cat.category) || [],
            demoUrl: proj.demo_url,
            repoUrl: proj.repo_url,
            images:
              images?.map((img) => ({
                src: img.src,
                alt: img.alt,
              })) || [],
            features: features?.map((feat) => feat.description) || [],
            challenges: challenges?.map((chal) => chal.description) || [],
          };
        }),
      );

      return result;
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      throw error;
    }
  },

  async createProject(
    userId: string,
    project: Omit<Project, "id">,
  ): Promise<Project> {
    const projectId = uuidv4();

    try {
      // Inserir projeto
      const { error: projError } = await supabase.from("projects").insert({
        id: projectId,
        user_id: userId,
        title: project.title,
        description: project.description,
        long_description: project.longDescription,
        image_url: project.imageUrl,
        demo_url: project.demoUrl,
        repo_url: project.repoUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (projError) throw projError;

      // Inserir categorias
      if (project.category && project.category.length > 0) {
        const categoriesToInsert = project.category.map((cat) => ({
          id: uuidv4(),
          project_id: projectId,
          category: cat,
          created_at: new Date().toISOString(),
        }));

        const { error: catError } = await supabase
          .from("project_categories")
          .insert(categoriesToInsert);

        if (catError) throw catError;
      }

      // Inserir tecnologias
      if (project.technologies && project.technologies.length > 0) {
        const technologiesToInsert = project.technologies.map((tech) => ({
          id: uuidv4(),
          project_id: projectId,
          name: tech.name,
          color: tech.color,
          created_at: new Date().toISOString(),
        }));

        const { error: techError } = await supabase
          .from("project_technologies")
          .insert(technologiesToInsert);

        if (techError) throw techError;
      }

      // Inserir imagens
      if (project.images && project.images.length > 0) {
        const imagesToInsert = project.images.map((img) => ({
          id: uuidv4(),
          project_id: projectId,
          src: img.src,
          alt: img.alt,
          created_at: new Date().toISOString(),
        }));

        const { error: imgError } = await supabase
          .from("project_images")
          .insert(imagesToInsert);

        if (imgError) throw imgError;
      }

      // Inserir features
      if (project.features && project.features.length > 0) {
        const featuresToInsert = project.features.map((feat) => ({
          id: uuidv4(),
          project_id: projectId,
          description: feat,
          created_at: new Date().toISOString(),
        }));

        const { error: featError } = await supabase
          .from("project_features")
          .insert(featuresToInsert);

        if (featError) throw featError;
      }

      // Inserir desafios
      if (project.challenges && project.challenges.length > 0) {
        const challengesToInsert = project.challenges.map((chal) => ({
          id: uuidv4(),
          project_id: projectId,
          description: chal,
          created_at: new Date().toISOString(),
        }));

        const { error: chalError } = await supabase
          .from("project_challenges")
          .insert(challengesToInsert);

        if (chalError) throw chalError;
      }

      // Buscar o projeto completo para retornar
      return await this.getProjectById(projectId);
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
      throw error;
    }
  },

  async getProjectById(id: string): Promise<Project> {
    try {
      const { data: proj, error: projError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (projError) throw projError;
      if (!proj) throw new Error("Projeto não encontrado");

      // Buscar categorias
      const { data: categories, error: catError } = await supabase
        .from("project_categories")
        .select("category")
        .eq("project_id", id);

      if (catError) throw catError;

      // Buscar tecnologias
      const { data: technologies, error: techError } = await supabase
        .from("project_technologies")
        .select("*")
        .eq("project_id", id);

      if (techError) throw techError;

      // Buscar imagens
      const { data: images, error: imgError } = await supabase
        .from("project_images")
        .select("*")
        .eq("project_id", id);

      if (imgError) throw imgError;

      // Buscar features
      const { data: features, error: featError } = await supabase
        .from("project_features")
        .select("description")
        .eq("project_id", id);

      if (featError) throw featError;

      // Buscar desafios
      const { data: challenges, error: chalError } = await supabase
        .from("project_challenges")
        .select("description")
        .eq("project_id", id);

      if (chalError) throw chalError;

      return {
        id: proj.id,
        title: proj.title,
        description: proj.description,
        longDescription: proj.long_description,
        imageUrl: proj.image_url,
        technologies:
          technologies?.map((tech) => ({
            name: tech.name,
            color: tech.color,
          })) || [],
        category: categories?.map((cat) => cat.category) || [],
        demoUrl: proj.demo_url,
        repoUrl: proj.repo_url,
        images:
          images?.map((img) => ({
            src: img.src,
            alt: img.alt,
          })) || [],
        features: features?.map((feat) => feat.description) || [],
        challenges: challenges?.map((chal) => chal.description) || [],
      };
    } catch (error) {
      console.error("Erro ao buscar projeto por ID:", error);
      throw error;
    }
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    try {
      // Atualizar dados básicos do projeto
      if (
        Object.keys(project).some((key) =>
          [
            "title",
            "description",
            "longDescription",
            "imageUrl",
            "demoUrl",
            "repoUrl",
          ].includes(key),
        )
      ) {
        const updateData: any = {};

        if (project.title) updateData.title = project.title;
        if (project.description) updateData.description = project.description;
        if ("longDescription" in project)
          updateData.long_description = project.longDescription;
        if (project.imageUrl) updateData.image_url = project.imageUrl;
        if ("demoUrl" in project) updateData.demo_url = project.demoUrl;
        if ("repoUrl" in project) updateData.repo_url = project.repoUrl;

        updateData.updated_at = new Date().toISOString();

        const { error: projError } = await supabase
          .from("projects")
          .update(updateData)
          .eq("id", id);

        if (projError) throw projError;
      }

      // Atualizar categorias (se fornecidas)
      if (project.category) {
        // Remover categorias existentes
        const { error: delCatError } = await supabase
          .from("project_categories")
          .delete()
          .eq("project_id", id);

        if (delCatError) throw delCatError;

        // Inserir novas categorias
        if (project.category.length > 0) {
          const categoriesToInsert = project.category.map((cat) => ({
            id: uuidv4(),
            project_id: id,
            category: cat,
            created_at: new Date().toISOString(),
          }));

          const { error: catError } = await supabase
            .from("project_categories")
            .insert(categoriesToInsert);

          if (catError) throw catError;
        }
      }

      // Atualizar tecnologias (se fornecidas)
      if (project.technologies) {
        // Remover tecnologias existentes
        const { error: delTechError } = await supabase
          .from("project_technologies")
          .delete()
          .eq("project_id", id);

        if (delTechError) throw delTechError;

        // Inserir novas tecnologias
        if (project.technologies.length > 0) {
          const technologiesToInsert = project.technologies.map((tech) => ({
            id: uuidv4(),
            project_id: id,
            name: tech.name,
            color: tech.color,
            created_at: new Date().toISOString(),
          }));

          const { error: techError } = await supabase
            .from("project_technologies")
            .insert(technologiesToInsert);

          if (techError) throw techError;
        }
      }

      // Atualizar imagens (se fornecidas)
      if (project.images) {
        // Remover imagens existentes
        const { error: delImgError } = await supabase
          .from("project_images")
          .delete()
          .eq("project_id", id);

        if (delImgError) throw delImgError;

        // Inserir novas imagens
        if (project.images.length > 0) {
          const imagesToInsert = project.images.map((img) => ({
            id: uuidv4(),
            project_id: id,
            src: img.src,
            alt: img.alt,
            created_at: new Date().toISOString(),
          }));

          const { error: imgError } = await supabase
            .from("project_images")
            .insert(imagesToInsert);

          if (imgError) throw imgError;
        }
      }

      // Atualizar features (se fornecidas)
      if (project.features) {
        // Remover features existentes
        const { error: delFeatError } = await supabase
          .from("project_features")
          .delete()
          .eq("project_id", id);

        if (delFeatError) throw delFeatError;

        // Inserir novas features
        if (project.features.length > 0) {
          const featuresToInsert = project.features.map((feat) => ({
            id: uuidv4(),
            project_id: id,
            description: feat,
            created_at: new Date().toISOString(),
          }));

          const { error: featError } = await supabase
            .from("project_features")
            .insert(featuresToInsert);

          if (featError) throw featError;
        }
      }

      // Atualizar desafios (se fornecidos)
      if (project.challenges) {
        // Remover desafios existentes
        const { error: delChalError } = await supabase
          .from("project_challenges")
          .delete()
          .eq("project_id", id);

        if (delChalError) throw delChalError;

        // Inserir novos desafios
        if (project.challenges.length > 0) {
          const challengesToInsert = project.challenges.map((chal) => ({
            id: uuidv4(),
            project_id: id,
            description: chal,
            created_at: new Date().toISOString(),
          }));

          const { error: chalError } = await supabase
            .from("project_challenges")
            .insert(challengesToInsert);

          if (chalError) throw chalError;
        }
      }

      // Buscar o projeto atualizado
      return await this.getProjectById(id);
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      throw error;
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      // Remover categorias
      const { error: catError } = await supabase
        .from("project_categories")
        .delete()
        .eq("project_id", id);

      if (catError) throw catError;

      // Remover tecnologias
      const { error: techError } = await supabase
        .from("project_technologies")
        .delete()
        .eq("project_id", id);

      if (techError) throw techError;

      // Remover imagens
      const { error: imgError } = await supabase
        .from("project_images")
        .delete()
        .eq("project_id", id);

      if (imgError) throw imgError;

      // Remover features
      const { error: featError } = await supabase
        .from("project_features")
        .delete()
        .eq("project_id", id);

      if (featError) throw featError;

      // Remover desafios
      const { error: chalError } = await supabase
        .from("project_challenges")
        .delete()
        .eq("project_id", id);

      if (chalError) throw chalError;

      // Remover o projeto
      const { error: projError } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (projError) throw projError;
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);
      throw error;
    }
  },
};
