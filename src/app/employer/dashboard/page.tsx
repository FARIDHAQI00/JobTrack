import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Dashboard Employer" };

export default function EmployerDashboardPage() {
  return (
    <PagePlaceholder
      title="Dashboard Employer"
      description="Ringkasan lowongan, pelamar, dan pipeline dikerjakan pada Sprint 3."
      sprint="Sprint 3 - US-13"
    />
  );
}
