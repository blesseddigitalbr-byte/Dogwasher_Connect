-- =============================================================================
-- Dog Washer Connect — Fase 2 — Oportunidades e candidaturas
-- =============================================================================

do $$ begin
  create type opportunity_status as enum (
    'draft',
    'published',
    'filled',
    'cancelled',
    'completed'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type opportunity_application_status as enum (
    'pending',
    'accepted',
    'declined',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  establishment_id uuid not null references public.establishments (id) on delete cascade,
  unit_id uuid references public.establishment_units (id) on delete set null,
  created_by uuid not null references public.users (id),
  title text not null,
  description text,
  service_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  value_cents integer not null check (value_cents >= 0),
  slots integer not null default 1 check (slots > 0),
  status opportunity_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.opportunity_applications (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities (id) on delete cascade,
  professional_id uuid not null references public.professional_profiles (id) on delete cascade,
  message text,
  status opportunity_application_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (opportunity_id, professional_id)
);

create index if not exists idx_opportunities_status_starts_at
  on public.opportunities (status, starts_at);

create index if not exists idx_opportunities_establishment
  on public.opportunities (establishment_id);

create index if not exists idx_applications_opportunity
  on public.opportunity_applications (opportunity_id);

create index if not exists idx_applications_professional
  on public.opportunity_applications (professional_id);

alter table public.opportunities enable row level security;
alter table public.opportunity_applications enable row level security;

drop policy if exists "opportunities_select_public_or_owner_or_admin" on public.opportunities;
create policy "opportunities_select_public_or_owner_or_admin"
  on public.opportunities for select
  using (
    (status = 'published' and deleted_at is null)
    or establishment_id in (
      select id from public.establishments where owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "opportunities_insert_owner_or_admin" on public.opportunities;
create policy "opportunities_insert_owner_or_admin"
  on public.opportunities for insert
  with check (
    created_by = auth.uid()
    and (
      establishment_id in (
        select id from public.establishments where owner_user_id = auth.uid()
      )
      or public.is_admin()
    )
  );

drop policy if exists "opportunities_update_owner_or_admin" on public.opportunities;
create policy "opportunities_update_owner_or_admin"
  on public.opportunities for update
  using (
    establishment_id in (
      select id from public.establishments where owner_user_id = auth.uid()
    )
    or public.is_admin()
  )
  with check (
    establishment_id in (
      select id from public.establishments where owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "applications_select_participants_or_admin" on public.opportunity_applications;
create policy "applications_select_participants_or_admin"
  on public.opportunity_applications for select
  using (
    professional_id in (
      select id from public.professional_profiles where user_id = auth.uid()
    )
    or opportunity_id in (
      select o.id
      from public.opportunities o
      join public.establishments e on e.id = o.establishment_id
      where e.owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "applications_insert_own_professional" on public.opportunity_applications;
create policy "applications_insert_own_professional"
  on public.opportunity_applications for insert
  with check (
    professional_id in (
      select id from public.professional_profiles where user_id = auth.uid()
    )
    and opportunity_id in (
      select id from public.opportunities where status = 'published' and deleted_at is null
    )
  );

drop policy if exists "applications_update_participants_or_admin" on public.opportunity_applications;
create policy "applications_update_participants_or_admin"
  on public.opportunity_applications for update
  using (
    professional_id in (
      select id from public.professional_profiles where user_id = auth.uid()
    )
    or opportunity_id in (
      select o.id
      from public.opportunities o
      join public.establishments e on e.id = o.establishment_id
      where e.owner_user_id = auth.uid()
    )
    or public.is_admin()
  );
