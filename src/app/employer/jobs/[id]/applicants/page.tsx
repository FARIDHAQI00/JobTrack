import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Kandidat" };

export default function EmployerApplicantsPage() {
  return (
    <PagePlaceholder
      title="Kandidat"
      description="Daftar kandidat dan perubahan status dikerjakan pada Sprint 3."
      sprint="Sprint 3 - US-17 dan US-18"
    />
  );
}
