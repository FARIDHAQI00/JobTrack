import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BriefcaseBusiness } from "lucide-react";
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Daftar</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
      {isDemoAuthMode() ? (
        <p className="max-w-sm text-center text-xs text-muted-foreground">
          Mode demo: akun baru dibuat untuk sesi ini dan disimpan pada
          penyimpanan demo. Hubungkan Supabase untuk akun sungguhan.
        </p>
      ) : null}
    </main>
  );
}
