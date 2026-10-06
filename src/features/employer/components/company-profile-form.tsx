"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Company } from "@/domain/company";
import { updateCompanyProfileAction, type CompanyProfileState } from "../actions";

export interface CompanyProfileFormProps {
  defaultCompany: Company | null;
}

const INITIAL_STATE: CompanyProfileState = {};

/**
 * Form profil perusahaan Employer dengan validasi server dan toast sukses.
 */
export function CompanyProfileForm({
  defaultCompany,
}: CompanyProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateCompanyProfileAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Profil perusahaan berhasil disimpan.");
    }
  }, [state.success]);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="company-name">Nama perusahaan</Label>
        <Input
          id="company-name"
          name="name"
          required
          minLength={2}
          defaultValue={defaultCompany?.name ?? ""}
          placeholder="Contoh: Nusantara Digital"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="company-location">Lokasi</Label>
          <Input
            id="company-location"
            name="location"
            defaultValue={defaultCompany?.location ?? ""}
            placeholder="Contoh: Jakarta"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company-website">Website</Label>
          <Input
            id="company-website"
            name="website"
            defaultValue={defaultCompany?.website ?? ""}
            placeholder="nama-perusahaan.com"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company-description">Deskripsi</Label>
        <Textarea
          id="company-description"
          name="description"
          rows={5}
          defaultValue={defaultCompany?.description ?? ""}
          placeholder="Ceritakan singkat tentang perusahaanmu."
        />
      </div>
      {state.error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/15 bg-destructive/10 px-3.5 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3 border-t border-border/65 pt-5">
        <Button type="submit" size="lg" className="h-11" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Profil ini tampil pada halaman detail lowonganmu.
        </p>
      </div>
    </form>
  );
}
