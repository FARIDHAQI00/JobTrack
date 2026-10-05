-- JobTrack initial schema
-- Referensi: database.md, supabase.md
-- Status: belum diverifikasi dengan `supabase db reset` (Docker belum tersedia saat dibuat).

create type public.user_role as enum ('JOB_SEEKER', 'EMPLOYER');
create type public.job_status as enum ('OPEN', 'CLOSED');
create type public.application_status as enum ('APPLIED', 'SCREENING', 'INTERVIEW', 'ACCEPTED', 'REJECTED');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  role public.user_role not null default 'JOB_SEEKER',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.seeker_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  full_name text not null,
  headline text,
  bio text,
  location text,
  phone text,
  cv_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  name text not null,
  description text,
  location text,
  website text,
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  title text not null,
  description text not null,
  qualifications text,
  category text not null,
  location text not null,
  employment_type text not null check (employment_type in ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP')),
  salary_min integer,
  salary_max integer,
  status public.job_status not null default 'OPEN',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  seeker_id uuid not null references public.profiles (id) on delete cascade,
  status public.application_status not null default 'APPLIED',
  cover_letter text,
  cv_url text,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, seeker_id)
);

create table public.saved_jobs (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs (id) on delete cascade,
  seeker_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (job_id, seeker_id)
);

-- Indexes (database.md §3)
create index jobs_status_created_at_idx on public.jobs (status, created_at desc);
create index jobs_category_idx on public.jobs (category);
create index jobs_location_idx on public.jobs (location);
create index applications_job_id_idx on public.applications (job_id);
create index applications_seeker_id_idx on public.applications (seeker_id);
create index saved_jobs_seeker_id_idx on public.saved_jobs (seeker_id);

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger seeker_profiles_set_updated_at
before update on public.seeker_profiles
for each row execute function public.set_updated_at();

create trigger companies_set_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

create trigger jobs_set_updated_at
before update on public.jobs
for each row execute function public.set_updated_at();

create trigger applications_set_updated_at
before update on public.applications
for each row execute function public.set_updated_at();

-- Auto-create profile saat signup (supabase.md §3)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  assigned_role public.user_role;
begin
  assigned_role := case new.raw_user_meta_data ->> 'role'
    when 'EMPLOYER' then 'EMPLOYER'::public.user_role
    else 'JOB_SEEKER'::public.user_role
  end;

  insert into public.profiles (id, email, role)
  values (new.id, new.email, assigned_role)
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Row Level Security (supabase.md §5)
alter table public.profiles enable row level security;
alter table public.seeker_profiles enable row level security;
alter table public.companies enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.saved_jobs enable row level security;

create policy "profiles_select_own"
on public.profiles for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "seeker_profiles_select_own"
on public.seeker_profiles for select
using (auth.uid() = user_id);

create policy "seeker_profiles_select_applicant"
on public.seeker_profiles for select
using (
  exists (
    select 1
    from public.applications a
    join public.jobs j on j.id = a.job_id
    join public.companies c on c.id = j.company_id
    where a.seeker_id = seeker_profiles.user_id
      and c.user_id = auth.uid()
  )
);

create policy "seeker_profiles_insert_own"
on public.seeker_profiles for insert
with check (auth.uid() = user_id);

create policy "seeker_profiles_update_own"
on public.seeker_profiles for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "companies_select_public"
on public.companies for select
using (true);

create policy "companies_insert_own"
on public.companies for insert
with check (auth.uid() = user_id);

create policy "companies_update_own"
on public.companies for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "companies_delete_own"
on public.companies for delete
using (auth.uid() = user_id);

create policy "jobs_select_open_or_owner"
on public.jobs for select
using (
  status = 'OPEN'
  or exists (
    select 1 from public.companies c
    where c.id = jobs.company_id and c.user_id = auth.uid()
  )
);

create policy "jobs_insert_owner"
on public.jobs for insert
with check (
  exists (
    select 1 from public.companies c
    where c.id = company_id and c.user_id = auth.uid()
  )
);

create policy "jobs_update_owner"
on public.jobs for update
using (
  exists (
    select 1 from public.companies c
    where c.id = jobs.company_id and c.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.companies c
    where c.id = company_id and c.user_id = auth.uid()
  )
);

create policy "jobs_delete_owner"
on public.jobs for delete
using (
  exists (
    select 1 from public.companies c
    where c.id = jobs.company_id and c.user_id = auth.uid()
  )
);

create policy "applications_select_seeker_or_job_owner"
on public.applications for select
using (
  auth.uid() = seeker_id
  or exists (
    select 1
    from public.jobs j
    join public.companies c on c.id = j.company_id
    where j.id = applications.job_id and c.user_id = auth.uid()
  )
);

create policy "applications_insert_seeker"
on public.applications for insert
with check (
  auth.uid() = seeker_id
  and exists (
    select 1 from public.jobs j
    where j.id = job_id and j.status = 'OPEN'
  )
);

create policy "applications_update_job_owner"
on public.applications for update
using (
  exists (
    select 1
    from public.jobs j
    join public.companies c on c.id = j.company_id
    where j.id = applications.job_id and c.user_id = auth.uid()
  )
);

create policy "saved_jobs_all_own"
on public.saved_jobs for all
using (auth.uid() = seeker_id)
with check (auth.uid() = seeker_id);

-- Grants untuk Data API roles (RLS tetap menjadi penentu akses)
grant usage on schema public to anon, authenticated;
grant select on all tables in schema public to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
