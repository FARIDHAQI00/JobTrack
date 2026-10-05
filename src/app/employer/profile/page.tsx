import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Profil Perusahaan" };

export default function EmployerProfilePage() {
  return (
    <PagePlaceholder
      title="Profil Perusahaan"
      description="Pengelolaan profil perusahaan dikerjakan pada Sprint 3."
      sprint="Sprint 3 - US-19"
    />
  );
}
