# Vercel Deployment Plan — JobTrack

> Plan hosting utama. Berpasangan dengan `supabase.md` (backend) dan `docker.md` (requirement UTS).

## 1. Status dan Hubungan dengan Requirement

| Konteks | Keterangan |
|---|---|
| Hosting aplikasi | **Vercel** (production + preview) |
| Backend | **Supabase** (`supabase.md`) |
| Docker | Tetap **wajib** sesuai requirement UTS (`docker.md`), tidak digantikan Vercel |
| Sumber aplikasi | GitHub repo JobTrack, branch `main` = production |

Vercel dipakai sebagai hosting utama karena native Next.js App Router dan mendukung preview deployment per branch/PR yang berguna sebagai bukti DevOps.

## 2. Environment

| Environment | Trigger | URL | Supabase Project |
|---|---|---|---|
| Local | `npm run dev` | `http://localhost:3000` | Local stack (`supabase start`) atau project dev |
| Preview | Push branch `feat_*` / `fix_*` atau PR | `*-<hash>.vercel.app` | Project dev (opsional staging) |
| Production | Merge/push ke `main` | domain production | Project production |

## 3. Setup Awal (sekali)

1. Buat akun Vercel dan hubungkan akun GitHub.
2. `Add New Project` → import repository `JobTrack`.
3. Framework preset: Next.js (auto-detect). Root directory sesuai struktur repo.
4. Tambahkan environment variables (bagian 4) untuk Production dan Preview.
5. Deploy.
6. Opsional: pasang custom domain.

### Region

- Supabase project dibuat di region **Southeast Asia (Singapore) `ap-southeast-1`**.
- Set Vercel Functions region ke **Singapore (`sin1`)** agar dekat dengan database.

## 4. Environment Variables

| Name | Scope | Wajib | Catatan |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Ya | URL project Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Ya | Aman di client selama RLS benar |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Hanya jika perlu operasi admin | Jangan pernah pakai prefix `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SITE_URL` | Client + Server | Ya | Untuk redirect auth callback |

Aturan:

- Jangan commit `.env.local` atau secret apa pun.
- Jangan menaruh service role key di kode client.
- Perubahan env dilakukan lewat dashboard Vercel / CLI, bukan hardcode.

## 5. Alur Deploy

```text
Buat branch feat_/fix_
   ↓
Push ke GitHub
   ↓
Vercel Preview Deployment (otomatis)
   ↓
Review PR (cek Preview URL + CI)
   ↓
Merge ke main
   ↓
Production Deployment (otomatis)
   ↓
Smoke test production
```

Aturan branch dan commit tetap mengikuti `git.md`.

## 6. Smoke Test Setelah Deploy

Jalankan minimal:

- [ ] Landing page terbuka.
- [ ] Job listing tampil (data mock atau Supabase).
- [ ] Login/register berjalan.
- [ ] Apply berhasil (jika flow aktif).
- [ ] Tidak ada error console kritis.
- [ ] Environment Supabase terhubung (bukan fallback mock yang tidak disengaja).

## 7. Rollback

- **Vercel**: buka `Deployments` → pilih deployment stabil sebelumnya → `Promote to Production` (instant rollback).
- **Database**: migration Supabase bersifat maju. Rollback dilakukan dengan migration perbaikan baru; jangan mengubah riwayat migration yang sudah dijalankan.
- Setiap rollback dicatat singkat di `docs/` sebagai evidence.

## 8. Evidence untuk Presentasi

- [ ] URL production dapat diakses.
- [ ] Screenshot Vercel dashboard (deployment list + status sukses).
- [ ] Screenshot preview deployment dari sebuah PR.
- [ ] Build log sukses.
- [ ] Screenshot environment variables (nilai disamarkan).

## 9. Checklist

- [ ] Repo GitHub terhubung ke Vercel.
- [ ] Environment variables lengkap untuk Preview + Production.
- [ ] Production deploy dari `main` berhasil.
- [ ] Preview deploy per PR berjalan.
- [ ] Rollback pernah diuji atau prosedurnya didokumentasikan.
- [ ] Live URL dicantumkan di README.
