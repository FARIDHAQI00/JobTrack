"use server";

import { revalidatePath } from "next/cache";
import type { SeekerProfileInput } from "@/domain/seeker-profile";
import { getSessionUser } from "@/lib/auth/service";
import { getSeekerProfileRepository } from "@/repositories";

export interface ProfileActionState {
  error?: string;
  success?: boolean;
}

/**
 * Server action menyimpan profil pelamar.
 */
export async function updateProfileAction(
  _previous: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const user = await getSessionUser();
  if (!user || user.role !== "JOB_SEEKER") {
    return { error: "Masuk sebagai Job Seeker untuk mengubah profil." };
  }

  const input: SeekerProfileInput = {
    fullName: String(formData.get("fullName") ?? "").trim(),
    headline: String(formData.get("headline") ?? "").trim() || undefined,
    bio: String(formData.get("bio") ?? "").trim() || undefined,
    location: String(formData.get("location") ?? "").trim() || undefined,
    phone: String(formData.get("phone") ?? "").trim() || undefined,
  };

  if (input.fullName.length < 2) {
    return { error: "Nama lengkap wajib diisi minimal 2 karakter." };
  }

  try {
    await getSeekerProfileRepository().upsert(user.id, input);
  } catch {
    return { error: "Gagal menyimpan profil. Coba lagi sebentar lagi." };
  }

  revalidatePath("/seeker/profile");
  revalidatePath("/seeker/dashboard");
  return { success: true };
}
