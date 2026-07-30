---
name: Connect Intelligence System
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#44474c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#75777c'
  outline-variant: '#c5c6cc'
  surface-tint: '#555f6f'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#121c29'
  on-primary-container: '#7b8495'
  inverse-primary: '#bdc7d9'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0b1c30'
  on-tertiary-container: '#75859d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e3f6'
  primary-fixed-dim: '#bdc7d9'
  on-primary-fixed: '#121c29'
  on-primary-fixed-variant: '#3e4756'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

O sistema de design é fundamentado em uma estética **Corporate / Modern** com toques de **Minimalism**. Ele foi projetado para elevar a percepção do cuidado pet a um nível institucional e tecnológico, afastando-se de clichês lúdicos para focar em eficiência, conexão e profissionalismo.

A personalidade da marca é autoritária porém acessível, transmitindo confiança para estabelecimentos e especialistas. O layout deve priorizar o rigor técnico, utilizando espaços em branco generosos para destacar dados e facilitar a tomada de decisão. A iconografia deve ser linear, discreta e puramente funcional.

**Diretrizes Visuais:**
- **Atmosfera:** Premium, sóbria e tecnológica.
- **Público-alvo:** Profissionais independentes e gestores de estabelecimentos pet.
- **Resposta Emocional:** Segurança, prestígio e agilidade operacional.

## Colors

A paleta de cores é dominada pelo **Deep Teal/Midnight Blue (#07111E)**, que confere autoridade e profundidade institucional. O **Vibrant Gold (#F59E0B)** atua como o ponto focal de interação, sendo utilizado exclusivamente para CTAs de alta conversão e estados ativos importantes.

Para os fundos, utiliza-se uma alternância suave entre o Branco puro e o **Off-white (#F9FAFB)** para criar separação visual sem a necessidade de linhas pesadas. Os estados de sistema possuem cores semânticas específicas, garantindo que o status de uma validação ou transação seja compreendido instantaneamente.

## Typography

A escolha da família **Outfit** reforça o caráter moderno e geométrico do sistema. A tipografia é estruturada para suportar interfaces ricas em dados, mantendo a legibilidade em alta densidade.

- **Headlines:** Devem utilizar pesos `600` ou `700` com espaçamento de letras levemente negativo para um visual mais compacto e sofisticado.
- **Body:** O peso `400` garante conforto visual em descrições de serviços e termos contratuais.
- **Labels:** Utilizados para metadados e categorias, frequentemente aplicados em `text-transform: uppercase` em tamanhos menores para criar hierarquia visual clara.

## Layout & Spacing

Este design system utiliza um **Fluid Grid** de 12 colunas para desktop e um sistema de 4 colunas para mobile. A progressão de espaçamento é baseada em uma escala de 8px, garantindo ritmo matemático e consistência em todos os módulos.

- **Desktop (1440px+):** Margens de 40px, calhas (gutters) de 24px.
- **Tablet (768px - 1024px):** Margens de 32px, calhas de 20px.
- **Mobile (320px - 480px):** Margens de 16px, calhas de 16px. O conteúdo reflows para uma coluna única, com componentes ocupando a largura total da "safe area".

## Elevation & Depth

A profundidade é comunicada através de **Tonal Layers** e sombras ambientes extremamente sutis. O objetivo é simular uma interface física, porém digitalmente precisa.

1.  **Nível Base (0):** Fundo principal em `#F9FAFB`.
2.  **Nível de Superfície (1):** Cards e containers em `#FFFFFF` com uma borda fina de 1px em `#E2E8F0`.
3.  **Nível de Interação (2):** Elementos em hover ou ativos utilizam uma sombra "Ambient Shadow" (0px 4px 20px rgba(7, 17, 30, 0.05)) para indicar elevação sem poluir o layout.
4.  **Overlays (3):** Modais e menus dropdown utilizam uma sombra mais densa e um backdrop blur suave para isolar o foco do usuário.

## Shapes

O sistema de formas utiliza o nível **Rounded** para equilibrar o rigor corporativo com a modernidade tecnológica. 

- **Componentes Padrão:** Botões e inputs utilizam `0.5rem` (rounded-md).
- **Containers Maiores:** Cards de dashboard e seções de perfil utilizam `1rem` (rounded-lg) para criar uma sensação de contenção segura.
- **Status Pills:** Indicadores de estado podem utilizar o formato pill-shaped para diferenciação visual imediata em listas.

## Components

### Buttons
- **Primary:** Fundo `#F59E0B`, texto `#07111E` (contraste alto), sem borda, cantos arredondados.
- **Secondary:** Borda de 1px `#07111E`, fundo transparente, texto `#07111E`.
- **Tertiary/Ghost:** Sem fundo ou borda, apenas texto com ícone discreto.

### Input Fields
- Rótulos sempre visíveis acima do campo em `label-md`.
- Borda de 1px `#E2E8F0` em estado repouso; muda para `#07111E` em foco.
- Placeholder em `#94A3B8`.

### Status Indicators
- **Aguardando Validação:** Fundo azul claro suave com texto em `info`.
- **Bloqueado:** Estética em tons de cinza escuro (`blocked`) com ícone de cadeado.
- **Pendente:** Utiliza o roxo suave (`pending`) para ações que dependem de terceiros.
- **Sucesso/Erro:** Utilizam as cores semânticas padrão com ícones de check ou alerta.

### Cards
- Fundo branco puro, borda sutil, título em `title-lg`. Devem ser organizados em grid para exibir métricas de performance dos profissionais ou detalhes dos estabelecimentos.

### Lists
- Devem ter divisores horizontais finos (`#F1F5F9`) e padding vertical generoso (`1.25rem`) para garantir que os dados "respirem".