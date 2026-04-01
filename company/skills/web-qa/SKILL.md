# Web QA & Testing - Ooru Logix

Comprehensive quality assurance and testing strategy for oorulogix.com (React 19 SPA). Covers manual testing, cross-browser validation, accessibility, performance, security, and pre-deployment verification.

**Tech Stack:** React 19 + Vite 6.2 + TypeScript 5.8 + TailwindCSS 4 (CDN) + Firebase + Lucide React

---

## 1. Testing Framework Setup

### 1.1 Unit Testing (Vitest)

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/index.ts',
      ],
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### 1.2 E2E Testing (Playwright)

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

---

## 2. Manual Testing Checklist

### 2.1 Per-Route Testing Template

For each of the 21 routes, perform these checks:

```markdown
## Route: [NAME] ([PATH])

### Functionality
- [ ] Page loads without console errors
- [ ] All interactive elements are clickable
- [ ] Forms submit and handle validation
- [ ] Links navigate to correct destinations
- [ ] Modals/overlays open and close correctly
- [ ] Loading states display appropriately
- [ ] Error states display with messages
- [ ] Animations play smoothly (60fps)

### Responsive Design
- [ ] Mobile (320px): Content readable, no horizontal scroll
- [ ] Tablet (768px): Layout adapts correctly
- [ ] Desktop (1024px): Full layout intended
- [ ] Desktop (1440px): Spacing looks correct
- [ ] Images scale responsively
- [ ] Navigation accessible on all sizes
- [ ] Touch targets >= 48px on mobile

### Performance
- [ ] Page loads in < 2.5s on 4G
- [ ] Interactions respond < 100ms
- [ ] Scrolling smooth (no jank)
- [ ] No layout shifts during load

### Accessibility
- [ ] Page can be navigated with Tab key alone
- [ ] Focus visible on all interactive elements
- [ ] Color contrast >= 4.5:1 for text
- [ ] Form labels associated with inputs
- [ ] Alt text on all images
- [ ] Headings in logical order (h1, h2, h3)
- [ ] Error messages announced to screen readers

### Browser Compatibility
- [ ] Chrome 120+
- [ ] Firefox 120+
- [ ] Safari 17+
- [ ] Edge 120+
```

### 2.2 Cross-Browser Testing Matrix

| Browser | Version | Desktop | Mobile | Status |
|---------|---------|---------|--------|--------|
| Chrome | Latest | ✓ | ✓ (Pixel) | Primary |
| Firefox | Latest | ✓ | ✓ | Primary |
| Safari | 17+ | ✓ | ✓ (iPhone) | Primary |
| Edge | Latest | ✓ | - | Secondary |

### 2.3 Responsive Breakpoint Testing

Test these exact viewport widths:

```typescript
const breakpoints = {
  'xs-mobile': 320,     // iPhone SE
  'sm-mobile': 375,     // iPhone 12
  'md-mobile': 428,     // iPhone 14 Pro Max
  'sm-tablet': 600,     // Small tablet
  'md-tablet': 768,     // iPad
  'lg-tablet': 1024,    // iPad Pro
  'sm-desktop': 1280,   // Desktop
  'md-desktop': 1440,   // Larger desktop
  'lg-desktop': 1920,   // Ultra-wide
};
```

### 2.4 Common Interactions to Test

