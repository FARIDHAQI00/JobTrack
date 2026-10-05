# JobTrack — Initial Backlog (Phase 0)

> Sumber: `prd.md` (US-01–US-22), `requirements.md`, `roadmap.md`, `vercel.md`, `supabase.md`.
> Versi Jira: `jira-import.csv` (lihat `jira.md` §13). Sprint: `sprint-plan.md`.

## 1. Ringkasan

| Epic | Jumlah Story | Prioritas Dominan | Sprint |
|---|---|---|---|
| E1 Foundation & Deployment | 6 | P0 | 1, 4 |
| E2 Authentication | 3 | P1 | 2 |
| E3 Job Discovery | 4 | P0 | 1 |
| E4 Job Seeker | 5 | P0/P1 | 2 |
| E5 Employer | 7 | P0/P1 | 3 |
| E6 Shared UI/UX | 3 | P0 | 1, 4 |
| E7 Docker & Documentation | 5 | P0/P1 | 2, 4 |
| P2 Future | 3 | Low | Backlog |

Total story terjadwal: 33 story + 3 P2 = 36 story.

## 2. E1 — Foundation & Deployment

| ID | Story | Prioritas | SP | Sprint |
|---|---|---|---|---|
| FD-01 | Scaffold project Next.js + TypeScript + Tailwind | P0 | 5 | 1 |
| FD-02 | Setup Supabase dev + migration awal | P0 | 3 | 1 |
| FD-03 | Setup Vercel + preview deployment | P0 | 2 | 1 |
| FD-04 | App shell, routing, dan role guard | P0 | 3 | 1 |
| FD-05 | Domain types + repository abstraction + mock | P0 | 3 | 1 |
| FD-06 | Production deployment + smoke test + rollback drill | P0 | 2 | 4 |

### FD-01 — Scaffold project
- **Acceptance criteria:** `npm run dev` berjalan; TypeScript strict; Tailwind aktif; struktur folder mengikuti `architecture.md` §3; lint tanpa error.
- **Tasks:**
  - [ ] Init Next.js App Router + TypeScript + Tailwind
  - [ ] Setup ESLint/Prettier + script `lint`/`typecheck`
  - [ ] Buat struktur folder `components/features/lib/mocks` sesuai blueprint

### FD-02 — Setup Supabase dev + migration awal
- **Acceptance criteria:** project dev aktif (region Singapore); `supabase/migrations` berisi skema `database.md`; `supabase start` berjalan; seed data tersedia.
- **Tasks:**
  - [ ] Buat project Supabase dev
  - [ ] Init Supabase CLI + `config.toml`
  - [ ] Tulis migration awal (profiles, seeker_profiles, companies, jobs, applications, saved_jobs, enum)
  - [ ] Buat `seed.sql` data demo

### FD-03 — Setup Vercel + preview deployment
- **Acceptance criteria:** repo terhubung; push branch menghasilkan preview URL; env vars Preview + Production terpasang; region functions `sin1`.
- **Tasks:**
  - [ ] Import repo ke Vercel + set region
  - [ ] Tambah environment variables (`vercel.md` §4)
  - [ ] Verifikasi preview deployment pada satu PR

### FD-04 — App shell, routing, role guard
- **Acceptance criteria:** navbar tampil; route `(public)`, `seeker`, `employer` tersedia; middleware refresh session; akses lintas role ditolak.
- **Tasks:**
  - [ ] Root layout + navbar responsif
  - [ ] Middleware `@supabase/ssr` + role guard
  - [ ] Halaman placeholder + redirect unauthorized

### FD-05 — Domain types + repository abstraction + mock
- **Acceptance criteria:** interface `JobRepository`/`ApplicationRepository`; `MockRepository` mengembalikan data demo; factory memilih implementasi via env; UI memakai repository.
- **Tasks:**
  - [ ] Definisikan domain types + enum status
  - [ ] Implementasi MockJobRepository + MockApplicationRepository
  - [ ] Buat repository factory (mock/supabase)

### FD-06 — Production deployment + smoke test + rollback
- **Acceptance criteria:** migration dev → production; deploy dari `main` sukses; smoke test production lolos; prosedur rollback diuji/didokumentasikan.
- **Tasks:**
  - [ ] Push migration ke project production
  - [ ] Merge ke `main` + smoke test production
  - [ ] Uji rollback Vercel + catat evidence

