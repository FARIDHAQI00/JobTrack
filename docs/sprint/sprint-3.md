# Sprint 3 — Employer

- **Periode (rencana):** 03-11-2026 s.d. 16-11-2026
- **Sprint Goal:** Employer dapat mengelola profil perusahaan, lowongan, dan kandidat end-to-end; RLS employer diverifikasi lewat aturan service.
- **Branch:** `feat_sprint-3-employer/05-10-2026`

## Capaian

### Selesai (kode)

| Item | Keterangan |
|---|---|
| US-13 Dashboard | KPI (lowongan aktif, pelamar, interview, diterima), HiringPipeline, aktivitas terbaru, daftar lowongan + jumlah pelamar |
| US-14 Buat lowongan | Form tervalidasi + `JobService.createJob` (wajib company profile), lowongan langsung OPEN dan tampil di listing publik |
| US-15 Edit lowongan | Form prefill + `JobService.updateJob` dengan cek kepemilikan |
| US-16 Tutup/Hapus | Dropdown aksi + dialog konfirmasi; Tutup = CLOSED, Hapus = konfirmasi destruktif (lamaran & simpanan ikut terhapus) |
| US-17 Kandidat | Halaman applicants + tabel responsif (desktop table, mobile stacked) + dialog detail (surat lamaran + timeline) |
| US-18 Ubah status | Kontrol Select mengikuti `APPLICATION_STATUS_TRANSITIONS`; REJECTED butuh konfirmasi; tercermin di sisi seeker |
| US-19 Profil perusahaan | Form company + tampil (deskripsi & website) di halaman detail lowongan publik |
| RLS employer | Aturan kepemilikan diterapkan di service (company name match + RLS Supabase untuk mode backend) |
| Service layer | `JobService` baru; `ApplicationService.updateStatusForEmployer` + `listApplicantsForJob` |
| Repository | `CompanyRepository` (mock + Supabase), `JobRepository.delete`, `ApplicationRepository.findById`, cover letter pada kandidat |

### Menunggu aksi manual tim

| Item | Alasan | Cara |
|---|---|---|
| Supabase mode end-to-end | project + Docker belum tersedia | `supabase start` → `db reset` → isi env → uji ulang |
| Vercel preview + Jira | akun belum dibuat | `vercel.md`, `jira.md` |

## Verifikasi

| Perintah | Hasil |
|---|---|
| `npm run lint` | Pass |
| `npm run typecheck` | Pass |
| `npm test` | Pass - 6 file, 36 test (termasuk JobService ownership + transisi status employer) |
| `npm run build` | Pass - 17 route |
| Smoke test runtime | Employer cookie: `/employer/dashboard`, `/employer/jobs`, `/employer/jobs/new`, `/employer/profile`, `/employer/jobs/job-01/applicants` semua 200; seeker membuka `/employer/jobs` → 307 ke `/seeker/dashboard` |

Catatan kejujuran (`agent.md` §15): Supabase RLS mode belum diuji langsung di database; aturan kepemilikan diverifikasi via unit test service pada mode demo. Uji `supabase db reset` menyusul saat Docker aktif.

## Alur Demo Sprint 3

1. Login `employer@demo.jobtrack` / `demo1234`.
2. Dashboard → lihat KPI + pipeline.
3. Buat lowongan baru → muncul di `/jobs`.
4. Buka applicants lowongan → ubah status kandidat (login seeker untuk melihat perubahan di sisi pelamar).

## Definition of Done Sprint 3

- [x] Acceptance criteria story Sprint 3 terpenuhi (demo mode)
- [x] Lint/typecheck/test/build bersih
- [ ] Preview deployment dicek (menunggu koneksi Vercel)
- [x] Tidak ada secret di repo
- [ ] Task Jira dipindah ke Done (menunggu project Jira)
- [x] Dokumentasi sprint dicatat (file ini)

## Review & Retrospective

- **Sprint Review:** _diisi saat demo Sprint 3_
- **Retrospective:** _diisi setelah review_
