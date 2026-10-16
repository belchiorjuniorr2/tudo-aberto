-- Aplicada no projeto Supabase "tudo-aberto" (ref ylqmxsfdtvfygbccjvgk) em 16/10/2026.
create table public.kv (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  app text not null,
  key text not null,
  value jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, app, key)
);
alter table public.kv enable row level security;
create policy "kv: dono le" on public.kv for select to authenticated using ((select auth.uid()) = user_id);
create policy "kv: dono insere" on public.kv for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "kv: dono atualiza" on public.kv for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "kv: dono apaga" on public.kv for delete to authenticated using ((select auth.uid()) = user_id);
revoke all on public.kv from anon;
grant select, insert, update, delete on public.kv to authenticated;

insert into storage.buckets (id, name, public, file_size_limit) values ('arquivos', 'arquivos', false, 52428800) on conflict (id) do nothing;
create policy "arquivos: dono le" on storage.objects for select to authenticated using (bucket_id = 'arquivos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "arquivos: dono insere" on storage.objects for insert to authenticated with check (bucket_id = 'arquivos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "arquivos: dono atualiza" on storage.objects for update to authenticated using (bucket_id = 'arquivos' and (storage.foldername(name))[1] = (select auth.uid())::text) with check (bucket_id = 'arquivos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "arquivos: dono apaga" on storage.objects for delete to authenticated using (bucket_id = 'arquivos' and (storage.foldername(name))[1] = (select auth.uid())::text);
