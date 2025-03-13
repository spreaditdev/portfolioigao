import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export interface Experience {
  id: string;
  company: string;
  position: string;
  logo: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  companyUrl?: string;
}

export interface Achievement {
  id: string;
  description: string;
}

export const experienceService = {
  async getExperiences(userId: string): Promise<Experience[]> {
    try {
      // Buscar experiências
      const { data: experiences, error: expError } = await supabase
        .from("experiences")
        .select("*")
        .eq("user_id", userId)
        .order("start_date", { ascending: false });

      if (expError) throw expError;
      if (!experiences) return [];

      // Buscar conquistas e tecnologias para cada experiência
      const result = await Promise.all(
        experiences.map(async (exp) => {
          // Buscar conquistas
          const { data: achievements, error: achError } = await supabase
            .from("achievements")
            .select("*")
            .eq("experience_id", exp.id);

          if (achError) throw achError;

          // Buscar tecnologias
          const { data: techRelations, error: techRelError } = await supabase
            .from("experience_technologies")
            .select("technology_id")
            .eq("experience_id", exp.id);

          if (techRelError) throw techRelError;

          const techIds = techRelations.map((rel) => rel.technology_id);

          const { data: technologies, error: techError } = await supabase
            .from("technologies")
            .select("name")
            .in("id", techIds);

          if (techError) throw techError;

          // Formatar dados para o formato esperado pelo frontend
          return {
            id: exp.id,
            company: exp.company,
            position: exp.position,
            logo: exp.logo,
            startDate: exp.start_date,
            endDate: exp.end_date,
            location: exp.location,
            description: exp.description,
            achievements:
              achievements?.map((ach) => ({
                id: ach.id,
                description: ach.description,
              })) || [],
            technologies: technologies?.map((tech) => tech.name) || [],
            companyUrl: exp.company_url,
          };
        }),
      );

      return result;
    } catch (error) {
      console.error("Erro ao buscar experiências:", error);
      throw error;
    }
  },

  async createExperience(
    userId: string,
    experience: Omit<Experience, "id">,
  ): Promise<Experience> {
    const experienceId = uuidv4();

    try {
      // Iniciar transação
      const { error: expError } = await supabase.from("experiences").insert({
        id: experienceId,
        user_id: userId,
        company: experience.company,
        position: experience.position,
        logo: experience.logo,
        start_date: experience.startDate,
        end_date: experience.endDate,
        location: experience.location,
        description: experience.description,
        company_url: experience.companyUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (expError) throw expError;

      // Inserir conquistas
      if (experience.achievements.length > 0) {
        const achievementsToInsert = experience.achievements.map((ach) => ({
          id: uuidv4(),
          experience_id: experienceId,
          description: ach.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));

        const { error: achError } = await supabase
          .from("achievements")
          .insert(achievementsToInsert);

        if (achError) throw achError;
      }

      // Inserir tecnologias (verificar se já existem primeiro)
      if (experience.technologies.length > 0) {
        for (const tech of experience.technologies) {
          // Verificar se a tecnologia já existe
          let techId: string;
          const { data: existingTech } = await supabase
            .from("technologies")
            .select("id")
            .eq("name", tech)
            .single();

          if (existingTech) {
            techId = existingTech.id;
          } else {
            // Criar nova tecnologia
            const newTechId = uuidv4();
            const { error: techError } = await supabase
              .from("technologies")
              .insert({
                id: newTechId,
                name: tech,
                created_at: new Date().toISOString(),
              });

            if (techError) throw techError;
            techId = newTechId;
          }

          // Criar relação entre experiência e tecnologia
          const { error: relError } = await supabase
            .from("experience_technologies")
            .insert({
              id: uuidv4(),
              experience_id: experienceId,
              technology_id: techId,
              created_at: new Date().toISOString(),
            });

          if (relError) throw relError;
        }
      }

      // Buscar a experiência completa para retornar
      return await this.getExperienceById(experienceId);
    } catch (error) {
      console.error("Erro ao criar experiência:", error);
      throw error;
    }
  },

  async getExperienceById(id: string): Promise<Experience> {
    try {
      const { data: exp, error: expError } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", id)
        .single();

      if (expError) throw expError;
      if (!exp) throw new Error("Experiência não encontrada");

      // Buscar conquistas
      const { data: achievements, error: achError } = await supabase
        .from("achievements")
        .select("*")
        .eq("experience_id", id);

      if (achError) throw achError;

      // Buscar tecnologias
      const { data: techRelations, error: techRelError } = await supabase
        .from("experience_technologies")
        .select("technology_id")
        .eq("experience_id", id);

      if (techRelError) throw techRelError;

      const techIds = techRelations.map((rel) => rel.technology_id);

      const { data: technologies, error: techError } = await supabase
        .from("technologies")
        .select("name")
        .in("id", techIds);

      if (techError) throw techError;

      return {
        id: exp.id,
        company: exp.company,
        position: exp.position,
        logo: exp.logo,
        startDate: exp.start_date,
        endDate: exp.end_date,
        location: exp.location,
        description: exp.description,
        achievements:
          achievements?.map((ach) => ({
            id: ach.id,
            description: ach.description,
          })) || [],
        technologies: technologies?.map((tech) => tech.name) || [],
        companyUrl: exp.company_url,
      };
    } catch (error) {
      console.error("Erro ao buscar experiência por ID:", error);
      throw error;
    }
  },

  async updateExperience(
    id: string,
    experience: Partial<Experience>,
  ): Promise<Experience> {
    try {
      // Atualizar dados básicos da experiência
      if (
        Object.keys(experience).some((key) =>
          [
            "company",
            "position",
            "logo",
            "startDate",
            "endDate",
            "location",
            "description",
            "companyUrl",
          ].includes(key),
        )
      ) {
        const updateData: any = {};

        if (experience.company) updateData.company = experience.company;
        if (experience.position) updateData.position = experience.position;
        if (experience.logo) updateData.logo = experience.logo;
        if (experience.startDate) updateData.start_date = experience.startDate;
        if (experience.endDate) updateData.end_date = experience.endDate;
        if (experience.location) updateData.location = experience.location;
        if (experience.description)
          updateData.description = experience.description;
        if ("companyUrl" in experience)
          updateData.company_url = experience.companyUrl;

        updateData.updated_at = new Date().toISOString();

        const { error: expError } = await supabase
          .from("experiences")
          .update(updateData)
          .eq("id", id);

        if (expError) throw expError;
      }

      // Atualizar conquistas (se fornecidas)
      if (experience.achievements) {
        // Remover conquistas existentes
        const { error: delError } = await supabase
          .from("achievements")
          .delete()
          .eq("experience_id", id);

        if (delError) throw delError;

        // Inserir novas conquistas
        if (experience.achievements.length > 0) {
          const achievementsToInsert = experience.achievements.map((ach) => ({
            id: uuidv4(),
            experience_id: id,
            description: ach.description,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }));

          const { error: achError } = await supabase
            .from("achievements")
            .insert(achievementsToInsert);

          if (achError) throw achError;
        }
      }

      // Atualizar tecnologias (se fornecidas)
      if (experience.technologies) {
        // Remover relações existentes
        const { error: delRelError } = await supabase
          .from("experience_technologies")
          .delete()
          .eq("experience_id", id);

        if (delRelError) throw delRelError;

        // Inserir novas tecnologias
        if (experience.technologies.length > 0) {
          for (const tech of experience.technologies) {
            // Verificar se a tecnologia já existe
            let techId: string;
            const { data: existingTech } = await supabase
              .from("technologies")
              .select("id")
              .eq("name", tech)
              .single();

            if (existingTech) {
              techId = existingTech.id;
            } else {
              // Criar nova tecnologia
              const newTechId = uuidv4();
              const { error: techError } = await supabase
                .from("technologies")
                .insert({
                  id: newTechId,
                  name: tech,
                  created_at: new Date().toISOString(),
                });

              if (techError) throw techError;
              techId = newTechId;
            }

            // Criar relação entre experiência e tecnologia
            const { error: relError } = await supabase
              .from("experience_technologies")
              .insert({
                id: uuidv4(),
                experience_id: id,
                technology_id: techId,
                created_at: new Date().toISOString(),
              });

            if (relError) throw relError;
          }
        }
      }

      // Buscar a experiência atualizada
      return await this.getExperienceById(id);
    } catch (error) {
      console.error("Erro ao atualizar experiência:", error);
      throw error;
    }
  },

  async deleteExperience(id: string): Promise<void> {
    try {
      // Remover conquistas
      const { error: achError } = await supabase
        .from("achievements")
        .delete()
        .eq("experience_id", id);

      if (achError) throw achError;

      // Remover relações com tecnologias
      const { error: relError } = await supabase
        .from("experience_technologies")
        .delete()
        .eq("experience_id", id);

      if (relError) throw relError;

      // Remover a experiência
      const { error: expError } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);

      if (expError) throw expError;
    } catch (error) {
      console.error("Erro ao excluir experiência:", error);
      throw error;
    }
  },
};
