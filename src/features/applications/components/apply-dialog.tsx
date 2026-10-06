"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApplyToJob } from "@/hooks/use-apply-to-job";

export interface ApplyDialogProps {
  jobId: string;
  jobTitle: string;
}

/**
 * Dialog lamaran dengan surat lamaran opsional.
 *
 * Menampilkan loading saat submit dan toast feedback sukses/gagal
 * (verified UX: submit feedback).
 */
export function ApplyDialog({ jobId, jobTitle }: ApplyDialogProps) {
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const { isPending, apply } = useApplyToJob(jobId);

  function submit() {
    apply(coverLetter, () => {
      setOpen(false);
      setCoverLetter("");
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="h-11 w-full"
        >
          Lamar Sekarang
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lamar {jobTitle}</DialogTitle>
          <DialogDescription>
            Kirim lamaranmu untuk posisi ini. Surat lamaran bersifat opsional.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="cover-letter">Surat lamaran (opsional)</Label>
          <Textarea
            id="cover-letter"
            value={coverLetter}
            onChange={(event) => setCoverLetter(event.target.value)}
            placeholder="Ceritakan singkat kenapa kamu cocok untuk posisi ini..."
            rows={5}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Batal
          </Button>
          <Button
            onClick={submit}
            disabled={isPending}
            className="min-h-11"
          >
            {isPending ? "Mengirim..." : "Kirim Lamaran"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
