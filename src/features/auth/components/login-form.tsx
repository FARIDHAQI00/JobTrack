"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, type LoginActionState } from "../actions";

export interface LoginFormProps {
  next?: string;
}

const INITIAL_STATE: LoginActionState = {};

/**
 * Form login dengan state loading dan pesan error inline.
 */
export function LoginForm({ next }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    INITIAL_STATE
  );

  return (
    <form action={formAction} className="grid gap-5">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <div className="grid gap-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="nama@email.com"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="login-password">Password</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
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
      <Button type="submit" size="lg" className="h-11 w-full" disabled={pending}>
        {pending ? "Memproses..." : "Masuk"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-semibold text-primary transition-colors hover:text-foreground hover:underline"
        >
          Daftar
        </Link>
      </p>
    </form>
  );
}
