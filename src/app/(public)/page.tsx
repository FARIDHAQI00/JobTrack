import Link from "next/link";
import { Search } from "lucide-react";
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
  const categories = uniqueValues(openJobs, "category");

  return (
    <main>
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center md:py-24">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Temukan pekerjaan yang tepat untukmu
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Cari lowongan dari perusahaan lokal, lamar dengan mudah, dan pantau
          status lamaranmu di satu tempat.
        </p>
        <form
          action="/jobs"
          role="search"
          className="flex w-full max-w-xl flex-col gap-2 sm:flex-row"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              name="q"
              aria-label="Cari posisi, perusahaan, atau kota"
              placeholder="Cari posisi, perusahaan, atau kota"
              className="h-11 bg-card pl-9"
            />
          </div>
          <Button type="submit" size="lg" className="h-11 px-6">
            Cari
          </Button>
        </form>
        {categories.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Populer:</span>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category}
                href={`/jobs?kategori=${encodeURIComponent(category)}`}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {category}
              </Link>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-semibold">
            Lowongan terbaru
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/jobs">Lihat semua</Link>
          </Button>
        </div>
        {latestJobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {latestJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                detailHref={`/jobs/${job.id}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            Belum ada lowongan yang dibuka.
          </p>
        )}
      </section>

      <section className="border-t bg-card">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid gap-1">
            <h2 className="font-heading text-2xl font-semibold">
              Membuka lowongan?
            </h2>
            <p className="text-muted-foreground">
              Pasang lowongan dan kelola kandidat dari satu dashboard.
            </p>
          </div>
          <Button size="lg" className="h-11 px-6" asChild>
            <Link href="/register">Buat Lowongan</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
