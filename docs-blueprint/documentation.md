# Documentation Standard

## 1. Tujuan

Dokumentasi harus cukup ringkas untuk dipahami anggota tim, tetapi cukup jelas untuk menjelaskan fungsi dan keputusan teknis.

## 2. Dokumentasi Function

Untuk function yang memiliki logic penting, gunakan format:

```ts
/**
 * Mengambil daftar lowongan berdasarkan filter.
 *
 * @param filters Filter pencarian lowongan.
 * @returns Daftar lowongan yang sesuai filter.
 */
```

Tidak perlu mendokumentasikan getter/setter atau JSX sederhana yang sudah jelas.

## 3. Dokumentasi Component

```ts
/**
 * Menampilkan kartu ringkas lowongan.
 *
 * Props:
 * - job: data lowongan
 * - onApply: callback saat user memilih apply
 */
```

## 4. Dokumentasi Service

Wajib menjelaskan:
- tujuan
- input
- output
- error utama
- dependency jika ada

## 5. Documentation Rule

Jangan menulis dokumentasi panjang yang mengulang kode. Dokumentasi menjelaskan **why**, sementara kode menjelaskan **how**.

## 6. README

README minimal berisi:
- project description
- features
- tech stack
- setup
- run locally (termasuk Supabase local bila dipakai)
- live URL (Vercel)
- environment variables (`.env.example`)
- Docker
- Docker Hub link
- repository link
- team
- documentation links

## 7. Decision Log

Keputusan teknis penting dicatat singkat:

`Decision → Reason → Consequence`

Contoh keputusan yang sudah diambil:

1. `Hosting Vercel → native Next.js + preview per PR → deployment menjadi bagian alur kerja harian`
2. `Backend Supabase → Auth/PostgreSQL/RLS terkelola, mempercepat persistence → mock repository tetap dipertahankan sebagai fallback`
3. `Docker tetap dibuat → requirement UTS + portabilitas demo → dua jalur delivery (Vercel dan Docker) harus dijaga konsisten`
4. `Auth & repository dual-mode (Supabase / demo) → akun & Docker belum tersedia saat pengembangan → aplikasi tetap dapat didemokan; Supabase aktif otomatis lewat environment tanpa mengubah UI`
