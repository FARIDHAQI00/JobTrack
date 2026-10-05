import type { Job, JobFilters } from "@/domain/job";
import { filterJobs } from "@/lib/job-filters";
import type { JobDraft, JobRepository } from "../job-repository";
import { MOCK_JOBS } from "./job-data";

/**
 * Implementasi JobRepository dengan data in-memory.
 *
 * Dipakai selama backend belum aktif (Sprint 1) supaya UI tidak menunggu
 * Supabase. Data disalin saat inisialisasi agar perubahan tidak bocor
 * antar request pada dev server.
 */
export class MockJobRepository implements JobRepository {
  private jobs: Job[];

  constructor(seed: Job[] = MOCK_JOBS) {
    this.jobs = seed.map((job) => ({ ...job }));
  }

  async findAll(filters: JobFilters = {}): Promise<Job[]> {
    const filtered = filterJobs(this.jobs, filters);
    return filtered.sort((a, b) =>
      (b.postedAt ?? "").localeCompare(a.postedAt ?? "")
    );
  }

  async findById(id: string): Promise<Job | null> {
    return this.jobs.find((job) => job.id === id) ?? null;
  }

  async create(draft: JobDraft): Promise<Job> {
    const job: Job = { ...draft, id: `job-${this.jobs.length + 1}` };
    this.jobs.push(job);
    return job;
  }

  async update(id: string, patch: Partial<JobDraft>): Promise<Job> {
    const index = this.jobs.findIndex((job) => job.id === id);
    if (index === -1) {
      throw new Error(`Lowongan tidak ditemukan: ${id}`);
    }
    const updated = { ...this.jobs[index], ...patch };
    this.jobs[index] = updated;
    return updated;
  }

  async close(id: string): Promise<Job> {
    return this.update(id, { status: "CLOSED" });
  }
}
