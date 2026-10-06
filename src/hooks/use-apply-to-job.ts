"use client";

import { useCallback, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { applyToJobAction } from "@/features/applications/actions";

/**
 * Hook pengiriman lamaran untuk Job Seeker.
 *
 * Mengelola state pending, pemanggilan server action, toast feedback, dan
 * refresh data (Hooks Pattern).
 *
 * @param jobId ID lowongan yang dilamar.
 * @returns `isPending` dan aksi `apply(coverLetter, onSuccess)`.
 */
export function useApplyToJob(jobId: string) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const apply = useCallback(
    (coverLetter: string, onSuccess?: () => void) => {
      startTransition(async () => {
        const result = await applyToJobAction(jobId, coverLetter);
        if (result.error) {
          toast.error(result.error);
          return;
        }
        toast.success("Lamaran berhasil dikirim.");
        onSuccess?.();
        router.refresh();
      });
    },
    [jobId, router]
  );

  return { isPending, apply };
}
