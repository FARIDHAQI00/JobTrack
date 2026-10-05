"use client";

import {
  BriefcaseBusiness,
  CalendarClock,
  Target,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { ActivityList } from "@/components/shared/activity-list";
import { DashboardSection } from "@/components/shared/dashboard-section";
import { KPIStatCard } from "@/components/shared/kpi-stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JobCard } from "@/features/jobs/components/job-card";
import { JobStatusBadge } from "@/features/jobs/components/job-status-badge";
import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import { ApplicationTimeline } from "@/features/applications/components/application-timeline";
import { ApplicantRow } from "@/features/applicants/components/applicant-row";
import { HiringPipeline } from "@/features/applicants/components/hiring-pipeline";
import { InterviewCard } from "@/features/employer/components/interview-card";
import type { Applicant } from "@/domain/application";
import type { Job } from "@/domain/job";

const jobs: Job[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    companyName: "Nusantara Digital",
    location: "Jakarta",
    employmentType: "FULL_TIME",
    salaryMin: 8_000_000,
    salaryMax: 12_000_000,
    status: "OPEN",
  },
  {
    id: "job-2",
    title: "UI/UX Designer",
    companyName: "Karya Bersama Studio",
    location: "Bandung",
    employmentType: "CONTRACT",
    salaryMin: 7_000_000,
    salaryMax: 10_000_000,
    status: "OPEN",
  },
  {
    id: "job-3",
    title: "Data Analyst",
    companyName: "Samudra Data",
    location: "Surabaya",
    employmentType: "FULL_TIME",
    salaryMin: 9_000_000,
    salaryMax: 14_000_000,
    status: "CLOSED",
  },
];

const applicants: Applicant[] = [
  {
    id: "appl-1",
    name: "Ayu Larasati",
    email: "ayu.larasati@example.com",
    status: "INTERVIEW",
    appliedAt: "2 Okt 2026",
  },
  {
    id: "appl-2",
    name: "Bima Nugraha",
    email: "bima.nugraha@example.com",
    status: "SCREENING",
    appliedAt: "1 Okt 2026",
  },
  {
    id: "appl-3",
    name: "Citra Maharani",
    email: "citra.maharani@example.com",
    status: "APPLIED",
    appliedAt: "30 Sep 2026",
  },
];

export function StyleguideContent() {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10">
      <header className="grid gap-1">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          JobTrack Component Styleguide
        </h1>
        <p className="text-muted-foreground">
          Halaman internal untuk QA visual Phase 2. Tidak termasuk navigasi
          produk dan tidak diindeks mesin pencari.
        </p>
      </header>

      <section className="grid gap-4">
        <h2 className="font-heading text-xl font-semibold">KPI Stat Cards</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KPIStatCard
            label="Lowongan Aktif"
            value="24"
            icon={BriefcaseBusiness}
            delta={{ value: "18%", direction: "up", caption: "Minggu ini" }}
          />
          <KPIStatCard
            label="Total Pelamar"
            value="187"
            icon={Users}
            delta={{ value: "12%", direction: "up", caption: "Minggu ini" }}
          />
          <KPIStatCard
            label="Interview Terjadwal"
            value="9"
            icon={CalendarClock}
            delta={{ value: "0%", direction: "flat", caption: "Minggu ini" }}
          />
          <KPIStatCard
            label="Tingkat Diterima"
            value="6,4%"
            icon={Target}
            delta={{ value: "0,8%", direction: "down", caption: "Bulan lalu" }}
          />
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="font-heading text-xl font-semibold">Job Cards</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={job.id === "job-2"}
              onApply={(id) => toast.success(`Lamaran terkirim: ${id}`)}
              onSave={(id) =>
                toast.info(
                  id === "job-2" ? "Dihapus dari simpanan" : "Lowongan disimpan"
                )
              }
            />
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection
          title="Status Lowongan"
          description="Badge dengan label teks, bukan warna saja."
        >
          <div className="flex flex-wrap gap-2">
            <JobStatusBadge status="OPEN" />
            <JobStatusBadge status="CLOSED" />
          </div>
        </DashboardSection>

        <DashboardSection
          title="Status Lamaran"
          description="Lima status kanonik JobTrack."
        >
          <div className="flex flex-wrap gap-2">
            <ApplicationStatusBadge status="APPLIED" />
            <ApplicationStatusBadge status="SCREENING" />
            <ApplicationStatusBadge status="INTERVIEW" />
            <ApplicationStatusBadge status="ACCEPTED" />
            <ApplicationStatusBadge status="REJECTED" />
          </div>
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection
          title="Application Timeline"
          description="Progres tahapan lamaran Job Seeker."
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <ApplicationTimeline status="SCREENING" />
            <ApplicationTimeline status="REJECTED" />
          </div>
        </DashboardSection>

        <DashboardSection
          title="Hiring Pipeline"
          description="Ringkasan kandidat per tahap untuk Employer."
        >
          <HiringPipeline
            stages={[
              { status: "APPLIED", count: 64 },
              { status: "SCREENING", count: 28 },
              { status: "INTERVIEW", count: 9 },
              { status: "ACCEPTED", count: 4 },
            ]}
          />
        </DashboardSection>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <DashboardSection
          title="Applicants"
          description="Baris kandidat dengan status dan aksi."
        >
          <div className="divide-y">
            {applicants.map((applicant) => (
              <ApplicantRow
                key={applicant.id}
                applicant={applicant}
                onOpen={(id) => toast.info(`Buka detail kandidat ${id}`)}
              />
            ))}
          </div>
        </DashboardSection>

        <div className="grid content-start gap-4">
          <DashboardSection
            title="Aktivitas Terbaru"
            description="Feed aktivitas kandidat dan lowongan."
          >
            <ActivityList
              items={[
                {
                  id: "act-1",
                  title: "Rani Puspita melamar Frontend Developer",
                  meta: "Nusantara Digital",
                  time: "10 menit lalu",
                  initials: "RP",
                },
                {
                  id: "act-2",
                  title: "Bagas Wirawan memperbarui status Bima Nugraha",
                  meta: "Screening",
                  time: "1 jam lalu",
                  initials: "BW",
                },
                {
                  id: "act-3",
                  title: "Sinta Dewi menjadwalkan interview",
                  meta: "Ayu Larasati",
                  time: "3 jam lalu",
                  initials: "SD",
                },
              ]}
            />
          </DashboardSection>
          <InterviewCard
            candidateName="Nadia Safitri"
            role="Frontend Developer"
            date="Kamis, 8 Oktober 2026"
            time="10.00"
            mode="Google Meet"
          />
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="font-heading text-xl font-semibold">
          Base Components (shadcn/ui)
        </h2>
        <div className="grid gap-6 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <div className="flex flex-wrap items-center gap-2">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button
              className="bg-cta text-cta-foreground hover:bg-cta/90"
              onClick={() => toast.success("Lamaran berhasil dikirim")}
            >
              CTA Sukses
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
          <form className="grid max-w-md gap-5">
            <div className="grid gap-2">
              <Label htmlFor="sg-title">Judul lowongan</Label>
              <Input id="sg-title" placeholder="Frontend Developer" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sg-type">Tipe pekerjaan</Label>
              <Select>
                <SelectTrigger id="sg-type" className="w-full">
                  <SelectValue placeholder="Pilih tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Kontrak</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sg-desc">Deskripsi</Label>
              <Textarea id="sg-desc" placeholder="Ringkasan peran..." />
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
