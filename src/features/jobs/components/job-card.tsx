import Link from "next/link";
import { Bookmark, Briefcase, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobStatusBadge } from "./job-status-badge";
import { cn } from "@/lib/utils";
import type { Job } from "@/domain/job";
import { EMPLOYMENT_TYPE_LABELS } from "@/domain/job";
import { formatSalaryRange } from "@/lib/format";

export interface JobCardProps {
  job: Job;
  detailHref?: string;
  onApply?: (id: string) => void;
  onSave?: (id: string) => void;
  saved?: boolean;
  className?: string;
}

/**
 * Kartu ringkas lowongan untuk listing dan rekomendasi.
 *
 * @param job Data lowongan.
 * @param detailHref Href halaman detail; judul dan CTA menjadi tautan.
 * @param onApply Callback saat user memilih Lamar.
 * @param onSave Callback saat user menyimpan/menghapus simpanan.
 * @param saved Menandai lowongan sudah tersimpan.
 */
export function JobCard({
  job,
  detailHref,
  onApply,
  onSave,
  saved = false,
  className,
}: JobCardProps) {
  const salary = formatSalaryRange(job.salaryMin, job.salaryMax);
  const closed = job.status === "CLOSED";

  return (
    <Card
      className={cn(
        "transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--elevation-card-hover)]",
        className
      )}
    >
      <CardHeader>
        <CardTitle>
          {detailHref ? (
            <Link
              href={detailHref}
              className="rounded-sm underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
            >
              {job.title}
            </Link>
          ) : (
            job.title
          )}
        </CardTitle>
        <CardDescription>{job.companyName}</CardDescription>
        {closed ? (
          <CardAction>
            <JobStatusBadge status={job.status} />
          </CardAction>
        ) : job.category ? (
          <CardAction>
            <Badge variant="secondary" className="max-w-32 truncate">
              {job.category}
            </Badge>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-4" aria-hidden="true" />
          {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Briefcase className="size-4" aria-hidden="true" />
          {EMPLOYMENT_TYPE_LABELS[job.employmentType]}
        </span>
        {salary ? <span className="tabular-nums">{salary}</span> : null}
      </CardContent>
      <CardFooter className="justify-end gap-2">
        {onSave ? (
          <Button
            variant="ghost"
            size="sm"
            aria-pressed={saved}
            onClick={() => onSave(job.id)}
          >
            <Bookmark className={saved ? "fill-current" : undefined} />
            {saved ? "Tersimpan" : "Simpan"}
          </Button>
        ) : null}
        {onApply ? (
          <Button
          className="h-11 px-4"
            disabled={closed}
            onClick={() => onApply(job.id)}
          >
            Lamar
          </Button>
        ) : detailHref ? (
          <Button variant="outline" size="lg" className="h-11 px-4" asChild>
            <Link href={detailHref}>Lihat Detail</Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
