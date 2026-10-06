export const JOB_STATUSES = ["OPEN", "CLOSED"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const APPLICATION_STATUSES = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "ACCEPTED",
  "REJECTED",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/**
 * Urutan tahapan rekrutmen normal.
 *
 * REJECTED tidak termasuk karena merupakan status terminal alternatif,
 * bukan bagian dari alur maju.
 */
export const APPLICATION_STATUS_FLOW: readonly ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "ACCEPTED",
];

/**
 * Transisi status lamaran yang sah (database.md §5).
 *
 * ACCEPTED dan REJECTED adalah status terminal.
 */
export const APPLICATION_STATUS_TRANSITIONS: Record<
  ApplicationStatus,
  ApplicationStatus[]
> = {
  APPLIED: ["SCREENING", "REJECTED"],
  SCREENING: ["INTERVIEW", "REJECTED"],
  INTERVIEW: ["ACCEPTED", "REJECTED"],
  ACCEPTED: [],
  REJECTED: [],
};

/**
 * Memeriksa apakah perubahan status lamaran diizinkan.
 *
 * @param from Status saat ini.
 * @param to Status tujuan.
 * @returns true jika transisi sah.
 */
export function canTransitionStatus(
  from: ApplicationStatus,
  to: ApplicationStatus
): boolean {
  return APPLICATION_STATUS_TRANSITIONS[from].includes(to);
}

export const JOB_STATUS_LABELS: Record<JobStatus, string> = {
  OPEN: "Dibuka",
  CLOSED: "Ditutup",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  APPLIED: "Melamar",
  SCREENING: "Screening",
  INTERVIEW: "Interview",
  ACCEPTED: "Diterima",
  REJECTED: "Ditolak",
};
