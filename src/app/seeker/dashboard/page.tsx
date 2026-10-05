import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Dashboard Job Seeker" };

export default function SeekerDashboardPage() {
  return (
    <PagePlaceholder
      title="Dashboard Job Seeker"
      description="Ringkasan lamaran, interview, dan rekomendasi lowongan dikerjakan pada Sprint 2."
      sprint="Sprint 2 - US-10"
    />
  );
}
