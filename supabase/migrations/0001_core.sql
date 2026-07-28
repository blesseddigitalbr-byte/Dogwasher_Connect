-- =============================================================================
-- Dog Washer Connect — Fase 1 — Migration 0001: Núcleo (users, perfis, roles)
-- =============================================================================

create extension if not exists "pgcrypto";

do $$ begin
  create type user_role as enum ('professional', 'establishment_owner', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type professional_status as enum (
    'cadastro_incompleto',
    'aguardando_verificacao',
    'verificado',
    'reprovado',
    'suspenso',
    'bloqueado'
  );
exception
  when duplicate_object then null;
end $$;

do $$ begin
  create type establishment_status as enum (
    'cadastro_incompleto',
    'aguardando_verificacao',
    'verificado',
    'qualificado',
    'reprovado',
    'suspenso',
    'bloqueado'
  );
exception
  when duplicate_object then null;
end $$;

-- -----------------------------------------------------------------------------
-- users
-- Espelha auth.users do Supabase Auth, guardando dados de negócio + role.
-- -----------------------------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  phone text,
  role user_role not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

comment on table public.users is 'Dados de negócio do usuário autenticado. 1:1 com auth.users.';

-- -----------------------------------------------------------------------------
-- professional_profiles
-- -----------------------------------------------------------------------------
create table if not exists public.professional_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users (id) on delete cascade,
  full_name text not null,
  photo_url text,
  formacao_declarada text,
  cidade text,
  estado text,
  lat double precision,
  lng double precision,
  raio_atendimento_km numeric(5, 1) default 10,
  status professional_status not null default 'cadastro_incompleto',
  reprovacao_motivo text,
  aprovado_por uuid references public.users (id),
  aprovado_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.professional_availability (
  id uuid primary key default gen_random_uuid(),
  professional_id uuid not null references public.professional_profiles (id) on delete cascade,
  dia_semana smallint not null check (dia_semana between 0 and 6),
  hora_inicio time not null,
  hora_fim time not null,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- establishments / establishment_units
-- -----------------------------------------------------------------------------
create table if not exists public.establishments (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references public.users (id) on delete cascade,
  razao_social text not null,
  nome_fantasia text,
  documento text not null, -- CNPJ ou CPF
  status establishment_status not null default 'cadastro_incompleto',
  reprovacao_motivo text,
  aprovado_por uuid references public.users (id),
  aprovado_em timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.establishment_units (
  id uuid primary key default gen_random_uuid(),
  establishment_id uuid not null references public.establishments (id) on delete cascade,
  nome text not null,
  endereco text not null,
  bairro text,
  cidade text not null,
  estado text not null,
  cep text,
  lat double precision not null,
  lng double precision not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.establishment_documents (
  id uuid primary key default gen_random_uuid(),
  establishment_id uuid not null references public.establishments (id) on delete cascade,
  tipo text not null,
  url text not null,
  status text not null default 'aguardando_verificacao',
  avaliado_por uuid references public.users (id),
  avaliado_em timestamptz,
  motivo_recusa text,
  created_at timestamptz not null default now()
);

create table if not exists public.establishment_photos (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.establishment_units (id) on delete cascade,
  categoria text not null, -- fachada, recepcao, area_banho, banheiras, bancadas, secagem, equipamentos, armazenamento, apoio_equipe, geral
  url text not null,
  status text not null default 'aguardando_verificacao',
  avaliado_por uuid references public.users (id),
  avaliado_em timestamptz,
  observacao text,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- audit_logs (genérico, poliomórfico)
-- -----------------------------------------------------------------------------
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  actor_id uuid references public.users (id),
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.terms_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  document_type text not null, -- termos_uso, privacidade, cancelamento
  version text not null,
  accepted_at timestamptz not null default now(),
  ip inet,
  user_agent text,
  origin text
);

create table if not exists public.platform_settings (
  key text primary key,
  value jsonb not null,
  updated_by uuid references public.users (id),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  type text not null,
  payload jsonb,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- Índices de apoio
create index if not exists idx_professional_profiles_status on public.professional_profiles (status);
create index if not exists idx_establishments_status on public.establishments (status);
create index if not exists idx_establishment_units_establishment on public.establishment_units (establishment_id);
create index if not exists idx_notifications_user_unread on public.notifications (user_id) where read_at is null;
