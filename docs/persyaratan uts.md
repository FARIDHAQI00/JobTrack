UTS PRAKTEK POPL
Requirement Project Tim 
Struktur Tim
Satu tim terdiri dari dua anggota.
Setiap anggota wajib berkontribusi aktif. Progress akan dinilai berdasarkan keterlibatan masing-masing, termasuk jumlah commit di repository.
Metodologi Pengembangan
Wajib menerapkan Agile dan Scrum.
Praktikan harus membuat:
User Story (contoh: "Sebagai user, saya ingin mengakses halaman Home agar dapat melihat informasi utama.").
Feature (fitur utama yang dikembangkan dari user story).
Backlog Management.
Sprint Planning, Sprint Review, dan Retrospektif.
Sprint dilakukan dengan periode 2 minggu.
Invite Asleb dan dosen (@hidayat22.mhs.usk.ac.id, @m.ridho22.mhs.usk.ac.id, @maulyanda@usk.ac.id )
Tema Project
Tema project bebas, boleh aplikasi edukasi, e-commerce, dashboard, atau lainnya.
Fokus utama: Front-End Development.
Backend bersifat opsional, jika ingin menambahkan diperbolehkan.
Framework &amp; Bahasa Pemrograman
Framework bebas, wajib berbasis OOP.
Contoh framework yang bisa digunakan: React, Next.js, Vue, Laravel, Spring Boot, dll.
Disarankan menggunakan framework berbasis JavaScript (React/Next.js/Vue) dengan alasan:
Kompetensi Asisten Lab → Asisten lebih berpengalaman di ekosistem JS, sehingga dapat memberikan bimbingan teknis yang lebih baik.
Rencana Kedepan Deployment di GCP + Docker → Framework JS lebih sederhana dalam proses containerization dan deployment. Jika menggunakan Laravel/PHP biasanya memerlukan konfigurasi tambahan (Composer, Apache/Nginx, dll).
Ekosistem &amp; Dokumentasi → Framework JS memiliki dukungan komunitas luas dan dokumentasi lengkap, memudahkan troubleshooting.
Konsistensi Teknologi → Hanya fokus pada satu bahasa (JavaScript/TypeScript), baik untuk front-end maupun back-end (jika menggunakan Node.js).
Design Pattern
Praktikan wajib mendokumentasikan design pattern yang digunakan.
Contoh:
Laravel → otomatis menggunakan MVC (Model-View-Controller).
React/Next.js → bisa menggunakan Container-Presenter Pattern, Hooks Pattern, atau Higher-Order Component (HOC).
Vue → dapat menerapkan Composable Pattern atau MVVM.


Manajemen Versi (Git &amp; GitHub)
Buat repository baru 
Ikuti aturan berikut:
Branch Naming:
Fitur baru → feat\_{nama\_fitur}/{tanggal} (contoh: feat\_authentikasi/19-03-2025).
Perbaikan bug → fix\_{nama\_fitur}/{tanggal}.
Commit Message:
feat: deskripsi → untuk penambahan/peningkatan fitur.
fix: deskripsi → untuk perbaikan bug.


style: deskripsi → untuk styling UI.
chore: deskripsi → perubahan non-fungsional (config, dokumentasi, dll).
Penerapan Docker Image :
Pada bagian ini, setiap tim wajib mengimplementasikan materi yang telah dipelajari pada Modul 4 mengenai kontainerisasi aplikasi. Tujuannya adalah untuk membungkus aplikasi beserta seluruh dependensinya ke dalam sebuah Docker image yang siap untuk di-deploy. 
Praktikan harus menyelesaikan langkah-langkah berikut:
Pembuatan Dockerfile: Buat sebuah file Dockerfile di direktori utama (root) proyek. File ini harus berisi semua instruksi yang diperlukan untuk membangun image aplikasi sesuai dengan framework yang digunakan (misalnya: memilih base image, menyalin file proyek, meng-install dependencies, dan menentukan perintah untuk menjalankan aplikasi).
💡 Opsional: Jika proyek Anda memiliki arsitektur yang lebih kompleks (contoh: frontend dan backend terpisah), sangat disarankan untuk membuat file docker-compose.yml untuk mengelola beberapa service atau kontainer sekaligus.
 Build &amp; Tag Image: Lakukan proses build untuk menciptakan Docker image dari Dockerfile. Penamaan tag untuk image bersifat bebas, namun wajib diakhiri dengan -UTS sebagai penanda pengumpulan. Contoh format: mahasiswa/proyek-popl:v1-UTS atau mahasiswa/proyek-popl:submit-UTS.
Push ke Docker Hub: Setiap tim wajib membuat public repository di Docker Hub dan melakukan push terhadap image yang sudah di-tag ke repository tersebut.
Dokumentasi: Cantumkan link ke public repository Docker Hub Anda di dalam file README.md pada repository GitHub proyek.

SLIDE PRESENTASI
Isi slide, Slide harus mencakup poin-poin berikut secara ringkas dan jelas: 
Judul Proyek &amp; Tim: Nama aplikasi dan daftar anggota tim.
Deskripsi Proyek: Penjelasan singkat mengenai latar belakang, tujuan, dan manfaat dari aplikasi yang dibangun.
Tampilan &amp; Fungsionalitas Aplikasi:
Tampilkan screenshot dari halaman-halaman utama aplikasi web Anda yang sudah jadi.
Jelaskan secara singkat fitur-fitur unggulan yang telah berhasil diimplementasikan.
Penerapan Agile &amp; Scrum:
Tunjukkan backlog management dan user stories yang telah dibuat.
Jelaskan pembagian tugas dan proses sprint (cukup tampilkan screenshot dari tools manajemen proyek Anda).
Arsitektur &amp; Desain:
Jelaskan teknologi yang digunakan (Framework, Bahasa, Library).
Jelaskan Design Pattern yang diimplementasikan dan berikan contoh penerapannya pada kode.
Penerapan Kontainerisasi Docker:
Tampilkan link publik ke repository Docker Hub tempat image aplikasi Anda disimpan.
Jelaskan secara singkat poin-poin penting dari Dockerfile yang Anda gunakan.
Rencana Pengembangan: Visi dan rencana fitur yang akan dikembangkan selanjutnya.
Demo masing masing anggota secara live meliputi : 
Demo Fungsionalitas Aplikasi: Menunjukkan fitur-fitur utama dari aplikasi yang berjalan.
Kontribusi Git &amp; GitHub:
Menunjukkan histori commit di repository GitHub.
Setiap anggota memilih salah satu commit-nya dan menjelaskan perubahan yang dilakukan sesuai dengan commit message yang standar (feat:, fix:, dll.).
Menjelaskan penggunaan branch sesuai aturan (feat\_nama-fitur/...).
Proses Kontainerisasi dengan Docker:
Menjelaskan isi dari Dockerfile yang telah dibuat.
Menunjukkan proses build, tag (dengan akhiran -UTS), dan push image ke Docker Hub.
Memverifikasi bahwa image sudah berhasil ter-upload di repository publik Docker Hub.

-------------- Selamat Belajar &amp; Mengerjakan! 🦑 --------------- 