```typescript
interface InteractionTest {
  name: string;
  steps: string[];
  expectedResult: string;
  severity: 'P0' | 'P1' | 'P2' | 'P3';
}

const commonTests: InteractionTest[] = [
  {
    name: 'Form Submission',
    steps: [
      'Navigate to page with form',
      'Fill all required fields',
      'Click submit button',
    ],
    expectedResult: 'Success message displays, form resets',
    severity: 'P0',
  },
  {
    name: 'Authentication Flow',
    steps: [
      'Click Sign In',
      'Enter credentials',
      'Submit form',
    ],
    expectedResult: 'Redirects to dashboard, user state updated',
    severity: 'P0',
  },
  {
    name: 'Navigation',
    steps: [
      'Click menu item',
      'Wait for page load',
    ],
    expectedResult: 'Navigate to correct route, URL updates',
    severity: 'P0',
  },
  {
    name: 'Mobile Menu',
    steps: [
      'Click hamburger icon',
      'Click menu item',
    ],
    expectedResult: 'Menu opens, closes after selection, navigate correctly',
    severity: 'P1',
  },
  {
    name: 'Error Handling',
    steps: [
      'Trigger error condition (bad network, invalid input)',
    ],
    expectedResult: 'Error message displayed, user can recover',
    severity: 'P1',
  },
];
```

---

## 3. Performance Testing

### 3.1 Lighthouse Audit Checklist

Target scores: **90+ on all metrics**

```typescript
interface LighthouseTarget {
  metric: string;
  target: number;
  current: number;
  status: 'PASS' | 'WARN' | 'FAIL';
}

const lighthouseTargets: LighthouseTarget[] = [
  { metric: 'Performance', target: 90, current: 0, status: 'PASS' },
  { metric: 'Accessibility', target: 90, current: 0, status: 'PASS' },
  { metric: 'Best Practices', target: 90, current: 0, status: 'PASS' },
  { metric: 'SEO', target: 90, current: 0, status: 'PASS' },
  { metric: 'PWA', target: 70, current: 0, status: 'PASS' },
];

// Core Web Vitals
const coreWebVitals = {
  'LCP (Largest Contentful Paint)': { target: '2.5s', current: '', status: 'PASS' },
  'FID (First Input Delay)': { target: '100ms', current: '', status: 'PASS' },
  'CLS (Cumulative Layout Shift)': { target: '0.1', current: '', status: 'PASS' },
  'TTFB (Time to First Byte)': { target: '600ms', current: '', status: 'PASS' },
};
```

### 3.2 Bundle Analysis

```bash
# Generate bundle report
npm run build
npm run build:analyze

# Expected output:
# - Total bundle < 500KB (gzipped)
# - React + React-DOM: ~150KB
# - Framer Motion: ~40KB
# - Firebase: ~80KB
# - TailwindCSS (via CDN): ~14KB
# - Application code: ~100KB
# - Other dependencies: ~116KB
```

### 3.3 Performance Optimization Checklist

```markdown
## Performance Metrics

- [ ] LCP < 2.5s
  - Preload critical resources (fonts, images)
  - Lazy load below-the-fold content
  - Reduce JavaScript blocking

- [ ] FID < 100ms
  - Break up long tasks (> 50ms)
  - Use Web Workers for heavy computation
  - Defer non-critical code

- [ ] CLS < 0.1
  - Reserve space for images/ads
  - Avoid inserting content above fold
  - Use transform animations instead of layout changes

- [ ] Bundle Size < 500KB gzipped
  - Code splitting by route
  - Tree shaking unused code
  - Lazy load heavy libraries
  - Remove unused CSS (TailwindCSS issue with CDN)

- [ ] Time to Interactive < 3.5s
  - Prioritize above-the-fold rendering
  - Defer analytics/tracking scripts
  - Use requestIdleCallback for non-critical work
```

### 3.4 Network Testing

```typescript
// Simulate different network conditions
export const networkProfiles = {
  'Fast 4G': { download: 4000, upload: 1000, latency: 10 },
  '4G': { download: 1600, upload: 750, latency: 40 },
  '3G': { download: 400, upload: 100, latency: 100 },
  'Slow 2G': { download: 50, upload: 20, latency: 400 },
  'Offline': { download: 0, upload: 0, latency: 0 },
};

// Test checklist for each profile
- [ ] Page still loads and displays critical content
- [ ] Loading states appear appropriately
- [ ] Timeout handling works
- [ ] Retry mechanisms function
- [ ] No console errors
```

