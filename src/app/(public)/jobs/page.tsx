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
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 grid gap-4">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Lowongan
          </h1>
          <p className="text-muted-foreground">
            {filteredJobs.length} lowongan ditemukan
            {query ? ` untuk "${query}"` : ""}
          </p>
        </div>
        <div className="max-w-xl">
          <JobSearchInput defaultValue={query} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Filter</CardTitle>
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
            <div className="grid gap-4 sm:grid-cols-2">
              {pageJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  detailHref={`/jobs/${job.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-16 text-center ring-1 ring-foreground/10">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
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
