import type {
  SeekerProfile,
  SeekerProfileInput,
} from "@/domain/seeker-profile";
import { createClient } from "@/lib/supabase/server";
import type { SeekerProfileRepository } from "../seeker-profile-repository";

interface SeekerProfileRow {
  user_id: string;
  full_name: string;
  headline: string | null;
  bio: string | null;
  location: string | null;
  phone: string | null;
  cv_url: string | null;
}

function toProfile(row: SeekerProfileRow): SeekerProfile {
  return {
    userId: row.user_id,
    fullName: row.full_name,
    headline: row.headline ?? undefined,
    bio: row.bio ?? undefined,
    location: row.location ?? undefined,
    phone: row.phone ?? undefined,
    cvUrl: row.cv_url ?? undefined,
  };
}

/**
 * Implementasi SeekerProfileRepository dengan Supabase (RLS: pemilik saja).
 */
export class SupabaseSeekerProfileRepository
  implements SeekerProfileRepository
{
  async getByUserId(userId: string): Promise<SeekerProfile | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("seeker_profiles")
      .select("user_id, full_name, headline, bio, location, phone, cv_url")
      .eq("user_id", userId)
      .maybeSingle<SeekerProfileRow>();

    if (error) {
      throw new Error(`Gagal memuat profil: ${error.message}`);
    }
    return data ? toProfile(data) : null;
  }

  async upsert(
    userId: string,
    input: SeekerProfileInput
  ): Promise<SeekerProfile> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("seeker_profiles")
      .upsert(
        {
          user_id: userId,
          full_name: input.fullName,
          headline: input.headline ?? null,
          bio: input.bio ?? null,
          location: input.location ?? null,
          phone: input.phone ?? null,
        },
        { onConflict: "user_id" }
      )
      .select("user_id, full_name, headline, bio, location, phone, cv_url")
      .single<SeekerProfileRow>();

    if (error || !data) {
      throw new Error(`Gagal menyimpan profil: ${error?.message ?? ""}`);
    }
    return toProfile(data);
  }
}
