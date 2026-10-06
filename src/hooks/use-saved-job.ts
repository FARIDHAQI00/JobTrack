"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleSavedJobAction } from "@/features/jobs/actions";

/**
 * Hook toggle simpan/hapus lowongan untuk Job Seeker.
 *
 * Mengenkapsulasi state lokal, server action, toast feedback, dan refresh
 * data sehingga komponen hanya fokus pada tampilan (Hooks Pattern).
 *
 * @param jobId ID lowongan.
 * @param initialSaved Kondisi tersimpan awal dari server.
 * @returns State `saved`, `isPending`, dan aksi `toggle`.
 */
export function useSavedJobToggle(jobId: string, initialSaved = false) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggle = useCallback(() => {
    startTransition(async () => {
      const result = await toggleSavedJobAction(jobId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      const nextSaved = Boolean(result.saved);
      setSaved(nextSaved);
      toast.success(
        nextSaved ? "Lowongan disimpan." : "Lowongan dihapus dari simpanan."
      );
      router.refresh();
    });
  }, [jobId, router]);

  return { saved, isPending, toggle };
}
