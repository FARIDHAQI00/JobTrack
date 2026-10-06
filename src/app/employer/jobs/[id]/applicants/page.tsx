import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ApplicantTable } from "@/features/employer/components/applicant-table";
import { JobStatusBadge } from "@/features/jobs/components/job-status-badge";
import { getSessionUser } from "@/lib/auth/service";
import { getApplicationService, getJobService } from "@/repositories";

export const metadata: Metadata = { title: "Kandidat" };

interface EmployerApplicantsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployerApplicantsPage({
  params,
}: EmployerApplicantsPageProps) {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const { id } = await params;
  const job = await getJobService().getOwnedJob(user.id, id);
  if (!job) {
    notFound();
  }

  const result = await getApplicationService().listApplicantsForJob(
    user.id,
    job.id
  );
  if (!result.ok) {
    notFound();
  }
  const applicants = result.applicants;

  return (
    <div className="grid gap-7">
      <div className="grid gap-4">
        <Link
          href="/employer/jobs"
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-card/75 hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke lowongan saya
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            {job.title}
          </h1>
          <JobStatusBadge status={job.status} />
          <span className="text-sm text-muted-foreground">
            {applicants.length} pelamar
          </span>
        </div>
      </div>

      <Card>
        <CardContent>
          {applicants.length > 0 ? (
            <ApplicantTable applicants={applicants} />
          ) : (
            <div className="flex flex-col items-center gap-3 py-14 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Users className="size-5" aria-hidden="true" />
              </span>
              <p className="font-medium">Belum ada pelamar</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Bagikan lowongan ini agar lebih banyak kandidat melihatnya.
                Status lamaran akan muncul di sini.
              </p>
              {job.status === "OPEN" ? (
                <Button variant="outline" asChild>
                  <Link href={`/jobs/${job.id}`}>Lihat halaman publik</Link>
                </Button>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
