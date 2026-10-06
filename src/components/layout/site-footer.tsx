import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

/**
 * Footer publik ringkas: brand dan tautan utama.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-card/65">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight">JobTrack</span>
        </div>
        <nav aria-label="Navigasi footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/jobs" className="transition-colors duration-200 hover:text-primary">
                Lowongan
              </Link>
            </li>
            <li>
              <Link href="/login" className="transition-colors duration-200 hover:text-primary">
                Masuk
              </Link>
            </li>
            <li>
              <Link href="/register" className="transition-colors duration-200 hover:text-primary">
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
