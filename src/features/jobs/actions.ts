"use server";

import { revalidatePath } from "next/cache";
import { getSavedJobRepository } from "@/repositories";
import { getSessionUser } from "@/lib/auth/service";

export interface ToggleSavedResult {
  saved?: boolean;
  error?: string;
}

/**
 * Server action menyimpan/menghapus lowongan dari daftar tersimpan.
 */
export async function toggleSavedJobAction(
  jobId: string
): Promise<ToggleSavedResult> {
  const user = await getSessionUser();
  if (!user || user.role !== "JOB_SEEKER") {
    return { error: "Masuk sebagai Job Seeker untuk menyimpan lowongan." };
  }

  const repository = getSavedJobRepository();
  const currentlySaved = await repository.isSaved(user.id, jobId);

  if (currentlySaved) {
    await repository.remove(user.id, jobId);
  } else {
    await repository.add(user.id, jobId);
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/seeker/saved");
  revalidatePath("/seeker/dashboard");

  return { saved: !currentlySaved };
}
