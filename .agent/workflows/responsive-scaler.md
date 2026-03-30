---
name: "Responsive Scaler"
description: "Mobile-first Tailwind breakpoints (sm/md/lg/xl), touch target sizes (44px min), bottom navigation on mobile, viewport scaling, no horizontal scroll"
version: "1.0"
triggers:
  - "mobile layout broken"
  - "touch target <44px"
  - "horizontal scroll detected"
  - "manual: /audit-responsive"
escalates_to: "Design System Agent"
---

## When to Run

- **Mobile layouts broken** on iOS/Android devices or browser emulation
- **Touch targets <44px** detected (WCAG 2.5.5 minimum)
- **Horizontal scroll** appears on mobile (major UX issue)
- **Tablet/landscape** orientations have layout issues
- **Viewport meta tag missing** or configured incorrectly
- **New responsive feature** added to app
- **Scheduled monthly** on device orientation changes
- Manual trigger: before mobile app release

## Memory Protocol

**Read First:**
- `CLAUDE.md` (mobile-first strategy, breakpoint naming)
- `tailwind.config.ts` (breakpoints: sm, md, lg, xl, 2xl)
- `src/index.css` or global styles (viewport meta, base responsive rules)
- Component library for responsive patterns
- `/reports/responsive/` for previous audit results
- Device breakpoints: mobile 375px, tablet 768px, desktop 1024px+

**Update After:**
- Create `RESPONSIVE_AUDIT_[timestamp].md` with findings
- Update `tailwind.config.ts` if breakpoints adjusted
- Update responsive component patterns in storybook/docs
- Commit mobile-first fixes with `mobile: ` prefix
- Test on real iOS/Android devices
- Update `/docs/RESPONSIVE_DESIGN.md` with new patterns

## Execution Pipeline

### Phase 1: Viewport Configuration (5 mins)

