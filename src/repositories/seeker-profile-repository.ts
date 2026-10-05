import type {
  SeekerProfile,
  SeekerProfileInput,
} from "@/domain/seeker-profile";

/**
 * Kontrak akses data profil pelamar.
 */
export interface SeekerProfileRepository {
  getByUserId(userId: string): Promise<SeekerProfile | null>;
  upsert(userId: string, input: SeekerProfileInput): Promise<SeekerProfile>;
}
