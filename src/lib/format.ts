const compactRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const longDate = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Memformat tanggal ISO ke format Indonesia (contoh: "3 Oktober 2026").
 *
 * @param iso Tanggal dalam format ISO 8601.
 * @returns Tanggal yang ramah dibaca.
 */
export function formatDateID(iso: string): string {
  return longDate.format(new Date(iso));
}

/**
 * Memformat rentang gaji ke Rupiah ringkas.
 *
 * @param min Gaji minimum (opsional).
 * @param max Gaji maksimum (opsional).
 * @returns Teks rentang seperti "Rp8 jt - Rp12 jt", atau null jika keduanya kosong.
 */
export function formatSalaryRange(min?: number, max?: number): string | null {
  if (min && max) {
    return `${compactRupiah.format(min)} - ${compactRupiah.format(max)}`;
  }
  if (min) {
    return `Mulai ${compactRupiah.format(min)}`;
  }
  if (max) {
    return `Sampai ${compactRupiah.format(max)}`;
  }
  return null;
}
