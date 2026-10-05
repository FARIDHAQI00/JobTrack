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

Contoh struktur:

```text
JobListContainer
   └── JobListPresenter
          ├── JobCard
          └── JobFilter
```

### B. Hooks Pattern

Custom hook mengenkapsulasi reusable UI logic.

Contoh:
- `useJobs()`
- `useApplications()`
- `useAuth()`
- `useJobForm()`

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