---

## 4. Accessibility Testing

### 4.1 Automated Accessibility Testing

```typescript
// E2E test with axe-core
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('home page has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: {
      html: true,
    },
  });
});
```

### 4.2 Manual Accessibility Checklist

```markdown
## WCAG 2.1 AA Compliance

### Perceivable
- [ ] Color is not the only means of conveying information
- [ ] Color contrast >= 4.5:1 (normal text)
- [ ] Color contrast >= 3:1 (large text)
- [ ] Zoom to 200% works without loss of functionality
- [ ] No content flashes more than 3x per second
- [ ] Images have alt text
- [ ] Video has captions

### Operable
- [ ] All functionality available via keyboard
- [ ] No keyboard trap (can tab away from elements)
- [ ] Focus order is logical
- [ ] Focus indicator visible (2px outline)
- [ ] Skip to main content link present
- [ ] Links and buttons have descriptive text
- [ ] Form controls have labels

### Understandable
- [ ] Page purpose clear
- [ ] Headings describe topic
- [ ] Form labels descriptive
- [ ] Error messages explain problem
- [ ] Language attribute set on html
- [ ] Link purpose clear from context

### Robust
- [ ] Valid HTML (no duplicate IDs)
- [ ] Valid CSS
- [ ] Proper ARIA usage
- [ ] Status messages announced to screen readers
```

### 4.3 Screen Reader Testing

Test with:
- **NVDA** (Windows)
- **JAWS** (Windows)
- **VoiceOver** (macOS/iOS)
- **TalkBack** (Android)

```markdown
## Screen Reader Checklist

- [ ] Page structure announced correctly
- [ ] Headings readable and in order
- [ ] Form labels announced with inputs
- [ ] Button purposes clear
- [ ] Link text descriptive
- [ ] Modal title announced
- [ ] Error messages announced
- [ ] Loading state announced
- [ ] Status updates announced (aria-live)
```

### 4.4 Keyboard Navigation Test

```typescript
// Test without mouse using only Tab and Enter keys
export const keyboardNavigationTest = [
  '1. Tab through all interactive elements',
  '2. Verify focus order is logical',
  '3. Use Enter to activate buttons/links',
  '4. Use Space to toggle checkboxes',
  '5. Use Arrow keys in dropdowns/tabs',
  '6. Use Escape to close modals',
  '7. No elements are unreachable',
];
```

---

## 5. Security Testing

### 5.1 XSS Prevention

```typescript
// Test cases for XSS vulnerabilities
const xssTests = [
  {
    input: '<script>alert("XSS")</script>',
    test: 'Script tags rendered as text, not executed',
  },
  {
    input: '"><svg onload="alert(\'XSS\')">',
    test: 'SVG event handlers sanitized',
  },
  {
    input: 'javascript:alert("XSS")',
    test: 'JavaScript protocol blocked in links',
  },
  {
    input: '<img src=x onerror="alert(\'XSS\')">',
    test: 'Event handlers removed from attributes',
  },
];
```

### 5.2 Content Security Policy (CSP)

```markdown
## CSP Headers Check

- [ ] CSP header present and strict
- [ ] External scripts whitelisted
- [ ] Inline scripts blocked (use nonce if needed)
- [ ] Firebase domain whitelisted
- [ ] CDN domains whitelisted
- [ ] Form submission targets verified
```

### 5.3 Firebase Security Rules Audit

```markdown
## Firestore Rules

- [ ] Only authenticated users can read/write
- [ ] Users can only access own data
- [ ] Admin operations protected
- [ ] Public data explicitly marked
- [ ] Rate limiting configured
- [ ] Input validation enforced
```

### 5.4 Data Privacy Checklist

```markdown
- [ ] No sensitive data logged to console
- [ ] No API keys/tokens in frontend code
- [ ] Passwords transmitted over HTTPS only
- [ ] HTTPS enforced (no HTTP)
- [ ] Session storage used for auth
- [ ] GDPR compliance: Privacy Policy present
- [ ] Cookie consent implemented
- [ ] Third-party trackers disclosed
```

