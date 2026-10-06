const compactRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  notation: "compact",
  maximumFractionDigits: 1,
});

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
