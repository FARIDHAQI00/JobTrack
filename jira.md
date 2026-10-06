# Jira Scrum Setup & Tutor

## 1. Tujuan

Jira digunakan untuk memenuhi:
- User Story
- Feature
- Backlog Management
- Sprint Planning
- Sprint Review
- Retrospective

Requirement tugas menyatakan Scrum wajib digunakan dan sprint berlangsung 2 minggu.

## 2. Buat Project

1. Login Jira.
2. Create Project.
3. Pilih template **Scrum**.
4. Project name: `JobTrack`.
5. Pastikan backlog dan sprint tersedia.
6. Tambahkan dua anggota tim.

## 3. Invite Asleb/Dosen

Tambahkan/invite alamat berikut sesuai requirement:

- `hidayat22.mhs.usk.ac.id`
- `m.ridho22.mhs.usk.ac.id`
- `maulyanda@usk.ac.id`

Gunakan mekanisme invite/member sesuai akses Jira yang tersedia. Jangan mengubah alamat yang diberikan tugas.

## 4. Issue Hierarchy

Gunakan:

```text
Epic
 └── Story
      └── Task/Sub-task
```

Contoh:

```text
Epic: Job Discovery

Story:
Sebagai Job Seeker, saya ingin melihat daftar lowongan
agar dapat menemukan pekerjaan yang sesuai.

Tasks:
- Buat JobCard
- Buat JobList
- Buat SearchBar
- Buat Filter
- Responsive layout
```

## 5. Backlog

Minimal Epic:

1. Foundation & Deployment (scaffold, Vercel, Supabase setup)
2. Authentication
3. Job Discovery
4. Job Seeker
5. Employer
6. Shared UI/UX
7. Docker & Documentation

Prioritaskan dengan P0/P1/P2.

Backlog awal Phase 0 sudah disiapkan dan siap diimpor:

- `docs/backlog/backlog.md` — daftar Epic/Story/Task lengkap.
- `docs/backlog/jira-import.csv` — siap import ke Jira (`jira.md` §13).
- `docs/backlog/sprint-plan.md` — struktur 4 sprint @2 minggu.

## 6. Story Format

Gunakan:

`Sebagai [role], saya ingin [action], agar [benefit].`

Acceptance Criteria harus konkret.

Contoh:

Story:
`Sebagai Job Seeker, saya ingin melamar lowongan agar dapat mengikuti proses rekrutmen.`

Acceptance:
- tombol Apply tersedia pada job OPEN
- user tidak dapat apply dua kali
- setelah apply status menjadi APPLIED
- application muncul di dashboard

## 7. Sprint Planning

Setiap sprint 2 minggu.

Saat planning:
1. Review Product Goal.
2. Pilih backlog berdasarkan priority.
3. Tentukan kapasitas dua anggota.
4. Pecah Story menjadi task.
5. Tentukan Definition of Done.
6. Assign owner.

Jangan memasukkan pekerjaan terlalu banyak.

## 8. Daily Scrum

Walaupun dilakukan informal, catat:
- What did I do?
- What will I do?
- Any blocker?

## 9. Sprint Review

Di akhir sprint:
1. Demo increment.
2. Tunjukkan Jira issue yang selesai.
3. Bandingkan dengan sprint goal.
4. Catat feedback.
5. Pindahkan issue sesuai status.

Screenshot board/review disimpan untuk bahan presentasi.

## 10. Retrospective

Bahas:
- What went well?
- What went wrong?
- What should we improve?
- Action item sprint berikutnya.

Contoh:
`Code review terlambat → setiap PR harus direview maksimal 24 jam.`

## 11. Board Status

Rekomendasi:

`Backlog → To Do → In Progress → Review → Done`

## 12. Evidence Checklist

Simpan screenshot:
- Project/board
- Backlog
- User Stories
- Sprint Planning
- Sprint aktif
- Sprint Review
- Retrospective
- Pembagian tugas
- History issue

Screenshot ini digunakan pada slide Agile & Scrum.

## 13. Import Backlog Phase 0

Backlog awal tersedia di `docs/backlog/jira-import.csv`.

1. Buat project Scrum `JobTrack` (§2).
2. Buat sprint `Sprint 1` s.d. `Sprint 4` di backlog (agar kolom Sprint bisa dipetakan).
3. Masuk `Project settings → External system import → CSV`.
4. Upload `jira-import.csv`, set delimiter koma, encoding UTF-8.
5. Map kolom:
   - `Summary` → Summary
   - `Issue Type` → Issue Type
   - `Priority` → Priority
   - `Epic Name` → Epic Name (baris Epic)
   - `Epic Link` → Epic Link (baris Story/Task)
   - `Sprint` → Sprint
   - `Story Points` → Story Points
   - `Labels` → Labels
   - `Description` → Description
6. Jika kolom `Epic Link` gagal terpetakan pada project team-managed, impor tanpa kolom tersebut lalu tautkan Epic secara manual (drag ke Epic), atau gunakan kolom `Parent`.
7. Verifikasi jumlah issue sesuai `docs/backlog/backlog.md`.

Catatan: pembuatan project dan invite anggota (`§3`) dilakukan manual oleh tim karena membutuhkan akun Jira. Jangan klaim Jira sudah dibuat sebelum benar-benar dibuat.
