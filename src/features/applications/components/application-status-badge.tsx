import { StatusBadge, type StatusTone } from "@/components/shared/status-badge";
import {
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/domain/status";

const STATUS_TONES: Record<ApplicationStatus, StatusTone> = {
  APPLIED: "applied",
  SCREENING: "screening",
  INTERVIEW: "interview",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

/**
 * Badge status lamaran (Melamar sampai Ditolak) dengan label teks eksplisit.
 */
export function ApplicationStatusBadge({
  status,
}: ApplicationStatusBadgeProps) {
  return (
    <StatusBadge tone={STATUS_TONES[status]}>
      {APPLICATION_STATUS_LABELS[status]}
    </StatusBadge>
  );
}
