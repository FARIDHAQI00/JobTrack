export const USER_ROLES = ["JOB_SEEKER", "EMPLOYER"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  JOB_SEEKER: "Job Seeker",
  EMPLOYER: "Employer",
};

export const USER_ROLE_DASHBOARD: Record<UserRole, string> = {
  JOB_SEEKER: "/seeker/dashboard",
  EMPLOYER: "/employer/dashboard",
};

/**
 * Memvalidasi nilai dari input pengguna menjadi UserRole.
 *
 * @param value Nilai mentah (string/undefined).
 * @returns UserRole valid atau null.
 */
export function parseUserRole(value: unknown): UserRole | null {
  return USER_ROLES.find((role) => role === value) ?? null;
}
