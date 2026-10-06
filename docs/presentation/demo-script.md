# Demo Script — JobTrack

> Durasi total ± 12 menit (2 anggota). Latihan sekali sebelum presentasi.

## Persiapan

- [ ] Server/URL live siap (atau `npm run dev` sebagai cadangan)
- [ ] Dua browser/profile: satu Job Seeker, satu Employer
- [ ] Akun demo: `seeker@demo.jobtrack` / `employer@demo.jobtrack` (password `demo1234`) — atau akun Supabase
- [ ] Tab tambahan: GitHub repo, Jira board, Docker Hub, Vercel dashboard, Supabase dashboard
- [ ] Docker image sudah di-push (untuk demo Docker)

## Bagian 1 — Job Seeker (anggota 1) ± 4 menit

1. Buka landing → tunjukkan pencarian + kategori.
2. Ke `/jobs` → cari kata kunci → filter kategori + tipe → tunjukkan URL berubah.
3. Buka detail lowongan → Lamar → isi surat lamaran → toast sukses.
4. Ulangi Lamar pada lowongan sama → tunjukkan validasi "sudah melamar".
5. Buka `/seeker/dashboard` → tunjukkan KPI + timeline status.
6. `/seeker/applications` → filter status → dialog progres.
7. `/seeker/saved` → simpan/lepas lowongan.

## Bagian 2 — Employer (anggota 2) ± 4 menit

1. Login employer → dashboard: KPI, hiring pipeline, aktivitas.
2. `/employer/jobs` → Buat Lowongan → isi form → Terbitkan.
3. Buka lowongan baru di `/jobs` (tab lain) → tunjukkan muncul di publik.
4. `/employer/jobs/[id]/applicants` → lihat kandidat dari demo seeker.
5. Ubah status: APPLIED → SCREENING → INTERVIEW → ACCEPTED (tunjukkan pilihan mengikuti transisi).
6. Coba REJECTED pada kandidat lain → dialog konfirmasi.
7. Kembali ke tab Job Seeker → refresh applications → status berubah.
8. Tutup lowongan → konfirmasi → tunjukkan hilang dari listing publik.

## Bagian 3 — Git & Branches (masing-masing anggota) ± 2 menit

1. Buka GitHub → Insights/Commits.
2. Setiap anggota menunjukkan satu branch dan satu commit miliknya.
3. Jelaskan format branch `feat_{fitur}/{tanggal}` dan commit `feat:`/`fix:`/`chore:`.
4. Tunjukkan PR dan proses review/merge.

## Bagian 4 — Docker (anggota 2) ± 2 menit

```bash
docker build -t <username>/jobtrack:v1-UTS .
docker run --rm -p 3000:3000 <username>/jobtrack:v1-UTS
docker push <username>/jobtrack:v1-UTS
```

Buka Docker Hub → tunjukkan image public dengan tag `-UTS`.

## Cadangan jika jaringan bermasalah

- Jalankan `npm run build` + `npm run start` lokal.
- Tunjukkan screenshot Vercel/Supabase dari `docs/evidence/`.
