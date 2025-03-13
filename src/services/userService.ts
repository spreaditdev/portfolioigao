import { supabase } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export interface User {
  id?: string;
  email: string;
  name: string;
  avatarUrl?: string;
  title?: string;
  summary?: string;
}

export const userService = {
  async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return null;

      // Buscar dados adicionais do usuário
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 é o código para 'não encontrado'
        throw error;
      }

      if (!data) {
        // Usuário existe na autenticação, mas não na tabela users
        return {
          id: user.id,
          email: user.email || "",
          name: user.user_metadata?.name || "Usuário",
        };
      }

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatar_url,
        title: data.title,
        summary: data.summary,
      };
    } catch (error) {
      console.error("Erro ao buscar usuário atual:", error);
      return null;
    }
  },

  async createOrUpdateUser(user: User): Promise<User> {
    try {
      const userId = user.id || uuidv4();

      // Verificar se o usuário já existe
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      const now = new Date().toISOString();

      if (existingUser) {
        // Atualizar usuário existente
        const { error } = await supabase
          .from("users")
          .update({
            email: user.email,
            name: user.name,
            avatar_url: user.avatarUrl,
            title: user.title,
            summary: user.summary,
            updated_at: now,
          })
          .eq("id", userId);

        if (error) throw error;
      } else {
        // Criar novo usuário
        const { error } = await supabase.from("users").insert({
          id: userId,
          email: user.email,
          name: user.name,
          avatar_url: user.avatarUrl,
          title: user.title,
          summary: user.summary,
          created_at: now,
          updated_at: now,
        });

        if (error) throw error;
      }

      // Buscar o usuário atualizado
      const { data: updatedUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError) throw fetchError;
      if (!updatedUser) throw new Error("Falha ao criar/atualizar usuário");

      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatar_url,
        title: updatedUser.title,
        summary: updatedUser.summary,
      };
    } catch (error) {
      console.error("Erro ao criar/atualizar usuário:", error);
      throw error;
    }
  },

  async getUserProfile(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        email: data.email,
        name: data.name,
        avatarUrl: data.avatar_url,
        title: data.title,
        summary: data.summary,
      };
    } catch (error) {
      console.error("Erro ao buscar perfil do usuário:", error);
      return null;
    }
  },

  async updateUserProfile(
    userId: string,
    profile: Partial<User>,
  ): Promise<User> {
    try {
      const updateData: any = {};

      if (profile.name) updateData.name = profile.name;
      if ("avatarUrl" in profile) updateData.avatar_url = profile.avatarUrl;
      if ("title" in profile) updateData.title = profile.title;
      if ("summary" in profile) updateData.summary = profile.summary;

      updateData.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", userId);

      if (error) throw error;

      // Buscar o perfil atualizado
      const { data: updatedUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (fetchError) throw fetchError;
      if (!updatedUser) throw new Error("Usuário não encontrado");

      return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatar_url,
        title: updatedUser.title,
        summary: updatedUser.summary,
      };
    } catch (error) {
      console.error("Erro ao atualizar perfil do usuário:", error);
      throw error;
    }
  },
};
