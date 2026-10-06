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
import { JobStatusBadge } from "./job-status-badge";
import type { Job } from "@/domain/job";
import { EMPLOYMENT_TYPE_LABELS } from "@/domain/job";
import { formatSalaryRange } from "@/lib/format";

export interface JobCardProps {
  job: Job;
  detailHref?: string;
  onApply?: (id: string) => void;
  onSave?: (id: string) => void;
  saved?: boolean;
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
}: JobCardProps) {
  const salary = formatSalaryRange(job.salaryMin, job.salaryMax);
  const closed = job.status === "CLOSED";

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {detailHref ? (
            <Link
              href={detailHref}
              className="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring"
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
            className="h-10 bg-cta px-4 text-cta-foreground hover:bg-cta/90"
            disabled={closed}
            onClick={() => onApply(job.id)}
          >
            Lamar
          </Button>
        ) : detailHref ? (
          <Button variant="outline" size="lg" className="h-10 px-4" asChild>
            <Link href={detailHref}>Lihat Detail</Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
