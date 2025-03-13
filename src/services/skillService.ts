import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export interface Skill {
  id?: string;
  name: string;
  icon: string;
  proficiency: number;
  color: string;
  description?: string;
  categoryId: string;
}

export interface SkillCategory {
  id?: string;
  name: string;
  skills?: Skill[];
}

export const skillService = {
  async getSkillCategories(userId: string): Promise<SkillCategory[]> {
    try {
      // Buscar categorias
      const { data: categories, error: catError } = await supabase
        .from("skill_categories")
        .select("*")
        .eq("user_id", userId);

      if (catError) throw catError;
      if (!categories) return [];

      // Buscar habilidades para cada categoria
      const result = await Promise.all(
        categories.map(async (cat) => {
          const { data: skills, error: skillError } = await supabase
            .from("skills")
            .select("*")
            .eq("category_id", cat.id)
            .eq("user_id", userId)
            .order("proficiency", { ascending: false });

          if (skillError) throw skillError;

          return {
            id: cat.id,
            name: cat.name,
            skills:
              skills?.map((skill) => ({
                id: skill.id,
                name: skill.name,
                icon: skill.icon,
                proficiency: skill.proficiency,
                color: skill.color,
                description: skill.description,
                categoryId: skill.category_id,
              })) || [],
          };
        }),
      );

      return result;
    } catch (error) {
      console.error("Erro ao buscar categorias de habilidades:", error);
      throw error;
    }
  },

  async createSkillCategory(
    userId: string,
    category: Omit<SkillCategory, "id">,
  ): Promise<SkillCategory> {
    try {
      const categoryId = uuidv4();

      // Inserir categoria
      const { error: catError } = await supabase
        .from("skill_categories")
        .insert({
          id: categoryId,
          name: category.name,
          user_id: userId,
          created_at: new Date().toISOString(),
        });

      if (catError) throw catError;

      // Inserir habilidades (se fornecidas)
      if (category.skills && category.skills.length > 0) {
        const skillsToInsert = category.skills.map((skill) => ({
          id: uuidv4(),
          name: skill.name,
          icon: skill.icon,
          proficiency: skill.proficiency,
          color: skill.color,
          description: skill.description,
          category_id: categoryId,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));

        const { error: skillError } = await supabase
          .from("skills")
          .insert(skillsToInsert);

        if (skillError) throw skillError;
      }

      // Buscar a categoria completa para retornar
      const { data: newCategory, error: fetchError } = await supabase
        .from("skill_categories")
        .select("*")
        .eq("id", categoryId)
        .single();

      if (fetchError) throw fetchError;
      if (!newCategory)
        throw new Error("Falha ao criar categoria de habilidades");

      const { data: skills, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .eq("category_id", categoryId);

      if (skillsError) throw skillsError;

      return {
        id: newCategory.id,
        name: newCategory.name,
        skills:
          skills?.map((skill) => ({
            id: skill.id,
            name: skill.name,
            icon: skill.icon,
            proficiency: skill.proficiency,
            color: skill.color,
            description: skill.description,
            categoryId: skill.category_id,
          })) || [],
      };
    } catch (error) {
      console.error("Erro ao criar categoria de habilidades:", error);
      throw error;
    }
  },

  async updateSkillCategory(
    id: string,
    category: Partial<SkillCategory>,
  ): Promise<SkillCategory> {
    try {
      // Atualizar nome da categoria (se fornecido)
      if (category.name) {
        const { error: catError } = await supabase
          .from("skill_categories")
          .update({ name: category.name })
          .eq("id", id);

        if (catError) throw catError;
      }

      // Atualizar habilidades (se fornecidas)
      if (category.skills) {
        // Remover habilidades existentes
        const { error: delError } = await supabase
          .from("skills")
          .delete()
          .eq("category_id", id);

        if (delError) throw delError;

        // Inserir novas habilidades
        if (category.skills.length > 0) {
          // Buscar user_id da categoria
          const { data: catData, error: fetchError } = await supabase
            .from("skill_categories")
            .select("user_id")
            .eq("id", id)
            .single();

          if (fetchError) throw fetchError;
          if (!catData) throw new Error("Categoria não encontrada");

          const skillsToInsert = category.skills.map((skill) => ({
            id: uuidv4(),
            name: skill.name,
            icon: skill.icon,
            proficiency: skill.proficiency,
            color: skill.color,
            description: skill.description,
            category_id: id,
            user_id: catData.user_id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }));

          const { error: skillError } = await supabase
            .from("skills")
            .insert(skillsToInsert);

          if (skillError) throw skillError;
        }
      }

      // Buscar a categoria atualizada
      const { data: updatedCategory, error: fetchError } = await supabase
        .from("skill_categories")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      if (!updatedCategory) throw new Error("Categoria não encontrada");

      const { data: skills, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .eq("category_id", id);

      if (skillsError) throw skillsError;

      return {
        id: updatedCategory.id,
        name: updatedCategory.name,
        skills:
          skills?.map((skill) => ({
            id: skill.id,
            name: skill.name,
            icon: skill.icon,
            proficiency: skill.proficiency,
            color: skill.color,
            description: skill.description,
            categoryId: skill.category_id,
          })) || [],
      };
    } catch (error) {
      console.error("Erro ao atualizar categoria de habilidades:", error);
      throw error;
    }
  },

  async deleteSkillCategory(id: string): Promise<void> {
    try {
      // Remover habilidades da categoria
      const { error: skillError } = await supabase
        .from("skills")
        .delete()
        .eq("category_id", id);

      if (skillError) throw skillError;

      // Remover a categoria
      const { error: catError } = await supabase
        .from("skill_categories")
        .delete()
        .eq("id", id);

      if (catError) throw catError;
    } catch (error) {
      console.error("Erro ao excluir categoria de habilidades:", error);
      throw error;
    }
  },

  async createSkill(userId: string, skill: Omit<Skill, "id">): Promise<Skill> {
    try {
      const skillId = uuidv4();

      const { error } = await supabase.from("skills").insert({
        id: skillId,
        name: skill.name,
        icon: skill.icon,
        proficiency: skill.proficiency,
        color: skill.color,
        description: skill.description,
        category_id: skill.categoryId,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Buscar a habilidade criada
      const { data: newSkill, error: fetchError } = await supabase
        .from("skills")
        .select("*")
        .eq("id", skillId)
        .single();

      if (fetchError) throw fetchError;
      if (!newSkill) throw new Error("Falha ao criar habilidade");

      return {
        id: newSkill.id,
        name: newSkill.name,
        icon: newSkill.icon,
        proficiency: newSkill.proficiency,
        color: newSkill.color,
        description: newSkill.description,
        categoryId: newSkill.category_id,
      };
    } catch (error) {
      console.error("Erro ao criar habilidade:", error);
      throw error;
    }
  },

  async updateSkill(id: string, skill: Partial<Skill>): Promise<Skill> {
    try {
      const updateData: any = {};

      if (skill.name) updateData.name = skill.name;
      if (skill.icon) updateData.icon = skill.icon;
      if (skill.proficiency !== undefined)
        updateData.proficiency = skill.proficiency;
      if (skill.color) updateData.color = skill.color;
      if ("description" in skill) updateData.description = skill.description;
      if (skill.categoryId) updateData.category_id = skill.categoryId;

      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from("skills")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;

      // Buscar a habilidade atualizada
      const { data: updatedSkill, error: fetchError } = await supabase
        .from("skills")
        .select("*")
        .eq("id", id)
        .single();

      if (fetchError) throw fetchError;
      if (!updatedSkill) throw new Error("Habilidade não encontrada");

      return {
        id: updatedSkill.id,
        name: updatedSkill.name,
        icon: updatedSkill.icon,
        proficiency: updatedSkill.proficiency,
        color: updatedSkill.color,
        description: updatedSkill.description,
        categoryId: updatedSkill.category_id,
      };
    } catch (error) {
      console.error("Erro ao atualizar habilidade:", error);
      throw error;
    }
  },

  async deleteSkill(id: string): Promise<void> {
    try {
      const { error } = await supabase.from("skills").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Erro ao excluir habilidade:", error);
      throw error;
    }
  },
};
