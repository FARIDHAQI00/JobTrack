# Database Design — JobTrack

> Backend/database bersifat opsional sesuai requirement tugas. Target implementasi persistence adalah **Supabase PostgreSQL** (`supabase.md`). Selama belum aktif, struktur entity direpresentasikan melalui TypeScript types dan mock repository.

## 1. DBMS

PostgreSQL via Supabase.

- Project dev dan production (region Singapore `ap-southeast-1`).
- Skema dikelola migration Supabase CLI, tersimpan di `supabase/migrations/`.
- RLS (Row Level Security) wajib aktif di semua tabel.

## 2. Entities

### profiles
Terhubung 1-1 dengan `auth.users` (Supabase Auth mengelola password).

- `id` UUID PK (= `auth.users.id`)
- `email` unique
- `role` ENUM(`JOB_SEEKER`, `EMPLOYER`)
- `created_at`
- `updated_at`

Trigger `handle_new_user()` membuat row ini otomatis saat signup. Password tidak disimpan di tabel aplikasi.

### seeker_profiles
- `id` UUID PK
- `user_id` FK profiles unique
- `full_name`
- `headline`
- `bio`
- `location`
- `phone`
- `cv_url`
- timestamps

### companies
- `id` UUID PK
- `user_id` FK profiles unique
- `name`
- `description`
- `location`
- `website`
- `logo_url`
- timestamps

### jobs
- `id` UUID PK
- `company_id` FK companies
- `title`
- `description`
- `category`
- `location`
- `employment_type`
- `salary_min`
- `salary_max`
- `status` ENUM(`OPEN`, `CLOSED`)
- `created_at`
- `updated_at`

### applications
- `id` UUID PK
- `job_id` FK jobs
- `seeker_id` FK profiles
- `status` ENUM(`APPLIED`,`SCREENING`,`INTERVIEW`,`ACCEPTED`,`REJECTED`)
- `cover_letter`
- `cv_url`
- `applied_at`
- `updated_at`

Unique constraint: `(job_id, seeker_id)`.

### saved_jobs
- `id` UUID PK
- `job_id` FK jobs
- `seeker_id` FK profiles
- `created_at`

Unique constraint: `(job_id, seeker_id)`.

## 3. Index & Constraint Tambahan

- `jobs(status, created_at)` — listing lowongan.
- `jobs(category)`, `jobs(location)` — filter.
- `applications(job_id)`, `applications(seeker_id)` — query dashboard.
- `saved_jobs(seeker_id)` — halaman saved.
- Unique `(job_id, seeker_id)` pada `applications` dan `saved_jobs`.

## 4. Relations

```text
auth.users 1---1 profiles
profiles 1---1 seeker_profiles
profiles 1---1 companies
companies 1---N jobs
profiles(Job Seeker) 1---N applications
jobs 1---N applications
profiles(Job Seeker) N---N jobs via saved_jobs
```

## 5. Business Rules

1. Hanya Employer yang dapat membuat job.
2. Hanya pemilik company yang dapat mengubah job miliknya.
3. Job Seeker tidak dapat apply dua kali pada job yang sama.
4. Job CLOSED tidak menerima application baru.
5. Employer hanya dapat mengubah status kandidat pada job miliknya.
6. Status application mengikuti state transition yang didefinisikan.

Aturan ini dijaga berlapis: constraint database + RLS policy + validasi server action.

## 6. Row Level Security

Ringkasan policy ada di `supabase.md` §5. Prinsip:

- Seeker hanya mengakses data miliknya.
- Employer hanya mengakses data company/job miliknya.
- Data publik (job OPEN, company profile) dapat dibaca tanpa login.
- RLS tidak boleh dinonaktifkan demi demo.

## 7. MVP Mock Data

Jika database belum diaktifkan, struktur entity di atas direpresentasikan melalui TypeScript types dan mock repository. `MockRepository` dan `SupabaseRepository` harus memenuhi kontrak yang sama (`backend.md` §5).
