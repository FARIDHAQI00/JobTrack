import type { EmploymentType, Job, JobFilters } from "@/domain/job";
import type { JobStatus } from "@/domain/status";
import { createClient } from "@/lib/supabase/server";
import type { JobDraft, JobRepository } from "../job-repository";

export interface CompanyEmbed {
  name: string;
}

export interface JobRow {
  id: string;
  title: string;
  description: string;
  qualifications: string | null;
  location: string;
  employment_type: string;
  category: string | null;
  salary_min: number | null;
  salary_max: number | null;
  status: JobStatus;
  created_at: string;
  companies: CompanyEmbed | CompanyEmbed[] | null;
}

export const JOB_SELECT =
  "id, title, description, qualifications, location, employment_type, category, salary_min, salary_max, status, created_at, companies ( name )";

function companyNameOf(companies: JobRow["companies"]): string {
  if (Array.isArray(companies)) {
    return companies[0]?.name ?? "Perusahaan";
  }
  return companies?.name ?? "Perusahaan";
}

export function toJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    companyName: companyNameOf(row.companies),
    description: row.description,
    qualifications: row.qualifications ?? undefined,
    location: row.location,
    employmentType: row.employment_type as EmploymentType,
    category: row.category ?? undefined,
    salaryMin: row.salary_min ?? undefined,
    salaryMax: row.salary_max ?? undefined,
    status: row.status,
    postedAt: row.created_at.slice(0, 10),
  };
}

function sanitizeSearchTerm(term: string): string {
  return term.replace(/[,()%]/g, " ").trim();
}

/**
 * Implementasi JobRepository dengan Supabase (RLS menentukan visibilitas).
 */
export class SupabaseJobRepository implements JobRepository {
  async findAll(filters: JobFilters = {}): Promise<Job[]> {
    const supabase = await createClient();
    let query = supabase
      .from("jobs")
      .select(JOB_SELECT)
      .order("created_at", { ascending: false });

    if (filters.status) {
      query = query.eq("status", filters.status);
    }
    if (filters.category) {
      query = query.eq("category", filters.category);
    }
    if (filters.location) {
      query = query.eq("location", filters.location);
    }
    if (filters.employmentType) {
      query = query.eq("employment_type", filters.employmentType);
    }
    if (filters.query) {
      const term = sanitizeSearchTerm(filters.query);
      if (term) {
        query = query.or(
          `title.ilike.%${term}%,location.ilike.%${term}%,category.ilike.%${term}%`
        );
      }
    }

    const { data, error } = await query.returns<JobRow[]>();
    if (error) {
      throw new Error(`Gagal memuat lowongan: ${error.message}`);
    }
    return (data ?? []).map(toJob);
  }

  async findById(id: string): Promise<Job | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select(JOB_SELECT)
      .eq("id", id)
      .maybeSingle<JobRow>();

    if (error) {
      throw new Error(`Gagal memuat lowongan: ${error.message}`);
    }
    return data ? toJob(data) : null;
  }

  async create(draft: JobDraft): Promise<Job> {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("NOT_AUTHENTICATED");
    }

    const { data: company } = await supabase
      .from("companies")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle<{ id: string }>();
    if (!company) {
      throw new Error("COMPANY_NOT_FOUND");
    }

    const { data, error } = await supabase
      .from("jobs")
      .insert({
        company_id: company.id,
        title: draft.title,
        description: draft.description,
        qualifications: draft.qualifications ?? null,
        category: draft.category ?? null,
        location: draft.location,
        employment_type: draft.employmentType,
        salary_min: draft.salaryMin ?? null,
        salary_max: draft.salaryMax ?? null,
        status: draft.status,
      })
      .select(JOB_SELECT)
      .single<JobRow>();

    if (error || !data) {
      throw new Error(`Gagal membuat lowongan: ${error?.message ?? ""}`);
    }
    return toJob(data);
  }

  async update(id: string, patch: Partial<JobDraft>): Promise<Job> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .update({
        ...(patch.title !== undefined ? { title: patch.title } : {}),
        ...(patch.description !== undefined
          ? { description: patch.description }
          : {}),
        ...(patch.qualifications !== undefined
          ? { qualifications: patch.qualifications }
          : {}),
        ...(patch.category !== undefined ? { category: patch.category } : {}),
        ...(patch.location !== undefined ? { location: patch.location } : {}),
        ...(patch.employmentType !== undefined
          ? { employment_type: patch.employmentType }
          : {}),
        ...(patch.salaryMin !== undefined
          ? { salary_min: patch.salaryMin }
          : {}),
        ...(patch.salaryMax !== undefined
          ? { salary_max: patch.salaryMax }
          : {}),
        ...(patch.status !== undefined ? { status: patch.status } : {}),
      })
      .eq("id", id)
      .select(JOB_SELECT)
      .single<JobRow>();

    if (error || !data) {
      throw new Error(`Gagal memperbarui lowongan: ${error?.message ?? ""}`);
    }
    return toJob(data);
  }

  async close(id: string): Promise<Job> {
    return this.update(id, { status: "CLOSED" });
  }
}
