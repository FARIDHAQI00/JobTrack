import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Bookmark,
  CalendarClock,
  FileText,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardSection } from "@/components/shared/dashboard-section";
import { KPIStatCard } from "@/components/shared/kpi-stat-card";
import { ApplicationTimeline } from "@/features/applications/components/application-timeline";
import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import { JobCard } from "@/features/jobs/components/job-card";
import { seekerProfileCompleteness } from "@/domain/seeker-profile";
import { getSessionUser } from "@/lib/auth/service";
import {
  getApplicationService,
  getJobRepository,
  getSavedJobRepository,
  getSeekerProfileRepository,
} from "@/repositories";

export const metadata: Metadata = { title: "Dashboard Job Seeker" };

export default async function SeekerDashboardPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "JOB_SEEKER") {
    redirect("/login");
  }

  const applications = await getApplicationService().listMyApplications(
    user.id
  );
  const savedJobs = await getSavedJobRepository().listBySeeker(user.id);
  const profile = await getSeekerProfileRepository().getByUserId(user.id);
  const completeness = seekerProfileCompleteness(profile);

  const interviewCount = applications.filter(
    (application) => application.status === "INTERVIEW"
  ).length;
  const latestApplication = applications[0] ?? null;

  const appliedJobIds = new Set(
    applications.map((application) => application.jobId)
  );
  const openJobs = await getJobRepository().findAll({ status: "OPEN" });
  const recommendedJobs = openJobs
    .filter((job) => !appliedJobIds.has(job.id))
    .slice(0, 3);

  const greetingName = (profile?.fullName ?? user.fullName ?? "Kandidat")
    .split(" ")[0];

  return (
    <div className="grid gap-7 lg:gap-9">
      <header className="grid gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Halo, {greetingName}!
        </h1>
        <p className="max-w-[60ch] leading-6 text-muted-foreground">
          Ringkasan lamaran dan rekomendasi lowongan untukmu.
        </p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4">
        <KPIStatCard
          label="Total Lamaran"
          value={String(applications.length)}
          icon={FileText}
        />
        <KPIStatCard
          label="Interview"
          value={String(interviewCount)}
          icon={CalendarClock}
        />
        <KPIStatCard
          label="Lowongan Tersimpan"
          value={String(savedJobs.length)}
          icon={Bookmark}
        />
        <KPIStatCard
          label="Kelengkapan Profil"
          value={`${completeness}%`}
          icon={UserRound}
          hint={
            completeness === 100
              ? "Profil sudah lengkap."
              : "Lengkapi profil untuk peluang lebih besar."
          }
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <DashboardSection
          title="Progres Lamaran"
          description="Status lamaran terakhirmu."
          action={
            latestApplication ? (
              <ApplicationStatusBadge status={latestApplication.status} />
            ) : null
          }
        >
          {latestApplication ? (
            <div className="grid gap-4">
              <div className="grid gap-0.5">
                <span className="font-medium">
                  {latestApplication.jobTitle}
                </span>
                <span className="text-sm text-muted-foreground">
                  {latestApplication.companyName}
                </span>
              </div>
              <ApplicationTimeline status={latestApplication.status} />
              <Button variant="outline" size="sm" asChild>
                <Link href="/seeker/applications">Lihat semua lamaran</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-3 text-center">
              <p className="text-sm text-muted-foreground">
                Kamu belum melamar lowongan apa pun.
              </p>
              <Button asChild>
                <Link href="/jobs">Cari Lowongan</Link>
              </Button>
            </div>
          )}
        </DashboardSection>

        <DashboardSection
          title="Interview Mendatang"
          description="Jadwal interview dari Employer."
        >
          <div className="grid gap-3 text-center">
            <p className="text-sm text-muted-foreground">
              Belum ada jadwal interview. Status akan muncul di sini setelah
              employer menjadwalkan interview.
            </p>
            <Button variant="outline" asChild>
              <Link href="/seeker/applications">Pantau status lamaran</Link>
            </Button>
          </div>
        </DashboardSection>
      </section>

      <section className="grid gap-5">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
            Rekomendasi Lowongan
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/jobs">Lihat semua</Link>
          </Button>
        </div>
        {recommendedJobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recommendedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                detailHref={`/jobs/${job.id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Belum ada rekomendasi baru. Cek kembali nanti.
          </p>
        )}
      </section>
    </div>
  );
}
