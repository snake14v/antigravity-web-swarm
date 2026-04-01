# Component Catalog - Ooru Logix

Complete specification of all components in the Ooru Logix design system, including existing components, new component requirements, and implementation guidelines.

---

## Existing Components

### Navigation Components

#### Navbar

**File:** `src/components/Navbar.tsx`

**Purpose:**
Top navigation bar with logo, menu links, user authentication state, and mobile menu toggle.

**Props:**
```typescript
interface NavbarProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
  user?: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  } | null;
  scrolled?: boolean;
}
```

**States:**
- **Default:** Glass panel at top, logo left, menu center, auth right
- **Scrolled:** Background opacity increases (navy/85), border becomes more visible
- **Mobile:** Menu icon replaces horizontal menu, mobile menu overlays from top
- **Authenticated:** User avatar + dropdown menu instead of Sign In button
- **Unauthenticated:** Sign In / Sign Up buttons

**Styling:**
```css
/* Fixed position, high z-index */
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: var(--z-fixed);
background: var(--color-surface-glass);
backdrop-filter: blur(10px);
border-bottom: 1px solid var(--color-border-light);
padding: var(--space-4) var(--space-6);
transition: all var(--duration-base) var(--easing-ease-out);

/* When scrolled: intensify glass */
&.scrolled {
  background: var(--color-surface-glass-hover);
  border-color: var(--color-border-medium);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
```

**Key Features:**
- Smooth scroll detection with opacity transition
- Responsive: 100% width, padding adjusts on mobile
- Accessibility: Semantic nav, ARIA menu, keyboard support
- Mobile: Hamburger icon (Lucide Menu), mobile menu overlay
- Authentication: Firebase user state integration

**Accessibility Requirements:**
- `role="navigation"` on container
- `aria-expanded` on mobile menu button
- `aria-label="Main navigation"` on nav
- Keyboard: Tab through links, Enter/Space on buttons
- Focus visible: 2px cyan outline

---

#### BottomNav

**File:** `src/components/BottomNav.tsx`

**Purpose:**
Mobile-first bottom navigation bar for main route navigation.

**Props:**
```typescript
interface BottomNavProps {
  currentPath: string;
}
```

**States:**
- **Active Route:** Icon + label highlighted in cyan with glow
- **Inactive Route:** Gray icon, no glow

**Styling:**
```css
/* Fixed bottom, mobile only */
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: var(--z-fixed);
background: var(--color-surface-glass);
backdrop-filter: blur(10px);
border-top: 1px solid var(--color-border-light);
display: grid;
grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));

/* Hide on desktop */
@media (min-width: 768px) {
  display: none;
}
```

**Routes:**
- Home
- Dashboard
- Pricing
- About
- Account (if authenticated)

**Key Features:**
- Only visible on mobile (< 768px)
- Active link has cyan glow and icon highlight
- Touch-friendly: 48px minimum tap target
- Fixed position: Always accessible

**Accessibility:**
- `role="navigation"`
- `aria-label="Mobile navigation"`
- Active link: `aria-current="page"`

---

#### Footer

**File:** `src/components/Footer.tsx`

**Purpose:**
Global footer with site links, legal documents, social links, copyright.

**Sections:**
- Product Links
- Company Links
- Legal (Privacy, Terms, Cookies)
- Social Media
- Copyright

**Styling:**
```css
background: var(--color-bg-secondary);
border-top: 1px solid var(--color-border-medium);
padding: var(--space-12) var(--space-6);

/* Grid layout */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
gap: var(--space-8);

/* Links */
color: var(--color-text-secondary);
transition: color var(--duration-base) ease-out;

/* Link hover */
&:hover {
  color: var(--color-cyan);
}
```

**Key Features:**
- Responsive: Stacked on mobile, grid on desktop
- Dark glass styling with chai brown accents on links
- Social icons: LinkedIn, Twitter, GitHub
- Legal links: Privacy Policy, Terms, Cookie Policy

---

### Layout & Utility Components

#### CustomCursor

**File:** `src/components/CustomCursor.tsx`

**Purpose:**
Custom cursor animation that follows mouse movement. Replaces default OS cursor with branded cyan circle.

