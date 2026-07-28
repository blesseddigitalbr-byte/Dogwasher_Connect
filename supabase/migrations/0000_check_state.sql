-- =============================================================================
-- Diagnóstico — rode isto primeiro no SQL Editor para ver o que já existe
-- =============================================================================

select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;

select typname
from pg_type
where typname in ('user_role', 'professional_status', 'establishment_status');
