-- 1. Tabelul pentru postări
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  slug text unique not null,
  content text,
  excerpt text,
  author_id uuid references auth.users not null,
  status text default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamp with time zone,
  image_url text
);

-- 2. Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- 3. Politici de Securitate
-- Oricine poate citi postările publicate
create policy "Anyone can view published posts"
  on public.posts for select
  using ( status = 'published' );

-- Doar utilizatorii autentificați pot face orice altceva
create policy "Authenticated users can manage posts"
  on public.posts for all
  using ( auth.role() = 'authenticated' );

-- 4. Funcție pentru actualizarea automată a 'updated_at'
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
before update on public.posts
for each row
execute function public.handle_updated_at();

-- 5. Tabel pentru setările site-ului
create table public.site_settings (
  id text primary key,
  value jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.site_settings enable row level security;

-- Politici: Oricine poate citi setările, doar adminii le pot modifica
create policy "Anyone can view site settings"
  on public.site_settings for select
  using ( true );

create policy "Authenticated users can manage site settings"
  on public.site_settings for all
  using ( auth.role() = 'authenticated' );

-- Trigger pentru updated_at
create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.handle_updated_at();

-- Date inițiale pentru setări
insert into public.site_settings (id, value)
values 
  ('general', '{"site_name": "Bârnova Village", "site_description": "Portalul oficial al comunei Bârnova", "contact_email": "contact@primariabarnova.ro"}'::jsonb),
  ('features', '{"show_news": true, "show_weather": false, "show_stats": true, "sarcastic_mode": false}'::jsonb)
on conflict (id) do nothing;