**Styling:**
```css
/* Outer ring (purple) */
width: 32px;
height: 32px;
border: 2px solid var(--color-purple);
border-radius: var(--radius-full);
pointer-events: none;
position: fixed;
z-index: var(--z-cursor);

/* Inner dot (cyan) */
::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--color-cyan);
  border-radius: var(--radius-full);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px var(--color-cyan);
}
```

**Performance:**
- Uses `requestAnimationFrame` for smooth 60fps tracking
- No mouse move listener - updates on RAF
- `cursor: none` on body element

**Key Features:**
- Always visible (z-index: 9999)
- Glow effect on inner dot
- Smooth tracking with no lag
- Respects :hover states implicitly

**Accessibility:**
- `pointer-events: none` to not block interaction
- Doesn't interfere with touch devices

---

#### SystemHealthHUD

**File:** `src/components/SystemHealthHUD.tsx`

**Purpose:**
Real-time system status indicator showing online/offline, Firebase connection, last sync time.

**Props:**
```typescript
interface SystemHealthHUDProps {
  isOnline?: boolean;
  lastSync?: Date;
  firebaseStatus?: 'connected' | 'connecting' | 'disconnected';
}
```

**Styling:**
```css
position: fixed;
top: var(--space-6);
right: var(--space-6);
z-index: var(--z-tooltip);

/* Bento card styling */
background: rgba(11, 38, 72, 0.5);
backdrop-filter: blur(15px);
border: 1px solid rgba(0, 255, 255, 0.15);
border-radius: var(--radius-xl);
padding: var(--space-4) var(--space-6);
font-size: var(--font-size-xs);
font-family: var(--font-mono);

/* Status indicator */
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  display: inline-block;
  margin-right: var(--space-2);
  animation: pulse 2s ease-in-out infinite;
}

.status-dot.online {
  background: var(--color-success);
}

.status-dot.connecting {
  background: var(--color-warning);
}

.status-dot.offline {
  background: var(--color-error);
}
```

**Content:**
- Status indicator (green dot + "Online")
- Last sync time (e.g., "Synced 2m ago")
- Firebase connection status

**Real-Time Updates:**
- Listens to `navigator.onLine`
- Firebase `onAuthStateChanged`
- Firestore connection listener

**Key Features:**
- Always visible in corner
- Non-intrusive styling
- Real-time status updates
- Helps with debugging connection issues

---

#### ErrorBoundary

**File:** `src/components/ErrorBoundary.tsx`

**Purpose:**
React error boundary that catches component errors and displays fallback UI.

**Props:**
```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
```

**Fallback UI:**
```tsx
<div className="min-h-screen bg-navy flex items-center justify-center p-4">
  <div className="glass-panel max-w-md text-center">
    <h1 className="text-2xl font-bold text-error mb-4">
      Something went wrong
    </h1>
    <p className="text-text-secondary mb-6">
      We encountered an unexpected error. Try refreshing the page.
    </p>
    <button onClick={() => window.location.reload()}>
      Reload Page
    </button>
  </div>
</div>
```

**Key Features:**
- Catches React rendering errors
- Prevents white screen of death
- Logs errors to console and optional error tracking
- Reset button to remount component tree

**Implementation:**
```typescript
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  console.error('ErrorBoundary caught:', error, errorInfo);
  this.props.onError?.(error, errorInfo);
  this.setState({ hasError: true });
}
```

---

### Loading & Skeleton Components

#### PageLoader / RandomLoader

**File:** `src/components/PageLoader.tsx`

**Purpose:**
Full-page loading skeleton with pulsing animation. RandomLoader variant shows randomized skeleton layout.

**Styling:**
```css
/* Container */
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: var(--color-bg-primary);
z-index: var(--z-modal);
display: flex;
align-items: center;
justify-content: center;

/* Skeleton elements */
background: linear-gradient(
  90deg,
  var(--color-navy) 0%,
  var(--color-navy-light) 50%,
  var(--color-navy) 100%
);
background-size: 200% 100%;
animation: shimmer 2s infinite;

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Variants:**
- **PageLoader:** Standard skeleton (header, 2-col grid, footer)
- **RandomLoader:** Random arrangement of skeleton blocks

**Key Features:**
- Smooth shimmer animation
- Navy gradient with cyan accent
- Responsive grid layout
- Prevents layout shift when real content loads

---

#### Skeleton

**File:** `src/components/Skeleton.tsx`

**Purpose:**
Reusable skeleton placeholder with pulse animation.

**Props:**
```typescript
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  variant?: 'text' | 'circle' | 'rect';
}
```

**Variants:**
- **Text:** Rounded rectangle (default)
- **Circle:** Perfect circle for avatars
- **Rect:** Square rectangle

**Styling:**
```css
background: var(--color-bg-tertiary);
border-radius: var(--radius-md);
animation: pulse 2s ease-in-out infinite;

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

