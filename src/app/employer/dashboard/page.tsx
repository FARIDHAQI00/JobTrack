import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActivityList, type ActivityItem } from "@/components/shared/activity-list";
import { DashboardSection } from "@/components/shared/dashboard-section";
import { KPIStatCard } from "@/components/shared/kpi-stat-card";
import { HiringPipeline } from "@/features/applicants/components/hiring-pipeline";
import { JobStatusBadge } from "@/features/jobs/components/job-status-badge";
import type { PipelineStage } from "@/domain/application";
import {
  APPLICATION_STATUS_FLOW,
  type ApplicationStatus,
} from "@/domain/status";
import { getSessionUser } from "@/lib/auth/service";
import { initials } from "@/lib/initials";
import { formatDateID } from "@/lib/format";
import {
  getApplicationService,
  getCompanyRepository,
  getJobService,
} from "@/repositories";

export const metadata: Metadata = { title: "Dashboard Employer" };

export default async function EmployerDashboardPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const company = await getCompanyRepository().getByUserId(user.id);
  const jobs = await getJobService().listJobsForEmployer(user.id);
  const applicationService = getApplicationService();

  const applicantsByJob = await Promise.all(
    jobs.map(async (job) => ({
      job,
      granted: await applicationService.listApplicantsForJob(user.id, job.id),
    }))
  );

  const allApplicants = applicantsByJob.flatMap((entry) =>
    entry.granted.ok
      ? entry.granted.applicants.map((applicant) => ({
          job: entry.job,
          applicant,
        }))
      : []
  );

  const activeJobs = jobs.filter((job) => job.status === "OPEN").length;
  const interviewCount = allApplicants.filter(
    (entry) => entry.applicant.status === "INTERVIEW"
  ).length;
  const acceptedCount = allApplicants.filter(
    (entry) => entry.applicant.status === "ACCEPTED"
  ).length;

  const pipelineStages: PipelineStage[] = APPLICATION_STATUS_FLOW.map(
    (status) => ({
      status: status as ApplicationStatus,
      count: allApplicants.filter((entry) => entry.applicant.status === status)
        .length,
    })
  );

  const recentApplicants = allApplicants
    .slice()
    .sort((a, b) =>
      b.applicant.appliedAt.localeCompare(a.applicant.appliedAt)
    )
    .slice(0, 5);

  const activities: ActivityItem[] = recentApplicants.map(
    ({ job, applicant }) => ({
      id: applicant.id,
      title: `${applicant.name} melamar ${job.title}`,
      meta: `Status: ${applicant.status}`,
      time: formatDateID(applicant.appliedAt),
      initials: initials(applicant.name),
    })
  );

  const companyMissing = !company;

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div className="grid gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Halo, {company?.name ?? "Employer"}!
          </h1>
          <p className="text-muted-foreground">
            Ringkasan lowongan dan kandidat perusahaanmu.
          </p>
        </div>
        <Button size="lg" className="h-11" asChild>
          <Link href="/employer/jobs/new">+ Buat Lowongan</Link>
        </Button>
      </header>

      {companyMissing ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-warning-bg px-4 py-3 text-sm text-warning">
          <span>
            Profil perusahaan belum ada. Lengkapi dulu agar bisa membuat
            lowongan.
          </span>
          <Button variant="outline" size="sm" asChild>
            <Link href="/employer/profile">Lengkapi Profil</Link>
          </Button>
        </div>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPIStatCard
          label="Lowongan Aktif"
          value={String(activeJobs)}
          icon={BriefcaseBusiness}
          hint={`${jobs.length} total lowongan`}
        />
        <KPIStatCard
          label="Total Pelamar"
          value={String(allApplicants.length)}
          icon={Users}
        />
        <KPIStatCard
          label="Interview"
          value={String(interviewCount)}
          icon={CalendarClock}
        />
        <KPIStatCard
          label="Diterima"
          value={String(acceptedCount)}
          icon={CheckCircle2}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection
          title="Hiring Pipeline"
          description="Distribusi kandidat per tahap rekrutmen."
        >
          {allApplicants.length > 0 ? (
            <HiringPipeline stages={pipelineStages} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Belum ada lamaran masuk. Pipeline akan terisi begitu kandidat
              melamar.
            </p>
          )}
        </DashboardSection>

        <DashboardSection
          title="Aktivitas Terbaru"
          description="Lamaran terbaru pada lowonganmu."
        >
          {activities.length > 0 ? (
            <ActivityList items={activities} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Belum ada aktivitas lamaran.
            </p>
          )}
        </DashboardSection>
      </section>

      <DashboardSection
        title="Lowongan Terbaru"
        description="Pantau performa tiap lowongan."
        action={
          <Button variant="ghost" size="sm" asChild>
            <Link href="/employer/jobs">Lihat semua</Link>
          </Button>
        }
      >
        {jobs.length > 0 ? (
          <ul className="divide-y">
            {jobs.slice(0, 4).map((job) => {
              const entry = applicantsByJob.find(
                (candidate) => candidate.job.id === job.id
              );
              const count = entry?.granted.ok
                ? entry.granted.applicants.length
                : 0;
              return (
                <li
                  key={job.id}
                  className="flex flex-wrap items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="grid min-w-0 flex-1 gap-0.5">
                    <span className="truncate font-medium">{job.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {job.location}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {count} pelamar
                  </span>
                  <JobStatusBadge status={job.status} />
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/employer/jobs/${job.id}/applicants`}>
                      Lihat
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="grid gap-3 py-6 text-center">
            <p className="text-sm text-muted-foreground">
              Belum ada lowongan. Buat lowongan pertamamu.
            </p>
            <div>
              <Button asChild>
                <Link href="/employer/jobs/new">Buat Lowongan</Link>
              </Button>
            </div>
          </div>
        )}
      </DashboardSection>
    </div>
  );
}
