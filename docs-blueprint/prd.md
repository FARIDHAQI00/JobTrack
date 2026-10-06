# PRD — JobTrack

## 1. Product Overview

JobTrack adalah mini job portal yang menyediakan dua pengalaman pengguna: pencari kerja dan perusahaan. Produk berfokus pada Front-End Development sesuai fokus tugas.

## 2. Problem

Pencari kerja membutuhkan tempat sederhana untuk menemukan lowongan dan mengetahui progres lamaran. Perusahaan membutuhkan antarmuka sederhana untuk mempublikasikan lowongan dan mengelola kandidat.

## 3. Goal

1. Menyediakan pencarian dan discovery lowongan.
2. Memungkinkan Job Seeker melakukan simulasi apply.
3. Memungkinkan Employer membuat dan mengelola lowongan.
4. Menampilkan status proses rekrutmen pada dashboard masing-masing.
5. Menghasilkan project Front-End yang dapat didemokan.
6. Mendokumentasikan Agile/Scrum, Git, design pattern, dan Docker.
7. Men-deploy aplikasi ke Vercel sebagai live demo (`vercel.md`).
8. Menggunakan Supabase (Auth + PostgreSQL + RLS) sebagai backend bertahap (`supabase.md`).

## 4. Non-Goal

- Payment.
- Payroll.
- Video interview.
- Chat real-time.
- AI recruitment.
- Integrasi job portal eksternal.
- Sistem HR enterprise.

## 5. Roles

### Job Seeker
- Register/login simulasi
- Browse/search/filter jobs
- View job detail
- Save job
- Apply
- View application history
- Track application status
- Manage profile

### Employer
- Register/login simulasi
- Manage company profile
- Create job
- Edit/delete/close job
- View applicants
- Change applicant status
- View dashboard statistics

## 6. Application Status

Canonical status:

`APPLIED → SCREENING → INTERVIEW → ACCEPTED`

Alternative terminal status:

`REJECTED`

Status tidak boleh berubah sembarangan; UI harus mengikuti transisi yang didefinisikan.

## 7. MVP Pages

### Public
- `/`
- `/jobs`
- `/jobs/[id]`
- `/login`
- `/register`

### Job Seeker
- `/seeker/dashboard`
- `/seeker/applications`
- `/seeker/saved`
- `/seeker/profile`

### Employer
- `/employer/dashboard`
- `/employer/jobs`
- `/employer/jobs/new`
- `/employer/jobs/[id]`
- `/employer/jobs/[id]/applicants`
- `/employer/profile`

## 8. User Stories

### Authentication
- US-01: Sebagai user, saya ingin login agar dapat mengakses dashboard sesuai role.
- US-02: Sebagai user, saya ingin register agar dapat memiliki akun.
- US-03: Sebagai user, saya ingin logout agar sesi saya dapat diakhiri.

### Job Seeker
- US-04: Sebagai Job Seeker, saya ingin melihat daftar lowongan agar dapat mencari pekerjaan.
- US-05: Sebagai Job Seeker, saya ingin mencari lowongan berdasarkan kata kunci.
- US-06: Sebagai Job Seeker, saya ingin memfilter lowongan berdasarkan kategori/lokasi.
- US-07: Sebagai Job Seeker, saya ingin melihat detail lowongan sebelum melamar.
- US-08: Sebagai Job Seeker, saya ingin menyimpan lowongan.
- US-09: Sebagai Job Seeker, saya ingin melamar lowongan.
- US-10: Sebagai Job Seeker, saya ingin melihat status setiap lamaran.
- US-11: Sebagai Job Seeker, saya ingin melihat riwayat lamaran.
- US-12: Sebagai Job Seeker, saya ingin mengelola profil.

### Employer
- US-13: Sebagai Employer, saya ingin melihat ringkasan lowongan dan kandidat.
- US-14: Sebagai Employer, saya ingin membuat lowongan.
- US-15: Sebagai Employer, saya ingin mengubah lowongan.
- US-16: Sebagai Employer, saya ingin menutup/menghapus lowongan.
- US-17: Sebagai Employer, saya ingin melihat kandidat yang melamar.
- US-18: Sebagai Employer, saya ingin mengubah status kandidat.
- US-19: Sebagai Employer, saya ingin mengelola profil perusahaan.

### UI/UX
- US-20: Sebagai user, saya ingin navigasi yang konsisten.
- US-21: Sebagai user, saya ingin mendapat feedback saat action berhasil/gagal.
- US-22: Sebagai user, saya ingin layout responsif.

## 9. Features

| Feature | User Story |
|---|---|
| Authentication | US-01–03 |
| Job Discovery | US-04–07 |
| Saved Jobs | US-08 |
| Application | US-09–11 |
| Seeker Profile | US-12 |
| Employer Dashboard | US-13 |
| Job Management | US-14–16 |
| Applicant Management | US-17–18 |
| Company Profile | US-19 |
| Shared UI/UX | US-20–22 |

## 10. Acceptance Criteria Umum

- Setiap halaman utama dapat diakses melalui flow yang jelas.
- Role Job Seeker tidak menampilkan menu Employer.
- Role Employer tidak menampilkan menu Job Seeker.
- Apply hanya dapat dilakukan pada lowongan yang tersedia.
- Setelah apply, lamaran muncul pada dashboard/application list.
- Perubahan status kandidat tercermin pada dashboard Job Seeker.
- Form memiliki validasi dan feedback.
- Layout responsive.
- Semua fitur MVP mempunyai User Story dan task Jira.

## 11. Scope Control

Jika waktu terbatas, urutan prioritas:

P0: jobs, detail, apply, dashboard seeker, posting job, applicant management, status tracking.

P1: auth UI, saved jobs, profile, search/filter.

P2: upload CV, notification, analytics tambahan.

Catatan: persistence backend via Supabase direncanakan bertahap (bukan blocker MVP). UI tetap berjalan dengan mock repository sampai `SupabaseRepository` siap. Deployment Vercel mengikuti `vercel.md`.
