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
import { EMPLOYMENT_TYPE_LABELS } from "@/domain/job";
import { formatDateID, formatSalaryRange } from "@/lib/format";
import { getJobRepository } from "@/repositories";

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

  const closed = job.status === "CLOSED";
  const salary = formatSalaryRange(job.salaryMin, job.salaryMax);
  const loginHref = `/login?next=${encodeURIComponent(`/jobs/${job.id}`)}`;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link
        href="/jobs"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Kembali ke lowongan
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <article className="grid content-start gap-8">
          <header className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {job.category ? (
                <Badge variant="secondary">{job.category}</Badge>
              ) : null}
              {closed ? <JobStatusBadge status={job.status} /> : null}
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight">
              {job.title}
            </h1>
            <p className="text-muted-foreground">
              {job.companyName} · {job.location}
            </p>
          </header>

          <section className="grid gap-3">
            <h2 className="font-heading text-xl font-semibold">Deskripsi</h2>
            <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
              {job.description}
            </p>
          </section>

          {job.qualifications ? (
            <section className="grid gap-3">
              <h2 className="font-heading text-xl font-semibold">
                Kualifikasi
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                {job.qualifications}
              </p>
            </section>
          ) : null}

          <section className="grid gap-3">
            <h2 className="font-heading text-xl font-semibold">
              Tentang {job.companyName}
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              Profil perusahaan lengkap tersedia setelah backend Supabase
              aktif. Untuk saat ini, lowongan ini diterbitkan oleh{" "}
              {job.companyName} di {job.location}.
            </p>
          </section>
        </article>

        <aside>
          <Card className="lg:sticky lg:top-24">
            <CardContent className="grid gap-5">
              {salary ? (
                <div className="grid gap-1">
                  <span className="text-sm text-muted-foreground">
                    Estimasi gaji
                  </span>
                  <span className="font-heading text-2xl font-semibold tabular-nums">
                    {salary}
                  </span>
                </div>
              ) : null}

              <dl className="grid gap-3 text-sm">
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
                  <Button size="lg" className="h-11" disabled>
                    Lowongan Ditutup
                  </Button>
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
                  </>
                )}
                <p className="text-center text-xs text-muted-foreground">
                  {closed
                    ? "Lowongan ini sudah tidak menerima lamaran baru."
                    : "Login diperlukan untuk melamar atau menyimpan lowongan."}
                </p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
