import Link from "next/link";
import type { ReactNode } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { UserMenu } from "@/features/auth/components/user-menu";
import { NavLinks, type NavItem } from "./nav-links";
import type { SessionUser } from "@/lib/auth/types";

export interface DashboardShellProps {
  user: SessionUser;
  items: NavItem[];
  children: ReactNode;
}

/**
 * Shell area dashboard: header ringkas dengan navigasi role dan menu akun.
 *
 * Dipakai Job Seeker (Sprint 2) dan Employer (Sprint 3).
 */
export function DashboardShell({ user, items, children }: DashboardShellProps) {
  return (
    <div className="dashboard-canvas flex min-h-[100dvh] flex-col">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Lewati ke konten
      </a>
      <header className="sticky top-0 z-40 border-b border-border/65 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-5 px-4 sm:gap-6 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-heading text-lg font-semibold tracking-tight"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[var(--elevation-button)]">
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
            </span>
            JobTrack
          </Link>
          <div className="hidden lg:block">
            <NavLinks items={items} ariaLabel="Navigasi dashboard" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <UserMenu user={user} />
          </div>
        </div>
        <div className="border-t border-border/60 bg-card/35 lg:hidden">
          <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-2 sm:px-6">
            <NavLinks items={items} ariaLabel="Navigasi dashboard mobile" />
          </div>
        </div>
      </header>
      <main id="konten" className="mx-auto w-full max-w-7xl flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
        {children}
      </main>
    </div>
  );
}
