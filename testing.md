# Testing Strategy

## 1. Scope

Karena fokus tugas adalah Front-End, testing diprioritaskan pada logic dan critical user flow.

Tooling (Sprint 2, OPS-05): **Vitest + Testing Library + jsdom**.

```bash
npm test          # sekali jalan
npm run test:watch
```

Test saat ini: filter lowongan, transisi status lamaran, role guard, `ApplicationService`, dan smoke component `KPIStatCard` (`src/**/*.test.ts`).

## 2. Unit Test Targets

- filter jobs
- application status transition
- form validation
- repository/service functions
- role guard logic

## 3. Integration/Component Targets

- Job Listing
- Job Detail
- Apply flow
- Employer Applicant List
- Status update

## 4. Manual Demo Checklist

### Seeker
- login
- browse
- search/filter
- detail
- apply
- lihat dashboard
- lihat perubahan status

### Employer
- login
- dashboard
- create job
- edit/close job
- lihat applicants
- update status

## 5. Responsive

Check mobile, tablet, desktop.

## 6. Supabase & RLS Testing

Setelah Supabase aktif (`supabase.md`):

- Uji lintas akun: seeker A tidak dapat membaca/mengubah data seeker B.
- Employer hanya dapat membaca applicant dan mengubah status pada job miliknya.
- Job `CLOSED` menolak application baru.
- Apply ganda pada job yang sama ditolak (constraint + validasi server).
- Route guard: JOB_SEEKER tidak dapat membuka `/employer/*` dan sebaliknya.
- Uji dengan dua browser/profile berbeda untuk dua role.

## 7. Deployment Smoke Test (Vercel)

- Preview: setiap PR memeriksa halaman utama, login, dan flow utama di URL preview Vercel.
- Production: setelah merge ke `main`, ulangi smoke test pada live URL.
- Hasil smoke test dicatat singkat sebagai evidence presentasi.

## 8. Acceptance

Critical flow tidak boleh memiliki blocker sebelum Sprint Review.
