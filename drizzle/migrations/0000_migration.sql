create type public.app_role as enum ('admin');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create or replace function public.handle_first_admin()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_admin after insert on auth.users
for each row execute function public.handle_first_admin();

create table public.platforms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  link text not null,
  category text not null default 'lancamentos' check (category in ('lancamentos','populares','melhores')),
  created_at timestamptz not null default now()
);
grant select on public.platforms to anon, authenticated;
grant insert, update, delete on public.platforms to authenticated;
grant all on public.platforms to service_role;
alter table public.platforms enable row level security;
create policy "public read" on public.platforms for select to anon, authenticated using (true);
create policy "admin insert" on public.platforms for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admin update" on public.platforms for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "admin delete" on public.platforms for delete to authenticated using (public.has_role(auth.uid(),'admin'));

insert into public.platforms (name, link, category) values
('8855BET','https://211.43.149.60/?id=669250336','lancamentos'),
('166BET','https://211.43.149.101/?id=39409456','lancamentos'),
('333BET','https://333bet55.com/?id=10955223','lancamentos'),
('3355BET','https://www.3355bet43.com/?id=33118435','lancamentos'),
('234BET','https://br234.cc/?id=74973234','lancamentos'),
('777TIGER','https://ee777tiger.com/?id=34647408','populares'),
('CNCBET','https://tat.bet/?id=35919155','populares'),
('669BET','https://669bet24.com/?id=52357202','populares'),
('GTWIN','https://211.43.149.71:5001/?id=106045302','populares'),
('23BET','https://211.43.149.99:5001/?id=236637468','populares'),
('5588BET','https://138.113.171.11/?id=84953782','melhores'),
('XJWIN','https://www.xjwin43.com/?id=876552436','melhores'),
('939BET','https://www.939bet43.com/?id=134576640','melhores'),
('9NBET','https://www.9nbet22.com/?id=98596261','melhores');