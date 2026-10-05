import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusTone =
  | "applied"
  | "screening"
  | "interview"
  | "accepted"
  | "rejected"
  | "neutral";

const TONE_CLASSES: Record<StatusTone, string> = {
  applied: "bg-status-applied-bg text-status-applied",
  screening: "bg-status-screening-bg text-status-screening",
  interview: "bg-status-interview-bg text-status-interview",
  accepted: "bg-status-accepted-bg text-status-accepted",
  rejected: "bg-status-rejected-bg text-status-rejected",
  neutral: "bg-muted text-muted-foreground",
};

interface StatusBadgeProps extends ComponentProps<typeof Badge> {
  tone?: StatusTone;
}

/**
 * Badge status generik dengan warna semantik JobTrack.
 *
 * Warna hanya memperkuat; label teks anak badge selalu menjadi sinyal utama
 * sehingga status tetap terbaca tanpa warna (WCAG 1.4.1).
 */
export function StatusBadge({
  tone = "neutral",
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent", TONE_CLASSES[tone], className)}
      {...props}
    />
  );
}
