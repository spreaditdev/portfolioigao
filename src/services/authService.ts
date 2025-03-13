import { supabase } from "./supabase";
import { userService } from "./userService";
import type { User } from "./userService";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export const authService = {
  async signUp(
    email: string,
    password: string,
    name: string,
  ): Promise<AuthUser | null> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;
      if (!data.user) return null;

      // Criar registro na tabela users
      await userService.createOrUpdateUser({
        id: data.user.id,
        email: data.user.email || email,
        name,
      });

      return {
        id: data.user.id,
        email: data.user.email || email,
        name,
      };
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      throw error;
    }
  },

  async signIn(email: string, password: string): Promise<AuthUser | null> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) return null;

      return {
        id: data.user.id,
        email: data.user.email || email,
        name: data.user.user_metadata?.name,
      };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },

  async signOut(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  },

  async resetPassword(email: string): Promise<void> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      throw error;
    }
  },

  async updatePassword(password: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      throw error;
    }
  },

  async getCurrentSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error("Erro ao obter sessão atual:", error);
      return null;
    }
  },

  async getCurrentUser(): Promise<User | null> {
    return await userService.getCurrentUser();
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" || event === "USER_UPDATED") {
        const user = await userService.getCurrentUser();
        callback(user);
      } else if (event === "SIGNED_OUT") {
        callback(null);
      }
    });
  },
};
