import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Membuat Supabase client untuk Server Component / Route Handler
 * dengan session berbasis cookie (`@supabase/ssr`).
 *
 * Hanya dipanggil ketika environment Supabase tersedia.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Server Component tidak selalu boleh menulis cookie;
            // refresh session ditangani middleware.
          }
        },
      },
    }
  );
}
