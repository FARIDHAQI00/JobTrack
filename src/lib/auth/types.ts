import type { UserRole } from "@/domain/user";

export interface SessionUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

export type SignInResult =
  | { ok: true; role: UserRole }
  | { ok: false; error: string };

export type SignUpResult =
  | { ok: true; needsEmailConfirmation: boolean }
  | { ok: false; error: string };

export type AuthResult = { ok: true } | { ok: false; error: string };
