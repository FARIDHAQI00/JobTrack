import { createBrowserClient } from "@supabase/ssr";

/**
 * Mengecek apakah environment Supabase sudah tersedia.
 *
 * Dipakai untuk fallback mode mock saat Sprint 1 (backend belum aktif).
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Membuat Supabase client untuk Client Component.
 *
 * Hanya dipanggil ketika `isSupabaseConfigured()` bernilai true.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
