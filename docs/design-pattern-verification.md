# Design Pattern Verification — Phase 5

Verifikasi bahwa pattern yang didokumentasikan di `designpattern.md` benar-benar
diterapkan pada kode (agent.md §7: jangan menyebut pattern yang tidak dipakai).

## Ringkasan

| Pattern | Status | Lokasi |
|---|---|---|
| Repository | Terpasang | `src/repositories/` (+ `mock/`, `supabase/`, factory `index.ts`) |
| OOP Service | Terpasang | `src/services/job-service.ts`, `src/services/application-service.ts` |
| Container-Presenter (adaptasi RSC) | Terpasang | Container = `src/app/**/page.tsx`; Presenter = `src/components/`, `src/features/*/components/` |
| Hooks | Terpasang | `src/hooks/use-saved-job.ts`, `src/hooks/use-apply-to-job.ts` |

## 1. Repository Pattern

**Masalah:** UI tidak boleh bergantung pada detail data source (mock vs Supabase).

**Bukti:**

- Kontrak: `JobRepository`, `ApplicationRepository`, `SavedJobRepository`, `SeekerProfileRepository`, `CompanyRepository` (interface, tanpa dependensi framework).
- Implementasi ganda: `repositories/mock/*` (demo) dan `repositories/supabase/*` (produksi).
- Factory: `repositories/index.ts` memilih implementasi berdasarkan `isSupabaseConfigured()` — UI tidak berubah antar mode.
- Verifikasi isolasi: komponen client dan hooks **tidak ada** yang mengimpor `lib/supabase` (hasil grep bersih).

**Trade-off:** satu lapisan tambahan antara page dan query, tetapi UI terlindung dari perubahan backend dan dapat diuji tanpa database.

## 2. OOP Service (Domain Rules)

**Masalah:** aturan bisnis harus terpusat, tidak tersebar di komponen.

**Bukti:**

- `JobService` — kepemilikan lowongan (`company name match`), wajib company profile saat membuat lowongan, close/delete terproteksi.
- `ApplicationService` — anti lamaran ganda, lowongan harus OPEN, perubahan status hanya oleh pemilik lowongan dan hanya lewat `canTransitionStatus` (domain/status.ts).
- Unit test: `job-service.test.ts` (7 test) dan `application-service.test.ts` (8 test) membuktikan aturan ini.
- Pages/server actions hanya memanggil service, bukan menulis aturan sendiri.

**Trade-off:** service memakai pengecekan kepemilikan di application layer; di Supabase mode aturan yang sama juga dijaga RLS (pertahanan berlapis).

## 3. Container-Presenter (Adaptasi React Server Components)

**Masalah:** memisahkan pengambilan data dari tampilan.

**Bukti:**

- Container: page/layout Server Component memanggil service/repository, menghitung turunan (KPI, filter, pagination), dan mengirim props; contoh `app/(public)/jobs/page.tsx`, `app/seeker/dashboard/page.tsx`, `app/employer/dashboard/page.tsx`.
- Presenter: `JobCard`, `KPIStatCard`, `ApplicantRow`, `HiringPipeline`, `ApplicationTimeline`, dst. hanya menerima props dan tidak mengimpor repository/supabase.
- Interaksi client dipisahkan ke komponen kecil + hook (bagian 4), bukan di container.

**Trade-off:** RSC menggantikan container class React klasik; pola tetap terjaga (data vs presentasi terpisah) tanpa state managemen global.

## 4. Hooks Pattern

**Masalah:** logika interaksi (action, pending, toast, refresh) duplikatif antar tombol/dialog.

**Bukti:**

- `useSavedJobToggle(jobId, initialSaved)` → `{ saved, isPending, toggle }`, dipakai `SaveJobButton`.
- `useApplyToJob(jobId)` → `{ isPending, apply }`, dipakai `ApplyDialog`.
- Hooks mengimpor server action (bukan repository), sehingga komponen tetap presentasional.

**Trade-off:** hook adalah "use client"; logic server tetap di server action.

## 5. Catatan Kepatuhan

- `agent.md` §7: seluruh pattern yang disebut di atas dapat ditelusuri ke file nyata (bukan klaim).
- Perbedaan dari draft awal `designpattern.md` (nama hook contoh) sudah disinkronkan ke implementasi.
- RLS Supabase adalah lapisan otorisasi database yang melengkapi service; pengujiannya ada di `supabase/tests/rls.test.sql` (pgTAP, dijalankan saat local stack aktif).
