import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  MapPin,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JobStatusBadge } from "@/features/jobs/components/job-status-badge";
import { SaveJobButton } from "@/features/jobs/components/save-job-button";
import { ApplyDialog } from "@/features/applications/components/apply-dialog";
import { ApplicationStatusBadge } from "@/features/applications/components/application-status-badge";
import { EMPLOYMENT_TYPE_LABELS } from "@/domain/job";
import { getSessionUser } from "@/lib/auth/service";
import { formatDateID, formatSalaryRange } from "@/lib/format";
import {
  getApplicationService,
  getCompanyRepository,
  getJobRepository,
  getSavedJobRepository,
} from "@/repositories";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobRepository().findById(id);

  if (!job) {
    return { title: "Lowongan tidak ditemukan" };
  }

  return {
    title: `${job.title} - ${job.companyName}`,
    description: job.description.slice(0, 150),
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getJobRepository().findById(id);

  if (!job) {
    notFound();
  }

  const user = await getSessionUser();
  const isSeeker = user?.role === "JOB_SEEKER";
  const company = await getCompanyRepository().findByName(job.companyName);

  const [saved, myApplications] = isSeeker
    ? await Promise.all([
        getSavedJobRepository().isSaved(user.id, job.id),
        getApplicationService().listMyApplications(user.id),
      ])
    : [false, []];

  const myApplication = myApplications.find(
    (application) => application.jobId === job.id
  );

  const closed = job.status === "CLOSED";
  const salary = formatSalaryRange(job.salaryMin, job.salaryMax);
  const loginHref = `/login?next=${encodeURIComponent(`/jobs/${job.id}`)}`;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/jobs"
        className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-card/75 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Kembali ke lowongan
      </Link>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
        <article className="grid content-start gap-8">
          <header className="relative isolate grid gap-4 overflow-hidden rounded-3xl border border-border/70 bg-card/80 p-5 shadow-[var(--elevation-card)] sm:gap-5 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 -z-10 size-64 rounded-full border border-primary/10 bg-[radial-gradient(circle_at_35%_35%,color-mix(in_srgb,var(--warm-tint)_55%,white),transparent_70%)]"
            />
            <div className="flex flex-wrap items-center gap-2">
              {job.category ? (
                <Badge variant="secondary">{job.category}</Badge>
              ) : null}
              {closed ? <JobStatusBadge status={job.status} /> : null}
            </div>
            <h1 className="max-w-[18ch] font-heading text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
              {job.title}
            </h1>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground sm:text-base">
              <span className="font-semibold text-foreground">{job.companyName}</span>
              <span aria-hidden="true" className="text-border">/</span>
              <span>{job.location}</span>
            </p>
          </header>

          <section className="grid gap-3">
            <h2 className="font-heading text-xl font-semibold">Deskripsi</h2>
            <p className="max-w-[68ch] whitespace-pre-line leading-7 text-muted-foreground">
              {job.description}
            </p>
          </section>

          {job.qualifications ? (
            <section className="grid gap-3">
              <h2 className="font-heading text-xl font-semibold">
                Kualifikasi
              </h2>
              <p className="max-w-[68ch] whitespace-pre-line leading-7 text-muted-foreground">
                {job.qualifications}
              </p>
            </section>
          ) : null}

          <section className="grid gap-3">
            <h2 className="font-heading text-xl font-semibold">
              Tentang {job.companyName}
            </h2>
            {company?.description ? (
              <p className="max-w-[68ch] leading-7 text-muted-foreground">
                {company.description}
              </p>
            ) : (
              <p className="max-w-[68ch] leading-7 text-muted-foreground">
                Lowongan ini diterbitkan oleh {job.companyName} di{" "}
                {job.location}.
              </p>
            )}
            {company?.website ? (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer noopener"
                className="w-fit text-sm font-medium text-primary hover:underline"
              >
                Kunjungi website perusahaan
              </a>
            ) : null}
          </section>
        </article>

        <aside>
          <Card className="lg:sticky lg:top-24">
            <CardContent className="grid gap-5 pt-1">
              <div className="flex items-center justify-between gap-3">
                <span className="font-heading text-sm font-semibold">Ringkasan lowongan</span>
              </div>
              {salary ? (
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground">
                    Estimasi gaji
                  </span>
                  <span className="font-heading text-3xl font-semibold tracking-tight tabular-nums">
                    {salary}
                  </span>
                </div>
              ) : null}

              <dl className="grid gap-3 border-y border-border/70 py-4 text-sm">
                <div className="flex items-center gap-2">
                  <Briefcase
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dt className="sr-only">Tipe pekerjaan</dt>
                  <dd>{EMPLOYMENT_TYPE_LABELS[job.employmentType]}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <dt className="sr-only">Lokasi</dt>
                  <dd>{job.location}</dd>
                </div>
                {job.postedAt ? (
                  <div className="flex items-center gap-2">
                    <CalendarDays
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <dt className="sr-only">Diposting</dt>
                    <dd>Diposting {formatDateID(job.postedAt)}</dd>
                  </div>
                ) : null}
                {salary ? (
                  <div className="flex items-center gap-2">
                    <Wallet
                      className="size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <dt className="sr-only">Gaji</dt>
                    <dd className="tabular-nums">{salary}</dd>
                  </div>
                ) : null}
              </dl>

              <div className="grid gap-2">
                {closed ? (
                  <>
                    <Button size="lg" className="h-11" disabled>
                      Lowongan Ditutup
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Lowongan ini sudah tidak menerima lamaran baru.
                    </p>
                  </>
                ) : isSeeker ? (
                  <>
                    {myApplication ? (
                      <div className="grid gap-2">
                        <Button size="lg" className="h-11" disabled>
                          Sudah Dilamar
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                          Status saat ini:
                          <ApplicationStatusBadge
                            status={myApplication.status}
                          />
                        </div>
                      </div>
                    ) : (
                      <ApplyDialog jobId={job.id} jobTitle={job.title} />
                    )}
                    <SaveJobButton jobId={job.id} initialSaved={saved} />
                  </>
                ) : user ? (
                  <>
                    <Button size="lg" className="h-11" disabled>
                      Khusus Job Seeker
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Masuk dengan akun Job Seeker untuk melamar lowongan ini.
                    </p>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="h-11 bg-cta text-cta-foreground hover:bg-cta/90"
                      asChild
                    >
                      <Link href={loginHref}>Masuk untuk melamar</Link>
                    </Button>
                    <Button variant="outline" size="lg" className="h-11" asChild>
                      <Link href={loginHref}>Simpan lowongan</Link>
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      Login diperlukan untuk melamar atau menyimpan lowongan.
                    </p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
