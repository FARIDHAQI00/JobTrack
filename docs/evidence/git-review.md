# Git Review — Phase 5

Diambil dari history repository (semua branch), sesuai `git.md`.

## Kontribusi Anggota

| Author | Commit |
|---|---|
| T. Farid Haqi `<haqiff16@gmail.com>` | 8 |
| ahmad hanif `<ahmadhanif670@gmail.com>` | 3 |
| faridhaqi (Initial commit di GitHub) | 1 |

Dua anggota memiliki kontribusi nyata; tidak ada commit artifisial.

## Kesesuaian Convention

- Prefix commit: `feat:`, `chore:` (dan `fix:`/`style:` dipakai saat relevan).
- Satu-satunya commit tanpa prefix adalah `Initial commit` bawaan GitHub sebelum convention diterapkan.
- Nama branch: `feat_{fitur}/{DD-MM-YYYY}` untuk seluruh branch kerja.

## Branch dan Tumpukan PR

| Branch | Commit di depan `main` |
|---|---|
| `feat_setup-project/05-10-2026` | 2 |
| `feat_design-foundation/05-10-2026` | 3 |
| `feat_component-system/05-10-2026` | 4 |
| `feat_screen-design/05-10-2026` | 5 |
| `feat_sprint-1-foundation/05-10-2026` | 6 |
| `feat_sprint-2-seeker/05-10-2026` | 7 |
| `feat_sprint-3-employer/05-10-2026` | 8 |
| `feat_sprint-4-integration/05-10-2026` | 11 |

Catatan: branch dibuat berurutan (stacked). Merge ke `main` harus berurutan dari PR paling awal agar history rapi.

## Keamanan

- Tidak ada file `.env`/secret di history; hanya `.env.example` (tanpa nilai).
- `.gitignore` menutup `.env*`, `node_modules`, `.next`, `.vercel`, `supabase/.temp`.

## Tindak Lanjut Manual

- [ ] Buat 8 pull request (satu per branch) dengan base `main`, merge berurutan.
- [ ] Setiap PR melewati checklist `git.md` §6 (story Jira, acceptance, tanpa secret, build aman, preview dicek).
- [ ] Setelah merge, produksi (Vercel) berjalan dari `main`.
