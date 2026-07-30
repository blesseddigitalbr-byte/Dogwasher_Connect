-- =============================================================================
-- Dog Washer Connect — Migration 0003: permite cadastro do próprio usuário
-- =============================================================================

alter table public.users enable row level security;

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own"
  on public.users for insert
  with check (id = auth.uid());
