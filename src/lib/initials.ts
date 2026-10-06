/**
 * Menghasilkan inisial nama untuk fallback avatar.
 *
 * @param name Nama lengkap pengguna.
 * @returns Maksimal dua huruf kapital, contoh "Rani Putri" menjadi "RP".
 */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
