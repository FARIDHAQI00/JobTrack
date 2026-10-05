import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavedJobsList } from "@/features/seeker/components/saved-jobs-list";
import { getSessionUser } from "@/lib/auth/service";
import { getSavedJobRepository } from "@/repositories";

export const metadata: Metadata = { title: "Lowongan Tersimpan" };

export default async function SeekerSavedPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "JOB_SEEKER") {
    redirect("/login");
  }

  const savedJobs = await getSavedJobRepository().listBySeeker(user.id);

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid gap-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Lowongan Tersimpan
          </h1>
          <p className="text-muted-foreground">
            {savedJobs.length} lowongan kamu simpan untuk dilihat lagi.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/jobs">Cari lowongan lain</Link>
        </Button>
      </header>

      {savedJobs.length > 0 ? (
        <SavedJobsList jobs={savedJobs} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-16 text-center ring-1 ring-foreground/10">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Bookmark className="size-5" aria-hidden="true" />
          </span>
          <p className="font-medium">Belum ada lowongan tersimpan</p>
          <p className="max-w-md text-sm text-muted-foreground">
            Simpan lowongan menarik dengan tombol Simpan agar mudah ditemukan
            kembali.
          </p>
          <Button asChild>
            <Link href="/jobs">Jelajahi Lowongan</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
