import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton halaman detail lowongan.
 */
export default function JobDetailLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Skeleton className="mb-6 h-9 w-40 rounded-full" />
      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10">
        <div className="grid content-start gap-8">
          <div className="grid gap-4 rounded-3xl border border-border/70 bg-card/75 p-5 sm:p-8">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-11 w-3/4" />
            <Skeleton className="h-5 w-56" />
          </div>
          <div className="grid gap-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </main>
  );
}
