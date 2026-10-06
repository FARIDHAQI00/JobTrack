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
import { cn } from "@/lib/utils";

const NAV_ITEMS = [{ href: "/jobs", label: "Lowongan" }];

/**
 * Header publik: logo, navigasi utama, dan aksi masuk/daftar.
 *
 * Mobile menampilkan menu dalam Sheet; desktop satu baris (maks 72px).
 * Status login akan dihubungkan pada Sprint 2 (Supabase Auth).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
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

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg" asChild>
            <Link href="/login">Masuk</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/register">Daftar</Link>
          </Button>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="ml-auto md:hidden"
              aria-label="Buka menu"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav aria-label="Navigasi mobile" className="px-4">
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
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
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
