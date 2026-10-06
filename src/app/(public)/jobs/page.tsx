import type { Metadata } from "next";
import Link from "next/link";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JobCard } from "@/features/jobs/components/job-card";
import { JobFilterPanel } from "@/features/jobs/components/job-filter-panel";
import { JobSearchInput } from "@/features/jobs/components/job-search-input";
import { EMPLOYMENT_TYPES, type EmploymentType } from "@/domain/job";
import { filterJobs, uniqueValues } from "@/lib/job-filters";
import { getJobRepository } from "@/repositories";

export const metadata: Metadata = {
  title: "Lowongan",
  description:
    "Jelajahi lowongan kerja dari perusahaan lokal dan temukan yang paling cocok untukmu.",
};

const PAGE_SIZE = 9;

interface JobsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const getParam = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : undefined;

  const query = getParam("q");
  const category = getParam("kategori");
  const location = getParam("lokasi");
  const typeParam = getParam("tipe");
  const employmentType: EmploymentType | undefined = EMPLOYMENT_TYPES.find(
    (type) => type === typeParam
  );
  const requestedPage = Math.max(1, Number(getParam("halaman") ?? 1) || 1);

  const repository = getJobRepository();
  const allJobs = await repository.findAll();
  const openJobs = allJobs.filter((job) => job.status === "OPEN");
  const filteredJobs = filterJobs(openJobs, {
    query,
    category,
    location,
    employmentType,
  });

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageJobs = filteredJobs.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const categories = uniqueValues(openJobs, "category");
  const locations = uniqueValues(openJobs, "location");
  const activeFilterCount = [category, location, employmentType].filter(
    Boolean
  ).length;

  function buildPageHref(page: number) {
    const nextParams = new URLSearchParams();
    if (query) nextParams.set("q", query);
    if (category) nextParams.set("kategori", category);
    if (location) nextParams.set("lokasi", location);
    if (employmentType) nextParams.set("tipe", employmentType);
    if (page > 1) nextParams.set("halaman", String(page));
    const queryString = nextParams.toString();
    return queryString ? `/jobs?${queryString}` : "/jobs";
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 grid gap-6 rounded-3xl border border-border/70 bg-card/75 p-5 shadow-[var(--elevation-card)] sm:p-7 lg:grid-cols-[1fr_minmax(18rem,0.72fr)] lg:items-end lg:gap-10 lg:p-9">
        <div className="grid gap-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Cari lowongan
          </h1>
          <p className="max-w-[58ch] text-sm leading-6 text-muted-foreground sm:text-base">
            {filteredJobs.length} lowongan ditemukan
            {query ? ` untuk “${query}”` : ""}. Gunakan filter untuk mempersempit pilihan.
          </p>
        </div>
        <div className="w-full">
          <JobSearchInput defaultValue={query} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
        <aside className="hidden lg:block">
          <Card className="sticky top-24 bg-card/90">
            <CardHeader>
              <CardTitle className="text-lg">Filter lowongan</CardTitle>
            </CardHeader>
            <CardContent>
              <JobFilterPanel categories={categories} locations={locations} />
            </CardContent>
          </Card>
        </aside>

        <div className="grid content-start gap-6">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11">
                  <SlidersHorizontal aria-hidden="true" />
                  Filter
                  {activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter lowongan</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-6">
                  <JobFilterPanel
                    categories={categories}
                    locations={locations}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {pageJobs.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {pageJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  detailHref={`/jobs/${job.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card/80 px-6 py-16 text-center shadow-[var(--elevation-card)]">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <SearchX className="size-5" aria-hidden="true" />
              </span>
              <p className="font-medium">Tidak ada lowongan yang cocok</p>
              <p className="max-w-md text-sm text-muted-foreground">
                Coba kata kunci lain atau reset filter untuk melihat semua
                lowongan yang tersedia.
              </p>
              <Button variant="outline" asChild>
                <Link href="/jobs">Reset pencarian</Link>
              </Button>
            </div>
          )}

          {totalPages > 1 ? (
            <nav
              aria-label="Navigasi halaman"
              className="flex items-center justify-center gap-2"
            >
              {currentPage > 1 ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href={buildPageHref(currentPage - 1)}>Sebelumnya</Link>
                </Button>
              ) : null}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? "default" : "outline"}
                    size="sm"
                    aria-current={page === currentPage ? "page" : undefined}
                    asChild
                  >
                    <Link href={buildPageHref(page)}>{page}</Link>
                  </Button>
                )
              )}
              {currentPage < totalPages ? (
                <Button variant="outline" size="sm" asChild>
                  <Link href={buildPageHref(currentPage + 1)}>
                    Berikutnya
                  </Link>
                </Button>
              ) : null}
            </nav>
          ) : null}
        </div>
      </div>
    </main>
  );
}
