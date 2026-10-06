"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavItem {
  href: string;
  label: string;
}

export interface NavLinksProps {
  items: NavItem[];
  ariaLabel: string;
}

/**
 * Navigasi dashboard dengan penanda halaman aktif.
 */
export function NavLinks({ items, ariaLabel }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
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
  );
}
