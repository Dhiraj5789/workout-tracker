-- Run once in Supabase: SQL Editor > New query > paste > Run
-- One row per signed-in user; Row Level Security keeps each user's data private.

create table if not exists tracker_state (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table tracker_state enable row level security;

create policy "users manage their own row"
  on tracker_state for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
