import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <SearchX className="size-5" aria-hidden="true" />
      </span>
      <h1 className="font-heading text-2xl font-semibold">
        Halaman tidak ditemukan
      </h1>
      <p className="max-w-md text-muted-foreground">
        Alamat yang kamu buka tidak tersedia atau sudah dipindahkan.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button asChild>
          <Link href="/">Ke Beranda</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/jobs">Lihat Lowongan</Link>
        </Button>
      </div>
    </main>
  );
}
