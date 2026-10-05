import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";
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
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-background px-6 py-12">
      <Link
        href="/"
        className="flex items-center gap-2 font-heading text-lg font-semibold"
      >
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BriefcaseBusiness className="size-4" aria-hidden="true" />
        </span>
        JobTrack
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-xl">Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm next={typeof next === "string" ? next : undefined} />
        </CardContent>
      </Card>
      {demoMode ? (
        <div className="w-full max-w-sm rounded-xl bg-info-bg px-4 py-3 text-sm text-info">
          <p className="font-medium">Mode demo (Supabase belum dikonfigurasi)</p>
          <p className="mt-1 text-info/90">
            Gunakan akun demo:
            {DEMO_ACCOUNTS.map((account) => (
              <span key={account.email} className="block">
                {account.email} / {account.password}
              </span>
            ))}
          </p>
        </div>
      ) : null}
    </main>
  );
}
