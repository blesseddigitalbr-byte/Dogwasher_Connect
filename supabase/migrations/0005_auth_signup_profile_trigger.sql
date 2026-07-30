-- =============================================================================
-- Dog Washer Connect — Migration 0005: cria perfil público via trigger de Auth
-- =============================================================================

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  requested_role user_role;
  display_name text;
begin
  requested_role := coalesce(
    nullif(new.raw_user_meta_data->>'role', '')::user_role,
    'professional'::user_role
  );

  display_name := coalesce(
    nullif(new.raw_user_meta_data->>'full_name_or_razao_social', ''),
    nullif(new.raw_user_meta_data->>'full_name', ''),
    split_part(new.email, '@', 1)
  );

  insert into public.users (id, email, role)
  values (new.id, new.email, requested_role)
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();

  if requested_role = 'professional' then
    insert into public.professional_profiles (user_id, full_name, status)
    values (new.id, display_name, 'cadastro_incompleto')
    on conflict (user_id) do nothing;
  elsif requested_role = 'establishment_owner' then
    insert into public.establishments (
      owner_user_id,
      razao_social,
      documento,
      status
    )
    values (new.id, display_name, '', 'cadastro_incompleto');
  end if;

  insert into public.terms_acceptances (
    user_id,
    document_type,
    version,
    origin
  )
  values (new.id, 'termos_uso', 'v1', 'criar_conta')
  on conflict do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();
