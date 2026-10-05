import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Edit Lowongan" };

export default function EmployerEditJobPage() {
  return (
    <PagePlaceholder
      title="Edit Lowongan"
      description="Pengubahan detail lowongan dikerjakan pada Sprint 3."
      sprint="Sprint 3 - US-15"
    />
  );
}
