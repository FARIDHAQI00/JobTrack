import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getSessionUser } from "@/lib/auth/service";

const EMPLOYER_NAV = [
  { href: "/employer/dashboard", label: "Overview" },
  { href: "/employer/jobs", label: "Jobs" },
  { href: "/employer/profile", label: "Profile" },
];

/**
 * Shell Employer: guard role + navigasi dashboard.
 */
export default async function EmployerLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }
  if (user.role !== "EMPLOYER") {
    redirect("/seeker/dashboard");
  }

  return (
    <DashboardShell user={user} items={EMPLOYER_NAV}>
      {children}
    </DashboardShell>
  );
}