---

### Content & Display Components

#### PixelText

**File:** `src/components/PixelText.tsx`

**Purpose:**
Retro pixel-art text effect using VT323 font. Used for hero titles and stylized callouts.

**Props:**
```typescript
interface PixelTextProps {
  text: string;
  className?: string;
  animate?: boolean;
  color?: 'cyan' | 'purple' | 'green' | 'white';
}
```

**Styling:**
```css
font-family: var(--font-retro);
font-size: 2.25rem;
letter-spacing: 0.1em;
text-transform: uppercase;
color: var(--color-text-primary);
text-shadow: 2px 2px 0 var(--color-cyan);

/* Animation (optional) */
&.animate {
  animation: pixelFlicker 200ms steps(1) infinite;
}

@keyframes pixelFlicker {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.7; }
}
```

**Use Cases:**
- Hero section titles
- Call-out text
- Retro callouts
- Special emphasis

---

#### VividOrbs

**File:** `src/components/VividOrbs.tsx`

**Purpose:**
Animated background orbs with floating motion and color cycling. Used as decorative backdrop.

**Props:**
```typescript
interface VividOrbsProps {
  count?: number;
  colors?: string[];
  size?: 'small' | 'medium' | 'large';
}
```

**Styling:**
```css
position: absolute;
border-radius: var(--radius-full);
filter: blur(40px);
mix-blend-mode: screen;
opacity: 0.4;
animation: float 20s ease-in-out infinite;

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}
```

