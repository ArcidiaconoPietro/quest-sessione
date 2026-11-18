-- Dashboard studio: incolla tutto nel SQL Editor di Supabase e premi RUN.
-- Crea solo tabelle con prefisso studio_, non tocca nient'altro del database.

create table if not exists public.studio_progress (
  day date primary key,
  done int[] not null default '{}',
  goal_ok boolean not null default false,
  note text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.studio_errors (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  text text not null,
  day date,
  fixed boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.studio_settings (
  key text primary key,
  value text
);

alter table public.studio_progress enable row level security;
alter table public.studio_errors   enable row level security;
alter table public.studio_settings enable row level security;

drop policy if exists studio_progress_all on public.studio_progress;
drop policy if exists studio_errors_all   on public.studio_errors;
drop policy if exists studio_settings_all on public.studio_settings;

create policy studio_progress_all on public.studio_progress for all to anon, authenticated using (true) with check (true);
create policy studio_errors_all   on public.studio_errors   for all to anon, authenticated using (true) with check (true);
create policy studio_settings_all on public.studio_settings for all to anon, authenticated using (true) with check (true);

grant select, insert, update, delete on public.studio_progress, public.studio_errors, public.studio_settings to anon, authenticated;
