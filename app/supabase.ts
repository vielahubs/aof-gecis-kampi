import { createClient, User } from "@supabase/supabase-js";

const supabaseUrl = "https://utwgysrhszfpehpszfvw.supabase.co";
const supabasePublishableKey = "sb_publishable_QHJVx0vSLX-rxIxmpVkKuQ_DhlhzLyP";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

let anonymousUserPromise: Promise<User> | null = null;

export function ensureAnonymousUser() {
  if (!anonymousUserPromise) {
    anonymousUserPromise = (async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;
      if (sessionData.session?.user) return sessionData.session.user;

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error || !data.user) throw error ?? new Error("Anonim oturum açılamadı.");
      return data.user;
    })().catch((error) => {
      anonymousUserPromise = null;
      throw error;
    });
  }

  return anonymousUserPromise;
}
