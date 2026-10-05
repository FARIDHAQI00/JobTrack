import { cookies } from "next/headers";
import {
  decodeDemoSession,
  DEMO_SESSION_COOKIE,
  encodeDemoSession,
} from "./session-codec";
import type { SessionUser } from "./types";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

/**
 * Membaca session demo dari cookie (server-side).
 */
export async function getDemoSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  return decodeDemoSession(cookieStore.get(DEMO_SESSION_COOKIE)?.value);
}

/**
 * Menyimpan session demo pada cookie httpOnly.
 */
export async function setDemoSession(user: SessionUser): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_SESSION_COOKIE, encodeDemoSession(user), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

/**
 * Menghapus session demo.
 */
export async function clearDemoSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);
}
