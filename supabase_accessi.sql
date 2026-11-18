-- ACCESSI STUDENTE / GENITORE per Quest Sessione
--
-- PRIMA di eseguire questo script:
--   Supabase -> Authentication -> Users -> "Add user" -> "Create new user"
--   crea 2 utenti (email + password) e spunta "Auto Confirm User":
--     1) il tuo account (studente)
--     2) l'account del genitore
--
-- POI: sostituisci qui sotto EMAIL_STUDENTE, EMAIL_GENITORE e i nomi,
--      incolla tutto nel SQL Editor e premi RUN.
--
-- Dopo questo script la dashboard e' visibile SOLO a questi due account.
-- I progressi gia' salvati restano.

-- 1. Chi puo' entrare e con che ruolo
create table if not exists public.studio_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('studente','genitore')),
  name text not null default ''
);

-- 2. Promemoria del genitore
create table if not exists public.studio_reminders (
  id uuid primary key default gen_random_uuid(),
  text text not null check (char_length(text) between 1 and 500),
  created_by uuid default auth.uid() references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

-- 3. Funzione che dice il ruolo di chi e' collegato
create or replace function public.studio_role()
returns text language sql stable security definer set search_path = ''
as $$ select role from public.studio_members where user_id = (select auth.uid()) $$;
revoke execute on function public.studio_role() from public, anon;
grant execute on function public.studio_role() to authenticated;

alter table public.studio_members   enable row level security;
alter table public.studio_reminders enable row level security;
alter table public.studio_progress  enable row level security;
alter table public.studio_errors    enable row level security;
alter table public.studio_settings  enable row level security;

-- 4. Chiudo l'accesso aperto a tutti di prima
drop policy if exists studio_progress_all on public.studio_progress;
drop policy if exists studio_errors_all   on public.studio_errors;
drop policy if exists studio_settings_all on public.studio_settings;
revoke all on public.studio_progress, public.studio_errors, public.studio_settings,
              public.studio_members, public.studio_reminders from anon;

-- 5. Regole: tutti e due leggono, solo lo studente scrive i progressi
do $$
declare t text;
begin
  foreach t in array array['studio_progress','studio_errors','studio_settings'] loop
    execute format('drop policy if exists %I on public.%I', t||'_read', t);
    execute format('drop policy if exists %I on public.%I', t||'_write', t);
    execute format('create policy %I on public.%I for select to authenticated using (public.studio_role() is not null)', t||'_read', t);
    execute format('create policy %I on public.%I for all to authenticated using (public.studio_role() = ''studente'') with check (public.studio_role() = ''studente'')', t||'_write', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
  end loop;
end $$;

drop policy if exists studio_members_read on public.studio_members;
create policy studio_members_read on public.studio_members for select to authenticated
  using (user_id = (select auth.uid()) or public.studio_role() is not null);
grant select on public.studio_members to authenticated;

-- Promemoria: il genitore li scrive e cancella, lo studente li segna come letti
drop policy if exists studio_reminders_read   on public.studio_reminders;
drop policy if exists studio_reminders_insert on public.studio_reminders;
drop policy if exists studio_reminders_delete on public.studio_reminders;
drop policy if exists studio_reminders_update on public.studio_reminders;
create policy studio_reminders_read   on public.studio_reminders for select to authenticated using (public.studio_role() is not null);
create policy studio_reminders_insert on public.studio_reminders for insert to authenticated with check (public.studio_role() = 'genitore' and created_by = (select auth.uid()));
create policy studio_reminders_delete on public.studio_reminders for delete to authenticated using (public.studio_role() = 'genitore');
create policy studio_reminders_update on public.studio_reminders for update to authenticated using (public.studio_role() = 'studente') with check (public.studio_role() = 'studente');
revoke update on public.studio_reminders from authenticated;
grant select, insert, delete on public.studio_reminders to authenticated;
grant update (read_at) on public.studio_reminders to authenticated;

-- 6. ASSEGNA I RUOLI  (cambia email e nomi!)
insert into public.studio_members (user_id, role, name)
select id, 'studente', 'NOME_STUDENTE' from auth.users where email = 'EMAIL_STUDENTE'
on conflict (user_id) do update set role = excluded.role, name = excluded.name;

insert into public.studio_members (user_id, role, name)
select id, 'genitore', 'NOME_GENITORE' from auth.users where email = 'EMAIL_GENITORE'
on conflict (user_id) do update set role = excluded.role, name = excluded.name;

-- Controllo: devono uscire 2 righe
select m.role, m.name, u.email from public.studio_members m join auth.users u on u.id = m.user_id;
