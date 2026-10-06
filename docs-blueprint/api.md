# API Contract

> Kontrak logis antara UI dan data layer. Dengan Supabase aktif, operasi data utama berjalan melalui repository → `supabase-js` + RLS (`supabase.md`), bukan REST endpoint. Endpoint di bawah tetap menjadi kontrak resmi untuk Route Handlers bila dibutuhkan (operasi server-side khusus).

## Data Access Model

```text
Page → Hook/Container → Service → Repository
                                   ├── MockRepository      (fallback MVP)
                                   └── SupabaseRepository  (Supabase client + RLS)
                                              │
                                   Route Handler (opsional)
                                   hanya untuk operasi server-side khusus
```

Aturan:

- UI tidak memanggil Supabase client secara langsung; selalu lewat repository.
- Authorization utama ada di RLS; Route Handler wajib mengecek ulang kepemilikan.
- Format response di bagian bawah berlaku untuk Route Handlers.

## Authentication

Ditangani **Supabase Auth** (bukan Route Handler): register, login, logout, session refresh via `@supabase/ssr`, callback `/auth/callback`.

Jika tetap disediakan sebagai kontrak server:

`POST /api/auth/login`
- Input: email, password
- Output: authenticated user/session

`POST /api/auth/register`
- Input: email, password, role
- Output: user

## Jobs

`GET /api/jobs`
- query: `q`, `category`, `location`, `page`

`GET /api/jobs/:id`

`POST /api/jobs`
- Role: EMPLOYER

`PATCH /api/jobs/:id`
- Role: owner EMPLOYER

`DELETE /api/jobs/:id`
- Role: owner EMPLOYER

## Applications

`POST /api/jobs/:id/applications`
- Role: JOB_SEEKER

`GET /api/seeker/applications`
- Role: JOB_SEEKER

`GET /api/employer/jobs/:id/applicants`
- Role: EMPLOYER owner

`PATCH /api/applications/:id/status`
- Role: EMPLOYER owner

## Saved Jobs

`POST /api/jobs/:id/save`

`DELETE /api/jobs/:id/save`

`GET /api/seeker/saved`

## Response Convention

Success:
```json
{
  "data": {},
  "message": "Success"
}
```

Error:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input"
  }
}
```
