import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading skeleton halaman listing lowongan, mengikuti bentuk layout akhir
 * (bukan spinner generik).
 */
export default function JobsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 grid gap-4">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-11 max-w-xl" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <Skeleton className="hidden h-80 lg:block" />
        <div className="grid content-start gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => (
            <Skeleton key={index} className="h-44" />
          ))}
        </div>
      </div>
    </main>
  );
}
