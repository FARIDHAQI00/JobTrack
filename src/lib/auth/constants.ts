import type { UserRole } from "@/domain/user";

export const DEMO_SESSION_COOKIE = "jobtrack_demo_session";

export interface DemoAccount {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  fullName: string;
}

/**
 * Akun demo (sesuai `supabase/seed.sql`) untuk mode tanpa Supabase.
 *
 * Ini simulasi sesuai PRD, bukan mekanisme keamanan produksi.
 */
export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "22222222-2222-2222-2222-222222222222",
    email: "seeker@demo.jobtrack",
    password: "demo1234",
    role: "JOB_SEEKER",
    fullName: "Rani Puspita",
  },
  {
    id: "11111111-1111-1111-1111-111111111111",
    email: "employer@demo.jobtrack",
    password: "demo1234",
    role: "EMPLOYER",
    fullName: "Nusantara Digital",
  },
];
