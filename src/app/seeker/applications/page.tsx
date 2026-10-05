import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Lamaran Saya" };

export default function SeekerApplicationsPage() {
  return (
    <PagePlaceholder
      title="Lamaran Saya"
      description="Riwayat dan status lamaran dikerjakan pada Sprint 2."
      sprint="Sprint 2 - US-11"
    />
  );
}
