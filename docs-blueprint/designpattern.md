# Design Pattern

## 1. Required Documentation

Requirement tugas mewajibkan design pattern didokumentasikan. Untuk React/Next.js, tugas memberikan contoh Container-Presenter, Hooks Pattern, atau HOC.

## 2. Pattern yang Dipilih

### A. Container-Presenter Pattern

**Container**
- mengambil data
- mengatur state
- memanggil service/hook
- menangani action

**Presenter**
- fokus pada tampilan
- menerima props
- tidak mengetahui detail data source

Adaptasi App Router (React Server Components): container = Server Component
(page / layout) yang memanggil service/repository; presenter = komponen
`components/` dan `features/*/components/` yang menerima props. Interaksi
client diisolasi oleh hook (lihat bagian B).

Contoh struktur:

```text
app/(public)/jobs/page.tsx          <- container (fetch + filter)
   └── JobCard (presenter)
          ├── StatusBadge
          └── JobFilterPanel (client, props dari container)
```

### B. Hooks Pattern

Custom hook mengenkapsulasi reusable UI logic. Implementasi aktual:

- `useSavedJobToggle` — `src/hooks/use-saved-job.ts` (dipakai `SaveJobButton`)
- `useApplyToJob` — `src/hooks/use-apply-to-job.ts` (dipakai `ApplyDialog`)

Hook menangani state pending, pemanggilan server action, toast feedback, dan refresh data; komponen tetap presentasional. Verifikasi lengkap: `docs/design-pattern-verification.md`.

### C. Repository Pattern

Dipakai agar data source dapat diganti:

```text
JobRepository
 ├── MockJobRepository
 └── SupabaseJobRepository

ApplicationRepository
 ├── MockApplicationRepository
 └── SupabaseApplicationRepository
```

Supabase diakses lewat implementasi repository (`supabase-js` + RLS), sehingga UI tetap tidak mengetahui detail data source dan tetap dapat berjalan dengan mock saat backend belum aktif (`supabase.md`).

## 3. OOP Application

Domain/service dapat menggunakan class jika diperlukan:

```text
JobService
ApplicationService
```

Tujuannya bukan memaksakan class pada React component, tetapi menjaga domain logic tetap terpisah.

## 4. Dokumentasi Kode

Setiap pattern harus punya:
- alasan dipilih
- masalah yang diselesaikan
- struktur
- contoh file
- contoh kode
- trade-off
