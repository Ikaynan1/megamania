create table public.banners (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  link text,
  created_at timestamptz not null default now()
);
grant select on public.banners to anon, authenticated;
grant insert, update, delete on public.banners to authenticated;
grant all on public.banners to service_role;
alter table public.banners enable row level security;
create policy "public read banners" on public.banners for select to anon, authenticated using (true);
create policy "admin insert banners" on public.banners for insert to authenticated with check (public.has_role(auth.uid(),'admin'));
create policy "admin delete banners" on public.banners for delete to authenticated using (public.has_role(auth.uid(),'admin'));

create policy "public read banner files" on storage.objects for select using (bucket_id = 'banners');
create policy "admin upload banner files" on storage.objects for insert to authenticated with check (bucket_id = 'banners' and public.has_role(auth.uid(),'admin'));
create policy "admin delete banner files" on storage.objects for delete to authenticated using (bucket_id = 'banners' and public.has_role(auth.uid(),'admin'));