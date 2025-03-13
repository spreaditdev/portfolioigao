export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          created_at: string;
          description: string;
          experience_id: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          experience_id: string;
          id: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          experience_id?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "achievements_experience_id_fkey";
            columns: ["experience_id"];
            isOneToOne: false;
            referencedRelation: "experiences";
            referencedColumns: ["id"];
          },
        ];
      };
      contacts: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          message: string;
          name: string;
          status: string;
          subject: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id: string;
          message: string;
          name: string;
          status?: string;
          subject: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          status?: string;
          subject?: string;
        };
        Relationships: [];
      };
      experience_technologies: {
        Row: {
          created_at: string;
          experience_id: string;
          id: string;
          technology_id: string;
        };
        Insert: {
          created_at?: string;
          experience_id: string;
          id: string;
          technology_id: string;
        };
        Update: {
          created_at?: string;
          experience_id?: string;
          id?: string;
          technology_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "experience_technologies_experience_id_fkey";
            columns: ["experience_id"];
            isOneToOne: false;
            referencedRelation: "experiences";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "experience_technologies_technology_id_fkey";
            columns: ["technology_id"];
            isOneToOne: false;
            referencedRelation: "technologies";
            referencedColumns: ["id"];
          },
        ];
      };
      experiences: {
        Row: {
          company: string;
          company_url: string | null;
          created_at: string;
          description: string;
          end_date: string;
          id: string;
          location: string;
          logo: string;
          position: string;
          start_date: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          company: string;
          company_url?: string | null;
          created_at?: string;
          description: string;
          end_date: string;
          id: string;
          location: string;
          logo: string;
          position: string;
          start_date: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          company?: string;
          company_url?: string | null;
          created_at?: string;
          description?: string;
          end_date?: string;
          id?: string;
          location?: string;
          logo?: string;
          position?: string;
          start_date?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "experiences_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      project_categories: {
        Row: {
          category: string;
          created_at: string;
          id: string;
          project_id: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          id: string;
          project_id: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          id?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_categories_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_challenges: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          project_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id: string;
          project_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_challenges_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_features: {
        Row: {
          created_at: string;
          description: string;
          id: string;
          project_id: string;
        };
        Insert: {
          created_at?: string;
          description: string;
          id: string;
          project_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          id?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_features_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_images: {
        Row: {
          alt: string;
          created_at: string;
          id: string;
          project_id: string;
          src: string;
        };
        Insert: {
          alt: string;
          created_at?: string;
          id: string;
          project_id: string;
          src: string;
        };
        Update: {
          alt?: string;
          created_at?: string;
          id?: string;
          project_id?: string;
          src?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      project_technologies: {
        Row: {
          color: string | null;
          created_at: string;
          id: string;
          name: string;
          project_id: string;
        };
        Insert: {
          color?: string | null;
          created_at?: string;
          id: string;
          name: string;
          project_id: string;
        };
        Update: {
          color?: string | null;
          created_at?: string;
          id?: string;
          name?: string;
          project_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_technologies_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          created_at: string;
          demo_url: string | null;
          description: string;
          id: string;
          image_url: string;
          long_description: string | null;
          repo_url: string | null;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          demo_url?: string | null;
          description: string;
          id: string;
          image_url: string;
          long_description?: string | null;
          repo_url?: string | null;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          demo_url?: string | null;
          description?: string;
          id?: string;
          image_url?: string;
          long_description?: string | null;
          repo_url?: string | null;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      skill_categories: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "skill_categories_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      skills: {
        Row: {
          category_id: string;
          color: string;
          created_at: string;
          description: string | null;
          icon: string;
          id: string;
          name: string;
          proficiency: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category_id: string;
          color: string;
          created_at?: string;
          description?: string | null;
          icon: string;
          id: string;
          name: string;
          proficiency: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category_id?: string;
          color?: string;
          created_at?: string;
          description?: string | null;
          icon?: string;
          id?: string;
          name?: string;
          proficiency?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "skill_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "skills_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      technologies: {
        Row: {
          created_at: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          id: string;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          id: string;
          name: string;
          summary: string | null;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          id: string;
          name: string;
          summary?: string | null;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          id?: string;
          name?: string;
          summary?: string | null;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;
