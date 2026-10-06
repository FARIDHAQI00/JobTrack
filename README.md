# JobTrack — Blueprint Project

> Mini Job Portal berbasis web untuk mempertemukan **Job Seeker** dan **Employer**.

## 1. Konsep Singkat

JobTrack memiliki dua role utama:

- **Job Seeker**: mencari lowongan, melihat detail, melamar, menyimpan lowongan, dan memantau progres lamaran.
- **Employer**: membuat profil perusahaan, membuat/mengelola lowongan, melihat kandidat, dan memperbarui status kandidat.

Alur besar:

`Employer Post Loker → Job Seeker Browse → Detail → Apply → Employer Review → Status Lamaran → Job Seeker Tracking`

## 2. Teknologi yang Direncanakan

- Next.js + TypeScript
- React
- Tailwind CSS
- Next.js App Router
- Backend managed: **Supabase** (Auth + PostgreSQL + Storage + RLS)
- Hosting: **Vercel** (production + preview deployment)
- Next.js Route Handlers untuk operasi server-side bila diperlukan
- Mock repository sebagai fallback agar Front-End tetap berjalan tanpa backend
- Docker
- Git + GitHub
- Jira untuk Scrum

## 3. Dokumen Blueprint

| File | Tujuan |
|---|---|
| `prd.md` | Product Requirement Document |
| `requirements.md` | Traceability requirement tugas → project |
| `architecture.md` | Arsitektur sistem |
| `database.md` | Desain data/database |
| `backend.md` | Rancangan backend opsional |
| `api.md` | Kontrak API |
| `designpattern.md` | Design pattern dan penerapannya |
| `design.md` | Blueprint UI/UX |
| `roadmap.md` | Roadmap dan pembagian sprint |
| `git.md` | Aturan Git/GitHub sesuai tugas |
| `docker.md` | Dockerfile, build, tag, push |
| `vercel.md` | Plan hosting/deployment Vercel |
| `supabase.md` | Plan backend Supabase (Auth, DB, RLS, Storage) |
| `documentation.md` | Standar dokumentasi kode/fungsi |
| `testing.md` | Strategi testing |
| `jira.md` | Tutorial setup Scrum/Jira + import backlog |
| `agent.md` | Instruksi AI/agent agar eksekusi konsisten |
| `CONTRIBUTING.md` | Aturan kontribusi tim |
| `evidence-checklist.md` | Checklist bukti UTS |
| `presentation-checklist.md` | Checklist slide & demo |
| `docs/` | Artefak Phase 0, backlog, sprint, evidence |

## 4. Prioritas

**MVP wajib:** UI utama, dua role, browsing lowongan, apply, dashboard, employer posting, status lamaran, Git/GitHub, Scrum/Jira, design pattern, Docker image.

**Terencana (backend/hosting):** Supabase (Auth + PostgreSQL + RLS) dan Vercel (deployment), dikerjakan bertahap tanpa menghambat MVP. Lihat `supabase.md` dan `vercel.md`.

**Opsional/P2:** upload CV via Supabase Storage, email notification, chat, recommendation system.

## 5. Prinsip

Jangan memperluas scope sebelum MVP selesai. Semua pekerjaan harus dapat ditelusuri ke User Story/Feature/Backlog.
