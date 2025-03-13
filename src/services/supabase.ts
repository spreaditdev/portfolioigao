import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Verificar se as credenciais estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Credenciais do Supabase não configuradas. Verifique suas variáveis de ambiente.",
  );
}
