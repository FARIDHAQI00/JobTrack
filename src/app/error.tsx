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
      <main className="public-canvas flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl border border-destructive/15 bg-destructive/10 text-destructive">
        <AlertTriangle className="size-5" aria-hidden="true" />
      </span>
        <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        Terjadi kesalahan
      </h1>
      <p className="max-w-md text-muted-foreground">
        Ada gangguan saat memuat halaman ini. Coba muat ulang sebentar lagi.
      </p>
      <Button onClick={reset}>Coba Lagi</Button>
    </main>
  );
}