1. **Check viewport meta tag**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
   ```
   - Verify: width=device-width (not fixed pixel width)
   - Verify: initial-scale=1 (no zoom=no)
   - Verify: viewport-fit=cover (for notch support on iPhone)
   - Flag: any user-scalable=no (accessibility violation)

2. **Check responsive base styles**
   ```css
   html {
     font-size: clamp(14px, 2vw, 16px); /* Responsive font scaling */
   }
   body {
     overflow-x: hidden; /* Prevent horizontal scroll */
   }
   ```
   - Verify: no fixed font sizes (use rem, em)
   - Verify: no forced widths that cause overflow
   - Verify: padding/margin scales with screen size

3. **Test viewport on devices**
   - Mobile (iPhone SE): 375×667px
   - Mobile landscape (iPhone): 812×375px
   - Tablet (iPad): 768×1024px
   - Tablet landscape: 1024×768px
   - Desktop: 1280×800px+

### Phase 2: Tailwind Breakpoint Audit (8 mins)

1. **Verify breakpoint definitions**
   ```javascript
   // tailwind.config.ts
   module.exports = {
     theme: {
       screens: {
         'sm': '640px',   // Phones: 640px and up
         'md': '768px',   // Tablets: 768px and up
         'lg': '1024px',  // Desktops: 1024px and up
         'xl': '1280px',  // Wide screens: 1280px and up
         '2xl': '1536px', // Ultra-wide: 1536px and up
       },
     },
   };
   ```
   - Breakpoints should align with device ranges
   - sm: phones, md: tablets, lg: desktops

2. **Audit responsive utilities usage**
   - Classes like `md:flex`, `lg:grid`, `hidden md:block`
   - Verify mobile-first approach: base styles for mobile, then override
   - Example (mobile-first):
   ```jsx
   <div className="flex flex-col md:flex-row">
     {/* Mobile: column, tablet+: row */}
   </div>
   <button className="text-sm md:text-base lg:text-lg">
     {/* Responsive text size */}
   </button>
   ```

3. **Check for mobile-first patterns**
   - Mobile classes first (no prefix): `flex`, `p-4`
   - Tablet overrides: `md:grid`, `md:p-6`
   - Desktop changes: `lg:flex-row`, `lg:justify-between`
   - Flag: desktop-first patterns (wrong approach)

### Phase 3: Touch Target & Spacing Audit (10 mins)

1. **Validate minimum touch target sizes**
   - Buttons, links, form inputs: minimum 44×44px
   - Spacing between targets: at least 6mm (about 20px)
   - Test with Chrome DevTools: emulate touch, hover effects
   ```
   Tailwind classes for 44px targets:
   h-11 (44px), w-11 (44px), p-3 (12px)
   ```

2. **Measure actual touch targets**
   - Buttons: inspect computed width/height
   - Links: check padding around text
   - Form fields: min 44px height
   - Icons: icon itself may be small, but clickable area must be 44px
   - Flag: targets <40px (too small)

3. **Check spacing between interactive elements**
   - Buttons in lists: vertical spacing ≥8px between items
   - Horizontal buttons: ≥8px spacing to prevent accidental taps
   - Navigation items: 44px minimum height each
   ```jsx
   <div className="space-y-2 md:space-y-3">
     {/* Items have gap that prevents accidental taps */}
   </div>
   ```

### Phase 4: Mobile Navigation Patterns (8 mins)

1. **Validate bottom navigation on mobile**
   - Bottom nav appears only on small screens: `fixed bottom-0 md:hidden`
   - Height: 60-72px (standard mobile nav)
   - Items: 3-5 primary actions, no overflow
   - Safe from notch: padding-bottom for notch height
   ```jsx
   <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t">
     {/* Mobile nav here */}
   </nav>
   <main className="pb-20 md:pb-0">
     {/* Content with bottom padding on mobile */}
   </main>
   ```

2. **Check top navigation responsiveness**
   - Desktop: horizontal menu
   - Mobile: hamburger menu or collapse
   - Pattern: `hidden md:flex` for desktop nav, `md:hidden` for mobile
   - Verify: menu doesn't overlap content

3. **Test overflow behavior**
   - No horizontal scroll at any viewport
   - Content scales to fit width
   - Images responsive: `max-w-full h-auto`
   - Long text wraps: no white-space: nowrap unless intentional

### Phase 5: Responsive Image & Media (8 mins)

1. **Validate image responsiveness**
   ```jsx
   <img
     src="image.jpg"
     srcSet="image-sm.jpg 375w, image-md.jpg 768w, image-lg.jpg 1024w"
     alt="Description"
     className="w-full h-auto object-cover"
   />
   ```
   - All images: `max-w-full h-auto` to prevent overflow
   - Below-fold images: `loading="lazy"`
   - Responsive images: srcSet or picture element

2. **Check video/iframe responsiveness**
   ```jsx
   <div className="relative w-full aspect-video">
     <iframe
       className="absolute inset-0 w-full h-full"
       src="https://example.com/video"
     />
   </div>
   ```
   - Videos should not overflow
   - Aspect ratio maintained on all screens

3. **Validate SVG scaling**
   - SVGs: `w-full h-auto` or fixed aspect ratio
   - Icons: scale appropriately on mobile vs desktop
   - Text in SVGs: readable on small screens

### Phase 6: Cross-Device Testing (12 mins)

1. **Test on actual devices** (if available)
   - iPhone SE (375px): smallest common screen
   - iPhone 12/13 (390px): standard phone
   - iPad (768px): tablet landscape and portrait
   - Pixel/Android (375px): Android phone
   - Desktop browser (1280px+)

2. **Test orientations**
   - Portrait (default)
   - Landscape (often forgotten)
   - Rotate device, verify layout adapts
   - Check: no layout shift when rotating

3. **Browser DevTools testing**
   ```
   Chrome DevTools > Device toolbar
   - iPhone SE 375px × 667px
   - iPad 768px × 1024px
   - Responsive (drag to test any width)
   ```
   - Test at every breakpoint
   - Check: elements don't overlap
   - Verify: text readable at all sizes

### Phase 7: Responsive Performance (6 mins)

1. **Check CSS media queries**
   - Verify: media queries are correct breakpoints
   - No redundant rules at same breakpoint
   - Minified CSS output

2. **Test font scaling**
   - Use `clamp()` for responsive font sizes:
   ```css
   h1 { font-size: clamp(24px, 5vw, 48px); }
   p { font-size: clamp(14px, 2vw, 16px); }
   ```
   - Scales smoothly between breakpoints
   - Readable at all viewport sizes

3. **Verify no horizontal scroll**
   - Use Chrome DevTools: emulate pixel-perfect (375px width)
   - Scroll horizontally: page should never scroll right
   - Flag: any content cutoff on mobile

## Output Section

**Deliverables:**
1. **Responsive Audit Report** (`RESPONSIVE_AUDIT_[timestamp].md`)
   - Viewport meta tag validation
   - Breakpoint audit: current config vs. device ranges
   - Mobile-first pattern assessment
   - Touch target analysis: sizes and spacing
   - Mobile navigation validation
   - Image/media responsiveness
   - Cross-device test results: devices tested, issues found
   - Orientation test results
   - Performance notes (CSS, font scaling)

2. **Device Test Matrix**
   ```
   Device              | Portrait | Landscape | Issues
   iPhone SE 375px     | Pass     | Pass      | -
   iPhone 12 390px     | Pass     | Pass      | -
   iPad 768px          | Pass     | Pass      | -
   Pixel Android 375px | Pass     | Pass      | -
   Desktop 1280px      | Pass     | Pass      | -
   ```

3. **Code Changes** (if issues found)
   - Update Tailwind responsive classes
   - Fix touch target sizes
   - Add responsive images with srcSet
   - Adjust spacing for touch safety
   - Fix horizontal scroll issues

**Success Criteria:**
- No horizontal scroll at any viewport
- Touch targets: minimum 44×44px
- Mobile-first Tailwind classes
- All breakpoints (sm, md, lg, xl) working
- Images responsive and optimized
- Navigation adapts to viewport
- Tested on 5+ device sizes

## Escalation Rules

**Escalate if:**
- Layout cannot be made responsive with CSS alone
- Design requires different structure at different viewports (redesign)
- Performance degradation from responsive media queries
- Touch targets conflict with design system
- Complex responsive data tables or grids

**Auto-escalate if:**
- Horizontal scroll present on mobile
- Touch targets <40px on 3+ elements
- Viewport meta tag misconfigured
- Images break at any breakpoint
- Layout breaks on landscape orientation
