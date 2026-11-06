-- Move Easy Physiotherapy: run this whole file once in Supabase > SQL Editor.npm run dev

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  patient_name text not null check (char_length(patient_name) between 2 and 100),
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  age int check (age between 1 and 120),
  preferred_date date not null,
  preferred_time time not null,
  service text not null check (char_length(service) <= 100),
  visit_type text not null check (visit_type in ('Clinic Visit','Home Visit')),
  reason text check (char_length(reason) <= 300),
  message text check (char_length(message) <= 500),
  status text not null default 'Pending' check (status in ('Pending','Confirmed','Completed','Cancelled')),
  admin_notes text check (char_length(admin_notes) <= 1000)
);
create index if not exists appointments_created_idx on public.appointments (created_at desc);
create index if not exists appointments_status_idx on public.appointments (status);
create index if not exists appointments_date_idx on public.appointments (preferred_date);

create table if not exists public.admins (user_id uuid primary key references auth.users(id) on delete cascade);

alter table public.appointments enable row level security;
alter table public.admins enable row level security;

-- Start from zero permissions, then grant only what is needed.
revoke all on public.appointments from anon, authenticated;
revoke all on public.admins from anon, authenticated;
grant insert (patient_name, phone, age, preferred_date, preferred_time, service, visit_type, reason, message) on public.appointments to anon;
grant select on public.appointments to authenticated;
grant update (status, admin_notes) on public.appointments to authenticated;
grant select on public.admins to authenticated;

-- Visitors can ONLY create new Pending requests. They can never read, change or delete anything.
create policy "visitors create pending requests" on public.appointments for insert to anon
  with check (status = 'Pending' and admin_notes is null and preferred_date >= current_date);
-- Only users listed in public.admins can read or update appointments.
create policy "admins read" on public.appointments for select to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));
create policy "admins update" on public.appointments for update to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));
create policy "admin reads own row" on public.admins for select to authenticated using (user_id = auth.uid());

-- AFTER creating your admin user in Authentication > Users, run this (put your admin email):
-- insert into public.admins (user_id) select id from auth.users where email = 'YOUR-ADMIN-EMAIL@example.com';
