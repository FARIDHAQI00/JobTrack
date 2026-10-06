import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobForm } from "@/features/employer/components/job-form";
import { JobStatusBadge } from "@/features/jobs/components/job-status-badge";
import { getSessionUser } from "@/lib/auth/service";
import { getJobService } from "@/repositories";

export const metadata: Metadata = { title: "Edit Lowongan" };

interface EmployerEditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EmployerEditJobPage({
  params,
}: EmployerEditJobPageProps) {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const { id } = await params;
  const job = await getJobService().getOwnedJob(user.id, id);
  if (!job) {
    notFound();
  }

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
            Edit Lowongan
          </h1>
          <JobStatusBadge status={job.status} />
        </div>
      </div>

      <Card className="bg-card/90">
        <CardHeader>
          <CardTitle>Detail Lowongan</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm mode="edit" jobId={job.id} defaultValues={job} />
        </CardContent>
      </Card>

      <div>
        <Button variant="outline" className="h-11" asChild>
          <Link href={`/employer/jobs/${job.id}/applicants`}>
            Lihat Pelamar Lowongan Ini
          </Link>
        </Button>
      </div>
    </div>
  );
}
