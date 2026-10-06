"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSavedJobToggle } from "@/hooks/use-saved-job";

export interface SaveJobButtonProps {
  jobId: string;
  initialSaved: boolean;
}

/**
 * Tombol simpan/hapus lowongan dengan feedback toast.
 */
export function SaveJobButton({ jobId, initialSaved }: SaveJobButtonProps) {
  const { saved, isPending, toggle } = useSavedJobToggle(jobId, initialSaved);

  return (
    <Button
      variant="outline"
      size="lg"
      className="h-11 w-full border-border/80 bg-card/80"
      onClick={toggle}
      disabled={isPending}
      aria-pressed={saved}
    >
      <Bookmark
        className={saved ? "fill-current text-primary" : "transition-transform duration-200 group-hover/button:-rotate-6"}
      />
      {saved ? "Tersimpan" : "Simpan lowongan"}
    </Button>
  );
}
