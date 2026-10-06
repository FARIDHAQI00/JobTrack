import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";
import { dashboardPathForRole } from "@/lib/auth/access";
import { getSessionUser, isDemoAuthMode } from "@/lib/auth/service";
import { DEMO_ACCOUNTS } from "@/lib/auth/constants";

export const metadata: Metadata = { title: "Masuk" };

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getSessionUser();
  if (user) {
    redirect(dashboardPathForRole(user.role));
  }

  const { next } = await searchParams;
  const demoMode = isDemoAuthMode();

  return (
    <main className="public-canvas min-h-[100dvh]">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative isolate hidden flex-col justify-between overflow-hidden border-r border-border/65 bg-secondary/45 p-10 lg:flex xl:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-28 top-24 -z-10 size-[32rem] rounded-full border border-primary/10 bg-[radial-gradient(circle_at_35%_35%,color-mix(in_srgb,var(--warm-tint)_62%,white),transparent_68%)]"
          />
          <Link href="/" className="inline-flex w-fit items-center gap-2.5 font-heading text-lg font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--elevation-button)]">
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
            </span>
            JobTrack
          </Link>
          <div className="relative max-w-lg py-12">
            <p className="font-heading text-4xl font-semibold leading-tight tracking-tight text-balance xl:text-5xl">
              Setiap langkah karier, lebih terarah.
            </p>
            <p className="mt-5 max-w-[48ch] leading-7 text-muted-foreground">
              Cari peluang, kirim lamaran, dan ikuti perkembangannya dalam satu
              ruang yang rapi.
            </p>
            <div className="mt-9 grid gap-3 rounded-2xl border border-white/70 bg-card/80 p-5 shadow-[var(--elevation-card)]">
              {[
                "Temukan lowongan yang sesuai",
                "Kirim lamaran langsung dari halaman posisi",
                "Pantau status lamaran dari dashboard",
              ].map((item) => (
                <p key={item} className="flex items-start gap-3 text-sm font-medium">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Peluang berikutnya dimulai dari satu pencarian.</p>
        </section>

        <section className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="w-full max-w-md">
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
              <p className="text-sm font-semibold text-primary">Selamat datang kembali</p>
              <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Masuk ke akunmu
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Lanjutkan pencarian atau pantau proses rekrutmenmu.
              </p>
            </div>
            <Card className="bg-card/95">
              <CardHeader className="pb-0">
                <CardTitle className="text-base">Masuk</CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <LoginForm next={typeof next === "string" ? next : undefined} />
              </CardContent>
            </Card>
            {demoMode ? (
              <div className="mt-4 w-full rounded-2xl border border-info/15 bg-info-bg/80 px-4 py-3 text-sm text-info">
                <p className="font-semibold">Mode demo</p>
                <p className="mt-1 text-info/90">
                  Gunakan akun demo:
                  {DEMO_ACCOUNTS.map((account) => (
                    <span key={account.email} className="mt-1 block font-mono text-xs">
                      {account.email} / {account.password}
                    </span>
                  ))}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
