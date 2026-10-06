# Backend Blueprint

## 1. Status

Backend **opsional** menurut requirement tugas. MVP Front-End harus tetap dapat berjalan tanpa backend.

## 2. Chosen Option — Supabase

Backend yang direncanakan:

- **Supabase Auth** — register/login/logout, session cookie via `@supabase/ssr`
- **Supabase PostgreSQL** — persistence + RLS (`database.md`)
- **Supabase Storage** — CV/logo (P2)
- **Next.js Route Handlers** — hanya untuk operasi server-side khusus (mis. signed URL, webhook, agregasi)
- TypeScript

Prisma tidak diperlukan karena akses data memakai `supabase-js`. Detail: `supabase.md`.

Alternatif backend Node.js terpisah tidak diperlukan untuk scope UTS.

## 3. Responsibilities

Backend bertanggung jawab atas:
- authentication/authorization bila dibuat
- CRUD jobs
- applications
- applicant status
- profile
- validation
- persistence

Frontend bertanggung jawab atas:
- presentation
- client state
- form UX
- loading/error state
- responsive UI

## 4. Service Layer

```text
JobService
- listJobs()
- getJobById()
- createJob()
- updateJob()
- closeJob()

ApplicationService
- applyToJob()
- listMyApplications()
- listJobApplicants()
- updateApplicationStatus()

ProfileService
- getProfile()
- updateProfile()
```

## 5. Repository Contract

UI/service tidak boleh langsung bergantung pada Supabase client. Kontrak berikut dipenuhi dua implementasi: `MockJobRepository` dan `SupabaseJobRepository`.

```text
JobRepository
  findAll()
  findById()
  create()
  update()
  close()

ApplicationRepository
  create()
  findBySeeker()
  findByJob()
  updateStatus()
```

Pemilihan implementasi lewat factory/config (mis. environment), sehingga UI tidak berubah saat mock diganti Supabase.

## 6. Error Handling

Gunakan error category:
- Validation Error
- Authentication Error
- Authorization Error
- Not Found
- Conflict
- Internal Error

Frontend harus menampilkan feedback yang jelas.

## 7. Security Baseline

- Jangan menyimpan password di tabel aplikasi; gunakan Supabase Auth.
- Validasi input di server (server action / Route Handler), bukan hanya di UI.
- Authorization wajib dicek server-side: RLS + pengecekan kepemilikan pada server action.
- Jangan mempercayai `role` dari client.
- Gunakan environment variables untuk secret; service role key hanya server-side.
- `.env.local` tidak boleh di-commit.
