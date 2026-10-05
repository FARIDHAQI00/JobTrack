# Sprint 2 — Auth + Job Seeker

- **Periode (rencana):** 20-10-2026 s.d. 02-11-2026
- **Sprint Goal:** Job Seeker dapat register/login, melamar, menyimpan lowongan, dan memantau status lamaran; Supabase Auth + repository siap dipakai.
- **Branch:** `feat_sprint-2-seeker/05-10-2026`

## Keputusan Arsitektur

**Auth dual-mode** (`src/lib/auth/service.ts`):

- **Supabase mode** — aktif otomatis saat `NEXT_PUBLIC_SUPABASE_URL` + `ANON_KEY` terisi: `signInWithPassword`, `signUp` (role di metadata → trigger `handle_new_user`), `signOut`, session cookie via `@supabase/ssr`.
- **Demo mode** — saat env kosong: akun demo dari `supabase/seed.sql` (`seeker@demo.jobtrack` / `employer@demo.jobtrack`, password `demo1234`), session cookie httpOnly. Ini simulasi sesuai PRD, bukan mekanisme keamanan produksi.

Repository juga dual-mode via factory: Supabase aktif bila env tersedia, selain itu mock in-memory (`globalThis` store). UI tidak berubah antar mode.

## Capaian

### Selesai (kode)

| Item | Keterangan |
|---|---|
| US-01/02/03 Auth | Form login/register + server actions + validasi; logout via menu akun |
| Role guard | `src/proxy.ts` membaca session Supabase/demo; redirect sesuai role + `next` param |
| US-08 Saved jobs | Tombol simpan (detail), halaman `/seeker/saved`, hapus dari simpanan |
| US-09 Apply | Dialog lamaran + server action; validasi job OPEN, anti lamaran ganda (service + unique constraint) |
| US-10 Status | Timeline + badge di dashboard; sinkron status terbaru |
| US-11 Riwayat | `/seeker/applications` + filter status via URL + dialog progres |
| US-12 Profil | Form profil + kelengkapan profil (Progress) |
| US-21 Feedback | Toast sukses/gagal, loading state tombol/dialog, konfirmasi via dialog form |
| OPS-05 Testing | Vitest + Testing Library + jsdom; 24 test (filter, transisi status, guard, service, komponen) |
| Seeker shell | `DashboardShell` + nav role + menu akun (desktop & mobile) |
| Supabase repository | `SupabaseJobRepository`, `SupabaseApplicationRepository`, `SupabaseSavedJobRepository`, `SupabaseSeekerProfileRepository` |
| Service layer | `ApplicationService` (aturan apply) - OOP sesuai designpattern.md |

### Menunggu aksi manual tim

| Item | Alasan | Cara |
|---|---|---|
| Isi `.env.local` | menunggu project Supabase | Salin dari `.env.example` |
| Verifikasi Supabase mode | Docker/DB belum tersedia | `supabase start` → `db reset` → set env → jalankan flow |
| Validasi migration + seed | sama seperti Sprint 1 | `supabase db reset` |
| Vercel preview + Jira | akun belum dibuat | `vercel.md`, `jira.md` |

## Verifikasi

| Perintah | Hasil |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm test` | Pass - 5 file, 24 test |
| `npm run build` | Pass - 17 route |
| Smoke test runtime (production server) | Guest `/seeker/*` → 307 `/login?next=...`; cookie demo seeker → 200; seeker ke `/employer/*` → 307 ke `/seeker/dashboard`; detail job menampilkan CTA Lamar/Simpan sesuai role |

Catatan kejujuran (`agent.md` §15): Supabase mode belum diuji end-to-end karena project Supabase dan Docker belum tersedia; yang terverifikasi adalah demo mode + build + unit test.

## Definition of Done Sprint 2

- [x] Acceptance criteria story Sprint 2 terpenuhi (demo mode)
- [x] Lint/typecheck/test/build bersih
- [ ] Preview deployment dicek (menunggu koneksi Vercel)
- [x] Tidak ada secret di repo
- [ ] Task Jira dipindah ke Done (menunggu project Jira)
- [x] Dokumentasi sprint dicatat (file ini)

## Review & Retrospective

- **Sprint Review:** _diisi saat demo Sprint 2 (gunakan akun demo di halaman login)_
- **Retrospective:** _diisi setelah review_
