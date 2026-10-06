import Link from "next/link";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface PagePlaceholderProps {
  title: string;
  description: string;
  sprint?: string;
}

/**
 * Halaman placeholder untuk route yang diimplementasikan pada sprint lanjutan.
 *
 * Menjaga navigasi tetap valid selama Sprint 1 tanpa mengklaim fitur selesai.
 */
export function PagePlaceholder({
  title,
  description,
  sprint,
}: PagePlaceholderProps) {
  return (
    <main className="mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl border border-border/70 bg-secondary text-secondary-foreground">
        <Construction className="size-5" aria-hidden="true" />
      </span>
      <h1 className="font-heading text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      {sprint ? (
        <p className="text-xs text-muted-foreground">Dijadwalkan: {sprint}</p>
      ) : null}
      <Button variant="outline" asChild>
        <Link href="/jobs">Lihat lowongan</Link>
      </Button>
    </main>
  );
}
