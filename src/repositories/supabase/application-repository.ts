import type { Applicant, ApplicationSummary } from "@/domain/application";
import type { ApplicationStatus } from "@/domain/status";
import { createClient } from "@/lib/supabase/server";
import type {
  ApplicationRepository,
  NewApplicationInput,
} from "../application-repository";

interface JobEmbed {
  title: string;
  companies: { name: string } | { name: string }[] | null;
}

interface ApplicationRow {
  id: string;
  job_id: string;
  status: ApplicationStatus;
  applied_at: string;
  updated_at: string;
  jobs: JobEmbed | JobEmbed[] | null;
}

interface ProfileEmbed {
  email: string;
  seeker_profiles: { full_name: string } | { full_name: string }[] | null;
}

interface ApplicantRow {
  id: string;
  status: ApplicationStatus;
  applied_at: string;
  cover_letter: string | null;
  profiles: ProfileEmbed | ProfileEmbed[] | null;
}

function firstOf<T>(value: T | T[] | null): T | null {
  if (Array.isArray(value)) {
    return value[0] ?? null;
  }
  return value ?? null;
}

const APPLICATION_SELECT =
  "id, job_id, status, applied_at, updated_at, jobs ( title, companies ( name ) )";

function toSummary(row: ApplicationRow): ApplicationSummary {
  const job = firstOf(row.jobs);
  const company = firstOf(job?.companies ?? null);
  return {
    id: row.id,
    jobId: row.job_id,
    jobTitle: job?.title ?? "Lowongan",
    companyName: company?.name ?? "Perusahaan",
    status: row.status,
    appliedAt: row.applied_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Implementasi ApplicationRepository dengan Supabase (RLS menentukan akses).
 */
export class SupabaseApplicationRepository implements ApplicationRepository {
  async findBySeeker(seekerId: string): Promise<ApplicationSummary[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("applications")
      .select(APPLICATION_SELECT)
      .eq("seeker_id", seekerId)
      .order("applied_at", { ascending: false })
      .returns<ApplicationRow[]>();

    if (error) {
      throw new Error(`Gagal memuat lamaran: ${error.message}`);
    }
    return (data ?? []).map(toSummary);
  }

  async findByJob(jobId: string): Promise<Applicant[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("applications")
      .select(
        "id, status, applied_at, cover_letter, profiles ( email, seeker_profiles ( full_name ) )"
      )
      .eq("job_id", jobId)
      .order("applied_at", { ascending: false })
      .returns<ApplicantRow[]>();

    if (error) {
      throw new Error(`Gagal memuat kandidat: ${error.message}`);
    }

    return (data ?? []).map((row) => {
      const profile = firstOf(row.profiles);
      const seekerProfile = firstOf(profile?.seeker_profiles ?? null);
      return {
        id: row.id,
        name: seekerProfile?.full_name ?? "Pelamar",
        email: profile?.email,
        status: row.status,
        appliedAt: row.applied_at,
        coverLetter: row.cover_letter ?? undefined,
      };
    });
  }

  async findById(
    applicationId: string
  ): Promise<ApplicationSummary | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("applications")
      .select(APPLICATION_SELECT)
      .eq("id", applicationId)
      .maybeSingle<ApplicationRow>();

    if (error) {
      throw new Error(`Gagal memuat lamaran: ${error.message}`);
    }
    return data ? toSummary(data) : null;
  }

  async create(input: NewApplicationInput): Promise<ApplicationSummary> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("applications")
      .insert({
        job_id: input.jobId,
        seeker_id: input.seekerId,
        cover_letter: input.coverLetter ?? null,
      })
      .select(APPLICATION_SELECT)
      .single<ApplicationRow>();

    if (error) {
      if (error.code === "23505") {
        throw new Error("DUPLICATE_APPLICATION");
      }
      throw new Error(`Gagal mengirim lamaran: ${error.message}`);
    }
    if (!data) {
      throw new Error("Gagal mengirim lamaran.");
    }
    return toSummary(data);
  }

  async updateStatus(
    applicationId: string,
    status: ApplicationStatus
  ): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", applicationId);

    if (error) {
      throw new Error(`Gagal memperbarui status: ${error.message}`);
    }
  }
}
