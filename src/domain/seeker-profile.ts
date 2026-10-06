export interface SeekerProfile {
  userId: string;
  fullName: string;
  headline?: string;
  bio?: string;
  location?: string;
  phone?: string;
  cvUrl?: string;
}

export interface SeekerProfileInput {
  fullName: string;
  headline?: string;
  bio?: string;
  location?: string;
  phone?: string;
}

const COMPLETENESS_FIELDS: (keyof SeekerProfileInput)[] = [
  "fullName",
  "headline",
  "bio",
  "location",
  "phone",
];

/**
 * Menghitung persentase kelengkapan profil pelamar.
 *
 * @param profile Profil pelamar; null jika belum ada.
 * @returns Persentase 0-100.
 */
export function seekerProfileCompleteness(
  profile: SeekerProfile | null
): number {
  if (!profile) {
    return 0;
  }
  const filled = COMPLETENESS_FIELDS.filter((field) => {
    const value = profile[field];
    return typeof value === "string" && value.trim().length > 0;
  }).length;
  return Math.round((filled / COMPLETENESS_FIELDS.length) * 100);
}
