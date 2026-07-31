-- =============================================================================
-- Dog Washer Connect — Fase 2 — Execução, check-in e check-out
-- =============================================================================

do $$ begin
  create type work_execution_status as enum (
    'scheduled',
    'checked_in',
    'checked_out',
    'completed',
    'cancelled'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type work_execution_event_type as enum (
    'check_in',
    'check_out',
    'note'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.work_executions (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null unique references public.opportunities (id) on delete cascade,
  application_id uuid not null unique references public.opportunity_applications (id) on delete cascade,
  professional_id uuid not null references public.professional_profiles (id) on delete cascade,
  establishment_id uuid not null references public.establishments (id) on delete cascade,
  status work_execution_status not null default 'scheduled',
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.work_execution_events (
  id uuid primary key default gen_random_uuid(),
  execution_id uuid not null references public.work_executions (id) on delete cascade,
  actor_id uuid not null references public.users (id),
  event_type work_execution_event_type not null,
  note text,
  lat double precision,
  lng double precision,
  created_at timestamptz not null default now()
);

create index if not exists idx_work_executions_professional
  on public.work_executions (professional_id, status);

create index if not exists idx_work_executions_establishment
  on public.work_executions (establishment_id, status);

create index if not exists idx_work_execution_events_execution
  on public.work_execution_events (execution_id, created_at);

alter table public.work_executions enable row level security;
alter table public.work_execution_events enable row level security;

drop policy if exists "work_executions_participants_or_admin" on public.work_executions;
create policy "work_executions_participants_or_admin"
  on public.work_executions for select
  using (
    professional_id in (
      select id from public.professional_profiles where user_id = auth.uid()
    )
    or establishment_id in (
      select id from public.establishments where owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "work_executions_update_participants_or_admin" on public.work_executions;
create policy "work_executions_update_participants_or_admin"
  on public.work_executions for update
  using (
    professional_id in (
      select id from public.professional_profiles where user_id = auth.uid()
    )
    or establishment_id in (
      select id from public.establishments where owner_user_id = auth.uid()
    )
    or public.is_admin()
  );

drop policy if exists "work_execution_events_participants_or_admin" on public.work_execution_events;
create policy "work_execution_events_participants_or_admin"
  on public.work_execution_events for select
  using (
    execution_id in (
      select id from public.work_executions
      where professional_id in (
        select id from public.professional_profiles where user_id = auth.uid()
      )
      or establishment_id in (
        select id from public.establishments where owner_user_id = auth.uid()
      )
    )
    or public.is_admin()
  );

drop policy if exists "work_execution_events_insert_participants_or_admin" on public.work_execution_events;
create policy "work_execution_events_insert_participants_or_admin"
  on public.work_execution_events for insert
  with check (
    actor_id = auth.uid()
    and (
      execution_id in (
        select id from public.work_executions
        where professional_id in (
          select id from public.professional_profiles where user_id = auth.uid()
        )
        or establishment_id in (
          select id from public.establishments where owner_user_id = auth.uid()
        )
      )
      or public.is_admin()
    )
  );

create or replace function public.create_work_execution_for_accepted_application()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  opportunity_row public.opportunities%rowtype;
begin
  if new.status = 'accepted' and old.status is distinct from 'accepted' then
    select * into opportunity_row
    from public.opportunities
    where id = new.opportunity_id;

    insert into public.work_executions (
      opportunity_id,
      application_id,
      professional_id,
      establishment_id,
      status
    )
    values (
      new.opportunity_id,
      new.id,
      new.professional_id,
      opportunity_row.establishment_id,
      'scheduled'
    )
    on conflict (application_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_application_accepted_create_execution on public.opportunity_applications;
create trigger on_application_accepted_create_execution
  after update of status on public.opportunity_applications
  for each row execute function public.create_work_execution_for_accepted_application();