**Default Colors:**
- Cyan (#00FFFF)
- Purple (#BD00FF)
- Green (#2DB76F)

**Key Features:**
- Staggered animations for smooth effect
- Screen blending for additive color mixing
- Large blur radius for soft appearance
- Responsive sizing

---

#### SwarmAgentConcept

**File:** `src/components/SwarmAgentConcept.tsx`

**Purpose:**
Animated particle system showing agent swarming behavior. Used in hero sections.

**Styling:**
```css
position: relative;
width: 100%;
height: 400px;
background: var(--color-bg-primary);
overflow: hidden;
border-radius: var(--radius-2xl);

/* Particle */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--color-cyan);
  border-radius: var(--radius-full);
  box-shadow: 0 0 10px var(--color-cyan);
}
```

**Animation:**
- Boid-like movement (separation, alignment, cohesion)
- Collision avoidance
- Mouse tracking influence
- Continuous motion

**Key Features:**
- Real-time particle physics
- Interactive (responds to mouse)
- Performant (requestAnimationFrame)
- Eye-catching visual element

---

### Specialized Components

#### Logo

**File:** `src/components/Logo.tsx`

**Purpose:**
Ooru Logix brand mark with multiple variants.

**Props:**
```typescript
interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Variants:**
- **Full:** Icon + "Ooru Logix" text
- **Icon:** Just the mark (circular design)
- **Text:** Just the text in retro font

**Styling:**
```css
/* Icon */
width: 40px;
height: 40px;
background: radial-gradient(circle, var(--color-cyan), var(--color-purple));
border-radius: var(--radius-md);
box-shadow: 0 0 20px var(--color-cyan);

/* Text */
font-family: var(--font-retro);
font-size: 1.5rem;
color: var(--color-cyan);
letter-spacing: 0.05em;
text-transform: uppercase;
```

**Responsive:**
- Scales with viewport
- Sizing: sm (24px), md (40px), lg (64px)

---

#### PaymentPortal

**File:** `src/components/PaymentPortal.tsx`

**Purpose:**
Stripe payment integration modal for subscription purchases.

**Props:**
```typescript
interface PaymentPortalProps {
  tier: 'starter' | 'pro' | 'enterprise';
  onSuccess?: (subscriptionId: string) => void;
  onError?: (error: Error) => void;
  isOpen?: boolean;
  onClose?: () => void;
}
```

**Styling:**
```css
/* Modal overlay */
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.7);
z-index: var(--z-modal-backdrop);

/* Modal content */
max-width: 500px;
background: var(--color-surface-glass);
backdrop-filter: blur(10px);
border: 1px solid var(--color-border-medium);
border-radius: var(--radius-xl);
padding: var(--space-8);
z-index: var(--z-modal);
```

**Key Features:**
- Stripe Elements integration
- PCI compliance (no card storage locally)
- Error handling & display
- Loading state during processing
- Success callback

**Security:**
- No card data stored
- Stripe API only
- HTTPS only

---

#### ManifestoSection

**File:** `src/components/ManifestoSection.tsx`

**Purpose:**
Full-width brand mission statement section with retro styling.

**Styling:**
```css
width: 100%;
text-align: center;
padding: var(--space-20) var(--space-6);
background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 100%);

/* Heading */
font-size: var(--font-size-5xl);
font-weight: var(--font-weight-bold);
font-family: var(--font-retro);
color: var(--color-cyan);
text-shadow: 2px 2px 0 var(--color-purple);
margin-bottom: var(--space-6);

/* Description */
font-size: var(--font-size-xl);
color: var(--color-text-secondary);
max-width: 800px;
margin: 0 auto;
line-height: var(--line-height-relaxed);
```

**Animation:**
- Fade in on scroll
- Text reveal effect

---

#### FeaturesSection

**File:** `src/components/FeaturesSection.tsx`

**Purpose:**
Feature grid displaying key product features as bento cards.

**Props:**
```typescript
interface FeaturesSectionProps {
  features: Array<{
    icon: ReactNode;
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
}
```

**Styling:**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: var(--space-6);

/* Feature card */
.feature-card {
  background: rgba(11, 38, 72, 0.5);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(0, 255, 255, 0.15);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: all var(--duration-base) var(--easing-ease-out);
}

.feature-card:hover {
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
  transform: translateY(-4px);
}

/* Icon */
.icon {
  font-size: 2.5rem;
  color: var(--color-cyan);
  margin-bottom: var(--space-4);
}
```

**Responsive:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

#### PricingSection

**File:** `src/components/PricingSection.tsx`

**Purpose:**
Subscription tier comparison with CTA buttons.

**Props:**
```typescript
interface PriceCard {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  cta: { text: string; href: string };
}

interface PricingSectionProps {
  tiers: PriceCard[];
}
```

**Styling:**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: var(--space-8);

/* Popular tier highlight */
.tier.popular {
  border-color: var(--color-cyan);
  box-shadow: 0 0 40px rgba(0, 255, 255, 0.3);
  transform: scale(1.05);
}

/* Pricing display */
.price {
  font-size: var(--font-size-6xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-cyan);
  margin: var(--space-4) 0;
}

.price-period {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
```

**Features:**
- Tier comparison grid
- Popular tier emphasized
- Feature checkmarks
- CTA buttons per tier

---

#### UseCasesGrid

**File:** `src/components/UseCasesGrid.tsx`

**Purpose:**
Grid display of product use cases with images and descriptions.

**Props:**
```typescript
interface UseCase {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface UseCasesGridProps {
  cases: UseCase[];
  columns?: 2 | 3 | 4;
}
```

**Styling:**
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: var(--space-6);

.use-case-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(0, 255, 255, 0.15);
  transition: all var(--duration-base) ease-out;
}

.use-case-card:hover {
  border-color: rgba(0, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  transform: translateY(-2px);
}

.use-case-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.use-case-content {
  padding: var(--space-4);
  background: var(--color-surface-glass);
}
```

---

#### BlackboxTerminal

**File:** `src/components/BlackboxTerminal.tsx`

**Purpose:**
Simulated terminal/CLI interface with typing animation effect.

**Props:**
```typescript
interface TerminalOutput {
  type: 'command' | 'output' | 'error' | 'success';
  text: string;
}

interface BlackboxTerminalProps {
  outputs: TerminalOutput[];
  blinking?: boolean;
}
```

**Styling:**
```css
background: var(--color-bg-tertiary);
border: 1px solid var(--color-border-medium);
border-radius: var(--radius-lg);
padding: var(--space-4);
font-family: var(--font-mono);
font-size: var(--font-size-sm);
max-height: 400px;
overflow-y: auto;
color: var(--color-cyan);
text-shadow: 0 0 10px rgba(0, 255, 255, 0.3);

/* Cursor */
.cursor {
  display: inline-block;
  width: 8px;
  height: 1em;
  background: var(--color-cyan);
  margin-left: 4px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Output color coding */
.command { color: var(--color-cyan); }
.output { color: var(--color-text-secondary); }
.error { color: var(--color-error); }
.success { color: var(--color-success); }
```

**Animation:**
- Typing effect with character delays
- Blinking cursor
- Smooth scrolling of output

---

## New Components to Build

### Button

**File:** `src/components/Button.tsx`

**Purpose:**
Reusable button component with multiple variants and states.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}
```

**Variants:**

**Primary:**
```css
background: var(--color-cyan);
color: var(--color-navy);
font-weight: var(--font-weight-semibold);
padding: var(--space-3) var(--space-6);
border-radius: var(--radius-md);
border: none;
cursor: pointer;
transition: all var(--duration-base) ease-out;
box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);

&:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
  transform: translateY(-2px);
}

&:active {
  transform: translateY(0);
}

&:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

**Secondary:**
```css
background: var(--color-chai);
color: var(--color-text-primary);
border: 1px solid var(--color-chai);
/* Rest similar to primary */
```

**Ghost:**
```css
background: transparent;
color: var(--color-text-primary);
border: 1px solid var(--color-border-medium);
transition: all var(--duration-base) ease-out;

&:hover {
  border-color: var(--color-cyan);
  color: var(--color-cyan);
}
```

**Danger:**
```css
background: var(--color-error);
color: white;
border: none;
/* Rest similar to primary */
```

**Accessibility:**
- `aria-disabled` when disabled
- Focus visible: 2px cyan outline
- Loading state: `aria-busy="true"`

---

### Input

**File:** `src/components/Input.tsx`

**Purpose:**
Text input field with validation states and labels.

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: ReactNode;
  variant?: 'default' | 'filled';
}
```

**Styling:**
```css
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input-field {
  background: var(--color-surface-glass);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  transition: all var(--duration-base) ease-out;

  &::placeholder {
    color: var(--color-text-muted);
  }

  &:focus {
    outline: none;
    border-color: var(--color-cyan);
    box-shadow: 0 0 12px rgba(0, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.error {
    border-color: var(--color-error);
  }
}

.help-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

.error-text {
  font-size: var(--font-size-xs);
  color: var(--color-error);
}
```

**Validation:**
- Error state styling
- Error message display
- Helper text support

---

### Card

**File:** `src/components/Card.tsx`

**Purpose:**
Reusable card component with glass morphism styling.

**Props:**
```typescript
interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: 'default' | 'featured' | 'elevated';
}
```

**Variants:**

**Default:**
```css
background: var(--color-surface-glass);
backdrop-filter: blur(10px);
border: 1px solid var(--color-border-medium);
border-radius: var(--radius-lg);
padding: var(--space-6);
```

**Featured:**
```css
background: rgba(11, 38, 72, 0.5);
backdrop-filter: blur(15px);
border: 1px solid rgba(0, 255, 255, 0.15);
box-shadow: 0 0 20px rgba(0, 255, 255, 0.1);
```

**Elevated:**
```css
background: var(--color-surface-glass);
backdrop-filter: blur(10px);
border: 1px solid var(--color-border-strong);
box-shadow: var(--shadow-lg);
```

---

### Badge

**File:** `src/components/Badge.tsx`

**Purpose:**
Small label component for tags, status indicators.

**Props:**
```typescript
interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}
```

**Styling:**
```css
display: inline-flex;
align-items: center;
gap: var(--space-2);
padding: var(--space-1) var(--space-3);
background: rgba(0, 255, 255, 0.1);
border: 1px solid rgba(0, 255, 255, 0.3);
border-radius: var(--radius-full);
font-size: var(--font-size-xs);
font-weight: var(--font-weight-medium);
color: var(--color-cyan);

