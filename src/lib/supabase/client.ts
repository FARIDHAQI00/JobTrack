import { createBrowserClient } from "@supabase/ssr";

/**
 * Membuat Supabase client untuk Client Component.
 *
 * Hanya dipanggil ketika `isSupabaseConfigured()` (lib/supabase/config)
 * bernilai true.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
