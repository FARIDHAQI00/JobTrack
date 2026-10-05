import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Lowongan Tersimpan" };

export default function SeekerSavedPage() {
  return (
    <PagePlaceholder
      title="Lowongan Tersimpan"
      description="Daftar lowongan yang disimpan dikerjakan pada Sprint 2."
      sprint="Sprint 2 - US-08"
    />
  );
}
