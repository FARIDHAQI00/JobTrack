# Sprint 4 — Integration + Polish + Delivery

- **Periode (rencana):** 17-11-2026 s.d. 30-11-2026
- **Sprint Goal:** aplikasi koheren dan siap dinilai: navigasi konsisten, state lengkap, Docker siap, README final, materi presentasi.
- **Branch:** `feat_sprint-4-integration/DD-MM-YYYY` (dibuat oleh anggota yang mengeksekusi sprint ini)

> Catatan handoff: perubahan Sprint 4 pada working tree dikerjakan sebagai bahan commit anggota kedua. Anggota yang commit wajib menjalankan verifikasi dulu (lihat bagian Verifikasi) dan memakai identitas git masing-masing.

## Capaian (kode)

| Item | Keterangan |
|---|---|
| US-20 Navigasi konsisten | Nav aktif (public + dashboard), mobile nav, konsistensi header/footer |
| Polish state | Custom `not-found`, `error` boundary, loading skeleton untuk listing & detail lowongan |
| Aksesibilitas | Skip-link "Lewati ke konten" di public layout dan dashboard shell |
| Employer polish | Section "Kandidat Tahap Interview" di dashboard employer |
| FD-06 persiapan | `output: "standalone"` di `next.config.ts` untuk image runtime kecil |
| OPS-01 Docker | `Dockerfile` multi-stage (deps → builder → runner) + `.dockerignore` |
| OPS-02 README | README final: fitur, stack, setup, demo, Docker, dokumentasi, tim |
| OPS-03 Dokumentasi | Slide outline, demo script, panduan evidence |

## Menunggu aksi manual tim

| Item | Alasan | Cara |
|---|---|---|
| Docker build/run/tag/push | Docker daemon belum berjalan saat pengerjaan | `docker build` → `tag -UTS` → `push` (`docker.md` §4) |
| Production deploy + rollback drill | akun Vercel belum terhubung | `vercel.md` §3, §7 |
| Supabase migration production | project Supabase belum dibuat | `supabase.md` §4 |
| Uji RLS lintas role di database | butuh Docker/Supabase aktif | `supabase db reset` lalu uji akses dua role |
| Screenshot evidence | dilakukan setelah deploy | `docs/evidence/README.md` |
| Slide final (PPT) | outline tersedia | `docs/presentation/slide-outline.md` |

## Verifikasi (wajib dijalankan sebelum commit)

| Perintah | Target |
|---|---|
| `npm run lint` | bersih |
| `npm run typecheck` | bersih |
| `npm test` | 36 test lulus |
| `npm run build` | sukses, route lengkap |

Verifikasi yang belum bisa dilakukan tanpa akun/Docker: build image, push Docker Hub, deploy Vercel, uji Supabase end-to-end. **Jangan klaim sudah dilakukan sampai benar-benar dieksekusi** (`agent.md` §15).

## Definition of Done Sprint 4

- [x] Navigasi dan state konsisten (kode)
- [x] Dockerfile + .dockerignore siap (belum di-build)
- [x] README final + dokumentasi sprint/presentasi
- [ ] Docker image `-UTS` di-push ke Docker Hub
- [ ] Production deployment + smoke test + rollback drill
- [ ] Evidence lengkap (`docs/evidence/README.md`)
- [ ] Task Jira dipindah ke Done

## Review & Retrospective

- **Sprint Review:** _diisi saat demo_
- **Retrospective:** _diisi setelah review_
