import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton halaman detail lowongan.
 */
export default function JobDetailLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Skeleton className="mb-6 h-4 w-40" />
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="grid content-start gap-8">
          <div className="grid gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-3/4" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="grid gap-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
        <Skeleton className="h-80" />
      </div>
    </main>
  );
}
