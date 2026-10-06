"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BriefcaseBusiness, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserMenu } from "@/features/auth/components/user-menu";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth/types";

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/#cara-kerja", label: "Cara kerja" },
  { href: "/jobs", label: "Lowongan" },
];

export interface SiteHeaderProps {
  user?: SessionUser | null;
}

/**
 * Header publik: logo, navigasi utama, dan aksi masuk/daftar atau menu akun.
 *
 * Mobile menampilkan menu dalam Sheet; desktop satu baris (maks 72px).
 */
export function SiteHeader({ user }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-5">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center gap-4 rounded-full border border-white/80 bg-card/90 px-4 shadow-[var(--elevation-card)] backdrop-blur-md sm:h-[68px] sm:gap-6 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-heading text-lg font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--elevation-button)]">
            <BriefcaseBusiness className="size-4" aria-hidden="true" />
          </span>
          JobTrack
        </Link>

        <nav aria-label="Navigasi utama" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <ul className="flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const active = item.href === "/"
                ? pathname === "/"
                : !item.href.includes("#") && pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-[color,background-color,box-shadow] duration-200",
                      active
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground hover:bg-card/80 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-2 lg:flex">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
              <Button size="lg" className="brand-gradient rounded-full px-5 text-primary-foreground" asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </>
          )}
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="ml-auto lg:hidden"
              aria-label="Buka menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(88vw,22rem)] border-l border-border/75 bg-popover">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Navigasi mobile" className="px-4">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const active = item.href === "/"
                    ? pathname === "/"
                    : !item.href.includes("#") && pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                          active
                            ? "bg-secondary text-secondary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                {user ? (
                  <li className="mt-2 border-t pt-4">
                    <UserMenu user={user} />
                  </li>
                ) : (
                  <li className="mt-2 flex flex-col gap-2 border-t pt-4">
                    <Button variant="outline" size="lg" asChild>
                      <Link href="/login" onClick={() => setMenuOpen(false)}>
                        Masuk
                      </Link>
                    </Button>
                    <Button size="lg" asChild>
                      <Link href="/register" onClick={() => setMenuOpen(false)}>
                        Daftar
                      </Link>
                    </Button>
                  </li>
                )}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
