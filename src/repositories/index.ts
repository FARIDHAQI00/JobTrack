import type { JobRepository } from "./job-repository";
import { MockJobRepository } from "./mock/mock-job-repository";

/**
 * Memilih implementasi JobRepository yang aktif.
 *
 * Sprint 1: selalu mock (backend belum aktif).
 * Sprint 3+: kembalikan SupabaseJobRepository saat environment tersedia,
 * tanpa mengubah UI (architecture.md §8).
 */
export function getJobRepository(): JobRepository {
  return new MockJobRepository();
}
