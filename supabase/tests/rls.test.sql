-- RLS policy tests (pgTAP) untuk JobTrack.
-- Jalankan: supabase test db   (butuh local stack aktif: supabase start)
-- Data mengacu pada supabase/seed.sql.
-- Status: belum pernah dieksekusi (Docker belum tersedia saat file ini dibuat).

begin;

create extension if not exists pgtap with schema extensions;

select plan(12);

-- ---------------------------------------------------------------------------
-- Fixtures tambahan: employer & seeker dari perusahaan lain
-- ---------------------------------------------------------------------------
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change, email_change_token_new
) values
  (
    '00000000-0000-0000-0000-000000000000',
    'aaaa0000-0000-0000-0000-000000000001',
    'authenticated',
    'authenticated',
    'employer.other@test.local',
    crypt('x', gen_salt('bf')),
    now(),
    '{}',
    '{"role":"EMPLOYER"}',
    now(),
    now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    'aaaa0000-0000-0000-0000-000000000002',
    'authenticated',
    'authenticated',
    'seeker.other@test.local',
    crypt('x', gen_salt('bf')),
    now(),
    '{}',
    '{"role":"JOB_SEEKER"}',
    now(),
    now(),
    '', '', '', ''
  );

insert into public.companies (id, user_id, name, description, location)
values (
  'bbbb0000-0000-0000-0000-000000000001',
  'aaaa0000-0000-0000-0000-000000000001',
  'Perusahaan Lain',
  'Perusahaan untuk pengujian RLS.',
  'Bandung'
);

insert into public.jobs (
  id, company_id, title, description, category, location,
  employment_type, status
) values (
  'cccc0000-0000-0000-0000-000000000001',
  'bbbb0000-0000-0000-0000-000000000001',
  'Engineering Manager',
  'Lowongan milik perusahaan lain.',
  'Teknologi',
  'Bandung',
  'FULL_TIME',
  'CLOSED'
);

insert into public.applications (id, job_id, seeker_id, status)
values (
  'dddd0000-0000-0000-0000-000000000001',
  'cccc0000-0000-0000-0000-000000000001',
  'aaaa0000-0000-0000-0000-000000000002',
  'APPLIED'
);

-- ---------------------------------------------------------------------------
-- 1-2. Job Seeker hanya melihat datanya sendiri
-- ---------------------------------------------------------------------------
set local role authenticated;
set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from public.applications),
  2,
  'seeker melihat 2 lamaran miliknya'
);

select is(
  (select count(*)::int from public.applications
    where seeker_id = 'aaaa0000-0000-0000-0000-000000000002'),
  0,
  'seeker tidak melihat lamaran user lain'
);

-- ---------------------------------------------------------------------------
-- 3-4. Employer hanya melihat data pada lowongannya
-- ---------------------------------------------------------------------------
reset role;
set local role authenticated;
set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select count(*)::int from public.applications),
  2,
  'employer melihat 2 lamaran pada lowongan miliknya'
);

select is(
  (select count(*)::int from public.applications
    where job_id = 'cccc0000-0000-0000-0000-000000000001'),
  0,
  'employer tidak melihat lamaran perusahaan lain'
);

-- ---------------------------------------------------------------------------
-- 5. Publik hanya melihat lowongan OPEN
-- ---------------------------------------------------------------------------
reset role;
set local role anon;
set local request.jwt.claims = '{"role":"anon"}';

select is(
  (select count(*)::int from public.jobs),
  5,
  'publik hanya melihat 5 lowongan OPEN'
);

-- ---------------------------------------------------------------------------
-- 6. Employer melihat lowongan miliknya termasuk yang CLOSED
-- ---------------------------------------------------------------------------
reset role;
set local role authenticated;
set local request.jwt.claims = '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

select is(
  (select count(*)::int from public.jobs),
  6,
  'employer melihat 6 lowongan miliknya (termasuk 1 CLOSED)'
);

-- ---------------------------------------------------------------------------
-- 7-8. Profil pelamar hanya terlihat oleh employer pemilik lowongannya
-- ---------------------------------------------------------------------------
select is(
  (select count(*)::int from public.seeker_profiles
    where user_id = '22222222-2222-2222-2222-222222222222'),
  1,
  'employer pemilik lowongan melihat profil pelamarnya'
);

reset role;
set local role authenticated;
set local request.jwt.claims = '{"sub":"aaaa0000-0000-0000-0000-000000000001","role":"authenticated"}';

select is(
  (select count(*)::int from public.seeker_profiles
    where user_id = '22222222-2222-2222-2222-222222222222'),
  0,
  'employer non-pemilik tidak melihat profil pelamar tersebut'
);

-- ---------------------------------------------------------------------------
-- 9-10. Saved jobs hanya milik seeker terkait
-- ---------------------------------------------------------------------------
reset role;
set local role authenticated;
set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select is(
  (select count(*)::int from public.saved_jobs),
  1,
  'seeker melihat 1 lowongan tersimpan miliknya'
);

reset role;
set local role authenticated;
set local request.jwt.claims = '{"sub":"aaaa0000-0000-0000-0000-000000000002","role":"authenticated"}';

select is(
  (select count(*)::int from public.saved_jobs),
  0,
  'seeker lain tidak melihat simpanan milik user pertama'
);

-- ---------------------------------------------------------------------------
-- 11. Job Seeker tidak dapat membuat lowongan
-- ---------------------------------------------------------------------------
reset role;
set local role authenticated;
set local request.jwt.claims = '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

select throws_ok(
  $$
    insert into public.jobs (
      company_id, title, description, category, location, employment_type, status
    ) values (
      '33333333-3333-3333-3333-333333333333',
      'Lowongan Tidak Sah',
      'Dibuat oleh seeker, harus ditolak RLS.',
      'Teknologi',
      'Jakarta',
      'FULL_TIME',
      'OPEN'
    )
  $$,
  '42501',
  null,
  'seeker tidak dapat membuat lowongan (RLS)'
);

-- ---------------------------------------------------------------------------
-- 12. Job Seeker tidak dapat mengubah status lamarannya sendiri
-- ---------------------------------------------------------------------------
update public.applications
set status = 'ACCEPTED'
where id = '55555555-5555-5555-5555-555555555501';

select is(
  (
    select status::text from public.applications
    where id = '55555555-5555-5555-5555-555555555501'
  ),
  'SCREENING',
  'status lamaran tidak berubah setelah percobaan update oleh seeker'
);

select * from finish();

rollback;
