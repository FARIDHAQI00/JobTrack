import { CalendarClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface InterviewCardProps {
  candidateName: string;
  role: string;
  date: string;
  time: string;
  mode?: string;
}

/**
 * Kartu jadwal interview kandidat untuk dashboard Employer.
 */
export function InterviewCard({
  candidateName,
  role,
  date,
  time,
  mode,
}: InterviewCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarClock className="size-5" aria-hidden="true" />
        </span>
        <div className="grid gap-0.5">
          <span className="text-sm font-medium">{candidateName}</span>
          <span className="text-xs text-muted-foreground">{role}</span>
          <span className="text-sm font-medium">
            {date}, {time}
            {mode ? (
              <span className="text-muted-foreground"> - {mode}</span>
            ) : null}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
