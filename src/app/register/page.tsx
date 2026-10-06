import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/shared/page-placeholder";

export const metadata: Metadata = { title: "Daftar" };

export default function RegisterPage() {
  return (
    <PagePlaceholder
      title="Daftar"
      description="Registrasi akun Job Seeker dan Employer dikerjakan pada Sprint 2."
      sprint="Sprint 2 - US-02"
    />
  );
}
