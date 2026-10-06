# Phase 5 — Technical Completion Checklist

Status per item dari `docs-blueprint/roadmap.md` Phase 5. Diperbarui terakhir 6 Oktober 2026 (Docker Hub, RLS, Vercel, reorganisasi `docs-blueprint/`).

## Selesai (otomatis / tanpa akun)

| Item | Bukti |
|---|---|
| Testing | `npm test` 36 test lulus (6 file) + `npm run lint`, `npm run typecheck`, `npm run build` |
| Dokumentasi | README final, `docs/sprint/`, `docs/presentation/`, `docs/evidence/` |
| Design pattern verification | `docs/design-pattern-verification.md` + `docs-blueprint/designpattern.md` tersinkron |
| Git review | `docs/evidence/git-review.md` |
| Dockerfile | `Dockerfile` multi-stage + `.dockerignore` + `output: "standalone"` (build aplikasi terverifikasi menghasilkan `.next/standalone/server.js`) |

## Selesai (eksekusi 6 Oktober 2026)

| Item | Bukti |
|---|---|
| Docker build | `docker build -t jobtrack:v1-UTS .` sukses (multi-stage deps → builder → runner, ~300MB) |
| Docker run | Smoke test container: HTTP 200 di `http://localhost:3100` (tanpa env Supabase, demo mode) |
| Docker login + push | `docker login` (Docker Hub: faridhaqi) → `docker push faridhaqi/jobtrack:v1-UTS` sukses |
| Verifikasi image publik | https://hub.docker.com/r/faridhaqi/jobtrack — `is_private: false`, status active |
| README Docker Hub link | README memakai `faridhaqi/jobtrack:v1-UTS` |
| Docker pull | `docker pull faridhaqi/jobtrack:v1-UTS` sukses — digest `sha256:3faa5129adcf5247ef1ed5259dd597f16c3f18d063884e2b7263c58c76414382` |
| Validasi migration + seed | `supabase start` + `supabase db reset` sukses — migrasi `20261005090000_init_schema.sql` + seed ter-apply |
| RLS test | `supabase test db` → pgTAP **12/12 PASS** (`supabase/tests/rls.test.sql`) |
| Supabase project | Project `jobtrack` dibuat (ref `qplsfdrnftpbbvfrooma`) — migrasi + seed menunggu `supabase db push --include-seed` |
| Vercel project + production | https://job-track-ivory-omega.vercel.app — terhubung ke repo, deploy dari `main` sukses |
| Live URL di README | README sudah memuat URL produksi |
| Merge 8 PR | 8 branch (setup → sprint 4) merge berurutan ke `main` via PR #1-#8, `main` terverifikasi |
| Reorganisasi dokumen | Semua dokumen blueprint dipindah ke `docs-blueprint/` (20 file), README disinkronkan |

## Menunggu aksi manual

| Item | Kebutuhan | Cara |
|---|---|---|
| Push redesign ke `main` | git | commit + push (dieksekusi 6 Okt) → Vercel deploy otomatis |
| Vercel env Supabase | akun Vercel | Settings → Environment Variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL` → Redeploy |
| Supabase cloud migration + seed | akun Supabase | `supabase login` → `supabase link --project-ref qplsfdrnftpbbvfrooma` → `supabase db push --include-seed` |
| Supabase Auth URL config | Supabase dashboard | Authentication → URL Configuration → Site URL = URL produksi |
| Rollback drill | Vercel | promote deployment lama, catat hasil |
| Jira project + invite | akun Jira | `docs-blueprint/jira.md` §2-3 + import `docs/backlog/jira-import.csv` |
| Screenshot evidence | setelah semua di atas | `docs/evidence/README.md` |

## Urutan Eksekusi

1. ~~Nyalakan Docker Desktop → Docker build/run~~ ✅ 6 Okt 2026
2. ~~`supabase start` + `db reset` + `test db`~~ ✅ 6 Okt 2026
3. ~~Push image `-UTS` → update link README~~ ✅ 6 Okt 2026
4. ~~Merge 8 PR → connect Vercel → deploy production → live URL~~ ✅ 6 Okt 2026
5. **Berikutnya:** push redesign ke `main` → isi env Vercel → `db push` Supabase cloud → Auth URL config.
6. Kumpulkan screenshot evidence + latihan demo.
