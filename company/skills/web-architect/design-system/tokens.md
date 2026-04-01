# Design System Tokens - Ooru Logix

Complete reference of all design tokens for Ooru Logix (oorulogix.com). All values are exposed as CSS custom properties, Tailwind config equivalents, and TypeScript constants.

---

## 1. Color Tokens

### 1.1 Primary Colors

| Token Name | Value | CSS Var | Tailwind | Usage |
|-----------|-------|---------|---------|-------|
| Navy (Primary) | `#0B2648` | `--color-navy` | `navy` | Primary backgrounds, navigation, core UI |
| Navy Light | `#1A3A5C` | `--color-navy-light` | `navy-light` | Hover states, secondary backgrounds |
| Navy Dark | `#051420` | `--color-navy-dark` | `navy-dark` | Darkest UI layer, borders |

### 1.2 Accent Colors

| Token Name | Value | CSS Var | Tailwind | Usage |
|-----------|-------|---------|---------|-------|
| Chai Brown | `#8B6F47` | `--color-chai` | `chai` | Warm accents, secondary CTA |
| Chai Light | `#A88A5F` | `--color-chai-light` | `chai-light` | Hover states for chai |
| Chai Dark | `#6B5437` | `--color-chai-dark` | `chai-dark` | Active states for chai |
| Green | `#2DB76F` | `--color-green` | `green` | Success states, positive actions |
| Green Light | `#4DC483` | `--color-green-light` | `green-light` | Hover states for green |
| Green Dark | `#1F8B52` | `--color-green-dark` | `green-dark` | Active states for green |
| Cyan (Neon) | `#00FFFF` | `--color-cyan` | `cyan` | Energy, glow effects, borders |
| Cyan Dark | `#00CCCC` | `--color-cyan-dark` | `cyan-dark` | Hover states for cyan |
| Purple (Neon) | `#BD00FF` | `--color-purple` | `purple` | Premium, special states |
| Purple Dark | `#8B00CC` | `--color-purple-dark` | `purple-dark` | Hover states for purple |

### 1.3 Semantic Colors

| Token Name | Value | CSS Var | Tailwind | Usage |
|-----------|-------|---------|---------|-------|
| Success | `#2DB76F` | `--color-success` | `success` | Validation, confirmations |
| Warning | `#FFA500` | `--color-warning` | `warning` | Alerts, cautions |
| Error | `#FF4444` | `--color-error` | `error` | Errors, destructive actions |
| Info | `#00FFFF` | `--color-info` | `info` | Information messages |

### 1.4 Surface & Background Colors

| Token Name | Value | CSS Var | Tailwind | Usage |
|-----------|-------|---------|---------|-------|
| Background Primary | `#0A1428` | `--color-bg-primary` | `bg-navy-900` | Main page background |
| Background Secondary | `#141E2E` | `--color-bg-secondary` | `bg-navy-800` | Section backgrounds |
| Background Tertiary | `#1A2640` | `--color-bg-tertiary` | `bg-navy-700` | Nested sections |
| Surface Glass | `rgba(11, 38, 72, 0.7)` | `--color-surface-glass` | `bg-glass-panel` | Glass panels, cards |
| Surface Glass Hover | `rgba(11, 38, 72, 0.85)` | `--color-surface-glass-hover` | `hover:bg-glass-panel-hover` | Glass hover state |

### 1.5 Text Colors

| Token Name | Value | CSS Var | Tailwind | Usage |
|-----------|-------|---------|---------|-------|
| Text Primary | `#FFFFFF` | `--color-text-primary` | `text-white` | Main text, headings |
| Text Secondary | `#B0B8C8` | `--color-text-secondary` | `text-gray-300` | Secondary text, descriptions |
| Text Tertiary | `#808A9A` | `--color-text-tertiary` | `text-gray-400` | Tertiary text, labels |
| Text Muted | `#606878` | `--color-text-muted` | `text-gray-500` | Disabled text, placeholders |

### 1.6 Border Colors

| Token Name | Value | CSS Var | Tailwind | Usage |
|-----------|-------|---------|---------|-------|
| Border Light | `rgba(255, 255, 255, 0.1)` | `--color-border-light` | `border-white/10` | Subtle borders |
| Border Medium | `rgba(255, 255, 255, 0.15)` | `--color-border-medium` | `border-white/15` | Default borders |
| Border Strong | `rgba(255, 255, 255, 0.25)` | `--color-border-strong` | `border-white/25` | Prominent borders |

