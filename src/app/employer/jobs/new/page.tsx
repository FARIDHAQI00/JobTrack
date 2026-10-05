import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobForm } from "@/features/employer/components/job-form";
import { getSessionUser } from "@/lib/auth/service";
import { getCompanyRepository } from "@/repositories";

export const metadata: Metadata = { title: "Buat Lowongan" };

export default async function EmployerNewJobPage() {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const company = await getCompanyRepository().getByUserId(user.id);

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <Link
          href="/employer/jobs"
          className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke lowongan saya
        </Link>
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Buat Lowongan
        </h1>
      </div>

      {!company ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-warning-bg px-4 py-3 text-sm text-warning">
          <span>
            Profil perusahaan belum ada. Isi dulu sebelum menerbitkan lowongan.
          </span>
          <Link
            href="/employer/profile"
            className="font-medium underline underline-offset-4"
          >
            Ke Profil Perusahaan
          </Link>
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Detail Lowongan</CardTitle>
        </CardHeader>
        <CardContent>
          <JobForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
