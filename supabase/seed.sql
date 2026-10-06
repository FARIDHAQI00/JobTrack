-- JobTrack demo seed (lokal, dijalankan oleh `supabase db reset`).
-- Kredensial demo: employer@demo.jobtrack / seeker@demo.jobtrack, password demo1234.
-- Jangan dipakai di production.
-- Status: belum diverifikasi dengan `supabase db reset` (Docker belum tersedia saat dibuat).

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change, email_change_token_new
) values
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-1111-1111-111111111111',
    'authenticated',
    'authenticated',
    'employer@demo.jobtrack',
    crypt('demo1234', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"EMPLOYER"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    'authenticated',
    'authenticated',
    'seeker@demo.jobtrack',
    crypt('demo1234', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"role":"JOB_SEEKER"}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  )
on conflict (id) do nothing;

insert into auth.identities (
  id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at
) values
  (
    gen_random_uuid(),
    '11111111-1111-1111-1111-111111111111',
    '{"sub":"11111111-1111-1111-1111-111111111111","email":"employer@demo.jobtrack","email_verified":true}'::jsonb,
    'email',
    '11111111-1111-1111-1111-111111111111',
    now(),
    now(),
    now()
  ),
  (
    gen_random_uuid(),
    '22222222-2222-2222-2222-222222222222',
    '{"sub":"22222222-2222-2222-2222-222222222222","email":"seeker@demo.jobtrack","email_verified":true}'::jsonb,
    'email',
    '22222222-2222-2222-2222-222222222222',
    now(),
    now(),
    now()
  )
on conflict do nothing;

insert into public.seeker_profiles (user_id, full_name, headline, bio, location, phone)
values (
  '22222222-2222-2222-2222-222222222222',
  'Rani Puspita',
  'Frontend Developer',
  'Fokus pada React dan Next.js, tertarik pada produk yang rapi dan aksesibel.',
  'Yogyakarta',
  '+62 812-0000-0000'
)
on conflict (user_id) do nothing;

insert into public.companies (id, user_id, name, description, location, website)
values (
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'Nusantara Digital',
  'Studio produk digital yang membantu perusahaan lokal bertumbuh lewat perangkat lunak yang rapi.',
  'Jakarta',
  'https://nusantara-digital.example'
)
on conflict (id) do nothing;

insert into public.jobs (
  id, company_id, title, description, qualifications, category, location,
  employment_type, salary_min, salary_max, status
) values
  (
    '44444444-4444-4444-4444-444444444401',
    '33333333-3333-3333-3333-333333333333',
    'Frontend Developer',
    'Membangun antarmuka produk JobTrack bersama tim produk dan desain.',
    'Menguasai React dan TypeScript; terbiasa dengan aksesibilitas dasar.',
    'Teknologi',
    'Jakarta',
    'FULL_TIME',
    8000000,
    12000000,
    'OPEN'
  ),
  (
    '44444444-4444-4444-4444-444444444402',
    '33333333-3333-3333-3333-333333333333',
    'UI/UX Designer',
    'Merancang alur dan antarmuka yang jelas untuk pengguna pencari kerja.',
    'Portofolio produk digital; terbiasa dengan design system.',
    'Desain',
    'Bandung',
    'CONTRACT',
    7000000,
    10000000,
    'OPEN'
  ),
  (
    '44444444-4444-4444-4444-444444444403',
    '33333333-3333-3333-3333-333333333333',
    'Data Analyst',
    'Menyiapkan metrik rekrutmen dan laporan funnel untuk tim employer.',
    'SQL dan visualisasi data; teliti dengan angka.',
    'Data',
    'Surabaya',
    'FULL_TIME',
    9000000,
    14000000,
    'OPEN'
  ),
  (
    '44444444-4444-4444-4444-444444444404',
    '33333333-3333-3333-3333-333333333333',
    'Backend Developer',
    'Mengembangkan layanan API dan integrasi data untuk platform.',
    'Node.js atau Go; paham PostgreSQL.',
    'Teknologi',
    'Jakarta',
    'FULL_TIME',
    10000000,
    15000000,
    'OPEN'
  ),
  (
    '44444444-4444-4444-4444-444444444405',
    '33333333-3333-3333-3333-333333333333',
    'Content Marketing Specialist',
    'Menyusun konten untuk membantu employer menulis lowongan yang baik.',
    'Menulis rapi; paham SEO dasar.',
    'Marketing',
    'Remote',
    'PART_TIME',
    4000000,
    6000000,
    'OPEN'
  ),
  (
    '44444444-4444-4444-4444-444444444406',
    '33333333-3333-3333-3333-333333333333',
    'Quality Assurance Engineer',
    'Menjaga kualitas rilis dengan pengujian manual dan otomatis.',
    'Teliti; terbiasa menulis test case.',
    'Teknologi',
    'Yogyakarta',
    'INTERNSHIP',
    2500000,
    3500000,
    'CLOSED'
  )
on conflict (id) do nothing;

insert into public.applications (id, job_id, seeker_id, status, cover_letter)
values
  (
    '55555555-5555-5555-5555-555555555501',
    '44444444-4444-4444-4444-444444444401',
    '22222222-2222-2222-2222-222222222222',
    'SCREENING',
    'Saya tertarik membangun antarmuka yang rapi dan aksesibel.'
  ),
  (
    '55555555-5555-5555-5555-555555555502',
    '44444444-4444-4444-4444-444444444403',
    '22222222-2222-2222-2222-222222222222',
    'APPLIED',
    'Saya terbiasa bekerja dengan data dan laporan.'
  )
on conflict (job_id, seeker_id) do nothing;

insert into public.saved_jobs (id, job_id, seeker_id)
values (
  '66666666-6666-6666-6666-666666666601',
  '44444444-4444-4444-4444-444444444402',
  '22222222-2222-2222-2222-222222222222'
)
on conflict (job_id, seeker_id) do nothing;
