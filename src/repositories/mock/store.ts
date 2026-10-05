import type { Company } from "@/domain/company";
import type { SeekerProfile } from "@/domain/seeker-profile";
import type { ApplicationStatus } from "@/domain/status";
import { DEMO_ACCOUNTS } from "@/lib/auth/constants";

export interface MockApplicationRecord {
  id: string;
  jobId: string;
  seekerId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  appliedAt: string;
  updatedAt: string;
}

export interface MockSavedJobRecord {
  id: string;
  jobId: string;
  seekerId: string;
  createdAt: string;
}

export interface MockStore {
  applications: MockApplicationRecord[];
  savedJobs: MockSavedJobRecord[];
  seekerProfiles: Map<string, SeekerProfile>;
  companies: Map<string, Company>;
  sequence: number;
}

const STORE_KEY = "__jobtrack_mock_store__";

function createStore(): MockStore {
  const companies = new Map<string, Company>();
  const demoEmployer = DEMO_ACCOUNTS.find(
    (account) => account.role === "EMPLOYER"
  );

  if (demoEmployer) {
    companies.set(demoEmployer.id, {
      id: "company-demo",
      userId: demoEmployer.id,
      name: demoEmployer.fullName,
      description:
        "Studio produk digital yang membantu perusahaan lokal bertumbuh lewat perangkat lunak yang rapi.",
      location: "Jakarta",
      website: "https://nusantara-digital.example",
    });
  }

  return {
    applications: [],
    savedJobs: [],
    seekerProfiles: new Map(),
    companies,
    sequence: 1,
  };
}

/**
 * Store in-memory bersama untuk mode demo.
 *
 * Disimpan di globalThis agar bertahan antar modul/HMR pada server dev,
 * tetapi tetap hilang saat proses restart. Hanya untuk simulasi.
 */
export function getMockStore(): MockStore {
  const globalObject = globalThis as unknown as Record<string, unknown>;
  if (!globalObject[STORE_KEY]) {
    globalObject[STORE_KEY] = createStore();
  }
  return globalObject[STORE_KEY] as MockStore;
}

/**
 * Reset store, dipakai oleh unit test agar tiap test terisolasi.
 */
export function resetMockStore(): void {
  const globalObject = globalThis as unknown as Record<string, unknown>;
  globalObject[STORE_KEY] = createStore();
}

export function nextMockId(prefix: string): string {
  const store = getMockStore();
  store.sequence += 1;
  return `${prefix}-${store.sequence}`;
}
