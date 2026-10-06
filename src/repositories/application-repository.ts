import type { Applicant, ApplicationSummary } from "@/domain/application";
import type { ApplicationStatus } from "@/domain/status";

export interface NewApplicationInput {
  jobId: string;
  seekerId: string;
  coverLetter?: string;
}

/**
 * Kontrak akses data lamaran (backend.md §5).
 */
export interface ApplicationRepository {
  findBySeeker(seekerId: string): Promise<ApplicationSummary[]>;
  findByJob(jobId: string): Promise<Applicant[]>;
  create(input: NewApplicationInput): Promise<ApplicationSummary>;
  updateStatus(
    applicationId: string,
    status: ApplicationStatus
  ): Promise<void>;
}
