# Supabase Plan — JobTrack

> Plan backend managed: Auth, PostgreSQL, Storage, RLS. Berpasangan dengan `vercel.md` (hosting) dan `docker.md` (requirement UTS).

## 1. Peran Supabase

Supabase menjadi backend resmi yang direncanakan:

| Kapabilitas | Dipakai untuk |
|---|---|
| Auth | Register/login/logout email + password |
| PostgreSQL | Semua data sesuai `database.md` |
| Row Level Security | Authorization per baris (role & kepemilikan) |
| Storage | Upload CV dan logo perusahaan (P2, opsional) |

Prinsip **Front-End First** tetap berlaku:

- Mock repository tetap tersedia agar UI tidak menunggu backend.
- Supabase diakses lewat repository pattern; UI tidak memanggil Supabase langsung.
- Perpindahan `MockRepository → SupabaseRepository` tidak mengubah komponen UI secara besar-besaran (`architecture.md`).

## 2. Mapping ke Blueprint

| Dokumen | Perubahan dengan Supabase |
|---|---|
| `database.md` | Skema final di Supabase; `users` digantikan `profiles` yang terhubung `auth.users` |
| `backend.md` | Service layer memakai `supabase-js`; Prisma tidak diperlukan |
| `api.md` | Akses data via Supabase client + RLS; Route Handlers hanya untuk operasi khusus/server-side |
| `designpattern.md` | `SupabaseJobRepository`, `SupabaseApplicationRepository`, dll. sebagai implementasi repository |

## 3. Auth

- Gunakan **Supabase Auth** email + password.
- Integrasi Next.js App Router memakai library `@supabase/ssr` (session berbasis cookie).
- `middleware.ts` melakukan refresh session dan role guard (`JOB_SEEKER → /seeker/*`, `EMPLOYER → /employer/*`).
- `role` disimpan di tabel `profiles`, bukan dipercaya dari client.
- Trigger `handle_new_user()` membuat row `profiles` otomatis saat signup.
- Untuk kebutuhan UTS/demo: **email confirmation dimatikan** di project demo agar demo lancar; keputusan ini dicatat di `documentation.md` (Decision Log).
- Error state yang harus ditangani UI: kredensial salah, email belum terverifikasi, session expired, rate limit.

## 4. Database & Migration

- Dua project: **dev** dan **production** (region Singapore `ap-southeast-1`).
- Migration dikelola **Supabase CLI** dan disimpan di repo:

```text
supabase/
├── config.toml
├── migrations/
│   └── <timestamp>_init_schema.sql
└── seed.sql
```

- Skema mengikuti `database.md` (profiles, seeker_profiles, companies, jobs, applications, saved_jobs).
- Enum: `user_role`, `job_status`, `application_status`.
- Index minimum: `jobs(status, created_at)`, `jobs(category)`, `jobs(location)`, `applications(job_id)`, `applications(seeker_id)`, `saved_jobs(seeker_id)`.
- Constraint: unique `(job_id, seeker_id)` pada `applications` dan `saved_jobs`.
- Alur perubahan skema: `supabase migration new <name>` → edit SQL → `supabase db push` (dev) → verifikasi → push ke production.

## 5. Row Level Security (RLS)

RLS **wajib aktif di semua tabel**. Ringkasan policy:

| Tabel | Policy |
|---|---|
| `profiles` | User hanya dapat `select`/`update` row miliknya |
| `seeker_profiles` | Pemilik `user_id` saja; employer dapat melihat profil pelamar yang melamar ke job miliknya |
| `companies` | `select` publik; `insert/update/delete` hanya pemilik `user_id` |
| `jobs` | `select` publik untuk `OPEN`; employer hanya melihat/mengelola job milik company-nya |
| `applications` | Seeker: `insert`/`select` miliknya. Employer: `select`/`update` hanya untuk job miliknya |
| `saved_jobs` | Seeker: seluruh operasi hanya untuk row miliknya |

Aturan tambahan:

- Business rule di `database.md` (tidak bisa apply dua kali, job `CLOSED` tidak menerima lamaran) dijaga kombinasi constraint + policy + server action.
- Perubahan status application mengikuti state transition `APPLIED → SCREENING → INTERVIEW → ACCEPTED/REJECTED`.

## 6. Storage (P2 — Opsional)

| Bucket | Akses | Isi |
|---|---|---|
| `cv` | Private (signed URL) | CV pelamar, path `{user_id}/...` |
| `company-logos` | Public read, owner write | Logo perusahaan |

Aturan: pemilik file = pemilik folder; employer mengakses CV via signed URL hanya untuk application pada job miliknya.

## 7. Local Development

```bash
supabase start        # menjalankan stack lokal via Docker
supabase db reset     # jalankan ulang migration + seed
supabase status       # lihat URL dan key lokal
```

- Isi `.env.local` dari `supabase status`; jangan commit.
- Local stack memakai Docker — sekaligus konsisten dengan `docker.md`.
- Tanggal perubahan migration harus dipush ke repo agar anggota tim lain sinkron.

## 8. Security Baseline

- Anon key aman di client **hanya jika RLS benar**; jangan pernah menonaktifkan RLS demi demo.
- Service role key hanya untuk operasi server-side (mis. admin task), tidak pernah ke client.
- Validasi input tetap dilakukan di server action/Route Handler, jangan hanya di UI.
- Jangan menyimpan password manual; seluruhnya ditangani Supabase Auth.
- Secrets hanya lewat environment variables (Vercel dashboard / `.env.local`).

## 9. Checklist

- [ ] Project dev dan production dibuat (Singapore).
- [ ] Migration tersimpan di `supabase/migrations`.
- [ ] RLS aktif di seluruh tabel + policy teruji.
- [ ] Auth email/password berjalan (register/login/logout).
- [ ] Trigger `handle_new_user` membuat `profiles`.
- [ ] Repository Supabase menggantikan mock tanpa mengubah UI.
- [ ] Environment variables terpasang di Vercel.
- [ ] Smoke test di preview dan production berhasil.
- [ ] Screenshot bukti (dashboard, table editor, auth users) disimpan untuk presentasi.
