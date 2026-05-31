-- Supabase SQL Editor Script
-- Run this in your Supabase SQL Editor to set up the dashboard data.

-- 1. Create courses table
create table if not exists courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'BookOpen',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table courses enable row level security;

-- 3. Create public read policy (Allow anonymous read)
create policy "Allow public read access" 
  on courses for select 
  using (true);

-- 4. Seed initial mock courses
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'BookOpen'),
  ('Creative Coding with WebGL', 40, 'Sparkles'),
  ('Data Structures & Algorithms', 92, 'Binary'),
  ('Next.js Production Architecture', 15, 'Cpu');
