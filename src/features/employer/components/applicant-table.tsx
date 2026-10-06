"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import { ApplicationTimeline } from "@/features/applications/components/application-timeline";
import type { Applicant } from "@/domain/application";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_TRANSITIONS,
  type ApplicationStatus,
} from "@/domain/status";
import { formatDateID } from "@/lib/format";
import { initials } from "@/lib/initials";
import { updateApplicantStatusAction } from "../actions";

export interface ApplicantTableProps {
  applicants: Applicant[];
}

interface ConfirmTarget {
  applicant: Applicant;
  nextStatus: ApplicationStatus;
}

/**
 * Tabel kandidat dengan kontrol perubahan status.
 *
 * Transisi mengikuti `APPLICATION_STATUS_TRANSITIONS`; status REJECTED
 * memerlukan konfirmasi. Tabel berubah menjadi daftar bertumpuk di mobile.
 */
export function ApplicantTable({ applicants }: ApplicantTableProps) {
  const [detail, setDetail] = useState<Applicant | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget | null>(
    null
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function applyStatus(applicant: Applicant, nextStatus: ApplicationStatus) {
    startTransition(async () => {
      const result = await updateApplicantStatusAction(
        applicant.id,
        nextStatus
      );
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(
        `Status ${applicant.name} menjadi ${APPLICATION_STATUS_LABELS[nextStatus]}.`
      );
      setConfirmTarget(null);
      router.refresh();
    });
  }

  function handleStatusChange(
    applicant: Applicant,
    nextStatus: ApplicationStatus
  ) {
    if (nextStatus === applicant.status) {
      return;
    }
    if (nextStatus === "REJECTED") {
      setConfirmTarget({ applicant, nextStatus });
      return;
    }
    applyStatus(applicant, nextStatus);
  }

  function StatusControl({ applicant }: { applicant: Applicant }) {
    const transitions = APPLICATION_STATUS_TRANSITIONS[applicant.status];
    if (transitions.length === 0) {
      return <ApplicationStatusBadge status={applicant.status} />;
    }
    return (
      <Select
        value={applicant.status}
        onValueChange={(value) =>
          handleStatusChange(applicant, value as ApplicationStatus)
        }
        disabled={isPending}
      >
        <SelectTrigger
          className="w-40"
          aria-label={`Ubah status ${applicant.name}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={applicant.status}>
            {APPLICATION_STATUS_LABELS[applicant.status]} (saat ini)
          </SelectItem>
          {transitions.map((status) => (
            <SelectItem key={status} value={status}>
              {APPLICATION_STATUS_LABELS[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kandidat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {initials(applicant.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-0.5">
                      <span className="font-medium">{applicant.name}</span>
                      {applicant.email ? (
                        <span className="text-xs text-muted-foreground">
                          {applicant.email}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusControl applicant={applicant} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDateID(applicant.appliedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDetail(applicant)}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="divide-y md:hidden">
        {applicants.map((applicant) => (
          <li key={applicant.id} className="grid gap-3 border-b border-border/60 py-4 last:border-0">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{initials(applicant.name)}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 gap-0.5">
                <span className="truncate font-medium">{applicant.name}</span>
                {applicant.email ? (
                  <span className="truncate text-xs text-muted-foreground">
                    {applicant.email}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <StatusControl applicant={applicant} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDetail(applicant)}
              >
                Detail
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog
        open={detail !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDetail(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          {detail ? (
            <>
              <DialogHeader>
                <DialogTitle>{detail.name}</DialogTitle>
                <DialogDescription>
                  Dilamar {formatDateID(detail.appliedAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                {detail.coverLetter ? (
                  <div className="grid gap-1.5">
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                      <FileText className="size-4" aria-hidden="true" />
                      Surat lamaran
                    </span>
                    <p className="rounded-xl border border-border/65 bg-muted/55 px-3.5 py-3 text-sm leading-6 text-muted-foreground">
                      {detail.coverLetter}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Kandidat tidak mengirim surat lamaran.
                  </p>
                )}
                <div className="grid gap-2">
                  <span className="text-sm font-medium">Progres</span>
                  <ApplicationTimeline status={detail.status} />
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmTarget(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak kandidat ini?</DialogTitle>
            <DialogDescription>
              {confirmTarget
                ? `${confirmTarget.applicant.name} akan ditandai Ditolak dan tidak dapat dikembalikan ke tahap sebelumnya.`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmTarget(null)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmTarget) {
                  applyStatus(
                    confirmTarget.applicant,
                    confirmTarget.nextStatus
                  );
                }
              }}
              disabled={isPending}
            >
              {isPending ? "Memproses..." : "Tolak Kandidat"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