---

## 2. Typography Tokens

### 2.1 Font Families

```css
:root {
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', 'Courier New', monospace;
  --font-retro: 'VT323', monospace;
}
```

**Font Loading Strategy:**
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/fonts/FiraCode-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

<!-- Defer secondary fonts -->
<link rel="preload" href="/fonts/VT323-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" media="print" onload="this.media='all'" />
```

### 2.2 Font Sizes

| Size | Value (px) | CSS Var | Tailwind | Usage |
|------|-----------|---------|---------|-------|
| XS | 12 | `--font-size-xs` | `text-xs` | Labels, hints |
| SM | 14 | `--font-size-sm` | `text-sm` | Small text, captions |
| Base | 16 | `--font-size-base` | `text-base` | Body text |
| LG | 18 | `--font-size-lg` | `text-lg` | Large body |
| XL | 20 | `--font-size-xl` | `text-xl` | Subheadings |
| 2XL | 24 | `--font-size-2xl` | `text-2xl` | Section headings |
| 3XL | 30 | `--font-size-3xl` | `text-3xl` | Page subheadings |
| 4XL | 36 | `--font-size-4xl` | `text-4xl` | Page headings |
| 5XL | 48 | `--font-size-5xl` | `text-5xl` | Hero titles |
| 6XL | 60 | `--font-size-6xl` | `text-6xl` | Large hero |

### 2.3 Font Weights

| Name | Value | CSS Var | Tailwind | Usage |
|------|-------|---------|---------|-------|
| Light | 300 | `--font-weight-light` | `font-light` | Large decorative text |
| Normal | 400 | `--font-weight-normal` | `font-normal` | Body text |
| Medium | 500 | `--font-weight-medium` | `font-medium` | Labels, smaller headings |
| Semibold | 600 | `--font-weight-semibold` | `font-semibold` | Headings, buttons |
| Bold | 700 | `--font-weight-bold` | `font-bold` | Strong emphasis |

### 2.4 Line Heights

| Name | Value | CSS Var | Tailwind | Usage |
|------|-------|---------|---------|-------|
| Tight | 1.25 | `--line-height-tight` | `leading-tight` | Headings |
| Normal | 1.5 | `--line-height-normal` | `leading-normal` | Body text |
| Relaxed | 1.75 | `--line-height-relaxed` | `leading-relaxed` | Long-form content |
| Loose | 2 | `--line-height-loose` | `leading-loose` | Large spacing |

### 2.5 Letter Spacing

```css
:root {
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0em;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
}
```

### 2.6 Typography Presets

**Hero Title:**
```css
.typography-hero {
  font-family: var(--font-body);
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
}
/* Responsive: text-3xl sm:text-5xl lg:text-6xl */
```

**Heading 1:**
```css
.typography-h1 {
  font-family: var(--font-body);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}
