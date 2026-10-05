# Architecture — JobTrack

## 1. Target Architecture

```text
Browser
  |
  v
Vercel — Next.js App Router (production + preview)
  |
  +-- UI Components
  +-- Pages / Route Segments
  +-- Feature Modules
  +-- Hooks
  +-- Service / Repository Layer
          |
          +-- Mock Repository (MVP fallback, UI tidak menunggu backend)
          |
          +-- Supabase Repository
          |       |
          |       v
          |   Supabase
          |   +-- Auth (email/password, session)
          |   +-- PostgreSQL + RLS
          |   +-- Storage (CV/logo, P2)
          |
          +-- API Client (Next.js Route Handlers, hanya bila perlu)
```

## 2. Architectural Principle

Front-End menjadi prioritas. UI tidak boleh langsung mengetahui detail penyimpanan data.

Flow:

`Page → Container/Hook → Service/Repository → Data Source`

## 3. Recommended Folder Structure

```text
src/
├── app/
│   ├── (public)/
│   ├── seeker/
│   ├── employer/
│   ├── auth/
│   └── api/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── features/
│   ├── auth/
│   ├── jobs/
│   ├── applications/
│   ├── applicants/
│   ├── seeker/
│   └── employer/
├── hooks/
├── services/
├── repositories/
│   ├── job-repository.ts
│   ├── supabase/
│   └── mock/
├── domain/
├── lib/
│   └── supabase/        # client, server, middleware helpers (@supabase/ssr)
├── types/
└── mocks/

supabase/
├── config.toml
├── migrations/
└── seed.sql
```

## 4. Layer Responsibility

- `app/`: routing dan page composition.
- `components/`: reusable presentation components.
- `features/`: business feature modules.
- `hooks/`: state/effect composition.
- `services/`: use-case/service orchestration.
- `repositories/`: abstraction data access (`mock/` dan `supabase/`).
- `domain/`: entity/type/rules yang tidak tergantung UI.
- `mocks/`: data untuk MVP tanpa backend.
- `lib/`: utility/config, termasuk Supabase client/server helper.
- `supabase/`: config, migration, seed (dikelola Supabase CLI).

## 5. Role Guard

Route harus memeriksa role sebelum menampilkan dashboard:

`JOB_SEEKER → /seeker/*`

`EMPLOYER → /employer/*`

Unauthorized access diarahkan ke halaman yang sesuai.

## 6. State

Gunakan local state untuk state komponen. Gunakan shared state hanya untuk kebutuhan lintas halaman. Hindari global state besar tanpa alasan.

## 7. OOP Compliance

Karena requirement menyebut framework wajib berbasis OOP dan contoh React/Next.js tetap diperbolehkan pada dokumen tugas, gunakan TypeScript untuk menerapkan konsep OOP pada domain/service yang relevan, misalnya `JobService`, `ApplicationService`, dan repository interface/implementation. UI React tetap menggunakan pola React modern.

## 8. Scalability

MVP boleh memakai mock repository. Repository contract harus dirancang agar mock dapat diganti Supabase/API tanpa mengubah komponen UI secara besar-besaran.

## 9. Deployment Topology

```text
GitHub (main)
   |
   +--> Vercel        → production deployment + preview per PR (vercel.md)
   |
   +--> Docker image  → requirement UTS, portabel untuk demo lokal (docker.md)

Vercel Next.js
   |
   +--> Supabase Auth        (session cookie via @supabase/ssr)
   +--> Supabase PostgreSQL  (Repository Pattern + RLS)
   +--> Supabase Storage     (P2)
```

- Session auth menggunakan cookie (bukan localStorage) agar aman di App Router dan middleware.
- Role guard berjalan di `middleware.ts` dan diverifikasi ulang oleh RLS di database.
- Local development dapat memakai Supabase local (`supabase start`, berbasis Docker) atau project dev.

Detail: `vercel.md`, `supabase.md`.
