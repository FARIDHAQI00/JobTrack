import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompanyProfileForm } from "@/features/employer/components/company-profile-form";
import { getSessionUser } from "@/lib/auth/service";
import { getCompanyRepository } from "@/repositories";

export const metadata: Metadata = { title: "Profil Perusahaan" };

export default async function EmployerProfilePage() {
  const user = await getSessionUser();
  if (!user || user.role !== "EMPLOYER") {
    redirect("/login");
  }

  const company = await getCompanyRepository().getByUserId(user.id);

  return (
    <div className="grid gap-6">
      <header className="grid gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Profil Perusahaan
        </h1>
        <p className="text-muted-foreground">
          Profil ini tampil pada halaman detail setiap lowonganmu.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Data Perusahaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 grid gap-1 rounded-xl bg-muted/60 px-4 py-3">
              <span className="text-sm text-muted-foreground">
                Email akun
              </span>
              <span className="font-medium">{user.email}</span>
            </div>
            <CompanyProfileForm defaultCompany={company} />
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Tips</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>
              Deskripsi yang jelas membantu kandidat memahami perusahaanmu
              sebelum melamar.
            </p>
            <p>
              Satu akun employer mewakili satu perusahaan, sesuai desain data
              JobTrack.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
