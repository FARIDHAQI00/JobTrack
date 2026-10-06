import { DEMO_SESSION_COOKIE } from "./constants";
import type { SessionUser } from "./types";

export { DEMO_SESSION_COOKIE };

/**
 * Mengubah session demo menjadi string cookie (base64url).
 *
 * Mode demo adalah simulasi sesuai PRD dan bukan mekanisme keamanan
 * produksi; cookie bersifat httpOnly tetapi tidak ditandatangani.
 */
export function encodeDemoSession(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user), "utf-8").toString("base64url");
}

/**
 * Membaca session demo dari nilai cookie.
 *
 * @param value Nilai cookie mentah.
 * @returns SessionUser valid atau null bila rusak/tidak dikenal.
 */
export function decodeDemoSession(
  value: string | undefined | null
): SessionUser | null {
  if (!value) {
    return null;
  }
  try {
    const parsed = JSON.parse(
      Buffer.from(value, "base64url").toString("utf-8")
    ) as Partial<SessionUser>;

    if (
      typeof parsed.id !== "string" ||
      typeof parsed.email !== "string" ||
      (parsed.role !== "JOB_SEEKER" && parsed.role !== "EMPLOYER")
    ) {
      return null;
    }

    return {
      id: parsed.id,
      email: parsed.email,
      role: parsed.role,
      fullName: typeof parsed.fullName === "string" ? parsed.fullName : undefined,
    };
  } catch {
    return null;
  }
}
