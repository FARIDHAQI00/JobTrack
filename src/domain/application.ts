import type { ApplicationStatus } from "./status";

export interface ApplicationSummary {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt?: string;
}

export interface Applicant {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  status: ApplicationStatus;
  appliedAt: string;
  coverLetter?: string;
}

export interface PipelineStage {
  status: ApplicationStatus;
  count: number;
}
