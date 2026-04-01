# Web Development Architecture - Ooru Logix

## Skill Overview

Expert web architecture for Ooru Logix (oorulogix.com), a cyber-industrial React 19 SPA. This skill covers design system management, component architecture, page templates, performance optimization, accessibility, and modern frontend development practices.

**Tech Stack:** React 19 + Vite 6.2 + TypeScript 5.8 + TailwindCSS 4 (CDN) + Framer Motion + Firebase (Auth + Firestore) + Lucide React + Recharts + react-router-dom (HashRouter)

**Aesthetic:** Cyber-industrial with glass morphism panels. Brand colors: Navy #0B2648 (primary), Chai Brown #8B6F47 (warm accent), Green #2DB76F (success), Neon Cyan #00FFFF (energy), Neon Purple #BD00FF (premium).

---

## 1. Design System Architecture

### 1.1 CSS Custom Properties Foundation

All design tokens are exposed as CSS custom properties for dynamic theming and consistency.

```css
:root {
  /* PRIMARY COLORS */
  --color-navy: #0B2648;
  --color-navy-light: #1A3A5C;
  --color-navy-dark: #051420;

  /* ACCENT COLORS */
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

  /* SEMANTIC COLORS */
  --color-success: var(--color-green);
  --color-warning: #FFA500;
  --color-error: #FF4444;
  --color-info: var(--color-cyan);

  /* SURFACES */
  --color-bg-primary: #0A1428;
  --color-bg-secondary: #141E2E;
  --color-bg-tertiary: #1A2640;
  --color-surface-glass: rgba(11, 38, 72, 0.7);
  --color-surface-glass-hover: rgba(11, 38, 72, 0.85);

  /* TEXT */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B0B8C8;
  --color-text-tertiary: #808A9A;
  --color-text-muted: #606878;

  /* BORDERS */
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

  /* SPACING SCALE (8px base) */
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

  /* Z-INDEX SCALE */
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

### 1.2 Glass Morphism System

```css
/* Base glass panel - for cards, modals, dropdowns */
.glass-panel {
  background: rgba(11, 38, 72, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
}

.glass-panel:hover {
  background: rgba(11, 38, 72, 0.85);
  border-color: rgba(255, 255, 255, 0.15);
}

/* Pill variant - for buttons, pills, badges */
.glass-pill {
  background: rgba(11, 38, 72, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
}

/* Bento card - elevated glass with accent border */
.bento-card {
  background: rgba(11, 38, 72, 0.5);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
  transition: all var(--duration-base) var(--easing-ease-out);
}

.bento-card:hover {
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Dark glass - for overlays, backdrops */
.glass-dark {
  background: rgba(5, 20, 32, 0.8);
  backdrop-filter: blur(8px);
}
```

---

## 2. Component Library Catalog

### 2.1 Existing Components Overview

#### Navigation Components

**Navbar** (`src/components/Navbar.tsx`)
- Purpose: Top navigation with logo, menu, auth state
- Props: `mobileMenuOpen`, `setMobileMenuOpen`, `user`, `scrolled`
- States: scrolled (glass effect strengthens), mobile-expanded
- Key feature: Dynamic glass intensification on scroll
- Accessibility: Semantic nav, ARIA menu, keyboard support

**BottomNav** (`src/components/BottomNav.tsx`)
- Purpose: Mobile-first bottom navigation
- Props: `currentPath`
- Responsive: Hidden on desktop, fixed bottom on mobile
- Interactive states: Active route highlighting with cyan glow

**Footer** (`src/components/Footer.tsx`)
- Purpose: Global footer with links, legal, social
- Responsive: Stacked on mobile, grid on desktop
- Dark glass styling with chai brown accents

#### Layout Components

**CustomCursor** (`src/components/CustomCursor.tsx`)
- Purpose: Custom cursor following mouse
- Styling: Cyan circle with purple ring
- Performance: requestAnimationFrame for smooth tracking
- Z-index: 9999 (always on top)

**SystemHealthHUD** (`src/components/SystemHealthHUD.tsx`)
- Purpose: Status indicator (top-right corner)
- Props: `isOnline`, `lastSync`, `firebaseStatus`
- Styling: Bento card with glow effects
- Real-time: Updates on network changes

**ErrorBoundary** (`src/components/ErrorBoundary.tsx`)
- Purpose: Catch React errors, display fallback
- Props: `children`, `fallback`
- CSS: Dark glass panel with error color border
- Recovery: Reset button to retry component tree

#### Content Components

**PageLoader / RandomLoader** (`src/components/PageLoader.tsx`)
- Purpose: Full-page loading skeleton
- Animation: Staggered pulse effect
- Colors: Navy gradient with cyan accent
- Variant: RandomLoader for randomized skeleton layout

**PixelText** (`src/components/PixelText.tsx`)
- Purpose: Retro pixel-art text effect
- Font: VT323 (monospace)
- Use case: Hero titles, callouts
- Props: `text`, `className`, `animate`

**VividOrbs** (`src/components/VividOrbs.tsx`)
- Purpose: Animated background orbs
- Animation: Floating motion, color cycling
- Blending: Mix-blend-mode: screen
- Props: `count`, `colors`, `size`

**SwarmAgentConcept** (`src/components/SwarmAgentConcept.tsx`)
- Purpose: Animated agent particles visualization
- Animation: Boid-like movement, collision avoidance
- Use case: Hero section backdrop
- Interactive: Mouse tracking influence

#### Specialized Components

**Logo** (`src/components/Logo.tsx`)
- Purpose: Ooru Logix brand mark
- Variants: Full logo, icon-only, text-only
- Responsive: Scales with viewport
- Retro styling: Cyan accent, VT323 text

**PaymentPortal** (`src/components/PaymentPortal.tsx`)
- Purpose: Stripe integration for subscriptions
- Props: `tier`, `onSuccess`, `onError`
- Styling: Modal overlay with glass panel
- PCI: No card data stored locally

**ManifestoSection** (`src/components/ManifestoSection.tsx`)
- Purpose: Brand mission statement
- Layout: Full-width, centered text
- Typography: 3xl to 5xl sizes with retro accents
- Animation: Fade-in on scroll

**FeaturesSection** (`src/components/FeaturesSection.tsx`)
- Purpose: Feature grid (3-col on desktop, 1-col on mobile)
- Cards: Bento cards with icon, title, description
- Hover: Glow effect and scale transform
- Data: Array of feature objects

**PricingSection** (`src/components/PricingSection.tsx`)
- Purpose: Tier comparison with CTA buttons
- Cards: Highlighted "popular" tier
- Responsive: Horizontal scroll on mobile
- Interactive: Hover reveals more details

**UseCasesGrid** (`src/components/UseCasesGrid.tsx`)
- Purpose: 2x2 or 3x3 grid of use cases
- Cards: Image + title + short description
- Hover: Border glow + slight lift
- Link: React Router navigation

**BlackboxTerminal** (`src/components/BlackboxTerminal.tsx`)
- Purpose: Simulated terminal/CLI interface
- Font: Fira Code monospace
- Colors: Cyan text on navy background
- Animation: Typing effect for output

**Skeleton** (`src/components/Skeleton.tsx`)
- Purpose: Loading placeholder with pulse
- Variants: Text, circle, rect
- Props: `width`, `height`, `className`
- Animation: Subtle pulse animation

**SEO** (`src/components/SEO.tsx`)
- Purpose: Dynamic meta tag management
- Props: `title`, `description`, `image`, `url`, `article`, `author`
- Implementation: React Helmet or head injection
- OG Tags: Automatic Open Graph + Twitter Cards

**StructuredData** (`src/components/StructuredData.tsx`)
- Purpose: JSON-LD injection for SEO
- Variants: Organization, BreadcrumbList, Product, Article, FAQ
- Location: Injected in document head
- Validation: Against schema.org spec

---

## 3. Page Template Patterns

### 3.1 Marketing Page Template

```tsx
// src/templates/MarketingPage.tsx
interface MarketingPageProps {
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: ReactNode;
  sections: ReactNode[];
  cta?: { text: string; href: string };
}

export const MarketingPage: React.FC<MarketingPageProps> = ({
  heroTitle,
  heroSubtitle,
  sections,
  cta,
}) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-navy-dark via-navy to-navy-light">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <VividOrbs count={5} colors={['cyan', 'purple']} size="large" />
        <div className="relative z-10 text-center px-4 sm:px-6">
          <PixelText text={heroTitle} className="text-5xl sm:text-6xl mb-4" />
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            {heroSubtitle}
          </p>
          {cta && <CTAButton href={cta.href}>{cta.text}</CTAButton>}
        </div>
      </section>

      {/* Content Sections */}
      <div className="relative z-20 space-y-24 py-20">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {section}
          </motion.div>
        ))}
      </div>
    </main>
  );
};
```

### 3.2 Product Page Template

```tsx
// src/templates/ProductPage.tsx
interface ProductPageProps {
  title: string;
  description: string;
  features: Array<{ icon: ReactNode; title: string; desc: string }>;
  pricing?: boolean;
  caseStudies?: Array<{ title: string; metric: string; result: string }>;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  title,
  features,
  caseStudies,
}) => {
  return (
    <main className="min-h-screen bg-navy">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-text-primary">
          {title}
        </h1>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
          {features.map((feature, idx) => (
            <BentoCard key={idx}>
              <div className="flex gap-4">
                <div className="text-cyan text-2xl flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{feature.desc}</p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>

        {/* Case Studies */}
        {caseStudies && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, idx) => (
              <CaseStudyCard key={idx} {...study} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
```

### 3.3 Dashboard Page Template

```tsx
// src/templates/DashboardPage.tsx
interface DashboardPageProps {
  title: string;
  widgets: Array<{
    title: string;
    value: string | number;
    change?: number;
    chart?: ReactNode;
  }>;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  title,
  widgets,
}) => {
  return (
    <main className="min-h-screen bg-navy p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-text-primary mb-8">{title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((widget, idx) => (
          <DashboardCard key={idx} {...widget} />
        ))}
      </div>
    </main>
  );
};
```

---

## 4. Responsive Design Strategy

### 4.1 Mobile-First Breakpoints

```typescript
const breakpoints = {
  xs: '0px',      // Base/mobile
  sm: '640px',    // Small devices (landscape phones)
  md: '768px',    // Tablets
  lg: '1024px',   // Desktops
  xl: '1280px',   // Large desktops
  '2xl': '1536px', // Ultra-wide
} as const;
```

### 4.2 Responsive Pattern Examples

```tsx
// Images
<img
  srcSet="
    /image-sm.webp 640w,
    /image-md.webp 768w,
    /image-lg.webp 1024w
  "
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         1200px"
  src="/image-lg.webp"
  alt="Description"
  loading="lazy"
/>

// Tailwind responsive classes
<div className="
  grid
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-4 sm:gap-6 lg:gap-8
  px-4 sm:px-6 lg:px-8
  py-8 sm:py-12 lg:py-16
">
  {/* Content */}
</div>

// Custom hook for viewport detection
const useViewport = () => {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setViewport('mobile');
      else if (width < 1024) setViewport('tablet');
      else setViewport('desktop');
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};
```

---

## 5. Animation System (Framer Motion)

### 5.1 Common Variants

```typescript
// Fade In
export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

// Slide Up
export const slideUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Stagger Container
export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Scale Hover
export const scaleHoverVariant = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

// Glow Pulse (cyan)
export const glowPulseVariant = {
  hidden: { boxShadow: '0 0 0px rgba(0, 255, 255, 0)' },
  visible: {
    boxShadow: [
      '0 0 10px rgba(0, 255, 255, 0.2)',
      '0 0 30px rgba(0, 255, 255, 0.5)',
      '0 0 10px rgba(0, 255, 255, 0.2)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};
```

### 5.2 Page Transition Pattern

```tsx
import { AnimatePresence, motion } from 'framer-motion';

export const PageTransition: React.FC<{ children: ReactNode }> = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
```

---

## 6. Performance Budget

Ooru Logix targets these Core Web Vitals:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **Bundle Size:** < 500KB (gzipped)

### 6.1 Optimization Strategies

```typescript
// Code splitting by route
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Auth = lazy(() => import('../pages/Auth'));

// Image optimization
<img
  src={src}
  alt={alt}
  loading="lazy"
  decoding="async"
  srcSet={srcset}
/>

// Fonts: Load critical fonts, defer others
<link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
<link rel="preload" href="/fonts/FiraCode-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

// Reduce TailwindCSS via CDN impact: consider Vite plugin postcss
// Current: CDN load adds ~50ms
// Ideal: Bundle TailwindCSS with Vite for instant availability

// Firebase lazy loading
const initFirebase = async () => {
  const { firebaseApp } = await import('../services/firebase');
  return firebaseApp;
};
```

---

## 7. Accessibility (WCAG 2.1 AA)

### 7.1 Color Contrast Requirements

All text must pass AA contrast:
- Normal text (< 18px): 4.5:1 ratio minimum
- Large text (≥ 18px or ≥ 14px bold): 3:1 ratio minimum

```typescript
// Contrast checker utility
const contrastRatio = (hex1: string, hex2: string): number => {
  const getLuminance = (hex: string) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16) / 255);
    const [rs, gs, bs] = [r, g, b].map(x =>
      x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

// Example: Navy on Cyan meets AA (5.2:1)
contrastRatio('#0B2648', '#00FFFF'); // ≈ 5.2:1 ✓
```

### 7.2 Keyboard Navigation

```tsx
// All interactive elements must be keyboard accessible
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  tabIndex={0}
  role="button"
>
  Interactive
</button>

// Skip to main content
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Focus visible styles
.focus-visible {
  outline: 2px solid var(--color-cyan);
  outline-offset: 2px;
}
```

### 7.3 ARIA Labels

```tsx
// Navigation
<nav aria-label="Main navigation">
  {/* menu items */}
</nav>

// Forms
<label htmlFor="email">Email Address</label>
<input id="email" type="email" aria-required="true" />

// Live regions
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Icons (must have accessible labels)
<button aria-label="Toggle dark mode">
  <Moon size={20} />
</button>
```

---

## 8. Image Optimization

### 8.1 WebP with Fallback

```html
<picture>
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.png" alt="Description" loading="lazy" />
</picture>
```

### 8.2 Responsive Images

```html
<img
  srcSet="
    /hero-sm.webp 640w,
    /hero-md.webp 1024w,
    /hero-lg.webp 1920w
  "
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 80vw,
         100vw"
  src="/hero-lg.webp"
  alt="Hero image"
  width="1920"
  height="1080"
  loading="lazy"
/>
```

### 8.3 Preload Critical Images

```tsx
// In page component or layout
useEffect(() => {
  const preloadImage = (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  };

  preloadImage('/hero-lg.webp');
}, []);
```

---

## 9. Testing Strategy

### 9.1 Unit Testing (Vitest)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});

// Example test
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### 9.2 E2E Testing (Playwright)

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: { baseURL: 'http://localhost:5173' },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});

// Example E2E test
import { test, expect } from '@playwright/test';

test('user can register', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Sign Up');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'SecurePass123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

### 9.3 Accessibility Testing

```typescript
// With axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('page has no accessibility violations', async () => {
  const { container } = render(<HomePage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 10. SEO Considerations

### 10.1 Hash Routing Limitations

Current implementation uses HashRouter, which harms SEO:
- URLs like `/#/dashboard` look like fragments
- Search engines may not crawl hash routes
- Social sharing shows base URL only

**Mitigation:** See `web-seo` skill for prerendering strategy.

### 10.2 Meta Tags Best Practices

```tsx
// Always include
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
<meta name="theme-color" content="#0B2648" />
<meta name="description" content="..." />

// Open Graph
<meta property="og:title" content="Ooru Logix" />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://oorulogix.com/og-image.png" />
<meta property="og:url" content="https://oorulogix.com" />

// Twitter Card
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Ooru Logix" />
<meta name="twitter:image" content="https://oorulogix.com/twitter-image.png" />
```

---

## 11. Common Patterns & Best Practices

### 11.1 State Management

```typescript
// Use Firebase Firestore for persistent state
import { onSnapshot, collection } from 'firebase/firestore';

const useUserData = (uid: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, 'users', uid, 'data'),
      (snapshot) => {
        setData(snapshot.docs.map(doc => doc.data()));
      }
    );

    return unsubscribe;
  }, [uid]);

  return data;
};
```

### 11.2 Error Handling

```tsx
// Always wrap API calls in try-catch
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    showErrorToast(error.message);
    return null;
  }
};

// Use Error Boundary for component errors
<ErrorBoundary fallback={<ErrorPage />}>
  <SomeComponent />
</ErrorBoundary>
```

### 11.3 Loading States

```tsx
// Always show skeleton while loading
const MyComponent = () => {
  const { data, loading } = useFetch('/api/data');

  if (loading) return <Skeleton count={3} />;
  if (!data) return <ErrorState />;

  return <Content data={data} />;
};
```

---

## Checklists & Quick Reference

### Before Shipping a Component
- [ ] TypeScript props fully typed
- [ ] Component story in Storybook (if applicable)
- [ ] Keyboard navigation works
- [ ] Color contrast >= 4.5:1 AA
- [ ] ARIA labels on interactive elements
- [ ] Loading & error states handled
- [ ] Responsive at xs, sm, md, lg, xl
- [ ] Framer Motion transitions smooth (60fps)
- [ ] No console errors
- [ ] Bundle size checked

### Before Shipping a Page
- [ ] SEO component with proper meta
- [ ] StructuredData for schema.org
- [ ] All images lazy-loaded with alt text
- [ ] Lighthouse score > 90
- [ ] All routes tested manually
- [ ] Mobile layout verified on device
- [ ] Forms have success/error states
- [ ] No unhandled promise rejections

---

## Related Skills

- **web-qa:** Testing strategy, audit checklists
- **web-seo:** SEO optimization, hash routing mitigation
- **design-system:** Component specifications, tokens reference