```

**Heading 2:**
```css
.typography-h2 {
  font-family: var(--font-body);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
}
```

**Body Text:**
```css
.typography-body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
}
```

**Code / Mono:**
```css
.typography-code {
  font-family: var(--font-mono);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  background: var(--color-bg-tertiary);
  padding: 0.25em 0.5em;
  border-radius: var(--radius-sm);
}
```

**Retro / VT323:**
```css
.typography-retro {
  font-family: var(--font-retro);
  font-size: var(--font-size-2xl);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

---

## 3. Spacing Tokens

Spacing uses 8px as the base unit (Tailwind default).

| Size | Value (rem) | Value (px) | CSS Var | Tailwind | Usage |
|------|-----------|-----------|---------|---------|-------|
| 0 | 0 | 0 | `--space-0` | `p-0` | No spacing |
| 1 | 0.25 | 4 | `--space-1` | `p-1` | Minimal gaps |
| 2 | 0.5 | 8 | `--space-2` | `p-2` | Small gaps |
| 3 | 0.75 | 12 | `--space-3` | `p-3` | Tiny padding |
| 4 | 1 | 16 | `--space-4` | `p-4` | Standard padding |
| 5 | 1.25 | 20 | `--space-5` | `p-5` | Standard+ |
| 6 | 1.5 | 24 | `--space-6` | `p-6` | Generous padding |
| 8 | 2 | 32 | `--space-8` | `p-8` | Section spacing |
| 10 | 2.5 | 40 | `--space-10` | `p-10` | Large spacing |
| 12 | 3 | 48 | `--space-12` | `p-12` | Large+ spacing |
| 16 | 4 | 64 | `--space-16` | `p-16` | XL spacing |
| 20 | 5 | 80 | `--space-20` | `p-20` | XXL spacing |
| 24 | 6 | 96 | `--space-24` | `p-24` | XXXL spacing |
| 32 | 8 | 128 | `--space-32` | `p-32` | Hero spacing |
| 40 | 10 | 160 | `--space-40` | `p-40` | Max spacing |
| 48 | 12 | 192 | `--space-48` | `p-48` | Ultra spacing |
| 64 | 16 | 256 | `--space-64` | `p-64` | Extreme spacing |

**Responsive Spacing Example:**
```html
<!-- Padding: 4 (mobile), 6 (tablet), 8 (desktop) -->
<div class="px-4 sm:px-6 md:px-8"></div>

<!-- Margin: 8 (mobile), 12 (tablet), 16 (desktop) -->
<div class="mb-8 sm:mb-12 md:mb-16"></div>
```

---

## 4. Border Radius Tokens

| Name | Value (rem) | Value (px) | CSS Var | Tailwind | Usage |
|------|-----------|-----------|---------|---------|-------|
| SM | 0.25 | 4 | `--radius-sm` | `rounded-sm` | Minimal curve |
| MD | 0.5 | 8 | `--radius-md` | `rounded-md` | Standard curve |
| LG | 0.75 | 12 | `--radius-lg` | `rounded-lg` | Card borders |
| XL | 1 | 16 | `--radius-xl` | `rounded-xl` | Prominent cards |
| 2XL | 1.5 | 24 | `--radius-2xl` | `rounded-2xl` | Large elements |
| 3XL | 2 | 32 | `--radius-3xl` | `rounded-3xl` | Hero elements |
| Full | 9999 | 9999 | `--radius-full` | `rounded-full` | Circles, pills |

**Recommended Usage:**
```css
/* Glass panels (cards, modals) */
border-radius: var(--radius-lg); /* 12px */

/* Buttons */
border-radius: var(--radius-md); /* 8px */

/* Pills (badges, pill buttons) */
border-radius: var(--radius-full); /* Full circle */

/* Input fields */
border-radius: var(--radius-md); /* 8px */

/* Hero sections */
border-radius: var(--radius-2xl); /* 24px */
```

---

## 5. Shadow Tokens

### 5.1 Elevation Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### 5.2 Glow Shadows (Cyber-Industrial)

```css
/* Cyan Glow */
--shadow-glow-cyan: 0 0 20px rgba(0, 255, 255, 0.3);
--shadow-glow-cyan-lg: 0 0 40px rgba(0, 255, 255, 0.5);

/* Purple Glow */
--shadow-glow-purple: 0 0 20px rgba(189, 0, 255, 0.3);
--shadow-glow-purple-lg: 0 0 40px rgba(189, 0, 255, 0.5);

/* Green Glow */
--shadow-glow-green: 0 0 20px rgba(45, 183, 111, 0.3);
--shadow-glow-green-lg: 0 0 40px rgba(45, 183, 111, 0.5);
```

**Usage:**
```css
/* Card elevation */
box-shadow: var(--shadow-md);

/* Hover effect */
.card:hover {
  box-shadow: var(--shadow-lg);
  transition: box-shadow 300ms ease-out;
}

/* Glow accent */
.featured-card {
  box-shadow: var(--shadow-glow-cyan);
}

/* Hover glow enhancement */
.interactive:hover {
  box-shadow: var(--shadow-glow-cyan-lg);
}
```

---

## 6. Glass Morphism Tokens

Complete specifications for glass morphism effects used throughout the site.

### 6.1 Base Glass Panel

```css
.glass-panel {
  background: rgba(11, 38, 72, 0.7); /* Navy with 70% opacity */
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  transition: all var(--duration-base) var(--easing-ease-out);
}

.glass-panel:hover {
  background: rgba(11, 38, 72, 0.85);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
}
```

**Tailwind:**
```html
<div class="bg-navy/70 backdrop-blur-md border border-white/10 rounded-lg
           hover:bg-navy/85 hover:border-white/15 transition-all duration-300">
</div>
```

### 6.2 Glass Pill

```css
.glass-pill {
  background: rgba(11, 38, 72, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-full);
  transition: all var(--duration-base) var(--easing-ease-out);
}

.glass-pill:hover {
  background: rgba(11, 38, 72, 0.75);
  border-color: rgba(255, 255, 255, 0.15);
}
```

**Tailwind:**
```html
<div class="bg-navy/60 backdrop-blur border border-white/10 rounded-full
           hover:bg-navy/75 hover:border-white/15 transition-all">
</div>
```

### 6.3 Bento Card (Elevated Glass)

```css
.bento-card {
  background: rgba(11, 38, 72, 0.5);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: var(--radius-xl);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  transition: all var(--duration-base) var(--easing-ease-out);
}

.bento-card:hover {
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
}
```

**Tailwind:**
```html
<div class="bg-navy/50 backdrop-blur-2xl border border-cyan/15 rounded-xl
           shadow-[0_0_20px_rgba(0,255,255,0.1)]
           hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]
           hover:-translate-y-0.5 transition-all duration-300">
</div>
```

### 6.4 Glass Dark (Modal Backdrop)

```css
.glass-dark {
  background: rgba(5, 20, 32, 0.8);
  backdrop-filter: blur(8px);
}
```

---

## 7. Animation Tokens

### 7.1 Duration

```css
:root {
  --duration-fast: 150ms;   /* Quick interactions */
  --duration-base: 300ms;   /* Standard transitions */
  --duration-slow: 500ms;   /* Slow animations */
}
```

### 7.2 Easing Functions

```css
:root {
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### 7.3 Common Transitions

```css
/* Smooth color transition */
.interactive {
  transition: color var(--duration-base) var(--easing-ease-out);
}

/* Scale + glow on hover */
.button {
  transition: all var(--duration-base) var(--easing-ease-out);
}

/* Layout shift animations */
.modal-enter {
  animation: slideUp var(--duration-base) var(--easing-ease-out);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 8. Z-Index Scale

Maintained hierarchy for layering UI elements.

```css
:root {
  --z-base: 0;              /* Default layer */
  --z-dropdown: 1000;       /* Dropdowns, popovers */
  --z-sticky: 1020;         /* Sticky headers */
  --z-fixed: 1030;          /* Fixed navigation */
  --z-modal-backdrop: 1040; /* Modal backdrop */
  --z-modal: 1050;          /* Modals */
  --z-toast: 1060;          /* Toast notifications */
  --z-tooltip: 1070;        /* Tooltips */
  --z-cursor: 9999;         /* Custom cursor */
}
```

**Usage:**
```tsx
// Navigation bar - always visible
<nav style={{ zIndex: `var(--z-fixed)` }}>

// Modal overlay
<div style={{ zIndex: `var(--z-modal-backdrop)` }}>

// Toast notification
<div style={{ zIndex: `var(--z-toast)` }}>
```

---

## 9. Complete CSS Custom Properties Reference

```css
:root {
  /* COLORS - PRIMARY */
  --color-navy: #0B2648;
  --color-navy-light: #1A3A5C;
  --color-navy-dark: #051420;

  /* COLORS - ACCENT */
  --color-chai: #8B6F47;
  --color-chai-light: #A88A5F;
  --color-chai-dark: #6B5437;
  --color-green: #2DB76F;
  --color-green-light: #4DC483;
  --color-green-dark: #1F8B52;
  --color-cyan: #00FFFF;
  --color-cyan-dark: #00CCCC;
  --color-purple: #BD00FF;
  --color-purple-dark: #8B00CC;

  /* COLORS - SEMANTIC */
  --color-success: #2DB76F;
  --color-warning: #FFA500;
  --color-error: #FF4444;
  --color-info: #00FFFF;

  /* COLORS - SURFACES */
  --color-bg-primary: #0A1428;
  --color-bg-secondary: #141E2E;
  --color-bg-tertiary: #1A2640;
  --color-surface-glass: rgba(11, 38, 72, 0.7);
  --color-surface-glass-hover: rgba(11, 38, 72, 0.85);

  /* COLORS - TEXT */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B0B8C8;
  --color-text-tertiary: #808A9A;
  --color-text-muted: #606878;

  /* COLORS - BORDERS */
  --color-border-light: rgba(255, 255, 255, 0.1);
  --color-border-medium: rgba(255, 255, 255, 0.15);
  --color-border-strong: rgba(255, 255, 255, 0.25);

  /* TYPOGRAPHY */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
  --font-retro: 'VT323', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;
  --font-size-6xl: 3.75rem;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;

  /* SPACING */
  --space-0: 0;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  --space-40: 10rem;
  --space-48: 12rem;
  --space-64: 16rem;

  /* BORDER RADIUS */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  --radius-3xl: 2rem;
  --radius-full: 9999px;

  /* SHADOWS */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --shadow-glow-cyan: 0 0 20px rgba(0, 255, 255, 0.3);
  --shadow-glow-cyan-lg: 0 0 40px rgba(0, 255, 255, 0.5);
  --shadow-glow-purple: 0 0 20px rgba(189, 0, 255, 0.3);
  --shadow-glow-purple-lg: 0 0 40px rgba(189, 0, 255, 0.5);
  --shadow-glow-green: 0 0 20px rgba(45, 183, 111, 0.3);
  --shadow-glow-green-lg: 0 0 40px rgba(45, 183, 111, 0.5);

  /* Z-INDEX */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-toast: 1060;
  --z-tooltip: 1070;
  --z-cursor: 9999;

  /* ANIMATION */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 10. TypeScript Constants

For use in component props and configuration:

```typescript
// src/types/tokens.ts

export const Colors = {
  // Primary
  navy: '#0B2648',
  navyLight: '#1A3A5C',
  navyDark: '#051420',

  // Accent
  chai: '#8B6F47',
  chaiLight: '#A88A5F',
  chaiDark: '#6B5437',
  green: '#2DB76F',
  greenLight: '#4DC483',
  greenDark: '#1F8B52',
  cyan: '#00FFFF',
  cyanDark: '#00CCCC',
  purple: '#BD00FF',
  purpleDark: '#8B00CC',

  // Semantic
  success: '#2DB76F',
  warning: '#FFA500',
  error: '#FF4444',
  info: '#00FFFF',
} as const;

export const Spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  64: '16rem',
} as const;

export const Duration = {
  fast: '150ms',
  base: '300ms',
  slow: '500ms',
} as const;

export const BorderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  '3xl': '2rem',
  full: '9999px',
} as const;

