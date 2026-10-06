import type { Company } from "@/domain/company";
import type { Job, JobInput } from "@/domain/job";
import type { CompanyRepository } from "@/repositories/company-repository";
import type { JobDraft, JobRepository } from "@/repositories/job-repository";

export type JobMutationResult =
  | { ok: true; job: Job }
  | { ok: false; error: string };

export type JobDeleteResult = { ok: true } | { ok: false; error: string };

/**
 * Service use-case pengelolaan lowongan Employer (backend.md §4).
 *
 * Menjaga business rule database.md §5: hanya pemilik company yang dapat
 * mengubah/menutup/menghapus lowongan, dan employer wajib punya company.
 */
export class JobService {
  constructor(
    private readonly jobs: JobRepository,
    private readonly companies: CompanyRepository
  ) {}

  private async requireCompany(userId: string): Promise<Company | null> {
    return this.companies.getByUserId(userId);
  }

  private async requireOwnedJob(
    userId: string,
    jobId: string
  ): Promise<Job | null> {
    const company = await this.requireCompany(userId);
    if (!company) {
      return null;
    }
    const job = await this.jobs.findById(jobId);
    if (!job || job.companyName !== company.name) {
      return null;
    }
    return job;
  }

  /**
   * Daftar lowongan milik employer.
   */
  async listJobsForEmployer(userId: string): Promise<Job[]> {
    const company = await this.requireCompany(userId);
    if (!company) {
      return [];
    }
    const all = await this.jobs.findAll();
    return all.filter((job) => job.companyName === company.name);
  }

  /**
   * Lowongan milik employer; null bila bukan miliknya.
   */
  async getOwnedJob(userId: string, jobId: string): Promise<Job | null> {
    return this.requireOwnedJob(userId, jobId);
  }

  /**
   * Membuat lowongan baru untuk company milik employer.
   */
  async createJob(userId: string, input: JobInput): Promise<JobMutationResult> {
    const company = await this.requireCompany(userId);
    if (!company) {
      return {
        ok: false,
        error: "Lengkapi profil perusahaan dulu sebelum membuat lowongan.",
      };
    }

    const draft: JobDraft = {
      title: input.title,
      description: input.description,
      qualifications: input.qualifications,
      category: input.category,
      location: input.location,
      employmentType: input.employmentType,
      salaryMin: input.salaryMin,
      salaryMax: input.salaryMax,
      companyName: company.name,
      status: "OPEN",
      postedAt: new Date().toISOString().slice(0, 10),
    };

    const job = await this.jobs.create(draft);
    return { ok: true, job };
  }

  /**
   * Memperbarui lowongan milik employer.
   */
  async updateJob(
    userId: string,
    jobId: string,
    input: JobInput
  ): Promise<JobMutationResult> {
    const owned = await this.requireOwnedJob(userId, jobId);
    if (!owned) {
      return { ok: false, error: "Lowongan tidak ditemukan." };
    }

    const job = await this.jobs.update(jobId, {
      title: input.title,
      description: input.description,
      qualifications: input.qualifications,
      category: input.category,
      location: input.location,
      employmentType: input.employmentType,
      salaryMin: input.salaryMin,
      salaryMax: input.salaryMax,
    });
    return { ok: true, job };
  }

  /**
   * Menutup lowongan (status CLOSED, tidak menerima lamaran baru).
   */
  async closeJob(userId: string, jobId: string): Promise<JobMutationResult> {
    const owned = await this.requireOwnedJob(userId, jobId);
    if (!owned) {
      return { ok: false, error: "Lowongan tidak ditemukan." };
    }
    const job = await this.jobs.close(jobId);
    return { ok: true, job };
  }

  /**
   * Menghapus lowongan beserta lamaran terkait.
   */
  async deleteJob(userId: string, jobId: string): Promise<JobDeleteResult> {
    const owned = await this.requireOwnedJob(userId, jobId);
    if (!owned) {
      return { ok: false, error: "Lowongan tidak ditemukan." };
    }
    await this.jobs.delete(jobId);
    return { ok: true };
  }
}