---

## 6. Visual Regression Testing

### 6.1 Screenshot Comparison

```typescript
// Playwright visual comparison
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    mask: [page.locator('.dynamic-content')], // Mask changing content
  });
});

// Run with: npx playwright test --update-snapshots
```

### 6.2 Responsive Visual Tests

```typescript
// Test at multiple breakpoints
const breakpoints = [
  { width: 375, height: 667, name: 'mobile' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 1440, height: 900, name: 'desktop' },
];

for (const breakpoint of breakpoints) {
  test(`homepage ${breakpoint.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: breakpoint.width,
      height: breakpoint.height,
    });
    await page.goto('/');
    await expect(page).toHaveScreenshot(`homepage-${breakpoint.name}.png`);
  });
}
```

---

## 7. Bug Reporting

### 7.1 Bug Report Template

```markdown
## Bug Report: [TITLE]

### Severity
- [ ] P0 (Critical - blocks usage)
- [ ] P1 (High - major feature broken)
- [ ] P2 (Medium - feature partially broken)
- [ ] P3 (Low - cosmetic/nice-to-fix)

### Environment
- Browser: [Name/Version]
- OS: [OS/Version]
- Device: [Desktop/Mobile/Tablet]
- URL: [Route/Page]
- Date/Time: [ISO 8601]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Result
[What should happen]

### Actual Result
[What actually happened]

### Screenshots/Video
[Attach if helpful]

### Console Errors
[Paste any JavaScript errors]

### Network Tab Issues
[Highlight failed requests]

### Additional Context
[Any other relevant information]
```

### 7.2 Severity Classification

| Severity | Impact | Timeline |
|----------|--------|----------|
| **P0** | Feature completely unusable, data loss risk, security breach | Fix immediately (< 1 hour) |
| **P1** | Major feature broken, significant UX impact | Fix today (< 4 hours) |
| **P2** | Feature partially broken, workaround exists | Fix this sprint |
| **P3** | Cosmetic issue, no UX impact | Fix when convenient |

---

## 8. Pre-Deploy Smoke Test Suite

Critical user paths that must pass before deployment:

### 8.1 Authentication Flow

```typescript
test('auth flow', async ({ page }) => {
  // Sign Up
  await page.goto('/');
  await page.click('text=Sign Up');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Test123!@#');
  await page.fill('input[name="confirmPassword"]', 'Test123!@#');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');

  // Sign Out
  await page.click('[aria-label="User menu"]');
  await page.click('text=Sign Out');
  await expect(page).toHaveURL('/');
});

test('auth persistence', async ({ page, context }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'Test123!@#');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');

  // Reload page
  await page.reload();

  // Should still be logged in
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('[aria-label="User menu"]')).toBeVisible();
});
```

### 8.2 Navigation Flow

```typescript
test('navigation works', async ({ page }) => {
  const routes = [
    { path: '/', title: 'Home' },
    { path: '/dashboard', title: 'Dashboard' },
    { path: '/pricing', title: 'Pricing' },
    { path: '/about', title: 'About' },
  ];

  for (const route of routes) {
    await page.goto(route.path);
    await expect(page).toHaveURL(route.path);
    // Verify page loaded
    await expect(page.locator('body')).toHaveText(/./);
  }
});
```

### 8.3 Form Submission

```typescript
test('contact form submission', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('input[name="name"]', 'John Doe');
  await page.fill('input[name="email"]', 'john@example.com');
  await page.fill('textarea[name="message"]', 'Test message');

  const responsePromise = page.waitForResponse(response =>
    response.url().includes('/api/contact') && response.status() === 200
  );

  await page.click('button[type="submit"]');
  const response = await responsePromise;

  expect(response.ok()).toBeTruthy();
  await expect(page.locator('text=Message sent')).toBeVisible();
});
```

### 8.4 Payment Flow (if applicable)

```typescript
test('payment flow', async ({ page }) => {
  await page.goto('/pricing');
  await page.click('text=Get Started');

  // Modal opens
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  // Fill stripe form
  const stripeFrame = page.frameLocator('iframe[name*="stripe"]');
  await stripeFrame.locator('input[name="cardnumber"]')
    .fill('4242424242424242');

  await page.click('button[type="submit"]');

  // Should see success state
  await expect(page.locator('text=Subscription active')).toBeVisible();
});
```

### 8.5 Critical API Calls

```typescript
test('api endpoints working', async ({ page }) => {
  const endpoints = [
    '/api/user/profile',
    '/api/data/list',
    '/api/settings',
  ];

  for (const endpoint of endpoints) {
    const response = await page.goto(`http://localhost:3000${endpoint}`);
    expect([200, 401, 403]).toContain(response?.status());
  }
});
```

---

## 9. Regression Test Checklist

Before each release, run these tests:

```markdown
## Pre-Release Checklist

