"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="size-5" aria-hidden="true" />
      </span>
      <h1 className="font-heading text-2xl font-semibold">
        Terjadi kesalahan
      </h1>
      <p className="max-w-md text-muted-foreground">
        Ada gangguan saat memuat halaman ini. Coba muat ulang sebentar lagi.
      </p>
      <Button onClick={reset}>Coba Lagi</Button>
    </main>
  );
}
