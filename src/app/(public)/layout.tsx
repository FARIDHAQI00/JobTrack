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
    <div className="flex min-h-[100dvh] flex-col">
      <SiteHeader user={user} />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
