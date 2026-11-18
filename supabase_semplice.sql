-- Versione semplice "Pietro / Barbie" senza account.
-- Riapre le tabelle studio_* alla pagina. Incolla nel SQL Editor e premi RUN.
grant select, insert, update, delete on public.studio_progress, public.studio_errors, public.studio_settings to anon;
drop policy if exists studio_progress_all on public.studio_progress;
drop policy if exists studio_errors_all   on public.studio_errors;
drop policy if exists studio_settings_all on public.studio_settings;
create policy studio_progress_all on public.studio_progress for all to anon using (true) with check (true);
create policy studio_errors_all   on public.studio_errors   for all to anon using (true) with check (true);
create policy studio_settings_all on public.studio_settings for all to anon using (true) with check (true);
