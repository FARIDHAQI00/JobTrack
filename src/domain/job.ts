import type { JobStatus } from "./status";

export const EMPLOYMENT_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Kontrak",
  INTERNSHIP: "Internship",
};

export interface Job {
  id: string;
  title: string;
  companyName: string;
  description: string;
  qualifications?: string;
  location: string;
  employmentType: EmploymentType;
  category?: string;
  salaryMin?: number;
  salaryMax?: number;
  status: JobStatus;
  postedAt?: string;
}

export interface JobFilters {
  query?: string;
  category?: string;
  location?: string;
  employmentType?: EmploymentType;
  status?: JobStatus;
}

/**
 * Input form lowongan dari Employer (dipakai service dan server action).
 */
export interface JobInput {
  title: string;
  description: string;
  qualifications?: string;
  category: string;
  location: string;
  employmentType: EmploymentType;
  salaryMin?: number;
  salaryMax?: number;
}

export const JOB_CATEGORIES = [
  "Teknologi",
  "Desain",
  "Data",
  "Marketing",
  "SDM",
  "Keuangan",
  "Operasional",
] as const;
