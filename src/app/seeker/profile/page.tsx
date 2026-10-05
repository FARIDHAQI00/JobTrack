import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Profil Saya" };

export default function SeekerProfilePage() {
  return (
    <PagePlaceholder
      title="Profil Saya"
      description="Pengelolaan profil pelamar dikerjakan pada Sprint 2."
      sprint="Sprint 2 - US-12"
    />
  );
}
