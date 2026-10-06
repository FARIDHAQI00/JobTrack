"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SeekerProfile } from "@/domain/seeker-profile";
import { updateProfileAction, type ProfileActionState } from "../actions";

export interface ProfileFormProps {
  defaultProfile: SeekerProfile | null;
}

const INITIAL_STATE: ProfileActionState = {};

/**
 * Form profil pelamar dengan validasi server dan feedback toast.
 */
export function ProfileForm({ defaultProfile }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    INITIAL_STATE
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Profil berhasil disimpan.");
    }
  }, [state.success]);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="profile-name">Nama lengkap</Label>
        <Input
          id="profile-name"
          name="fullName"
          required
          defaultValue={defaultProfile?.fullName ?? ""}
          placeholder="Nama lengkap"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-headline">Headline</Label>
        <Input
          id="profile-headline"
          name="headline"
          defaultValue={defaultProfile?.headline ?? ""}
          placeholder="Contoh: Frontend Developer"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-bio">Bio</Label>
        <Textarea
          id="profile-bio"
          name="bio"
          rows={4}
          defaultValue={defaultProfile?.bio ?? ""}
          placeholder="Ceritakan pengalaman dan minatmu singkat saja."
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="profile-location">Lokasi</Label>
          <Input
            id="profile-location"
            name="location"
            defaultValue={defaultProfile?.location ?? ""}
            placeholder="Contoh: Yogyakarta"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="profile-phone">Telepon</Label>
          <Input
            id="profile-phone"
            name="phone"
            defaultValue={defaultProfile?.phone ?? ""}
            placeholder="+62 ..."
          />
        </div>
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
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" size="lg" className="h-11" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Upload CV tersedia pada tahap berikutnya (P2).
        </p>
      </div>
    </form>
  );
}