/* Variants */
&.success {
  background: rgba(45, 183, 111, 0.1);
  border-color: rgba(45, 183, 111, 0.3);
  color: var(--color-success);
}

&.error {
  background: rgba(255, 68, 68, 0.1);
  border-color: rgba(255, 68, 68, 0.3);
  color: var(--color-error);
}
```

---

### Modal

**File:** `src/components/Modal.tsx`

**Purpose:**
Dialog overlay component for modals and confirmations.

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}
```

**Styling:**
```css
/* Backdrop */
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.7);
z-index: var(--z-modal-backdrop);
display: flex;
align-items: center;
justify-content: center;

/* Modal */
max-width: 500px;
width: 90%;
background: var(--color-surface-glass);
backdrop-filter: blur(10px);
border: 1px solid var(--color-border-medium);
border-radius: var(--radius-xl);
padding: var(--space-8);
z-index: var(--z-modal);
animation: slideUp var(--duration-base) ease-out;
```

**Animation:**
```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>
```

---

### Tabs

**File:** `src/components/Tabs.tsx`

**Purpose:**
Tab navigation component for switching between sections.

**Props:**
```typescript
interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}
```

**Styling:**
```css
/* Tab list */
display: flex;
border-bottom: 1px solid var(--color-border-medium);
gap: var(--space-4);

/* Tab button */
background: transparent;
color: var(--color-text-secondary);
border: none;
padding: var(--space-4) 0;
cursor: pointer;
font-weight: var(--font-weight-medium);
transition: all var(--duration-base) ease-out;
position: relative;

&:hover {
  color: var(--color-text-primary);
}

&.active {
  color: var(--color-cyan);
}

/* Active indicator */
&.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-cyan);
}
```

