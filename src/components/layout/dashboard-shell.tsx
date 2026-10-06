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
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-lg font-semibold"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
        <div className="border-t lg:hidden">
          <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-2">
            <NavLinks items={items} ariaLabel="Navigasi dashboard mobile" />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        {children}
      </main>
    </div>
  );
}
