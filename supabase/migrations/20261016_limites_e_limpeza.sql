-- Tudo Aberto: controles de abuso.
-- 1) Limpeza diária (pg_cron) de visitantes anônimos com mais de 7 dias (kv é apagado em cascata).
-- 2) Cota por usuário: 100 MB de arquivos no bucket "arquivos" e 20 MB de dados no kv.

create extension if not exists pg_cron;

create or replace function public.limpar_anonimos_antigos() returns integer
language plpgsql security definer set search_path = '' as $$
declare n integer;
begin
  delete from auth.users u
   where u.is_anonymous
     and u.created_at < now() - interval '7 days'
     and coalesce(u.last_sign_in_at, u.created_at) < now() - interval '7 days';
  get diagnostics n = row_count;
  return n;
end $$;
revoke all on function public.limpar_anonimos_antigos() from public, anon, authenticated;

select cron.unschedule(jobid) from cron.job where jobname = 'tudo-aberto-limpar-anonimos';
select cron.schedule('tudo-aberto-limpar-anonimos', '17 6 * * *', 'select public.limpar_anonimos_antigos()');

-- Cota de arquivos (100 MB por usuário, pasta = auth.uid()).
create or replace function public.cota_arquivos() returns trigger
language plpgsql security definer set search_path = '' as $$
declare usado bigint; novo bigint;
begin
  if new.bucket_id <> 'arquivos' then return new; end if;
  novo := coalesce((new.metadata->>'size')::bigint, 0);
  select coalesce(sum((o.metadata->>'size')::bigint), 0) into usado
    from storage.objects o
   where o.bucket_id = 'arquivos'
     and (storage.foldername(o.name))[1] = (storage.foldername(new.name))[1]
     and o.id <> new.id;
  if usado + novo > 100 * 1024 * 1024 then
    raise exception 'Limite de 100 MB de arquivos por usuário atingido' using errcode = '53400';
  end if;
  return new;
end $$;
drop trigger if exists cota_arquivos on storage.objects;
create trigger cota_arquivos before insert or update of metadata on storage.objects
  for each row execute function public.cota_arquivos();

-- Cota do kv (20 MB por usuário).
create or replace function public.cota_kv() returns trigger
language plpgsql security definer set search_path = '' as $$
declare usado bigint;
begin
  select coalesce(sum(pg_column_size(k.value)), 0) into usado from public.kv k
   where k.user_id = new.user_id and not (k.app = new.app and k.key = new.key);
  if usado + pg_column_size(new.value) > 20 * 1024 * 1024 then
    raise exception 'Limite de 20 MB de dados por usuário atingido' using errcode = '53400';
  end if;
  return new;
end $$;
drop trigger if exists cota_kv on public.kv;
create trigger cota_kv before insert or update on public.kv for each row execute function public.cota_kv();
revoke all on function public.cota_arquivos() from public, anon, authenticated;
revoke all on function public.cota_kv() from public, anon, authenticated;
