# Contributing

## Team

Project wajib dikerjakan oleh dua anggota. Masing-masing harus memiliki kontribusi yang dapat dibuktikan melalui GitHub.

## Setup Lokal

1. Copy `.env.example` menjadi `.env.local` dan isi kredensial Supabase (jika backend aktif).
2. `npm install` lalu `npm run dev`.
3. Opsional untuk backend lokal: `supabase start`.
4. Jangan commit `.env.local`.

## Workflow

1. Ambil issue Jira.
2. Buat branch sesuai `git.md`.
3. Implementasikan feature.
4. Test.
5. Commit sesuai convention.
6. Push (Vercel membuat preview deployment).
7. Review PR: cek kode, acceptance criteria, dan preview URL.
8. Merge ke `main` (otomatis production deployment).
9. Update Jira.

## Rule

Jangan mengerjakan feature besar langsung di `main`.

Jangan merge sebelum smoke test pada preview URL lolos.