## 3. E2 — Authentication

| ID | Story | Prioritas | SP | Sprint |
|---|---|---|---|---|
| US-01 | Login | P1 | 3 | 2 |
| US-02 | Register | P1 | 3 | 2 |
| US-03 | Logout | P1 | 1 | 2 |

### US-01 — Login
- **User story:** Sebagai user, saya ingin login agar dapat mengakses dashboard sesuai role.
- **Acceptance criteria:** form tervalidasi; kredensial salah menampilkan error spesifik; sukses redirect sesuai role; session bertahan setelah refresh.
- **Tasks:**
  - [ ] Form login + validasi + state loading/error
  - [ ] Integrasi `signInWithPassword`
  - [ ] Redirect berbasis role + proteksi route

### US-02 — Register
- **User story:** Sebagai user, saya ingin register agar dapat memiliki akun.
- **Acceptance criteria:** pilihan role wajib; email duplikat ditolak; `profiles` otomatis dibuat; redirect ke halaman sesuai role.
- **Tasks:**
  - [ ] Form register + pilih role
  - [ ] `signUp` + metadata role
  - [ ] Trigger `handle_new_user` + verifikasi row profiles

### US-03 — Logout
- **User story:** Sebagai user, saya ingin logout agar sesi saya dapat diakhiri.
- **Acceptance criteria:** session dihapus; redirect ke landing; route terproteksi tidak dapat diakses.
- **Tasks:**
  - [ ] Menu logout + `signOut`
  - [ ] Clear state + redirect

## 4. E3 — Job Discovery

| ID | Story | Prioritas | SP | Sprint |
|---|---|---|---|---|
| US-04 | Melihat daftar lowongan | P0 | 3 | 1 |
| US-05 | Mencari lowongan | P0 | 2 | 1 |
| US-06 | Memfilter lowongan | P0 | 3 | 1 |
| US-07 | Melihat detail lowongan | P0 | 2 | 1 |

### US-04 — Melihat daftar lowongan
- **Acceptance criteria:** kartu menampilkan judul/company/lokasi/tipe; hanya job `OPEN`; loading skeleton + empty state; data dari repository.
- **Tasks:**
  - [ ] JobCard + JobList
  - [ ] Loading/empty state
  - [ ] Ambil data via repository

### US-05 — Mencari lowongan
- **Acceptance criteria:** pencarian kata kunci bekerja; state tersinkron dengan URL query; input kosong mengembalikan semua.
- **Tasks:**
  - [ ] SearchBar + debounce
  - [ ] Sinkron query param `q`
  - [ ] Filter logic + unit test

### US-06 — Memfilter lowongan
- **Acceptance criteria:** filter kategori/lokasi/tipe bekerja; bisa dikombinasikan dengan pencarian; filter dapat direset; tersinkron URL.
- **Tasks:**
  - [ ] Komponen filter + state
  - [ ] Kombinasi filter + search
  - [ ] Reset + sinkron URL

### US-07 — Melihat detail lowongan
- **Acceptance criteria:** menampilkan deskripsi, company, lokasi, tipe, gaji; tombol apply/save sesuai role; 404 bila tidak ditemukan/job ditutup.
- **Tasks:**
  - [ ] Halaman detail + layout
  - [ ] Data company + detail job
  - [ ] CTA apply/save + state

## 5. E4 — Job Seeker

| ID | Story | Prioritas | SP | Sprint |
|---|---|---|---|---|
| US-08 | Menyimpan lowongan | P1 | 2 | 2 |
| US-09 | Melamar lowongan | P0 | 3 | 2 |
| US-10 | Melihat status lamaran | P0 | 2 | 2 |
| US-11 | Melihat riwayat lamaran | P0 | 2 | 2 |
| US-12 | Mengelola profil | P1 | 3 | 2 |

### US-08 — Menyimpan lowongan
- **Acceptance criteria:** toggle save/unsave; hanya untuk user login; halaman saved menampilkan daftar; hapus dari saved berfungsi.
- **Tasks:**
  - [ ] Tombol save + optimistic UI
  - [ ] Halaman saved jobs
  - [ ] Repository saved + RLS policy