export const ZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  toast: 1060,
  tooltip: 1070,
  cursor: 9999,
} as const;
```

---

## 11. Using Tokens in Components

### Example 1: Using CSS Variables

```tsx
import React from 'react';

export const Card: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      background: 'var(--color-surface-glass)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--color-border-medium)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)',
      transition: 'all var(--duration-base) var(--easing-ease-out)',
    }}
  >
    {children}
  </div>
);
```

### Example 2: Using Tailwind Classes

```tsx
export const Card: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="bg-navy/70 backdrop-blur-md border border-white/15 rounded-lg
                   p-6 hover:bg-navy/85 transition-all duration-300">
    {children}
  </div>
);
```

### Example 3: TypeScript Constants

```tsx
import { Colors, Duration } from '@/types/tokens';

export const Button: React.FC<{ variant: 'primary' | 'secondary' }> = ({ variant }) => {
  const bgColor = variant === 'primary' ? Colors.cyan : Colors.chai;

  return (
    <button
      style={{
        backgroundColor: bgColor,
        transition: `all ${Duration.base} ease-out`,
      }}
    >
      Click me
    </button>
  );
};
```

---

## Quick Reference Cheat Sheet

```
PRIMARY COLOR: --color-navy (#0B2648)
ACCENT COLORS: Cyan (#00FFFF), Purple (#BD00FF), Green (#2DB76F), Chai (#8B6F47)
TEXT: --color-text-primary (#FFFFFF), --color-text-secondary (#B0B8C8)
SPACING: p-4 (1rem), p-6 (1.5rem), p-8 (2rem)
BORDER RADIUS: rounded-lg (12px), rounded-xl (16px)
SHADOWS: shadow-md (standard), shadow-glow-cyan (energy)
DURATION: 150ms (fast), 300ms (base), 500ms (slow)
EASING: ease-in, ease-out, ease-in-out, bounce
```

