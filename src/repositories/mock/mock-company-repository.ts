import type { Company, CompanyInput } from "@/domain/company";
import type { CompanyRepository } from "../company-repository";
import { getMockStore, nextMockId } from "./store";

/**
 * Implementasi CompanyRepository dengan store in-memory (mode demo).
 *
 * Profil perusahaan demo sudah ter-seed pada store (Nusantara Digital).
 */
export class MockCompanyRepository implements CompanyRepository {
  async getByUserId(userId: string): Promise<Company | null> {
    return getMockStore().companies.get(userId) ?? null;
  }

  async findByName(name: string): Promise<Company | null> {
    const normalized = name.trim().toLowerCase();
    for (const company of getMockStore().companies.values()) {
      if (company.name.trim().toLowerCase() === normalized) {
        return company;
      }
    }
    return null;
  }

  async upsert(userId: string, input: CompanyInput): Promise<Company> {
    const store = getMockStore();
    const previous = store.companies.get(userId);
    const company: Company = {
      id: previous?.id ?? nextMockId("company"),
      userId,
      name: input.name,
      description: input.description,
      location: input.location,
      website: input.website,
      logoUrl: previous?.logoUrl,
    };
    store.companies.set(userId, company);
    return company;
  }
}
