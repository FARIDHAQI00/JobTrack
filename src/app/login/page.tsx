import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Masuk" };

export default function LoginPage() {
  return (
    <PagePlaceholder
      title="Masuk"
      description="Halaman login dengan Supabase Auth (email dan password) dikerjakan pada Sprint 2."
      sprint="Sprint 2 - US-01"
    />
  );
}
