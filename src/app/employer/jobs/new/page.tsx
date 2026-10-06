import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Buat Lowongan" };

export default function EmployerNewJobPage() {
  return (
    <PagePlaceholder
      title="Buat Lowongan"
      description="Form pembuatan lowongan dikerjakan pada Sprint 3."
      sprint="Sprint 3 - US-14"
    />
  );
}
