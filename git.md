# Git & GitHub Standard

## 1. Repository

Buat repository baru di GitHub.

## 2. Branch Naming — WAJIB SESUAI TUGAS

Feature:

`feat_{nama_fitur}/{tanggal}`

Contoh:

`feat_authentikasi/19-03-2025`

Bug fix:

`fix_{nama_fitur}/{tanggal}`

Contoh:

`fix_job-filter/05-10-2026`

Tanggal gunakan format `DD-MM-YYYY`.

## 3. Commit Message — WAJIB

Feature:

`feat: tambah halaman job detail`

Fix:

`fix: perbaiki filter lokasi`

Style:

`style: sesuaikan spacing job card`

Chore:

`chore: update dockerfile`

## 4. Branch Flow

```text
main
 ├── feat_job-list/05-10-2026
 ├── feat_job-detail/05-10-2026
 ├── feat_apply-job/06-10-2026
 └── fix_application-status/10-10-2026
```

Branch fitur dibuat dari `main`, dikerjakan, push, review, lalu merge.

## 5. Dua Anggota

Keduanya wajib mempunyai kontribusi nyata dan dapat menjelaskan commit masing-masing saat demo.

Jangan membuat commit artifisial hanya untuk menaikkan jumlah commit.

## 6. PR Checklist

- [ ] Story Jira terkait
- [ ] Acceptance criteria terpenuhi
- [ ] Tidak ada secret
- [ ] Build/lint aman
- [ ] UI tidak rusak
- [ ] Dokumentasi diperbarui jika perlu
- [ ] Preview deployment (Vercel) dicek

## 7. Environment & Secrets

- `.env.local` wajib masuk `.gitignore`; jangan pernah commit secret.
- Key Supabase dan konfigurasi deployment hanya lewat environment variables (`vercel.md` §4).
- `.env.example` boleh di-commit sebagai dokumentasi nama variabel (tanpa nilai asli).

## 8. Preview Deployment

- Push branch `feat_*`/`fix_*` otomatis menghasilkan Vercel Preview Deployment.
- Sertakan link preview pada deskripsi PR.
- Review memeriksa preview URL, bukan hanya diff kode.

## 9. Hubungan dengan Deployment

Perubahan pada `main` otomatis menjadi production deployment. Jangan merge ke `main` jika smoke test preview belum lolos.