### US-09 — Melamar lowongan
- **Acceptance criteria:** tombol apply tersedia pada job OPEN; tidak bisa apply dua kali; status awal `APPLIED`; muncul di dashboard + feedback sukses.
- **Tasks:**
  - [ ] Form apply (cover letter)
  - [ ] Validasi ganda + job CLOSED (server + constraint)
  - [ ] Feedback sukses/gagal

### US-10 — Melihat status lamaran
- **Acceptance criteria:** status tampil jelas (bukan hanya warna); timeline mengikuti transisi; update employer tercermin.
- **Tasks:**
  - [ ] ApplicationStatusBadge + ApplicationTimeline
  - [ ] Sinkron data status terbaru

### US-11 — Melihat riwayat lamaran
- **Acceptance criteria:** daftar semua lamaran; dapat difilter status; detail per lamaran dapat dibuka.
- **Tasks:**
  - [ ] Halaman applications + list
  - [ ] Filter status + detail

### US-12 — Mengelola profil
- **Acceptance criteria:** form profil (nama, headline, bio, lokasi, telepon); validasi; perubahan tersimpan dan tampil; upload CV masuk P2.
- **Tasks:**
  - [ ] Form profil + validasi
  - [ ] Simpan via Supabase
  - [ ] Tampilkan data profil

## 6. E5 — Employer

| ID | Story | Prioritas | SP | Sprint |
|---|---|---|---|---|
| US-13 | Dashboard employer | P0 | 5 | 3 |
| US-14 | Membuat lowongan | P0 | 5 | 3 |
| US-15 | Mengubah lowongan | P0 | 3 | 3 |
| US-16 | Menutup/menghapus lowongan | P0 | 2 | 3 |
| US-17 | Melihat kandidat | P0 | 3 | 3 |
| US-18 | Mengubah status kandidat | P0 | 3 | 3 |
| US-19 | Mengelola profil perusahaan | P1 | 3 | 3 |

### US-13 — Dashboard employer
- **Acceptance criteria:** KPI aktif jobs/applications/candidates; pipeline ringkas; recent applications; data hanya milik company sendiri.
- **Tasks:**
  - [ ] KPIStatCard + layout dashboard
  - [ ] Query agregat company
  - [ ] HiringPipeline + recent applications

### US-14 — Membuat lowongan
- **Acceptance criteria:** form lengkap + validasi; tersimpan `OPEN`; muncul di listing; hanya employer dengan company profile.
- **Tasks:**
  - [ ] Form create job + validasi
  - [ ] Simpan job + redirect
  - [ ] E2E create → tampil di listing

### US-15 — Mengubah lowongan
- **Acceptance criteria:** form terisi data lama; perubahan tersimpan; hanya pemilik; job CLOSED tetap dapat diedit.
- **Tasks:**
  - [ ] Halaman edit + prefill
  - [ ] Update + validasi kepemilikan

### US-16 — Menutup/menghapus lowongan
- **Acceptance criteria:** close mengubah status `CLOSED`; konfirmasi sebelum hapus; job CLOSED hilang dari listing publik dan menolak apply.
- **Tasks:**
  - [ ] Aksi close + konfirmasi dialog
  - [ ] Aksi delete + konfirmasi
  - [ ] Sinkron listing publik

### US-17 — Melihat kandidat
- **Acceptance criteria:** tabel kandidat per job; kolom nama/status/tanggal; hanya job milik company; state kosong jelas.
- **Tasks:**
  - [ ] Halaman applicants + tabel responsif
  - [ ] Query per job + kepemilikan
  - [ ] Detail kandidat

### US-18 — Mengubah status kandidat
- **Acceptance criteria:** transisi valid `APPLIED→SCREENING→INTERVIEW→ACCEPTED/REJECTED`; tercermin di dashboard seeker; feedback sukses; tidak bisa ubah job orang lain.
- **Tasks:**
  - [ ] Kontrol ubah status + validasi transisi
  - [ ] Server action + RLS policy
  - [ ] Unit test transisi status

