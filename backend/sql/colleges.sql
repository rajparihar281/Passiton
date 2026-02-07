create table public.colleges (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    domain text unique not null, 
    location text,
    created_at timestamp with time zone default now()
);

alter table public.colleges enable row level security;





create policy "Colleges are viewable by everyone"
  on public.colleges for select
  using ( true );