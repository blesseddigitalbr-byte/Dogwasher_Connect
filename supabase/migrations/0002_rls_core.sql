-- =============================================================================
-- Dog Washer Connect — Fase 1 — Migration 0002: RLS do núcleo
-- Idempotente: pode ser rodada mais de uma vez sem erro.
-- =============================================================================

alter table public.users enable row level security;
alter table public.professional_profiles enable row level security;
alter table public.professional_availability enable row level security;
alter table public.establishments enable row level security;
alter table public.establishment_units enable row level security;
alter table public.establishment_documents enable row level security;
alter table public.establishment_photos enable row level security;
alter table public.audit_logs enable row level security;
alter table public.terms_acceptances enable row level security;
alter table public.platform_settings enable row level security;
alter table public.notifications enable row level security;

-- Helper: papel do usuário autenticado
create or replace function public.current_user_role()
returns user_role
language sql
security definer
stable
as $$
  select role from public.users where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select coalesce((select role = 'admin' from public.users where id = auth.uid()), false);
$$;

-- -----------------------------------------------------------------------------
-- users
-- -----------------------------------------------------------------------------
drop policy if exists "users_select_own_or_admin" on public.users;
create policy "users_select_own_or_admin"
  on public.users for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
  on public.users for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- -----------------------------------------------------------------------------
-- professional_profiles
-- Dono vê/edita o próprio perfil. Estabelecimento vê perfil de candidato
-- (join controlado na camada de application, não aqui). Admin vê tudo.
-- -----------------------------------------------------------------------------
drop policy if exists "professional_profiles_select_own_or_admin" on public.professional_profiles;
create policy "professional_profiles_select_own_or_admin"
  on public.professional_profiles for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "professional_profiles_insert_own" on public.professional_profiles;
create policy "professional_profiles_insert_own"
  on public.professional_profiles for insert
  with check (user_id = auth.uid());

drop policy if exists "professional_profiles_update_own_or_admin" on public.professional_profiles;
create policy "professional_profiles_update_own_or_admin"
  on public.professional_profiles for update
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "professional_availability_owner" on public.professional_availability;
create policy "professional_availability_owner"
  on public.professional_availability for all
  using (
    professional_id in (
      select id from public.professional_profiles where user_id = auth.uid()
    )
    or public.is_admin()
  );

-- -----------------------------------------------------------------------------
-- establishments / units / documents / photos
-- -----------------------------------------------------------------------------
drop policy if exists "establishments_select_own_or_admin" on public.establishments;
create policy "establishments_select_own_or_admin"
  on public.establishments for select
  using (owner_user_id = auth.uid() or public.is_admin());

drop policy if exists "establishments_insert_own" on public.establishments;
create policy "establishments_insert_own"
  on public.establishments for insert
  with check (owner_user_id = auth.uid());

drop policy if exists "establishments_update_own_or_admin" on public.establishments;
create policy "establishments_update_own_or_admin"
  on public.establishments for update
  using (owner_user_id = auth.uid() or public.is_admin());

drop policy if exists "establishment_units_owner_or_admin" on public.establishment_units;
create policy "establishment_units_owner_or_admin"
  on public.establishment_units for all
  using (
    establishment_id in (
      select id from public.establishments where owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "establishment_documents_owner_or_admin" on public.establishment_documents;
create policy "establishment_documents_owner_or_admin"
  on public.establishment_documents for all
  using (
    establishment_id in (
      select id from public.establishments where owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "establishment_photos_owner_or_admin" on public.establishment_photos;
create policy "establishment_photos_owner_or_admin"
  on public.establishment_photos for all
  using (
    unit_id in (
      select eu.id from public.establishment_units eu
      join public.establishments e on e.id = eu.establishment_id
      where e.owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

-- -----------------------------------------------------------------------------
-- audit_logs — leitura restrita a admin; escrita só via service role (server)
-- -----------------------------------------------------------------------------
drop policy if exists "audit_logs_admin_only" on public.audit_logs;
create policy "audit_logs_admin_only"
  on public.audit_logs for select
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- terms_acceptances — cada usuário só vê/insere o próprio aceite
-- -----------------------------------------------------------------------------
drop policy if exists "terms_acceptances_own_or_admin" on public.terms_acceptances;
create policy "terms_acceptances_own_or_admin"
  on public.terms_acceptances for select
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "terms_acceptances_insert_own" on public.terms_acceptances;
create policy "terms_acceptances_insert_own"
  on public.terms_acceptances for insert
  with check (user_id = auth.uid());

-- -----------------------------------------------------------------------------
-- platform_settings — leitura pública de configs não sensíveis fica a
-- critério de cada chave; no MVP, restringe a admin.
-- -----------------------------------------------------------------------------
drop policy if exists "platform_settings_admin_only" on public.platform_settings;
create policy "platform_settings_admin_only"
  on public.platform_settings for all
  using (public.is_admin());

-- -----------------------------------------------------------------------------
-- notifications — cada usuário só vê as próprias
-- -----------------------------------------------------------------------------
drop policy if exists "notifications_own" on public.notifications;
create policy "notifications_own"
  on public.notifications for select
  using (user_id = auth.uid());

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own"
  on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
