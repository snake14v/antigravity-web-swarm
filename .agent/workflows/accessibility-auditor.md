---
name: "Accessibility Auditor"
description: "WCAG 2.1 AA compliance audit including ARIA labels, keyboard navigation, color contrast (4.5:1 ratio), focus management, live regions, and screen reader semantics"
version: "1.0"
triggers:
  - "axe-core violations detected"
  - "color contrast below 4.5:1"
  - "keyboard navigation broken"
  - "manual: /audit-accessibility"
escalates_to: "Design System Agent"
---

## When to Run

- **axe-core violations** detected in automated testing
- **Color contrast failures** below WCAG AA 4.5:1 ratio on any element
- **Keyboard navigation broken** in user flows (Tab, Enter, Escape, Arrow keys)
- **Screen reader testing** fails (missing alt text, ARIA labels, live regions)
- **Focus indicators** missing or invisible after styling
- **Scheduled monthly** on first Monday 03:00 UTC for full compliance audit
- Manual trigger: after component redesigns or before public releases

## Memory Protocol

**Read First:**
- `CLAUDE.md` (brand colors, typography, accessibility standards)
- `.eslintrc` for accessibility rules (eslint-plugin-jsx-a11y)
- `src/index.css` or `globals.css` (focus styles, color definitions)
- Any existing `/docs/ACCESSIBILITY.md` (guidelines)
- `/reports/accessibility/` for historical audit results
- Component storybook or design system documentation

**Update After:**
- Create `ACCESSIBILITY_AUDIT_[timestamp].md` with violations and fixes
- Update `reports/accessibility/axe-report.json` with scan results
- Commit ARIA fixes and semantic HTML changes with `a11y: ` prefix
- Update accessibility guidelines if patterns discovered
- Flag screen reader test failures in issue tracker

## Execution Pipeline

### Phase 1: Automated Scanning (10 mins)

1. **Run axe-core scan on all pages**
   ```bash
   npm install --save-dev @axe-core/cli
   npx axe http://localhost:5173 --save reports/accessibility/axe-report.json
   ```
   - Scan main routes: `/`, `/dashboard`, `/settings`, etc.
   - Export violations, incomplete items, passes
   - Categorize: critical (blocks usage), serious (major issue), moderate, minor

2. **Run Lighthouse accessibility audit**
   ```bash
   npx lighthouse http://localhost:5173 --only-categories=accessibility
   ```
   - Record accessibility score (target: 90+)
   - Note failing audits (color contrast, button sizes, form labels, etc.)
   - Compare against previous audit baseline

3. **Check WAVE browser extension results** (if available)
   - Browser extension scan across pages
   - Identify contrast errors, missing labels, structural issues
   - Export to JSON report

### Phase 2: Manual Keyboard Navigation (8 mins)

1. **Tab order audit**
   - Start on each page, press Tab repeatedly
   - Verify logical tab order (left-to-right, top-to-bottom)
   - Flag: skipped elements, illogical jumps, focus traps
   - All interactive elements reachable with keyboard

2. **Keyboard shortcuts test**
   - Enter: activates buttons, submits forms
   - Escape: closes modals, cancels operations
   - Arrow keys: navigate lists, radio groups, tabs
   - Space: toggle checkboxes, activate buttons
   - Document: which shortcuts work, which fail

3. **Focus indicator validation**
   - Verify visible focus outline on all interactive elements
   - Check outline color contrasts 3:1 against background (WCAG G165)
   - Focus indicator size: minimum 2px border or outline
   - No focus removal with `outline: none` without replacement

### Phase 3: Color Contrast Analysis (8 mins)

1. **Text color contrast check**
   - Primary text: measure contrast against background
   - Target: 4.5:1 for normal text (<18pt), 3:1 for large text (≥18pt)
   - Test in light and dark modes separately
   - Flag: headings, body text, labels, help text all below threshold

2. **Component color audit**
   - Interactive elements: buttons, links, form inputs
   - Check: resting, hover, focus, disabled states
   - Verify: icons and decorative elements meet 3:1 if meaningful
   - Use tools: WebAIM Contrast Checker, Accessible Colors

3. **Use WebAIM Color Contrast Tool**
   ```
   For each color combo found:
   - Enter foreground and background hex codes
   - Verify ≥4.5:1 normal text
   - Verify ≥3:1 large text
   - Document passing/failing pairs
   ```

### Phase 4: ARIA & Semantic HTML Audit (10 mins)

