-- =============================================================================
-- Reset seguro — remove só os objetos criados pela migration 0001/0002.
-- Não afeta auth.users nem nada do Supabase em si. Use apenas em ambiente
-- sem dados reais (projeto novo).
-- =============================================================================

drop table if exists public.notifications cascade;
drop table if exists public.platform_settings cascade;
drop table if exists public.terms_acceptances cascade;
drop table if exists public.audit_logs cascade;
drop table if exists public.establishment_photos cascade;
drop table if exists public.establishment_documents cascade;
drop table if exists public.establishment_units cascade;
drop table if exists public.establishments cascade;
drop table if exists public.professional_availability cascade;
drop table if exists public.professional_profiles cascade;
drop table if exists public.users cascade;

drop function if exists public.is_admin();
drop function if exists public.current_user_role();

drop type if exists establishment_status;
drop type if exists professional_status;
drop type if exists user_role;
