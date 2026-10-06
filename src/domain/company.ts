export interface Company {
  id: string;
  userId: string;
  name: string;
  description?: string;
  location?: string;
  website?: string;
  logoUrl?: string;
}

export interface CompanyInput {
  name: string;
  description?: string;
  location?: string;
  website?: string;
}

/**
 * Melengkapi URL website dengan protokol bila belum ada.
 *
 * @param website Input website dari form.
 * @returns URL valid atau undefined.
 */
export function normalizeWebsite(website?: string): string | undefined {
  const value = website?.trim();
  if (!value) {
    return undefined;
  }
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return `https://${value}`;
}