1. **Verify semantic HTML structure**
   - Check: `<button>` not `<div onclick>` for buttons
   - Verify: form inputs use `<label>` with proper `htmlFor` attribute
   - Headings: `<h1>`, `<h2>`, `<h3>` for page structure (not styling)
   - Lists: `<ul>`, `<ol>` for list content (not divs)
   - Navigation: `<nav>` for main navigation sections

2. **ARIA labels and attributes**
   - Icon buttons: `aria-label="Action name"`
   - Form fields without visible labels: `aria-label` or `aria-labelledby`
   - Modals: `role="dialog"` with `aria-modal="true"` and `aria-labelledby`
   - Dropdowns/combobox: proper `role`, `aria-expanded`, `aria-haspopup`
   - Tables: `<th scope="col|row">`, `<caption>` for table title

3. **Live regions for dynamic content**
   - Status updates: `role="status"` or `aria-live="polite"`
   - Error messages: `role="alert"` with `aria-live="assertive"`
   - Loading states: `aria-busy="true"` on container
   - Example: `<div role="status" aria-live="polite" aria-atomic="true">`

### Phase 5: Screen Reader Testing (12 mins)

1. **Test with NVDA (Windows) or JAWS (if available)**
   - Start screen reader, navigate major pages
   - Verify page structure announced correctly
   - Check: headings, landmarks, form fields clear
   - Test: buttons announce purpose, links destination
   - Document: screen reader experience gaps

2. **Alt text validation**
   - Every `<img>` has `alt` attribute
   - Alt text describes image (not "image of" or "picture")
   - Decorative images: `alt=""` with `aria-hidden="true"`
   - Complex images: `alt` + `<figure><figcaption>` for detailed explanation
   - Icons: either `aria-label` on icon button or alt if `<img>`

3. **Form field announcements**
   - All inputs have associated labels (visible or `aria-label`)
   - Error messages announced: `aria-invalid="true"` on input
   - Required fields: `aria-required="true"` or `<span>*</span>` with description
   - Help text: `aria-describedby="help-text-id"`
   - Example: `<input aria-invalid="true" aria-describedby="error-123">`

### Phase 6: Mobile Accessibility (8 mins)

1. **Touch target sizes**
   - Minimum 44×44px (recommended by WCAG 2.5.5)
   - Small controls acceptable if adequate spacing (6mm minimum)
   - Check: buttons, links, form inputs, interactive icons
   - Test on mobile device at intended sizes

2. **Zoom and text scaling**
   - No `user-scalable=no` in viewport meta tag
   - Allow text scaling to 200% without loss of functionality
   - Layouts responsive to text size increases
   - Test: browser zoom 200%, text size 150%

3. **Screen reader on mobile**
   - Test with VoiceOver (iOS) or TalkBack (Android)
   - Verify labels, headings, landmarks announced
   - Swipe navigation works, gestures discoverable
   - Critical: controls accessible via touch and gestures

## Output Section

**Deliverables:**
1. **Accessibility Audit Report** (`ACCESSIBILITY_AUDIT_[timestamp].md`)
   - Axe-core scan results summary
   - Lighthouse accessibility score
   - WCAG 2.1 AA compliance status by criterion
   - Color contrast failures with locations and fixes
   - Keyboard navigation issues with steps to reproduce
   - ARIA label/role missing elements
   - Screen reader experience gaps
   - Mobile accessibility issues (touch targets, zoom, gestures)
   - Prioritized remediation plan

2. **Axe Report JSON** (`reports/accessibility/axe-report.json`)
   - Violations categorized by impact level
   - Incomplete items for manual review
   - Passes documented for compliance tracking

3. **Remediation Code** (if issues found)
   - Add missing ARIA labels to components
   - Fix semantic HTML (heading hierarchy, lists, tables)
   - Add/update focus styles
   - Adjust color palette for contrast compliance

**Success Criteria:**
- Axe-core violations: 0 critical, 0 serious
- Lighthouse accessibility: ≥90
- WCAG 2.1 AA: 100% compliant
- Color contrast: 4.5:1 minimum for all text
- Keyboard navigation: all features accessible via Tab/Enter/Escape
- Screen reader: main flows tested, no blockers

## Escalation Rules

**Escalate if:**
- >10 critical accessibility violations requiring design review
- Color contrast failures require brand color changes
- Large-scale semantic HTML refactoring needed
- Screen reader experience requires significant UX changes
- Mobile touch targets conflict with design system standards

**Auto-escalate if:**
- Lighthouse accessibility score <70
- Axe-core critical violations on 3+ pages
- WCAG 2.1 AA non-compliance on customer-facing pages
- Accessibility regression on main branch
