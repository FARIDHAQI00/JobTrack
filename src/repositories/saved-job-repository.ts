import type { Job } from "@/domain/job";

/**
 * Kontrak akses data lowongan tersimpan.
 */
export interface SavedJobRepository {
  listBySeeker(seekerId: string): Promise<Job[]>;
  isSaved(seekerId: string, jobId: string): Promise<boolean>;
  add(seekerId: string, jobId: string): Promise<void>;
  remove(seekerId: string, jobId: string): Promise<void>;
}
