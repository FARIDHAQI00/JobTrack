import type { Applicant, ApplicationSummary } from "@/domain/application";
import {
  canTransitionStatus,
  type ApplicationStatus,
} from "@/domain/status";
import type { ApplicationRepository } from "@/repositories/application-repository";
import type { CompanyRepository } from "@/repositories/company-repository";
import type { JobRepository } from "@/repositories/job-repository";

export type ApplyResult = { ok: true } | { ok: false; error: string };
export type UpdateStatusResult = { ok: true } | { ok: false; error: string };
export type ApplicantListResult =
  | { ok: true; applicants: Applicant[] }
  | { ok: false; error: string };

/**
 * Service use-case lamaran (backend.md §4, designpattern.md §3).
 *
 * Menjaga business rule (database.md §5): lowongan harus ada dan OPEN,
 * satu seeker hanya dapat melamar sekali per lowongan, hanya pemilik
 * lowongan yang dapat mengubah status kandidat, dan transisi status
 * mengikuti state transition yang sah.
 */
export class ApplicationService {
  constructor(
    private readonly applications: ApplicationRepository,
    private readonly jobs: JobRepository,
    private readonly companies: CompanyRepository
  ) {}

  private async isJobOwnedBy(
    userId: string,
    jobId: string
  ): Promise<boolean> {
    const company = await this.companies.getByUserId(userId);
    if (!company) {
      return false;
    }
    const job = await this.jobs.findById(jobId);
    return Boolean(job && job.companyName === company.name);
  }

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

  /**
   * Daftar kandidat pada sebuah lowongan (khusus pemilik lowongan).
   */
  async listApplicantsForJob(
    userId: string,
    jobId: string
  ): Promise<ApplicantListResult> {
    if (!(await this.isJobOwnedBy(userId, jobId))) {
      return { ok: false, error: "Lowongan tidak ditemukan." };
    }
    const applicants = await this.applications.findByJob(jobId);
    return { ok: true, applicants };
  }

  /**
   * Mengubah status kandidat (khusus pemilik lowongan).
   *
   * Transisi divalidasi dengan `canTransitionStatus` (domain/status).
   */
  async updateStatusForEmployer(
    userId: string,
    applicationId: string,
    nextStatus: ApplicationStatus
  ): Promise<UpdateStatusResult> {
    const application = await this.applications.findById(applicationId);
    if (!application) {
      return { ok: false, error: "Lamaran tidak ditemukan." };
    }

    if (!(await this.isJobOwnedBy(userId, application.jobId))) {
      return { ok: false, error: "Lamaran tidak ditemukan." };
    }

    if (!canTransitionStatus(application.status, nextStatus)) {
      return {
        ok: false,
        error: "Perubahan status tersebut tidak diperbolehkan.",
      };
    }

    await this.applications.updateStatus(applicationId, nextStatus);
    return { ok: true };
  }
}
