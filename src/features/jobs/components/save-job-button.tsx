"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { toggleSavedJobAction } from "@/features/jobs/actions";

export interface SaveJobButtonProps {
  jobId: string;
  initialSaved: boolean;
}

/**
 * Tombol simpan/hapus lowongan dengan feedback toast.
 */
export function SaveJobButton({ jobId, initialSaved }: SaveJobButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function toggle() {
    startTransition(async () => {
      const result = await toggleSavedJobAction(jobId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      setSaved(Boolean(result.saved));
      toast.success(
        result.saved ? "Lowongan disimpan." : "Lowongan dihapus dari simpanan."
      );
      router.refresh();
    });
  }

  return (
    <Button
      variant="outline"
      size="lg"
      className="h-11"
      onClick={toggle}
      disabled={pending}
      aria-pressed={saved}
    >
      <Bookmark className={saved ? "fill-current" : undefined} />
      {saved ? "Tersimpan" : "Simpan lowongan"}
    </Button>
  );
}
