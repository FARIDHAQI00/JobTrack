# Slide Outline — JobTrack

> Mengikuti `presentation-checklist.md`. Isi screenshot setelah aplikasi live.

## 1. Judul Project & Tim

- JobTrack — mini job portal
- Nama dan peran dua anggota
- Link repository

## 2. Deskripsi

- Masalah: pencari kerja butuh tempat sederhana untuk menemukan lowongan dan memantau lamaran; employer butuh cara cepat mengelola lowongan dan kandidat.
- Tujuan: portal dua role dengan alur lengkap post → apply → review → status.
- Manfaat: alur rekrutmen ringkas, transparan, dan mudah dipakai.

## 3. Tampilan & Fungsionalitas

- Screenshot: landing, listing + filter, detail lowongan
- Screenshot: dashboard Job Seeker (KPI + timeline status)
- Screenshot: dashboard Employer (KPI + hiring pipeline + kandidat)
- Fitur unggulan: apply dengan validasi transisi status, dual-mode Supabase/demo

## 4. Agile & Scrum

- Backlog awal (`docs/backlog/`) + screenshot Jira
- User story (22) dan feature mapping
- Sprint 1-4, sprint 2 minggu
- Pembagian tugas dua anggota
- Screenshot sprint board, review, retrospective

## 5. Arsitektur & Design

- Framework: Next.js 16 + TypeScript; UI: Tailwind v4 + shadcn/ui
- Data: repository pattern (mock ↔ Supabase), RLS
- Design pattern: Repository, Container-Presenter + Hooks, OOP service (`JobService`, `ApplicationService`)
- Contoh kode pattern + file path

## 6. Deployment (Vercel + Supabase)

- Live URL
- Screenshot Vercel: production + preview deployment
- Screenshot Supabase: table editor, RLS, auth users
- Alur branch → preview → merge → production

## 7. Docker

- Docker Hub public link
- Dockerfile multi-stage + penjelasan tiap stage
- `docker build` → tag `-UTS` → `push` → verifikasi public image

## 8. Rencana Pengembangan

- P2: upload CV (Supabase Storage), email notification, analytics tambahan
- Visi: rekomendasi lowongan, integrasi multi-company
