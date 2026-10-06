import type { Job, JobFilters } from "@/domain/job";

/**
 * Menyaring daftar lowongan berdasarkan filter pencarian.
 *
 * Logika murni tanpa I/O agar mudah diuji dan dipakai ulang.
 * MockJobRepository memakai fungsi ini; SupabaseJobRepository nantinya
 * menerapkan filter yang sama di query SQL.
 *
 * @param jobs Daftar lowongan sumber.
 * @param filters Filter pencarian (query, kategori, lokasi, tipe, status).
 * @returns Lowongan yang memenuhi semua filter.
 */
export function filterJobs(jobs: Job[], filters: JobFilters = {}): Job[] {
  const query = filters.query?.trim().toLowerCase();

  return jobs.filter((job) => {
    if (filters.status && job.status !== filters.status) {
      return false;
    }
    if (filters.category && job.category !== filters.category) {
      return false;
    }
    if (filters.location && job.location !== filters.location) {
      return false;
    }
    if (
      filters.employmentType &&
      job.employmentType !== filters.employmentType
    ) {
      return false;
    }
    if (query) {
      const haystack = [
        job.title,
        job.companyName,
        job.location,
        job.category ?? "",
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Mengambil nilai unik dari daftar lowongan untuk kebutuhan facet filter.
 *
 * @param jobs Daftar lowongan sumber.
 * @param key Field yang diambil (category atau location).
 * @returns Nilai unik terurut alfabetis.
 */
export function uniqueValues(
  jobs: Job[],
  key: "category" | "location"
): string[] {
  const values = new Set<string>();
  jobs.forEach((job) => {
    const value = job[key];
    if (value) {
      values.add(value);
    }
  });
  return Array.from(values).sort((a, b) => a.localeCompare(b, "id"));
}
