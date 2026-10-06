import type { UserRole } from "@/domain/user";

/**
 * Apakah path termasuk area terproteksi (seeker/employer).
 */
export function isProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith("/seeker") || pathname.startsWith("/employer")
  );
}

/**
 * Memeriksa apakah role boleh mengakses path.
 *
 * Dipakai proxy dan diuji unit (OPS-05).
 */
export function canAccessPath(role: UserRole, pathname: string): boolean {
  if (pathname.startsWith("/employer")) {
    return role === "EMPLOYER";
  }
  if (pathname.startsWith("/seeker")) {
    return role === "JOB_SEEKER";
  }
  return true;
}

/**
 * Dashboard default untuk sebuah role.
 */
export function dashboardPathForRole(role: UserRole): string {
  return role === "EMPLOYER" ? "/employer/dashboard" : "/seeker/dashboard";
}
