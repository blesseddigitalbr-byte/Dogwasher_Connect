---
name: Institutional Operational System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d4e4fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#43474e'
  inverse-surface: '#223144'
  inverse-on-surface: '#eaf1ff'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#455f88'
  primary: '#002045'
  on-primary: '#ffffff'
  primary-container: '#1a365d'
  on-primary-container: '#86a0cd'
  inverse-primary: '#adc7f7'
  secondary: '#555f71'
  on-secondary: '#ffffff'
  secondary-container: '#d6e0f6'
  on-secondary-container: '#596376'
  tertiary: '#1b2127'
  on-tertiary: '#ffffff'
  tertiary-container: '#30363c'
  on-tertiary-container: '#989fa6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#adc7f7'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#2d476f'
  secondary-fixed: '#d9e3f9'
  secondary-fixed-dim: '#bdc7dc'
  on-secondary-fixed: '#121c2c'
  on-secondary-fixed-variant: '#3d4759'
  tertiary-fixed: '#dde3eb'
  tertiary-fixed-dim: '#c1c7cf'
  on-tertiary-fixed: '#161c22'
  on-tertiary-fixed-variant: '#41474e'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d4e4fc'
typography:
  display-lg:
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
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Outfit
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1440px
  gutter: 24px
---

## Brand & Style

This design system is built for high-efficiency professional environments, specifically tailored for service logistics and operational management. The brand personality is authoritative, dependable, and highly structured, ensuring that users feel in total control of complex workflows. 

The aesthetic follows a **Modern Corporate** approach with a focus on high-density information display and clarity. It avoids decorative flourishes in favor of functional precision. The interface uses a clean, systematic layout with clear visual hierarchies to reduce cognitive load during critical tasks. The emotional response should be one of "calm competence" and institutional reliability.

## Colors

The palette is anchored in deep, institutional blues and slate greys to establish a professional foundation. 

- **Primary**: Deep Navy (#1A365D) for primary actions and brand presence.
- **Secondary**: Charcoal Slate (#2D3748) for secondary navigation and headers.
- **Neutral**: Cool Greys for backgrounds, borders, and disabled states.
- **Semantic/Priority**: 
    - **Teal (Normal)**: Used for routine notifications and successful operations.
    - **Amber (Warning)**: Used for pending actions, delays, or non-critical issues.
    - **Red (Critical)**: Reserved for safety alerts, missed appointments, or system failures.

## Typography

The design system utilizes **Outfit** exclusively across all levels to maintain a contemporary yet institutional feel. The typeface’s geometric clarity ensures legibility at small sizes (essential for data-heavy tables) while appearing sophisticated at larger display sizes.

- Use **Semi-Bold (600)** for all headings and titles to create a clear scan path.
- Use **Regular (400)** for body text and long-form operational logs.
- Use **Bold (700)** sparingly for critical labels and status badges to ensure they are immediately distinguishable.
- Labels use increased letter-spacing and uppercase styling for a "tag-like" appearance in the UI.

## Layout & Spacing

This design system uses a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The spacing logic is based on a 4px scale, favoring "Tight" and "Compact" settings for operational dashboards to maximize visible information.

- **Desktop**: 24px margins, 24px gutters.
- **Tablet**: 16px margins, 16px gutters.
- **Mobile**: 16px margins, 12px gutters.
- **Alignment**: All elements must align to the baseline grid. Vertical rhythm is maintained by using the `md` (16px) spacing unit for standard component gaps.

## Elevation & Depth

The system uses **Tonal Layers** and **Low-Contrast Outlines** to define hierarchy. In an institutional context, heavy shadows are avoided to prevent visual clutter.

- **Level 0 (Base)**: Background color (Grey-50).
- **Level 1 (Cards/Containers)**: White surface with a 1px solid border (#E2E8F0). No shadow.
- **Level 2 (Dropdowns/Modals)**: White surface with a 1px border and a subtle, high-diffusion shadow (0px 4px 20px rgba(0,0,0,0.05)).
- **Level 3 (Priority Notifications)**: Uses colored left-borders (Teal, Amber, or Red) to signify urgency without needing physical depth.

## Shapes

The design system utilizes a **Soft (1)** roundedness setting. This choice balances the friendliness of the "Outfit" typeface with the professional structure of an institutional platform.

- **Standard Elements (Buttons, Inputs)**: 0.25rem (4px) corner radius.
- **Large Elements (Cards, Modals)**: 0.5rem (8px) corner radius.
- **Badges/Status Indicators**: 0.75rem (12px) or full pill-shape to distinguish them from actionable buttons.

## Components

### Notifications & Badges
- **Priority Badges**: Small, pill-shaped indicators using background tints of Teal (Normal), Amber (Warning), or Red (Critical). Text is always high-contrast against the tint.
- **Operational Notification Cards**: High-visibility cards with a 4px solid left-border matching the priority color.

### Messaging & Support
- **Operational Message Bubbles**: Structured, rectangular bubbles with 4px corner radius. Sent messages use Primary Blue background with White text; received/system messages use Light Grey background with Secondary Slate text.
- **Support Categories**: Standardized iconography must be used:
    - `help`: For documentation and FAQ.
    - `description`: For log details and records.
    - `contact_support`: For direct communication with the help desk.

### Inputs & Buttons
- **Input Fields**: 1px border (#CBD5E0) that shifts to Primary Blue on focus. Labels sit 4px above the input.
- **Buttons**:
    - *Primary*: Solid Primary Blue, white text, 4px radius.
    - *Secondary*: 1px border of Primary Blue, blue text.
    - *Tertiary*: Ghost style, grey text, for low-priority actions.

### Cards
- **Record Cards**: Used for customer or dog profiles. Feature a white background, 1px border, and a title-md heading. Grouped information should be separated by thin 1px dividers.