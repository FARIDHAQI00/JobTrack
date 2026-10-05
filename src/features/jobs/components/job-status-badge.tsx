import { StatusBadge } from "@/components/shared/status-badge";
import { JOB_STATUS_LABELS, type JobStatus } from "@/domain/status";

export interface JobStatusBadgeProps {
  status: JobStatus;
}

/**
 * Badge status lowongan (Dibuka/Ditutup) dengan label teks eksplisit.
 */
export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  return (
    <StatusBadge tone={status === "OPEN" ? "accepted" : "neutral"}>
      {JOB_STATUS_LABELS[status]}
    </StatusBadge>
  );
}
