"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { normalizeWebsite } from "@/domain/company";
import {
  EMPLOYMENT_TYPES,
  type EmploymentType,
  type JobInput,
} from "@/domain/job";
import {
  APPLICATION_STATUSES,
  type ApplicationStatus,
} from "@/domain/status";
import { getSessionUser } from "@/lib/auth/service";
import {
  getApplicationService,
  getCompanyRepository,
  getJobService,
} from "@/repositories";

export interface JobFormState {
  error?: string;
}

export interface EmployerActionResult {
  success?: boolean;
  error?: string;
}

export interface CompanyProfileState {
  error?: string;
  success?: boolean;
}

function parseJobForm(
  formData: FormData
): { input: JobInput } | { error: string } {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const qualifications =
    String(formData.get("qualifications") ?? "").trim() || undefined;
  const category = String(formData.get("category") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const employmentType = EMPLOYMENT_TYPES.find(
    (type) => type === formData.get("employmentType")
  ) as EmploymentType | undefined;

  const salaryMinRaw = String(formData.get("salaryMin") ?? "").trim();
  const salaryMaxRaw = String(formData.get("salaryMax") ?? "").trim();
  const salaryMin = salaryMinRaw ? Number(salaryMinRaw) : undefined;
  const salaryMax = salaryMaxRaw ? Number(salaryMaxRaw) : undefined;

  if (title.length < 3) {
    return { error: "Judul lowongan wajib diisi minimal 3 karakter." };
  }
  if (description.length < 10) {
    return { error: "Deskripsi wajib diisi minimal 10 karakter." };
  }
  if (!category) {
    return { error: "Pilih kategori lowongan." };
  }
  if (!location) {
    return { error: "Lokasi wajib diisi." };
  }
  if (!employmentType) {
    return { error: "Pilih tipe pekerjaan." };
  }
  if (
    (salaryMin !== undefined && (Number.isNaN(salaryMin) || salaryMin < 0)) ||
    (salaryMax !== undefined && (Number.isNaN(salaryMax) || salaryMax < 0))
  ) {
    return { error: "Gaji harus berupa angka positif." };
  }
  if (
    salaryMin !== undefined &&
    salaryMax !== undefined &&
    salaryMin > salaryMax
  ) {
    return { error: "Gaji minimum tidak boleh lebih besar dari gaji maksimum." };
  }

  return {
    input: {
      title,
      description,
      qualifications,
      category,
      location,
      employmentType,
      salaryMin,
      salaryMax,
    },
  };
}

async function requireEmployer() {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") {
    return null;
  }
  return user;
}

function revalidateEmployerPaths(jobId?: string) {
  revalidatePath("/employer/dashboard");
  revalidatePath("/employer/jobs");
  revalidatePath("/jobs");
  revalidatePath("/");
  if (jobId) {
    revalidatePath(`/employer/jobs/${jobId}`);
    revalidatePath(`/employer/jobs/${jobId}/applicants`);
    revalidatePath(`/jobs/${jobId}`);
  }
}

/**
 * Server action membuat lowongan baru.
 */
export async function createJobAction(
  _previous: JobFormState,
  formData: FormData
): Promise<JobFormState> {
  const user = await requireEmployer();
  if (!user) {
    return { error: "Masuk sebagai Employer untuk membuat lowongan." };
  }

  const parsed = parseJobForm(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const result = await getJobService().createJob(user.id, parsed.input);
  if (!result.ok) {
    return { error: result.error };
  }

  revalidateEmployerPaths(result.job.id);
  redirect("/employer/jobs");
}

/**
 * Server action memperbarui lowongan milik employer.
 */
export async function updateJobAction(
  _previous: JobFormState,
  formData: FormData
): Promise<JobFormState> {
  const user = await requireEmployer();
  if (!user) {
    return { error: "Masuk sebagai Employer untuk mengubah lowongan." };
  }

  const jobId = String(formData.get("jobId") ?? "");
  if (!jobId) {
    return { error: "Lowongan tidak ditemukan." };
  }

  const parsed = parseJobForm(formData);
  if ("error" in parsed) {
    return { error: parsed.error };
  }

  const result = await getJobService().updateJob(user.id, jobId, parsed.input);
  if (!result.ok) {
    return { error: result.error };
  }

  revalidateEmployerPaths(jobId);
  redirect("/employer/jobs");
}

/**
 * Server action menutup lowongan (status CLOSED).
 */
export async function closeJobAction(
  jobId: string
): Promise<EmployerActionResult> {
  const user = await requireEmployer();
  if (!user) {
    return { error: "Masuk sebagai Employer untuk menutup lowongan." };
  }

  const result = await getJobService().closeJob(user.id, jobId);
  if (!result.ok) {
    return { error: result.error };
  }

  revalidateEmployerPaths(jobId);
  return { success: true };
}

/**
 * Server action menghapus lowongan.
 */
export async function deleteJobAction(
  jobId: string
): Promise<EmployerActionResult> {
  const user = await requireEmployer();
  if (!user) {
    return { error: "Masuk sebagai Employer untuk menghapus lowongan." };
  }

  const result = await getJobService().deleteJob(user.id, jobId);
  if (!result.ok) {
    return { error: result.error };
  }

  revalidateEmployerPaths(jobId);
  return { success: true };
}

/**
 * Server action mengubah status kandidat dengan validasi transisi.
 */
export async function updateApplicantStatusAction(
  applicationId: string,
  nextStatus: string
): Promise<EmployerActionResult> {
  const user = await requireEmployer();
  if (!user) {
    return { error: "Masuk sebagai Employer untuk mengubah status." };
  }

  const status = APPLICATION_STATUSES.find(
    (candidate) => candidate === nextStatus
  ) as ApplicationStatus | undefined;
  if (!status) {
    return { error: "Status tidak dikenal." };
  }

  const result = await getApplicationService().updateStatusForEmployer(
    user.id,
    applicationId,
    status
  );
  if (!result.ok) {
    return { error: result.error };
  }

  revalidatePath("/employer/dashboard");
  revalidatePath("/seeker/dashboard");
  revalidatePath("/seeker/applications");
  return { success: true };
}

/**
 * Server action menyimpan profil perusahaan.
 */
export async function updateCompanyProfileAction(
  _previous: CompanyProfileState,
  formData: FormData
): Promise<CompanyProfileState> {
  const user = await requireEmployer();
  if (!user) {
    return { error: "Masuk sebagai Employer untuk mengubah profil." };
  }

  const name = String(formData.get("name") ?? "").trim();
  if (name.length < 2) {
    return { error: "Nama perusahaan wajib diisi minimal 2 karakter." };
  }

  try {
    await getCompanyRepository().upsert(user.id, {
      name,
      description:
        String(formData.get("description") ?? "").trim() || undefined,
      location: String(formData.get("location") ?? "").trim() || undefined,
      website: normalizeWebsite(String(formData.get("website") ?? "")),
    });
  } catch {
    return { error: "Gagal menyimpan profil perusahaan. Coba lagi." };
  }

  revalidatePath("/employer/profile");
  revalidatePath("/employer/dashboard");
  revalidatePath("/jobs");
  return { success: true };
}