---

### Tooltip

**File:** `src/components/Tooltip.tsx`

**Purpose:**
Floating tooltip component for helper text.

**Props:**
```typescript
interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  delay?: number;
}
```

**Styling:**
```css
.tooltip {
  position: absolute;
  background: var(--color-navy-light);
  border: 1px solid var(--color-border-medium);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
  z-index: var(--z-tooltip);
  white-space: nowrap;
  pointer-events: none;
  animation: fadeIn var(--duration-fast) ease-out;
}
```

---

### Avatar

**File:** `src/components/Avatar.tsx`

**Purpose:**
User profile picture component.

**Props:**
```typescript
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'idle';
}
```

**Styling:**
```css
.avatar {
  width: var(--space-10);
  height: var(--space-10);
  border-radius: var(--radius-full);
  background: var(--color-navy-light);
  border: 2px solid var(--color-border-medium);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
  position: relative;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-full);
}

/* Status indicator */
.status-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-bg-primary);
  bottom: 0;
  right: 0;
}

.status-dot.online {
  background: var(--color-success);
}
```

---

### Progress

**File:** `src/components/Progress.tsx`

**Purpose:**
Progress bar component for loading and completion indication.

**Props:**
```typescript
interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
}
```

**Styling:**
```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-surface-glass);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-cyan), var(--color-purple));
  border-radius: var(--radius-full);
  transition: width var(--duration-base) ease-out;
}
```

---

### Alert

**File:** `src/components/Alert.tsx`

**Purpose:**
Dismissible alert component for messages and notifications.

**Props:**
```typescript
interface AlertProps {
  title?: string;
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  icon?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}
```

**Styling:**
```css
.alert {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border-left: 4px solid;
  background: rgba(0, 255, 255, 0.05);
  border-color: var(--color-cyan);
  color: var(--color-text-primary);

  &.success {
    background: rgba(45, 183, 111, 0.05);
    border-color: var(--color-success);
  }

  &.error {
    background: rgba(255, 68, 68, 0.05);
    border-color: var(--color-error);
  }

  &.warning {
    background: rgba(255, 165, 0, 0.05);
    border-color: var(--color-warning);
  }
}
```

---

## Component Guidelines

### Usage Best Practices

1. **Always include TypeScript props**
2. **Provide sensible defaults**
3. **Use CSS variables for colors**
4. **Include accessibility attributes**
5. **Test at multiple breakpoints**
6. **Add loading & error states**
7. **Use Framer Motion for animations**

### Testing Checklist

For every component:
- [ ] Renders with default props
- [ ] All variants work correctly
- [ ] Responsive on xs, sm, md, lg, xl
- [ ] Keyboard navigation works
- [ ] Color contrast >= 4.5:1
- [ ] No console errors
- [ ] Performance: < 16ms render time

---

