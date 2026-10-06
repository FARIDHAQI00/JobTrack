import { isSupabaseConfigured } from "@/lib/supabase/config";
import { ApplicationService } from "@/services/application-service";
import { JobService } from "@/services/job-service";
import type { ApplicationRepository } from "./application-repository";
import type { CompanyRepository } from "./company-repository";
import type { JobRepository } from "./job-repository";
import type { SavedJobRepository } from "./saved-job-repository";
import type { SeekerProfileRepository } from "./seeker-profile-repository";
import { MockApplicationRepository } from "./mock/mock-application-repository";
import { MockCompanyRepository } from "./mock/mock-company-repository";
import { MockJobRepository } from "./mock/mock-job-repository";
import { MockSavedJobRepository } from "./mock/mock-saved-job-repository";
import { MockSeekerProfileRepository } from "./mock/mock-seeker-profile-repository";
import { SupabaseApplicationRepository } from "./supabase/application-repository";
import { SupabaseCompanyRepository } from "./supabase/company-repository";
import { SupabaseJobRepository } from "./supabase/job-repository";
import { SupabaseSavedJobRepository } from "./supabase/saved-job-repository";
import { SupabaseSeekerProfileRepository } from "./supabase/seeker-profile-repository";

/**
 * Factory repository (architecture.md §8).
 *
 * Supabase aktif bila environment tersedia; selain itu memakai mock
 * sehingga UI tetap berjalan tanpa backend.
 */
export function getJobRepository(): JobRepository {
  return isSupabaseConfigured()
    ? new SupabaseJobRepository()
    : new MockJobRepository();
}

export function getApplicationRepository(): ApplicationRepository {
  return isSupabaseConfigured()
    ? new SupabaseApplicationRepository()
    : new MockApplicationRepository();
}

export function getSavedJobRepository(): SavedJobRepository {
  return isSupabaseConfigured()
    ? new SupabaseSavedJobRepository()
    : new MockSavedJobRepository();
}

export function getSeekerProfileRepository(): SeekerProfileRepository {
  return isSupabaseConfigured()
    ? new SupabaseSeekerProfileRepository()
    : new MockSeekerProfileRepository();
}

export function getCompanyRepository(): CompanyRepository {
  return isSupabaseConfigured()
    ? new SupabaseCompanyRepository()
    : new MockCompanyRepository();
}

export function getApplicationService(): ApplicationService {
  return new ApplicationService(
    getApplicationRepository(),
    getJobRepository(),
    getCompanyRepository()
  );
}

export function getJobService(): JobService {
  return new JobService(getJobRepository(), getCompanyRepository());
}
