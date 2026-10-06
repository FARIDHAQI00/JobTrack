"use server";

import { revalidatePath } from "next/cache";
import { getApplicationService } from "@/repositories";
import { getSessionUser } from "@/lib/auth/service";

export interface ApplyActionResult {
  success?: boolean;
  error?: string;
}

/**
 * Server action melamar lowongan untuk Job Seeker aktif.
 */
export async function applyToJobAction(
  jobId: string,
  coverLetter?: string
): Promise<ApplyActionResult> {
  const user = await getSessionUser();
  if (!user || user.role !== "JOB_SEEKER") {
    return { error: "Masuk sebagai Job Seeker untuk melamar." };
  }

  const service = getApplicationService();
  const result = await service.applyToJob(
    jobId,
    user.id,
    coverLetter?.trim() || undefined
  );

  if (!result.ok) {
    return { error: result.error };
  }

  revalidatePath(`/jobs/${jobId}`);
  revalidatePath("/seeker/dashboard");
  revalidatePath("/seeker/applications");
  return { success: true };
}
