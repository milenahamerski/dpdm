// services/authService.ts
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

/**
 * 🔐 Sign up com email e senha
 * Retorna data = { user, session }
 * session será null se email precisar de confirmação
 */
export async function signUp(
  email: string,
  password: string
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

/**
 * 🔑 Sign in com email e senha
 * Retorna data = { user, session }
 */
export async function signIn(
  email: string,
  password: string
): Promise<{ user: User | null; session: Session | null }> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// /**
//  * 🚪 Logout
//  */
// export async function signOut(): Promise<void> {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw error;
// }

/**
 * 🔄 Auto refresh da sessão quando o app volta ao foreground
 * Deve ser chamado uma única vez na raiz do app
 */
export function startSupabaseAutoRefresh() {
  import("react-native").then(({ AppState }) => {
    AppState.addEventListener("change", (state) => {
      if (state === "active") {
        supabase.auth.startAutoRefresh();
      } else {
        supabase.auth.stopAutoRefresh();
      }
    });
  });
}
