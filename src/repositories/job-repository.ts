import type { Job, JobFilters } from "@/domain/job";

export type JobDraft = Omit<Job, "id">;

/**
 * Kontrak akses data lowongan (backend.md §5).
 *
 * Implementasi:
 * - MockJobRepository (Sprint 1, tanpa backend)
 * - SupabaseJobRepository (Sprint 3, supabase-js + RLS)
 */
export interface JobRepository {
  findAll(filters?: JobFilters): Promise<Job[]>;
  findById(id: string): Promise<Job | null>;
  create(draft: JobDraft): Promise<Job>;
  update(id: string, patch: Partial<JobDraft>): Promise<Job>;
  close(id: string): Promise<Job>;
}
