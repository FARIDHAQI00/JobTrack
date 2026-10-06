"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_ROLE_LABELS, USER_ROLES } from "@/domain/user";
import { registerAction, type RegisterActionState } from "../actions";

const INITIAL_STATE: RegisterActionState = {};

/**
 * Form register: data akun, pilihan peran, dan konfirmasi password.
 */
export function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    INITIAL_STATE
  );

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="register-name">Nama lengkap / Nama perusahaan</Label>
        <Input
          id="register-name"
          name="fullName"
          required
          autoComplete="name"
          placeholder="Contoh: Rani Puspita"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="nama@email.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="Minimal 8 karakter"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="register-confirm">Konfirmasi password</Label>
        <Input
          id="register-confirm"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Ulangi password"
        />
      </div>
      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Daftar sebagai</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {USER_ROLES.map((role, index) => (
            <label
              key={role}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-sm transition-colors has-[:checked]:border-primary has-[:checked]:bg-secondary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/50"
            >
              <input
                type="radio"
                name="role"
                value={role}
                defaultChecked={index === 0}
                className="size-4 accent-primary"
              />
              {USER_ROLE_LABELS[role]}
            </label>
          ))}
        </div>
      </fieldset>
      {state.error ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      ) : null}
      {state.info ? (
        <p className="flex items-start gap-2 rounded-lg bg-info-bg px-3 py-2 text-sm text-info">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {state.info}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="h-11" disabled={pending}>
        {pending ? "Memproses..." : "Daftar"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Masuk
        </Link>
      </p>
    </form>
  );
}
