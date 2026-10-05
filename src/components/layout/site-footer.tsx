import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

/**
 * Footer publik ringkas: brand dan tautan utama.
 */
export function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
          </span>
          <span className="font-heading text-sm font-semibold">JobTrack</span>
        </div>
        <nav aria-label="Navigasi footer">
          <ul className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <li>
              <Link href="/jobs" className="hover:text-foreground">
                Lowongan
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-foreground">
                Masuk
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-foreground">
                Daftar
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-xs text-muted-foreground">
          JobTrack - project pembelajaran, data demo.
        </p>
      </div>
    </footer>
  );
}
