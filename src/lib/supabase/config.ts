/**
 * Mengecek apakah environment Supabase sudah tersedia.
 *
 * Bila false, aplikasi berjalan pada mode demo (mock repository + demo auth)
 * agar UI tidak menunggu backend (architecture.md §4).
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
