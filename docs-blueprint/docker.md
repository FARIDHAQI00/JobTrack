# Docker

## 1. Requirement

Docker image wajib dibuat dari Dockerfile di root project. Image harus di-build, di-tag dengan suffix `-UTS`, dan di-push ke public Docker Hub repository.

## 2. Target Files

```text
/
├── Dockerfile
├── .dockerignore
└── docker-compose.yml   # opsional
```

## 3. Dockerfile Strategy

Untuk Next.js gunakan multi-stage build bila memungkinkan:

```text
deps → builder → runner
```

Tujuan:
- install dependency
- build application
- menjalankan image runtime yang lebih kecil

## 4. Commands

Build:

```bash
docker build -t <dockerhub-username>/jobtrack:v1-UTS .
```

Run:

```bash
docker run --rm -p 3000:3000 <dockerhub-username>/jobtrack:v1-UTS
```

Push:

```bash
docker login
docker push <dockerhub-username>/jobtrack:v1-UTS
```

Tag **wajib berakhiran `-UTS`**.

## 5. Docker Compose

Jika backend + PostgreSQL benar-benar dibuat:

```text
frontend
backend
postgres
```

Tetapi compose bersifat opsional menurut requirement.

## 6. README Evidence

README harus mencantumkan link public Docker Hub repository.

## 7. Demo Evidence

Tunjukkan:
1. Dockerfile
2. `docker build`
3. hasil image
4. tag `-UTS`
5. `docker push`
6. Docker Hub public repository
7. image berhasil tersedia

## 8. Hubungan dengan Vercel & Supabase

- Docker **tetap wajib** sebagai bukti requirement UTS dan tidak digantikan Vercel (`vercel.md`).
- Vercel = hosting production/preview; Docker = image portabel untuk demo lokal/offline.
- Image berdiri sendiri dengan mock repository, atau terhubung Supabase melalui environment variables saat dijalankan:

```bash
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=... \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=... \
  <dockerhub-username>/jobtrack:v1-UTS
```

- Jangan menyalin `.env.local` ke dalam image; gunakan `-e` atau secret manager.
- `supabase start` untuk local development juga memakai Docker (`supabase.md` §7).
