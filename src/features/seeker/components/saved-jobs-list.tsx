"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JobCard } from "@/features/jobs/components/job-card";
import { toggleSavedJobAction } from "@/features/jobs/actions";
import type { Job } from "@/domain/job";

export interface SavedJobsListProps {
  jobs: Job[];
}

/**
 * Grid lowongan tersimpan dengan aksi hapus dari simpanan.
 */
export function SavedJobsList({ jobs }: SavedJobsListProps) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function unsave(jobId: string) {
    startTransition(async () => {
      const result = await toggleSavedJobAction(jobId);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Dihapus dari simpanan.");
      router.refresh();
    });
  }

  return (
    <div
      className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
      aria-busy={pending}
    >
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          detailHref={`/jobs/${job.id}`}
          saved
          onSave={unsave}
        />
      ))}
    </div>
  );
}
