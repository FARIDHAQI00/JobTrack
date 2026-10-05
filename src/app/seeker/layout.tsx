import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getSessionUser } from "@/lib/auth/service";

const SEEKER_NAV = [
  { href: "/seeker/dashboard", label: "Overview" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/seeker/applications", label: "Applications" },
  { href: "/seeker/saved", label: "Saved" },
  { href: "/seeker/profile", label: "Profile" },
];

/**
 * Shell Job Seeker: guard role + navigasi dashboard.
 */
export default async function SeekerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "JOB_SEEKER") {
    redirect("/employer/dashboard");
  }

  return (
    <DashboardShell user={user} items={SEEKER_NAV}>
      {children}
    </DashboardShell>
  );
}
