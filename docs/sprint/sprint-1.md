# Sprint 1 — Foundation + Job Discovery

- **Periode (rencana):** 06-10-2026 s.d. 19-10-2026
- **Sprint Goal:** aplikasi dapat diakses dengan landing, listing, pencarian, filter, dan detail lowongan menggunakan mock repository, plus fondasi deployment.
- **Branch:** `feat_sprint-1-foundation/05-10-2026`

## Capaian

### Selesai (kode)

| Item | Keterangan |
|---|---|
| FD-04 App shell + routing | `src/app/(public)/layout.tsx`, `SiteHeader`, `SiteFooter`, route placeholder seeker/employer/login/register |
| FD-04 Role guard | `src/proxy.ts` (konvensi Next.js 16) refresh session + guard; aktif otomatis saat env Supabase diisi, pass-through di mode mock |
| FD-05 Repository | `src/repositories/job-repository.ts`, `MockJobRepository`, factory `getJobRepository()` |
| FD-05 Filter logic | `src/lib/job-filters.ts` (pure function, siap diuji di OPS-05) |
| US-04 Daftar lowongan | `/jobs` + `JobCard` dari mock repository |
| US-05 Pencarian | `JobSearchInput` debounce 400ms, tersinkron URL `q` |
| US-06 Filter | `JobFilterPanel` kategori/lokasi/tipe, chip wrap, Sheet di mobile, tersinkron URL |
| US-07 Detail | `/jobs/[id]` + CTA state (OPEN/CLOSED), 404 bila tidak ada |
| US-22 Responsif | Grid 1/2/3 kolom, filter Sheet mobile, nav Sheet mobile |
| FD-02 Artifacts Supabase | `supabase/config.toml`, migration `20261005090000_init_schema.sql` (skema + trigger + RLS), `seed.sql`, `.env.example` |
| Landing | `/` hero search (marketplace pattern), kategori populer, lowongan terbaru, CTA employer |

### Menunggu aksi manual tim

| Item | Alasan | Cara |
|---|---|---|
| Buat project Supabase dev | butuh akun Supabase | Ikuti `supabase.md` §3-4 |
| Validasi migration + seed | Docker daemon belum berjalan saat sprint | `supabase start` lalu `supabase db reset` |
| Setup Vercel + preview | butuh akun Vercel | `vercel.md` §3; preview otomatis setelah repo terhubung |
| Jira project + import backlog | butuh akun Jira | `jira.md` §2-3, §13 |
| Isi `.env.local` | menunggu project Supabase | `.env.example` |

## Verifikasi

| Perintah | Hasil |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm run build` | Pass, 17 route (9 statis, 4 dinamis, proxy, not-found) |

Catatan kejujuran (`agent.md` §15): migration dan seed **belum dijalankan di database** karena Docker belum aktif. Jangan mengklaim Supabase aktif sebelum `supabase db reset` sukses.

## Definition of Done Sprint 1

- [x] Acceptance criteria story Sprint 1 terpenuhi (mock mode)
- [x] Lint/typecheck/build bersih
- [ ] Preview deployment dicek (menunggu koneksi Vercel)
- [x] Tidak ada secret di repo (`supabase status` key belum ada; `.env.example` tanpa nilai)
- [ ] Task Jira dipindah ke Done (menunggu project Jira)
- [x] Dokumentasi sprint dicatat (file ini)

## Review & Retrospective

- **Sprint Review:** _diisi saat demo Sprint 1_
- **Retrospective:** _diisi setelah review (what went well / wrong / improve)_
