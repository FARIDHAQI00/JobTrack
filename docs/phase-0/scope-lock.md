# Phase 0 — Project & Requirement Lock

> Status: **SIAP DITINJAU** — menunggu approval dua anggota tim.
> Tanggal disusun: 05-10-2026
> Referensi: `roadmap.md` Phase 0, `prd.md`, `requirements.md`.

## 1. Checklist Phase 0

| Aktivitas | Status | Bukti |
|---|---|---|
| Review UTS requirements | Selesai | `requirements.md`, brief dosen |
| Review `prd.md` | Selesai | `prd.md` |
| Review `requirements.md` | Selesai | `requirements.md` |
| Confirm dua role | Terkunci | `prd.md` §5, `agent.md` §3 |
| Confirm MVP | Terkunci | `prd.md` §7 & §11 |
| Confirm deployment stack | Terkunci | `vercel.md`, `supabase.md`, `docker.md` |
| Create Jira Scrum project | **Manual — belum dibuat** | `jira.md` §2–3 |
| Create initial backlog | Selesai (siap import) | `docs/backlog/` |
| Sprint structure | Selesai | `docs/backlog/sprint-plan.md` |

Catatan kejujuran (agent.md §15): Jira belum dibuat dan Asleb/dosen belum di-invite. Dua hal itu memerlukan akun Jira tim dan dilakukan manual.

## 2. Scope Lock

### Roles (terkunci)

- `JOB_SEEKER`
- `EMPLOYER`
- Tidak ada role Admin.

### MVP (terkunci)

P0: job listing + detail, apply, dashboard seeker, posting job, applicant management, status tracking, responsive foundation, deployment preview.

P1: auth UI, saved jobs, profile seeker, search/filter lanjutan, company profile.

P2 (tidak dijadwalkan): upload CV, notification, analytics tambahan.

### Non-Goal (terkunci)

Payment, payroll, video interview, chat real-time, AI recruitment, integrasi job portal eksternal, sistem HR enterprise.

### Tech Stack Lock

| Layer | Pilihan |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Supabase (Auth, PostgreSQL, RLS, Storage P2) |
| Repository | Repository Pattern + mock fallback |
| Hosting | Vercel (production + preview) |
| Container | Docker (wajib UTS, tag `-UTS`) |
| PM | Jira Scrum, sprint 2 minggu, 2 anggota |

## 3. Decision Log Phase 0

| ID | Keputusan | Alasan | Konsekuensi |
|---|---|---|---|
| D-01 | Hosting Vercel | Native Next.js, preview per PR | `main` = production, butuh disiplin PR |
| D-02 | Backend Supabase | Auth/DB/RLS terkelola, mempercepat persistence | Wajib migrasi + RLS benar |
| D-03 | Docker tetap dibuat | Requirement UTS | Dua jalur delivery (Vercel + Docker) |
| D-04 | Mock-first repository | UI tidak menunggu backend | Kontrak repository harus stabil |
| D-05 | Email confirmation OFF di project demo | Kelancaran live demo | Dicatat di Decision Log `documentation.md` |
| D-06 | Struktur repo: dokumen blueprint di root + aplikasi di `src/` | README & Dockerfile wajib di root | Perlu persetujuan tim (lihat §4) |

## 4. Manual Actions (membutuhkan akun/tindakan tim)

### Jira

- [ ] Buat project Scrum `JobTrack` (`jira.md` §2).
- [ ] Invite `hidayat22.mhs.usk.ac.id`, `m.ridho22.mhs.usk.ac.id`, `maulyanda@usk.ac.id` (`jira.md` §3).
- [ ] Buat Sprint 1–4 di backlog.
- [ ] Import `docs/backlog/jira-import.csv` (`jira.md` §13).
- [ ] Tentukan assignee dua anggota.
- [ ] Ambil screenshot board untuk evidence.

### Akun & Deployment

- [ ] Setujui struktur repo (D-06).
- [ ] Buat akun/project Vercel + Supabase (boleh saat Sprint 1).
- [ ] Tentukan nama project Supabase dan simpan kredensial di tempat aman (bukan repo).

### Approval

- [ ] Anggota 1 — setuju scope, stack, dan backlog.
- [ ] Anggota 2 — setuju scope, stack, dan backlog.
- [ ] Setelah disetujui: tandai `prd.md` sebagai **approved** dan mulai Sprint 1.

## 5. Output Phase 0

| Output | Lokasi | Status |
|---|---|---|
| PRD approved | `prd.md` | Menunggu tanda tangan |
| Backlog created | `docs/backlog/backlog.md` + CSV | Selesai |
| Sprint structure ready | `docs/backlog/sprint-plan.md` | Selesai |
| Deployment plan | `vercel.md`, `supabase.md` | Selesai |
