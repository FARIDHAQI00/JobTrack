import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/features/jobs/components/job-card";
import { uniqueValues } from "@/lib/job-filters";
import { getJobRepository } from "@/repositories";

export default async function HomePage() {
  const repository = getJobRepository();
  const allJobs = await repository.findAll();
  const openJobs = allJobs.filter((job) => job.status === "OPEN");
  const latestJobs = openJobs.slice(0, 6);
  const previewJobs = latestJobs.slice(0, 2);
  const moreJobs = latestJobs.slice(previewJobs.length);
  const categories = uniqueValues(openJobs, "category");

  return (
    <main className="overflow-hidden">
      <section className="landing-mesh relative isolate mx-2 mt-2 overflow-hidden rounded-[2rem] border-[5px] border-white shadow-[var(--elevation-card)] sm:mx-5 sm:mt-4 sm:rounded-[2.5rem] sm:border-[8px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_25%,color-mix(in_srgb,var(--background)_28%,transparent)_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 text-center sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="mx-auto grid max-w-4xl justify-items-center gap-5 sm:gap-6">
            <p className="rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-medium text-primary shadow-[var(--elevation-subtle)] backdrop-blur-sm">
              Peluang karier, satu tempat
            </p>
            <h1 className="mx-auto max-w-5xl font-heading text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.8rem]">
              Temukan <span className="text-primary">pekerjaan impian</span> dan
              <br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              <span className="lg:block">rencanakan langkah berikutnya.</span>
            </h1>
            <p className="max-w-[62ch] text-sm leading-6 text-foreground/75 sm:text-base sm:leading-7">
              Cari lowongan dari perusahaan lokal, kirim lamaran, dan ikuti
              perkembangannya dari satu tempat.
            </p>

            <form
              action="/jobs"
              role="search"
              className="mt-2 grid w-full max-w-2xl grid-cols-1 gap-2 rounded-[1.5rem] border border-white/90 bg-white/90 p-2 shadow-[var(--elevation-card)] backdrop-blur-md sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:rounded-full"
            >
              <div className="relative min-w-0">
                <Search
                  className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary"
                  aria-hidden="true"
                />
                <Input
                  name="q"
                  aria-label="Cari posisi, perusahaan, atau kota"
                  placeholder="Posisi, perusahaan, atau kota"
                  className="h-11 min-w-0 rounded-full border-transparent bg-transparent pl-11 shadow-none focus-visible:border-transparent focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="brand-gradient h-11 w-full rounded-full px-6 text-primary-foreground sm:w-auto"
              >
                Cari lowongan
                <ArrowRight aria-hidden="true" />
              </Button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <Button variant="outline" size="lg" className="h-11 rounded-full border-white/90 bg-white/75 px-6" asChild>
                <Link href="#cara-kerja">Cara kerja</Link>
              </Button>
              {categories.slice(0, 3).map((category) => (
                <Link
                  key={category}
                  href={`/jobs?kategori=${encodeURIComponent(category)}`}
                  className="rounded-full border border-white/75 bg-white/55 px-3 py-2 text-xs font-medium text-foreground/80 transition-[background-color,border-color,color] duration-200 hover:border-white hover:bg-white/90 hover:text-primary sm:text-sm"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-12 max-w-6xl text-left sm:mt-16 lg:mt-20">
            <div className="rounded-[1.75rem] border border-white/90 bg-white/90 p-3 shadow-[var(--elevation-card)] backdrop-blur-md sm:rounded-[2rem] sm:p-5">
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3 px-1 sm:px-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">JobTrack · Lowongan</p>
                  <h2 className="mt-1 font-heading text-lg font-semibold tracking-tight sm:text-xl">
                    Peluang yang baru dibuka
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{openJobs.length} lowongan aktif</span>
                  <Button variant="ghost" size="sm" className="rounded-full text-primary" asChild>
                    <Link href="/jobs">
                      Lihat semua
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
              {previewJobs.length > 0 ? (
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1.55fr)_minmax(15rem,0.8fr)]">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {previewJobs.map((job) => (
                      <JobCard key={job.id} job={job} detailHref={`/jobs/${job.id}`} />
                    ))}
                  </div>
                  <aside className="grid content-start gap-4 rounded-2xl border border-primary/10 bg-secondary/70 p-5 sm:p-6">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Jelajahi berdasarkan minat</p>
                      <h3 className="mt-1 font-heading text-lg font-semibold tracking-tight">
                        Kategori pekerjaan
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, 5).map((category) => (
                        <Link
                          key={category}
                          href={`/jobs?kategori=${encodeURIComponent(category)}`}
                          className="rounded-full border border-white/90 bg-white/80 px-3 py-1.5 text-xs font-medium text-foreground transition-colors duration-200 hover:text-primary"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/jobs"
                      className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-foreground"
                    >
                      Jelajahi lowongan
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </aside>
                </div>
              ) : (
                <div className="grid min-h-48 content-center gap-3 rounded-2xl border border-dashed border-border bg-background/75 px-5 py-8">
                  <p className="font-heading text-lg font-semibold tracking-tight">
                    Belum ada lowongan aktif
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Lowongan yang dibuka perusahaan akan tampil di sini.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="border-y border-border/65 bg-card/55">
        <div className="mx-auto grid max-w-7xl gap-9 px-4 py-14 sm:px-6 md:grid-cols-[0.85fr_2fr] md:items-center lg:px-8 lg:py-16">
          <div className="max-w-xs">
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Dari pencarian sampai kabar terbaru.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Semua langkah penting dalam proses melamar, tersusun jelas.
            </p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3 sm:gap-5">
            <li className="grid content-start gap-3 border-l-2 border-primary/25 pl-4 sm:min-h-36">
              <span className="font-heading text-xs font-semibold tracking-[0.16em] text-primary">01</span>
              <h3 className="font-heading text-base font-semibold">Temukan peluang</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Cari berdasarkan posisi, kategori, lokasi, atau tipe kerja.
              </p>
            </li>
            <li className="grid content-start gap-3 border-l-2 border-primary/45 pl-4 sm:min-h-36">
              <span className="font-heading text-xs font-semibold tracking-[0.16em] text-primary">02</span>
              <h3 className="font-heading text-base font-semibold">Kirim lamaran</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Ajukan diri langsung dari halaman lowongan yang kamu pilih.
              </p>
            </li>
            <li className="grid content-start gap-3 border-l-2 border-primary/70 pl-4 sm:min-h-36">
              <span className="font-heading text-xs font-semibold tracking-[0.16em] text-primary">03</span>
              <h3 className="font-heading text-base font-semibold">Pantau progres</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                Lihat perubahan status lamaran di dashboard-mu.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {moreJobs.length > 0 ? (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="mb-2 text-sm font-semibold text-primary">Pilihan terbaru</p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                Lihat peluang lainnya.
              </h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/jobs">
                Semua lowongan
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {moreJobs.map((job) => (
              <JobCard key={job.id} job={job} detailHref={`/jobs/${job.id}`} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="relative isolate overflow-hidden border-t border-border/65 bg-secondary/65">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 size-[24rem] rounded-full border border-primary/10 bg-[radial-gradient(circle_at_35%_35%,color-mix(in_srgb,var(--warm-tint)_72%,white),transparent_68%)]"
        />
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8 lg:py-18">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold text-primary">Untuk perusahaan</p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Kelola lowongan dan kandidat di satu tempat.
            </h2>
            <p className="mt-3 max-w-[58ch] text-sm leading-6 text-muted-foreground sm:text-base">
              Terbitkan posisi yang tersedia, tinjau pelamar, dan perbarui status
              rekrutmen melalui dashboard Employer.
            </p>
          </div>
          <Button size="lg" className="brand-gradient h-11 w-fit rounded-full px-5 text-primary-foreground" asChild>
            <Link href="/register">
              Buat akun Employer
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
