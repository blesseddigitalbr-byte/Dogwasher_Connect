# Dog Washer Connect — Sprint 0 (Fundação)

Plataforma de profissionais sob demanda do mercado de banho e tosa.
Este projeto implementa a **Sprint 0** do plano aprovado: setup, design
system inicial, autenticação, roles e RLS base no Supabase.

## O que já existe nesta entrega

- Projeto Next.js (App Router) + TypeScript estrito + Tailwind CSS.
- Design tokens em `app/globals.css` (cores, tipografia Outfit, radius).
  **A cor laranja/dourado é placeholder** — ver seção "Pendências de marca".
- Componentes base do design system: `Button`, `Input`, `Card`, `StatusBadge`.
- Páginas públicas: landing, login, criar conta (com seleção de perfil),
  recuperar senha, termos de uso, política de privacidade (texto placeholder).
- Autenticação via Supabase Auth: cadastro, login, logout (server actions
  em `features/auth/actions.ts`), com aceite de termos já registrado em
  `terms_acceptances` no momento do cadastro.
- Middleware (`middleware.ts` + `lib/supabase/middleware.ts`) que renova a
  sessão e aplica guards de rota por role:
  - `/profissional/*` — só profissional (ou admin).
  - `/estabelecimento/*` — só estabelecimento (ou admin).
  - `/admin/*` — só admin.
- Migrations SQL em `supabase/migrations/`:
  - `0001_core.sql` — tabelas `users`, `professional_profiles`,
    `professional_availability`, `establishments`, `establishment_units`,
    `establishment_documents`, `establishment_photos`, `audit_logs`,
    `terms_acceptances`, `platform_settings`, `notifications`.
  - `0002_rls_core.sql` — Row Level Security de todas essas tabelas.
- Dashboards-esqueleto para profissional, estabelecimento e admin
  (`/profissional/dashboard`, `/estabelecimento/dashboard`,
  `/admin/dashboard`) só para validar navegação e guards — sem lógica de
  negócio ainda (isso é da Sprint 1 em diante).

## O que NÃO está nesta entrega (por escopo, não por esquecimento)

- Oportunidades, candidaturas, check-in/out, avaliações, pagamento —
  entram nas Sprints 1 a 7, conforme o backlog aprovado.
- Módulo de vagas fixas, piso de preço, monitoramento de recorrência —
  fora da Fase 1 (documentado, não construído).
- Conexão real com um projeto Supabase — código pronto, aguardando você
  criar/indicar o projeto e me passar as credenciais.
- Deploy — aguardando conexão do GitHub e da Vercel, como você definiu.

## Como rodar localmente (quando o Supabase estiver conectado)

```bash
npm install
cp .env.example .env.local   # preencher com as credenciais do projeto Supabase
npm run dev
```

Para aplicar as migrations no projeto Supabase (via Supabase CLI):

```bash
supabase link --project-ref <seu-project-ref>
supabase db push
```

## Pendências de marca (sinalizando conforme conversamos)

O arquivo `app/globals.css` tem um comentário explícito marcando a cor
`--dw-orange` como placeholder. Quando você tiver a logo oficial (SVG,
com variações claro/escuro) e o hex exato do laranja/dourado do manual
de marca, eu:

1. Troco o placeholder pelo hex definitivo.
2. Adiciono a logo vetorial no header (hoje é só wordmark em texto).
3. Aplico a logo no splash/favicon.

Nenhuma outra parte do design depende disso para continuar avançando.

## Nota sobre validação de build neste ambiente

O `npx tsc --noEmit` e o `npx eslint .` passam limpos. O `npm run build`
completo não pôde ser validado neste ambiente porque a rede sandbox não
alcança `fonts.googleapis.com` (usado por `next/font/google` para a
fonte Outfit) — isso é uma restrição só deste ambiente de execução, não
do código. Em qualquer ambiente com acesso normal à internet (sua
máquina, Vercel, CI), o build deve completar normalmente. Se preferir,
posso trocar a fonte para um pacote npm auto-hospedado
(`@fontsource/outfit`) para eliminar essa dependência de rede — me avise
se quiser isso agora ou depois.

## Próximo passo

Sprint 1 (Perfis): completar a lógica de submissão dos formulários de
onboarding (profissional e estabelecimento) já criados como esqueleto,
conectando-os às tabelas via server actions, e construir as filas de
aprovação do admin (`/admin/fila-profissionais`,
`/admin/fila-estabelecimentos`) com upload de documentos e fotos.
