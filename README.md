# JobTrack

Mini job portal berbasis web yang mempertemukan **Job Seeker** dan **Employer**: mencari lowongan, melamar, mengelola lowongan, sampai memantau status rekrutmen.

| Informasi | Nilai |
|---|---|
| Live URL | _menyusul setelah deploy Vercel_ (`vercel.md`) |
| Docker Hub | _menyusul setelah push_ `<dockerhub-username>/jobtrack:v1-UTS` (`docker.md`) |
| Demo mode | Tanpa konfigurasi Supabase, aplikasi berjalan dengan data & akun demo |

## Fitur

**Public** — landing, daftar lowongan, pencarian + filter (kategori, lokasi, tipe), detail lowongan.

**Job Seeker** — register/login, dashboard ringkasan, melamar dengan surat lamaran, riwayat + progres status, simpan lowongan, kelola profil.

**Employer** — register/login, dashboard KPI + hiring pipeline, buat/edit/tutup/hapus lowongan, daftar kandidat + ubah status (validasi transisi), profil perusahaan (tampil di detail lowongan).

**UX** — responsif sampai mobile, aksesibilitas dasar (label, focus state, target sentuh), toast feedback, state loading/empty/error.

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| UI | Tailwind CSS v4 + shadcn/ui + Lucide |
| Data | Repository pattern + mock (demo) / Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth + fallback demo mode |
| Hosting | Vercel (production + preview) |
| Container | Docker (multi-stage, standalone output) |
| Testing | Vitest + Testing Library |
| Manajemen | Jira (Scrum, sprint 2 minggu) |

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Tanpa environment Supabase, aplikasi otomatis masuk **demo mode**:

| Peran | Email | Password |
|---|---|---|
| Job Seeker | `seeker@demo.jobtrack` | `demo1234` |
| Employer | `employer@demo.jobtrack` | `demo1234` |

Script:

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm test            # Vitest (unit test)
npm run build       # production build
npm run start       # jalankan hasil build
```

## Supabase (Opsional)

Aplikasi berjalan dual-mode: mock repository (demo) atau Supabase, dipilih otomatis dari environment.

```bash
cp .env.example .env.local   # isi dari Supabase dashboard (Settings > API)
supabase start               # butuh Docker
supabase db reset            # jalankan migration + seed
```

Detail: `supabase.md` (auth, RLS, migration, storage).

## Docker

```bash
docker build -t <dockerhub-username>/jobtrack:v1-UTS .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  <dockerhub-username>/jobtrack:v1-UTS

docker push <dockerhub-username>/jobtrack:v1-UTS
```

Tag wajib berakhiran `-UTS`; tanpa env Supabase image berjalan pada demo mode. Detail: `docker.md`.

## Struktur Singkat

```text
src/
├── app/                # route: (public), seeker, employer, login/register
├── components/         # ui (shadcn), layout, shared
├── features/           # auth, jobs, applications, applicants, seeker, employer
├── domain/             # entity, status, aturan transisi
├── repositories/       # kontrak + mock + supabase
├── services/           # JobService, ApplicationService
└── lib/                # auth, supabase, filters, format
supabase/               # config, migrations, seed
docs/                   # backlog, sprint, presentasi, evidence
```

## Dokumentasi

| Dokumen | Isi |
|---|---|
| `prd.md` | Product requirement, user story, prioritas |
| `architecture.md` | Arsitektur, folder, deployment topology |
| `database.md` | Skema, relasi, RLS |
| `design.md` | Design system, token, wireframe 14 layar |
| `designpattern.md` | Container-Presenter, Hooks, Repository, OOP service |
| `roadmap.md` | Phase 0-7 dan pembagian sprint |
| `git.md` | Branch naming dan commit convention |
| `docker.md` / `vercel.md` / `supabase.md` | Panduan deployment |
| `testing.md` / `jira.md` | Strategi testing dan Scrum/Jira |
| `docs/backlog/` | Backlog awal + sprint plan |
| `docs/sprint/` | Catatan per sprint |
| `docs/presentation/` | Slide outline + demo script |

## Tim

Dikerjakan oleh **2 anggota** (sesuai requirement tugas). Kontribusi masing-masing terlihat pada riwayat branch, commit, dan pull request di repository ini.
