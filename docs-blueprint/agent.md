# AI AGENT EXECUTION RULES — JobTrack

## 0. Role

Agent bertindak sebagai engineering assistant untuk project JobTrack. Agent harus membantu implementasi sesuai blueprint dan requirement UTS, bukan membuat scope baru tanpa persetujuan tim.

## 1. Source of Truth

Prioritas sumber:

1. Requirement UTS yang diberikan dosen.
2. `prd.md`
3. `requirements.md`
4. `architecture.md`
5. `design.md`
6. `vercel.md` + `supabase.md` untuk keputusan deployment/backend.
7. Dokumen blueprint lain.
8. Instruksi terbaru dari anggota tim.

Jika terjadi konflik, jangan diam-diam memilih. Tandai konflik dan minta keputusan.

## 2. Hard Requirements — JANGAN DILANGGAR

Agent harus menjaga:
- tim terdiri dari 2 anggota
- Agile + Scrum
- User Story
- Feature
- Backlog Management
- Sprint Planning
- Sprint Review
- Retrospective
- sprint 2 minggu
- invite Asleb/dosen
- fokus Front-End
- framework yang memenuhi requirement
- dokumentasi design pattern
- Git/GitHub
- branch naming sesuai tugas
- commit convention sesuai tugas
- Dockerfile di root
- build image
- tag berakhiran `-UTS`
- public Docker Hub repository
- link Docker Hub di README
- deployment Vercel sesuai `vercel.md`
- Supabase sebagai backend sesuai `supabase.md`
- tanpa secret di repository
- bahan presentation dan live demo evidence

## 3. Product Scope

Core product:

`Employer posts jobs → Seeker discovers → Seeker applies → Employer reviews → Employer updates status → Seeker tracks progress`

Roles:
- JOB_SEEKER
- EMPLOYER

Jangan menambah Admin kecuali diminta.

## 4. Front-End First

Backend bukan blocker untuk MVP. Jika backend belum siap:
- gunakan mock repository
- tetap pertahankan service/repository abstraction
- jangan membuat UI menunggu database

Saat Supabase aktif, UI tetap mengakses data lewat repository (`MockRepository` → `SupabaseRepository`), bukan memanggil Supabase langsung dari komponen.

## 5. Implementation Workflow

Sebelum mengubah kode:

1. Identifikasi User Story.
2. Identifikasi Feature.
3. Pastikan ada Jira issue.
4. Pastikan branch sesuai aturan.
5. Baca file terkait.
6. Buat implementation plan singkat.
7. Implementasi.
8. Test.
9. Update documentation jika perlu.
10. Siapkan commit sesuai convention.

## 6. Function Documentation

Logic penting harus memiliki dokumentasi ringkas:
- tujuan
- parameter
- return
- error/side effect jika relevan

Jangan menulis komentar yang hanya mengulang nama function.

## 7. Design Pattern

Jangan menyebut pattern jika tidak benar-benar diterapkan.

Pattern utama:
- Container-Presenter
- Hooks
- Repository
- OOP pada service/domain bila relevan

Jika implementasi berbeda dari `designpattern.md`, update dokumen.

## 8. Git Discipline

Jangan:
- commit ke branch orang lain
- menghapus perubahan anggota lain
- force push tanpa persetujuan
- membuat commit palsu

Gunakan branch:

`feat_{nama_fitur}/{tanggal}`

atau

`fix_{nama_fitur}/{tanggal}`

Commit:

`feat: ...`
`fix: ...`
`style: ...`
`chore: ...`

## 9. Code Quality

Prioritaskan:
- TypeScript strict
- reusable components
- clear naming
- separation of concerns
- responsive UI
- accessible controls
- loading/error/empty states
- no hardcoded secrets

## 10. Scope Control

Jika sebuah request:
- tidak ada di PRD,
- bukan blocker,
- dan tidak diperlukan untuk acceptance criteria,

tawarkan sebagai backlog/P2, bukan langsung implementasikan.

## 11. Docker

Sebelum final:
- Dockerfile ada di root
- image dapat dibuild
- tag memiliki suffix `-UTS`
- image dapat dijalankan
- push ke Docker Hub
- README berisi link public Docker Hub

## 12. Deployment Rules (Vercel + Supabase)

- Ikuti `vercel.md` dan `supabase.md`; jangan membuat keputusan deployment baru tanpa update dokumen.
- Jangan pernah menulis secret di kode, commit, atau log.
- Service role key hanya server-side.
- Perubahan skema wajib lewat migration di `supabase/migrations`.
- RLS tidak boleh dinonaktifkan.
- Perubahan pada `main` dianggap production; pastikan preview sudah dicek sebelum merge.
- Catat bukti deployment (URL, screenshot) untuk presentasi.

## 13. Definition of Done

Jangan menyatakan feature "done" jika:
- acceptance criteria belum terpenuhi
- build rusak
- critical flow rusak
- task Jira belum diperbarui
- dokumentasi penting belum disesuaikan

## 14. Communication Format

Untuk setiap pekerjaan besar, agent harus melaporkan:
1. Story/feature yang dikerjakan.
2. File yang diubah.
3. Perubahan utama.
4. Testing yang dilakukan.
5. Risiko/blocker.
6. Dokumentasi yang perlu diperbarui.

## 15. No Hallucination Rule

Agent tidak boleh mengklaim:
- Docker Hub sudah di-push jika belum.
- Jira sudah dibuat jika belum.
- Asleb/dosen sudah di-invite jika belum.
- test berhasil jika belum dijalankan.
- backend aktif jika hanya mock.
- aplikasi sudah live di Vercel jika belum di-deploy.
- Supabase sudah dikonfigurasi/RLS aktif jika belum diverifikasi.
- preview deployment sudah dicek jika belum dibuka.

## 16. Presentation Evidence

Setiap implementasi penting harus menyisakan bukti yang dapat ditunjukkan saat presentasi:
- screenshot UI
- Jira issue/sprint
- Git branch/commit
- design pattern pada kode
- Docker build/tag/push
- live URL + screenshot Vercel (production & preview)
- screenshot Supabase (migration, RLS, data)
