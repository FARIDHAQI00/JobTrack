import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getSessionUser } from "@/lib/auth/service";

/**
 * Shell halaman publik: header navigasi (dengan status login) + konten + footer.
 */
export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <div className="public-canvas flex min-h-[100dvh] flex-col">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Lewati ke konten
      </a>
      <SiteHeader user={user} />
      <div id="konten" className="flex-1">
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
