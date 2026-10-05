import type { Company, CompanyInput } from "@/domain/company";
import { createClient } from "@/lib/supabase/server";
import type { CompanyRepository } from "../company-repository";

interface CompanyRow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  location: string | null;
  website: string | null;
  logo_url: string | null;
}

const COMPANY_SELECT =
  "id, user_id, name, description, location, website, logo_url";

function toCompany(row: CompanyRow): Company {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    description: row.description ?? undefined,
    location: row.location ?? undefined,
    website: row.website ?? undefined,
    logoUrl: row.logo_url ?? undefined,
  };
}

/**
 * Implementasi CompanyRepository dengan Supabase.
 *
 * Select publik dibatasi RLS (read terbuka, write hanya pemilik).
 */
export class SupabaseCompanyRepository implements CompanyRepository {
  async getByUserId(userId: string): Promise<Company | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("companies")
      .select(COMPANY_SELECT)
      .eq("user_id", userId)
      .maybeSingle<CompanyRow>();

    if (error) {
      throw new Error(`Gagal memuat profil perusahaan: ${error.message}`);
    }
    return data ? toCompany(data) : null;
  }

  async findByName(name: string): Promise<Company | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("companies")
      .select(COMPANY_SELECT)
      .eq("name", name)
      .limit(1)
      .maybeSingle<CompanyRow>();

    if (error) {
      throw new Error(`Gagal memuat perusahaan: ${error.message}`);
    }
    return data ? toCompany(data) : null;
  }

  async upsert(userId: string, input: CompanyInput): Promise<Company> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("companies")
      .upsert(
        {
          user_id: userId,
          name: input.name,
          description: input.description ?? null,
          location: input.location ?? null,
          website: input.website ?? null,
        },
        { onConflict: "user_id" }
      )
      .select(COMPANY_SELECT)
      .single<CompanyRow>();

    if (error || !data) {
      throw new Error(
        `Gagal menyimpan profil perusahaan: ${error?.message ?? ""}`
      );
    }
    return toCompany(data);
  }
}
