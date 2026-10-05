import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmployerJobsList } from "@/features/employer/components/employer-jobs-list";
import { getSessionUser } from "@/lib/auth/service";
import { getApplicationService, getJobService } from "@/repositories";

export const metadata: Metadata = { title: "Lowongan Saya" };

export default async function EmployerJobsPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const jobs = await getJobService().listJobsForEmployer(user.id);
  const applicationService = getApplicationService();

  const countsEntries = await Promise.all(
    jobs.map(async (job) => {
      const result = await applicationService.listApplicantsForJob(
        user.id,
        job.id
      );
      return [job.id, result.ok ? result.applicants.length : 0] as const;
    })
  );
  const applicantsCount = Object.fromEntries(countsEntries);

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Lowongan Saya
          </h1>
          <p className="text-muted-foreground">
            {jobs.length} lowongan. Kelola, tutup, atau hapus dari sini.
          </p>
        </div>
        <Button size="lg" className="h-11" asChild>
          <Link href="/employer/jobs/new">+ Buat Lowongan</Link>
        </Button>
      </header>

      <Card>
        <CardContent>
          {jobs.length > 0 ? (
            <EmployerJobsList jobs={jobs} applicantsCount={applicantsCount} />
          ) : (
            <div className="flex flex-col items-center gap-3 py-14 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <BriefcaseBusiness className="size-5" aria-hidden="true" />
              </span>
              <p className="font-medium">Belum ada lowongan</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Buat lowongan pertama dan mulai terima kandidat.
              </p>
              <Button asChild>
                <Link href="/employer/jobs/new">Buat Lowongan</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
