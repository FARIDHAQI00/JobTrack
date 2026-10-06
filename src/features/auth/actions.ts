"use server";

import { redirect } from "next/navigation";
import { dashboardPathForRole } from "@/lib/auth/access";
import {
  signInWithPassword,
  signOut,
  signUpWithPassword,
} from "@/lib/auth/service";
import { parseUserRole } from "@/domain/user";

export interface LoginActionState {
  error?: string;
}

export interface RegisterActionState {
  error?: string;
  info?: string;
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const MIN_PASSWORD_LENGTH = 8;

/**
 * Server action login: validasi input, sign in, lalu redirect sesuai role.
 */
export async function loginAction(
  _previous: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "");

  if (!email.trim() || !password) {
    return { error: "Email dan password wajib diisi." };
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return { error: "Format email tidak valid." };
  }

  const result = await signInWithPassword(email, password);
  if (!result.ok) {
    return { error: result.error };
  }

  const safeNext = next.startsWith("/") ? next : null;
  redirect(safeNext ?? dashboardPathForRole(result.role));
}

/**
 * Server action register: validasi, buat akun dengan role, lalu redirect.
 */
export async function registerAction(
  _previous: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const fullName = String(formData.get("fullName") ?? "");
  const role = parseUserRole(formData.get("role"));

  if (!fullName.trim()) {
    return { error: "Nama lengkap atau nama perusahaan wajib diisi." };
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return { error: "Format email tidak valid." };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { error: `Password minimal ${MIN_PASSWORD_LENGTH} karakter.` };
  }
  if (password !== confirmPassword) {
    return { error: "Konfirmasi password tidak sama." };
  }
  if (!role) {
    return { error: "Pilih peran terlebih dahulu." };
  }

  const result = await signUpWithPassword(email, password, role, fullName);
  if (!result.ok) {
    return { error: result.error };
  }

  if (result.needsEmailConfirmation) {
    return {
      info: "Akun dibuat. Periksa email untuk konfirmasi sebelum masuk.",
    };
  }

  redirect(dashboardPathForRole(role));
}

/**
 * Server action logout: hapus session lalu kembali ke landing.
 */
export async function logoutAction(): Promise<void> {
  await signOut();
  redirect("/");
}
