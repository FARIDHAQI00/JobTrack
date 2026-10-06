import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProfileForm } from "@/features/seeker/components/profile-form";
import { seekerProfileCompleteness } from "@/domain/seeker-profile";
import { getSessionUser } from "@/lib/auth/service";
import { getSeekerProfileRepository } from "@/repositories";

export const metadata: Metadata = { title: "Profil Saya" };

export default async function SeekerProfilePage() {
  const user = await getSessionUser();
  if (!user || user.role !== "JOB_SEEKER") {
    redirect("/login");
  }

  const profile = await getSeekerProfileRepository().getByUserId(user.id);
  const completeness = seekerProfileCompleteness(profile);

  return (
    <div className="grid gap-7">
      <header className="grid gap-2">
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Profil Saya
        </h1>
        <p className="max-w-[60ch] leading-6 text-muted-foreground">
          Profil yang lengkap membantu employer mengenalimu lebih cepat.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Data Pelamar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 grid gap-1 rounded-xl bg-muted/60 px-4 py-3">
              <span className="text-xs font-medium text-muted-foreground">
                Email akun
              </span>
              <span className="font-medium">{user.email}</span>
            </div>
            <ProfileForm defaultProfile={profile} />
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Kelengkapan Profil</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            <span className="font-heading text-3xl font-semibold tabular-nums">
              {completeness}%
            </span>
            <Progress
              value={completeness}
              aria-label={`Kelengkapan profil ${completeness}%`}
            />
            <p className="text-sm text-muted-foreground">
              Isi nama, headline, bio, lokasi, dan telepon agar profilmu tampil
              utuh di mata employer.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
