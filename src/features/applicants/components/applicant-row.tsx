import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import type { Applicant } from "@/domain/application";
import { initials } from "@/lib/initials";

export interface ApplicantRowProps {
  applicant: Applicant;
  onOpen?: (id: string) => void;
}

/**
 * Baris kandidat pada daftar applicants Employer.
 *
 * @param applicant Data ringkas kandidat.
 * @param onOpen Callback opsional saat kandidat dibuka.
 */
export function ApplicantRow({ applicant, onOpen }: ApplicantRowProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Avatar>
        {applicant.avatarUrl ? (
          <AvatarImage src={applicant.avatarUrl} alt="" />
        ) : null}
        <AvatarFallback>{initials(applicant.name)}</AvatarFallback>
      </Avatar>
      <div className="grid min-w-0 flex-1 gap-0.5">
        <span className="truncate text-sm font-medium">{applicant.name}</span>
        {applicant.email ? (
          <span className="truncate text-xs text-muted-foreground">
            {applicant.email}
          </span>
        ) : null}
      </div>
      <ApplicationStatusBadge status={applicant.status} />
      <time className="hidden shrink-0 text-xs text-muted-foreground sm:block">
        {applicant.appliedAt}
      </time>
      {onOpen ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpen(applicant.id)}
        >
          Lihat
        </Button>
      ) : null}
    </div>
  );
}
