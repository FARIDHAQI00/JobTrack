"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ellipsis, Pencil, Trash2, Users, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobStatusBadge } from "@/features/jobs/components/job-status-badge";
import type { Job } from "@/domain/job";
import { formatDateID } from "@/lib/format";
import { closeJobAction, deleteJobAction } from "../actions";

export interface EmployerJobsListProps {
  jobs: Job[];
  applicantsCount: Record<string, number>;
}

type PendingAction = { type: "close" | "delete"; job: Job } | null;

/**
 * Daftar lowongan Employer dengan aksi ubah, tutup (konfirmasi), dan hapus
 * (konfirmasi destruktif).
 */
export function EmployerJobsList({
  jobs,
  applicantsCount,
}: EmployerJobsListProps) {
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function execute() {
    if (!pendingAction) {
      return;
    }
    const { type, job } = pendingAction;

    startTransition(async () => {
      const result =
        type === "close"
          ? await closeJobAction(job.id)
          : await deleteJobAction(job.id);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(
        type === "close"
          ? "Lowongan ditutup."
          : "Lowongan dihapus permanen."
      );
      setPendingAction(null);
      router.refresh();
    });
  }

  return (
    <>
      <ul className="divide-y">
        {jobs.map((job) => (
          <li
            key={job.id}
           className="group/job flex flex-wrap items-center gap-3 rounded-xl px-3 py-4 transition-colors duration-200 hover:bg-muted/40"
          >
            <div className="grid min-w-0 flex-1 gap-0.5">
              <span className="truncate font-medium transition-colors duration-200 group-hover/job:text-primary">
                {job.title}
              </span>
              <span className="text-sm text-muted-foreground">
                {job.location} · {job.employmentType.replace("_", " ")} ·{" "}
                {job.postedAt ? `Diposting ${formatDateID(job.postedAt)}` : ""}
              </span>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Users className="size-3" aria-hidden="true" />
              {applicantsCount[job.id] ?? 0} pelamar
            </Badge>
            <JobStatusBadge status={job.status} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Aksi untuk ${job.title}`}
                >
                  <Ellipsis />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/employer/jobs/${job.id}`}>
                    <Pencil aria-hidden="true" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/employer/jobs/${job.id}/applicants`}>
                    <Users aria-hidden="true" />
                    Lihat Pelamar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {job.status === "OPEN" ? (
                  <DropdownMenuItem
                    onSelect={() => setPendingAction({ type: "close", job })}
                  >
                    <XCircle aria-hidden="true" />
                    Tutup
                  </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => setPendingAction({ type: "delete", job })}
                >
                  <Trash2 aria-hidden="true" />
                  Hapus
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>

      <Dialog
        open={pendingAction !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingAction(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {pendingAction?.type === "close"
                ? "Tutup lowongan ini?"
                : "Hapus lowongan ini?"}
            </DialogTitle>
            <DialogDescription>
              {pendingAction?.type === "close"
                ? `${pendingAction.job.title} tidak akan menerima lamaran baru, tetapi tetap tersimpan beserta kandidatnya.`
                : `${pendingAction?.job.title ?? ""} akan dihapus permanen beserta seluruh lamarannya. Tindakan ini tidak dapat dibatalkan.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPendingAction(null)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              variant={
                pendingAction?.type === "delete" ? "destructive" : "default"
              }
              onClick={execute}
              disabled={isPending}
            >
              {isPending
                ? "Memproses..."
                : pendingAction?.type === "close"
                  ? "Tutup Lowongan"
                  : "Hapus Permanen"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
