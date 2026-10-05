import type { ApplicationSummary } from "@/domain/application";
import type { ApplicationRepository } from "@/repositories/application-repository";
import type { JobRepository } from "@/repositories/job-repository";

export type ApplyResult = { ok: true } | { ok: false; error: string };

/**
 * Service use-case lamaran (backend.md §4, designpattern.md §3).
 *
 * Menjaga business rule (database.md §5): lowongan harus ada dan OPEN,
 * serta satu seeker hanya dapat melamar satu kali per lowongan.
 */
export class ApplicationService {
  constructor(
    private readonly applications: ApplicationRepository,
    private readonly jobs: JobRepository
  ) {}

  /**
   * Melamar sebuah lowongan.
   *
   * @param jobId ID lowongan.
   * @param seekerId ID user pelamar.
   * @param coverLetter Surat lamaran opsional.
   * @returns Hasil sukses atau pesan error yang ramah pengguna.
   */
  async applyToJob(
    jobId: string,
    seekerId: string,
    coverLetter?: string
  ): Promise<ApplyResult> {
    const job = await this.jobs.findById(jobId);
    if (!job) {
      return { ok: false, error: "Lowongan tidak ditemukan." };
    }
    if (job.status !== "OPEN") {
      return { ok: false, error: "Lowongan sudah ditutup." };
    }

    const myApplications = await this.applications.findBySeeker(seekerId);
    if (myApplications.some((application) => application.jobId === jobId)) {
      return { ok: false, error: "Kamu sudah melamar lowongan ini." };
    }

    try {
      await this.applications.create({ jobId, seekerId, coverLetter });
    } catch (error) {
      if (error instanceof Error && error.message === "DUPLICATE_APPLICATION") {
        return { ok: false, error: "Kamu sudah melamar lowongan ini." };
      }
      return {
        ok: false,
        error: "Lamaran gagal dikirim. Coba lagi sebentar lagi.",
      };
    }

    return { ok: true };
  }

  /**
   * Daftar lamaran milik seorang pelamar.
   */
  listMyApplications(seekerId: string): Promise<ApplicationSummary[]> {
    return this.applications.findBySeeker(seekerId);
  }
}