### US-19 — Mengelola profil perusahaan
- **Acceptance criteria:** form company (nama, deskripsi, lokasi, website); tampil di halaman detail job; satu company per employer.
- **Tasks:**
  - [ ] Form company profile
  - [ ] Simpan + tampilkan di job detail

## 7. E6 — Shared UI/UX

| ID | Story | Prioritas | SP | Sprint |
|---|---|---|---|---|
| US-20 | Navigasi konsisten | P0 | 3 | 4 |
| US-21 | Feedback action | P0 | 2 | 2 |
| US-22 | Layout responsif | P0 | 3 | 1 |

### US-20 — Navigasi konsisten
- **Acceptance criteria:** active state benar; struktur navigasi sama di semua halaman; menu role tidak saling bocor; mobile nav berfungsi.
- **Tasks:**
  - [ ] Audit navigasi + active state
  - [ ] Mobile nav + aksesibilitas keyboard

### US-21 — Feedback action
- **Acceptance criteria:** toast sukses/gagal; dialog konfirmasi aksi destruktif; tombol loading mencegah double submit.
- **Tasks:**
  - [ ] Toast system (shadcn/ui)
  - [ ] Konfirmasi dialog + loading button

### US-22 — Layout responsif
- **Acceptance criteria:** diuji di mobile/tablet/desktop; tabel dapat diakses di mobile; tidak ada horizontal scroll yang tidak disengaja.
- **Tasks:**
  - [ ] Audit 3 breakpoint
  - [ ] Perbaiki tabel/list mobile

## 8. E7 — Docker & Documentation

| ID | Story | Prioritas | SP | Sprint |
|---|---|---|---|---|
| OPS-01 | Dockerfile + build + tag `-UTS` + push | P0 | 3 | 4 |
| OPS-02 | README final + link Docker Hub + live URL | P0 | 3 | 4 |
| OPS-03 | Decision log + evidence collection | P1 | 1 | 4 |
| OPS-04 | Presentation deck + demo script | P0 | 3 | 4 |
| OPS-05 | Setup testing (Vitest + Testing Library) | P1 | 2 | 2 |

### OPS-01 — Docker
- **Acceptance criteria:** Dockerfile root multi-stage; image berjalan; tag berakhiran `-UTS`; push sukses; public repo; link di README.
- **Tasks:**
  - [ ] Dockerfile + `.dockerignore`
  - [ ] Build + run lokal
  - [ ] Tag `v1-UTS` + push + verifikasi public

### OPS-02 — README & dokumentasi
- **Acceptance criteria:** README memuat deskripsi, fitur, stack, setup, live URL, Docker Hub, repo, team, link dokumentasi.
- **Tasks:**
  - [ ] Tulis README final
  - [ ] Verifikasi semua link

### OPS-03 — Decision log & evidence
- **Acceptance criteria:** keputusan teknis tercatat; `evidence-checklist.md` terisi; screenshot tersimpan di `docs/evidence/`.
- **Tasks:**
  - [ ] Update decision log
  - [ ] Kumpulkan screenshot Scrum/Vercel/Supabase/Docker

### OPS-04 — Presentation & demo
- **Acceptance criteria:** slide lengkap sesuai `presentation-checklist.md`; demo script dua role; latihan dua anggota.
- **Tasks:**
  - [ ] Susun slide deck
  - [ ] Demo script + rehearsal

### OPS-05 — Testing setup
- **Acceptance criteria:** `npm test` berjalan; minimal unit test filter job + transisi status + role guard; CI/lint aman.
- **Tasks:**
  - [ ] Setup Vitest + Testing Library
  - [ ] Unit test filter/status/guard

## 9. P2 — Future (Belum Dijadwalkan)

| ID | Story | Prioritas | SP | Epic |
|---|---|---|---|---|
| P2-01 | Upload CV via Supabase Storage | Low | 3 | Job Seeker |
| P2-02 | Email notification perubahan status | Low | 5 | Job Seeker |
| P2-03 | Analytics tambahan employer | Low | 3 | Employer |

## 10. Aturan Backlog

- Setiap story wajib punya Epic dan acceptance criteria.
- Prioritas mengikuti `prd.md` §11 (P0 → P1 → P2).
- Perubahan scope harus lewat keputusan tim dan update dokumen (agent.md §10).
