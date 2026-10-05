import type { Company, CompanyInput } from "@/domain/company";

/**
 * Kontrak akses data profil perusahaan.
 */
export interface CompanyRepository {
  getByUserId(userId: string): Promise<Company | null>;
  findByName(name: string): Promise<Company | null>;
  upsert(userId: string, input: CompanyInput): Promise<Company>;
}
