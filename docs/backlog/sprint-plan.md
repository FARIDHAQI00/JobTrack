# JobTrack — Sprint Plan (4 × 2 minggu)

> Requirement UTS: sprint 2 minggu, Scrum, 2 anggota.
> Story detail: `backlog.md` · Import Jira: `jira-import.csv` (`jira.md` §13).

## 1. Timeline (usulan, dapat disesuaikan di Sprint Planning)

| Sprint | Tanggal | Goal | Story | SP |
|---|---|---|---|---|
| Sprint 1 | 06-10-2026 → 19-10-2026 | Foundation + Job Discovery | FD-01–05, US-04–07, US-22 | 29 |
| Sprint 2 | 20-10-2026 → 02-11-2026 | Auth + Job Seeker | US-01–03, US-08–12, US-21, OPS-05 | 23 |
| Sprint 3 | 03-11-2026 → 16-11-2026 | Employer | US-13–19 | 24 |
| Sprint 4 | 17-11-2026 → 30-11-2026 | Integration + Polish + Delivery | US-20, FD-06, OPS-01–04 | 15 |

Total: 91 Story Points. Kapasitas diasumsikan ± 25 SP/sprint untuk 2 anggota; angka aktual dikonfirmasi saat Sprint Planning.

## 2. Sprint 1 — Foundation + Job Discovery

- **Sprint Goal:** aplikasi dapat diakses (local + preview Vercel) dengan listing, pencarian, filter, dan detail lowongan menggunakan mock repository.
- **Deliverable:** scaffold, Supabase dev + migration, Vercel preview, app shell + role guard, repository + mock, halaman discovery.
- **Demo:** buka preview URL → listing → search/filter → detail.
- **Evidence:** preview URL, screenshot board, commit dua anggota.

## 3. Sprint 2 — Auth + Job Seeker

- **Sprint Goal:** Job Seeker dapat register/login, apply, menyimpan lowongan, dan memantau status lamaran dengan data Supabase.
- **Deliverable:** Supabase Auth + profiles + RLS dasar, repository Supabase untuk data seeker, halaman dashboard/applications/saved/profile, toast + testing setup.
- **Demo:** register → login → apply → status tampil di dashboard.
- **Evidence:** screenshot auth users, RLS, dashboard seeker.

## 4. Sprint 3 — Employer

- **Sprint Goal:** Employer dapat mengelola lowongan dan kandidat end-to-end.
- **Deliverable:** dashboard employer, CRUD job, applicant list, update status, company profile, RLS employer.
- **Demo:** login employer → create job → publish → applicants → ubah status.
- **Evidence:** screenshot dashboard employer, pipeline, perubahan status di sisi seeker.

## 5. Sprint 4 — Integration + Polish + Delivery

- **Sprint Goal:** aplikasi koheren, terdeploy production, dan seluruh artefak UTS selesai.
- **Deliverable:** navigasi konsisten, production deploy + smoke test + rollback drill, Docker `-UTS` + push, README final, evidence pack, slide + rehearsal.
- **Demo:** live URL + Docker Hub + dua anggota menjelaskan commit masing-masing.
- **Evidence:** semua checklist `evidence-checklist.md` dan `presentation-checklist.md`.

## 6. Ceremonies

| Ceremony | Kapan | Output |
|---|---|---|
| Sprint Planning | Awal sprint | Sprint backlog + sprint goal + assignee |
| Daily Scrum | Harian (informal, dicatat singkat) | Progres + blocker |
| Sprint Review | Akhir sprint | Demo increment + feedback |
| Retrospective | Setelah review | 3 pertanyaan retrospektif + action item |

Catatan daily dan hasil review/retro disimpan di `docs/sprint/` (dibuat saat sprint berjalan).

## 7. Definition of Done (berlaku semua sprint)

- Acceptance criteria story terpenuhi.
- `npm run lint` dan `npm run typecheck` bersih; test relevan lulus.
- Preview deployment dicek pada PR.
- Tidak ada secret di repo.
- Task Jira dipindah ke Done + evidence screenshot.
- Dokumentasi terkait diperbarui.

## 8. Aturan Sprint

- Sprint duration **2 minggu** (requirement UTS).
- Scope change hanya lewat Sprint Planning/backlog refinement, bukan di tengah sprint (agent.md §10).
- Story P2 tidak boleh masuk sprint sebelum seluruh P0/P1 selesai.
- Setiap story harus bisa ditelusuri: Jira issue → branch → commit → demo.
