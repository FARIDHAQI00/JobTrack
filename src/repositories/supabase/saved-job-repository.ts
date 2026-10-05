import type { Job } from "@/domain/job";
import { createClient } from "@/lib/supabase/server";
import type { SavedJobRepository } from "../saved-job-repository";
import { JOB_SELECT, toJob, type JobRow } from "./job-repository";

interface SavedJobRow {
  created_at: string;
  jobs: JobRow | JobRow[] | null;
}

/**
 * Implementasi SavedJobRepository dengan Supabase (RLS: hanya milik user).
 */
export class SupabaseSavedJobRepository implements SavedJobRepository {
  async listBySeeker(seekerId: string): Promise<Job[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("saved_jobs")
      .select(`created_at, jobs ( ${JOB_SELECT} )`)
      .eq("seeker_id", seekerId)
      .order("created_at", { ascending: false })
      .returns<SavedJobRow[]>();

    if (error) {
      throw new Error(`Gagal memuat lowongan tersimpan: ${error.message}`);
    }

    return (data ?? [])
      .map((row) => (Array.isArray(row.jobs) ? row.jobs[0] : row.jobs))
      .filter((row): row is JobRow => Boolean(row))
      .map(toJob);
  }

  async isSaved(seekerId: string, jobId: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase
      .from("saved_jobs")
      .select("id")
      .eq("seeker_id", seekerId)
      .eq("job_id", jobId)
      .maybeSingle<{ id: string }>();
    return Boolean(data);
  }

  async add(seekerId: string, jobId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase.from("saved_jobs").upsert(
      { seeker_id: seekerId, job_id: jobId },
      { onConflict: "job_id,seeker_id", ignoreDuplicates: true }
    );
    if (error) {
      throw new Error(`Gagal menyimpan lowongan: ${error.message}`);
    }
  }

  async remove(seekerId: string, jobId: string): Promise<void> {
    const supabase = await createClient();
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("seeker_id", seekerId)
      .eq("job_id", jobId);
    if (error) {
      throw new Error(`Gagal menghapus simpanan: ${error.message}`);
    }
  }
}
