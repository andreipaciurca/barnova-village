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