### Functionality
- [ ] All routes load without errors
- [ ] All forms submit successfully
- [ ] All buttons trigger expected actions
- [ ] All navigation links work
- [ ] Search/filter functions work
- [ ] Payment processing works (if applicable)
- [ ] User authentication works
- [ ] Data persists across page reloads

### Responsive Design
- [ ] Mobile layout correct (320px, 375px, 428px)
- [ ] Tablet layout correct (768px, 1024px)
- [ ] Desktop layout correct (1440px, 1920px)
- [ ] Images scale properly
- [ ] Text readable at all sizes
- [ ] Touch targets >= 48px on mobile

### Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] Bundle size < 500KB gzipped
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

### Accessibility
- [ ] No axe-core violations
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast >= 4.5:1
- [ ] Focus indicators visible
- [ ] Form labels present

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### Security
- [ ] No console errors
- [ ] No network errors
- [ ] CSP headers correct
- [ ] HTTPS enforced
- [ ] No hardcoded secrets
- [ ] Input validation works
- [ ] XSS protection active

### SEO (if applicable)
- [ ] Meta tags present
- [ ] Open Graph tags present
- [ ] Structured data valid
- [ ] Robots.txt correct
- [ ] Sitemap.xml present

### Analytics (if applicable)
- [ ] Events firing correctly
- [ ] No duplicate events
- [ ] Funnel tracking works
```

---

## 10. Continuous Integration

### 10.1 GitHub Actions CI Pipeline

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run unit tests
        run: npm run test:unit

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

      - name: Build
        run: npm run build

      - name: Check bundle size
        run: npm run build:analyze
```

---

## 11. Testing Tools Reference

| Tool | Purpose | Installation |
|------|---------|--------------|
| **Vitest** | Unit testing | `npm install -D vitest @vitest/ui` |
| **Playwright** | E2E testing | `npm install -D @playwright/test` |
| **axe-core** | Accessibility | `npm install -D axe-playwright jest-axe` |
| **Lighthouse** | Performance | `npm install -D lighthouse` |
| **Percy** | Visual regression | `npm install -D @percy/cli` |

---

## 12. Quick Reference Commands

```bash
# Run all tests
npm test

# Unit tests only
npm run test:unit

# Unit tests with coverage
npm run test:unit -- --coverage

# E2E tests
npm run test:e2e

# E2E tests in UI mode
npm run test:e2e -- --ui

# E2E tests for specific file
npm run test:e2e -- auth.spec.ts

# Performance audit
npm run lighthouse

# Accessibility audit
npm run audit:a11y

# Build and analyze
npm run build:analyze

# Serve and test locally
npm run dev & npm run test:e2e
```

---

## Related Skills

- **web-architect:** Component specs, testing strategy
- **web-seo:** SEO validation checklist

