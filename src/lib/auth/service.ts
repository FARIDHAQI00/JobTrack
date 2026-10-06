import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserRole } from "@/domain/user";
import { DEMO_ACCOUNTS } from "./constants";
import {
  clearDemoSession,
  getDemoSession,
  setDemoSession,
} from "./demo-session";
import type { AuthResult, SessionUser, SignInResult, SignUpResult } from "./types";

/**
 * True saat Supabase belum dikonfigurasi; auth berjalan dalam mode demo
 * (simulasi sesuai PRD).
 */
export function isDemoAuthMode(): boolean {
  return !isSupabaseConfigured();
}

interface JobtrackMetadata {
  role: UserRole;
  fullName?: string;
}

function readMetadata(user: {
  user_metadata?: Record<string, unknown> | null;
}): JobtrackMetadata {
  const metadata = (user.user_metadata ?? {}) as Record<string, unknown>;
  const role = metadata.role;
  const fullName = metadata.full_name;
  return {
    role: role === "EMPLOYER" ? "EMPLOYER" : "JOB_SEEKER",
    fullName: typeof fullName === "string" ? fullName : undefined,
  };
}

/**
 * Mengambil user session aktif dari Supabase atau cookie demo.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  if (isDemoAuthMode()) {
    return getDemoSession();
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const metadata = readMetadata(user);
  return {
    id: user.id,
    email: user.email ?? "",
    role: metadata.role,
    fullName: metadata.fullName,
  };
}

/**
 * Login dengan email dan password.
 *
 * Supabase mode memakai `signInWithPassword`; demo mode memvalidasi
 * terhadap akun demo (`supabase/seed.sql`).
 */
export async function signInWithPassword(
  email: string,
  password: string
): Promise<SignInResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isDemoAuthMode()) {
    const account = DEMO_ACCOUNTS.find(
      (candidate) =>
        candidate.email === normalizedEmail && candidate.password === password
    );

    if (!account) {
      return {
        ok: false,
        error:
          "Email atau password salah. Gunakan akun demo yang tertera di halaman ini.",
      };
    }

    await setDemoSession({
      id: account.id,
      email: account.email,
      role: account.role,
      fullName: account.fullName,
    });
    return { ok: true, role: account.role };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  });

  if (error) {
    return { ok: false, error: "Email atau password salah." };
  }

  return { ok: true, role: readMetadata(data.user).role };
}

/**
 * Registrasi akun baru.
 *
 * Role disimpan di metadata dan dipakai trigger `handle_new_user` untuk
 * membuat row `profiles` (supabase.md §3).
 */
export async function signUpWithPassword(
  email: string,
  password: string,
  role: UserRole,
  fullName: string
): Promise<SignUpResult> {
  const normalizedEmail = email.trim().toLowerCase();

  if (isDemoAuthMode()) {
    await setDemoSession({
      id: `demo-${Date.now()}`,
      email: normalizedEmail,
      role,
      fullName: fullName.trim() || undefined,
    });
    return { ok: true, needsEmailConfirmation: false };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
    password,
    options: {
      data: { role, full_name: fullName.trim() },
    },
  });

  if (error) {
    return { ok: false, error: "Registrasi gagal. Coba lagi sebentar lagi." };
  }

  const isExistingUser =
    data.user && (data.user.identities?.length ?? 0) === 0;
  if (isExistingUser) {
    return { ok: false, error: "Email sudah terdaftar. Silakan masuk." };
  }

  return { ok: true, needsEmailConfirmation: !data.session };
}

/**
 * Logout dan bersihkan session.
 */
export async function signOut(): Promise<AuthResult> {
  if (isDemoAuthMode()) {
    await clearDemoSession();
    return { ok: true };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { ok: false, error: "Gagal keluar. Coba lagi." };
  }
  return { ok: true };
}
