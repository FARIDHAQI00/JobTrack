import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Lowongan Saya" };

export default function EmployerJobsPage() {
  return (
    <PagePlaceholder
      title="Lowongan Saya"
      description="Pengelolaan lowongan (buat, ubah, tutup) dikerjakan pada Sprint 3."
      sprint="Sprint 3 - US-14 sampai US-16"
    />
  );
}
