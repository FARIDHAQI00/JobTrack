import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  APPLICATION_STATUS_FLOW,
  APPLICATION_STATUS_LABELS,
  type ApplicationStatus,
} from "@/domain/status";

export interface ApplicationTimelineProps {
  status: ApplicationStatus;
}

/**
 * Menampilkan progres tahapan lamaran.
 *
 * Tahapan yang sudah dilewati ditandai ikon centang, tahap aktif ditandai
 * warna + teks tebal, dan status REJECTED ditampilkan sebagai baris terminal.
 * Status tidak pernah disampaikan lewat warna saja.
 */
export function ApplicationTimeline({ status }: ApplicationTimelineProps) {
  const rejected = status === "REJECTED";
  const currentIndex = rejected ? -1 : APPLICATION_STATUS_FLOW.indexOf(status);

  return (
    <ol className="flex flex-col gap-3" aria-label="Progres lamaran">
      {APPLICATION_STATUS_FLOW.map((step, index) => {
        const done = index < currentIndex;
        const current = index === currentIndex;

        return (
          <li key={step} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-[background-color,border-color,color,box-shadow] duration-200",
                done &&
                  "border-transparent bg-status-accepted-bg text-status-accepted",
                current &&
                  "border-primary bg-primary text-primary-foreground ring-4 ring-primary/10",
                !done && !current && "border-border/80 bg-card text-muted-foreground"
              )}
            >
              {done ? <Check className="size-3" /> : index + 1}
            </span>
            <span
              className={cn(
                "text-sm",
                current && "font-semibold text-foreground",
                !current && "text-muted-foreground"
              )}
            >
              {APPLICATION_STATUS_LABELS[step]}
            </span>
          </li>
        );
      })}
      {rejected ? (
        <li className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-status-rejected-bg text-status-rejected"
          >
            <X className="size-3" />
          </span>
          <span className="text-sm font-semibold text-status-rejected">
            {APPLICATION_STATUS_LABELS.REJECTED}
          </span>
        </li>
      ) : null}
    </ol>
  );
}
