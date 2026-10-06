import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton halaman listing lowongan, mengikuti bentuk layout akhir
 * (bukan spinner generik).
 */
export default function JobsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mb-8 grid gap-6 rounded-3xl border border-border/70 bg-card/70 p-5 sm:grid-cols-[1fr_0.72fr] sm:items-end sm:p-7">
        <div className="grid gap-3">
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="h-11 w-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
        <Skeleton className="hidden h-96 lg:block" />
        <div className="grid content-start gap-4 xl:grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-52" />
          ))}
        </div>
      </div>
    </main>
  );
}
