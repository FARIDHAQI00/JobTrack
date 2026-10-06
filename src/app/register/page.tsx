import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegisterForm } from "@/features/auth/components/register-form";
import { dashboardPathForRole } from "@/lib/auth/access";
import { getSessionUser, isDemoAuthMode } from "@/lib/auth/service";

export const metadata: Metadata = { title: "Daftar" };

export default async function RegisterPage() {
  const user = await getSessionUser();
  if (user) {
    redirect(dashboardPathForRole(user.role));
  }

  return (
    <main className="public-canvas min-h-[100dvh]">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative isolate hidden flex-col justify-between overflow-hidden border-r border-border/65 bg-secondary/45 p-10 lg:flex xl:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-32 -z-10 size-[34rem] rounded-full border border-primary/10 bg-[radial-gradient(circle_at_60%_40%,color-mix(in_srgb,var(--warm-tint)_65%,white),transparent_68%)]"
          />
          <Link href="/" className="inline-flex w-fit items-center gap-2.5 font-heading text-lg font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--elevation-button)]">
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
            </span>
            JobTrack
          </Link>
          <div className="relative max-w-lg py-12">
            <p className="font-heading text-4xl font-semibold leading-tight tracking-tight text-balance xl:text-5xl">
              Mulai dari peluang yang tepat.
            </p>
            <p className="mt-5 max-w-[48ch] leading-7 text-muted-foreground">
              Buat akun sebagai pencari kerja atau employer, lalu kelola proses
              rekrutmen di JobTrack.
            </p>
            <div className="mt-9 grid gap-4 border-l-2 border-primary/30 pl-5">
              <p className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                Satu akun untuk memulai
              </p>
              <p className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                Pilih peran sesuai kebutuhanmu
              </p>
              <p className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                Kelola langkah karier atau rekrutmen
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Pencari kerja · Employer</p>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-lg">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight lg:hidden"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--elevation-button)]">
                <BriefcaseBusiness className="size-4" aria-hidden="true" />
              </span>
              JobTrack
            </Link>
            <div className="mb-6 grid gap-2">
              <p className="text-sm font-semibold text-primary">Bergabung dengan JobTrack</p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Buat akunmu
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Pilih peran yang sesuai untuk mulai menggunakan JobTrack.
              </p>
            </div>
            <Card className="bg-card/95">
              <CardHeader className="pb-0">
                <CardTitle className="text-base">Informasi akun</CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <RegisterForm />
              </CardContent>
            </Card>
            {isDemoAuthMode() ? (
              <p className="mt-4 rounded-xl border border-info/15 bg-info-bg/75 px-4 py-3 text-center text-xs leading-5 text-info">
                Mode demo: akun baru dibuat untuk sesi ini dan disimpan pada
                penyimpanan demo. Hubungkan Supabase untuk akun sungguhan.
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
