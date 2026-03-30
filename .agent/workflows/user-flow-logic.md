---
name: "User Flow Logic"
description: "Navigation dead ends audit, CTA link validation, empty states, error state flows, loading states, redirect chains, 404 handling"
version: "1.0"
triggers:
  - "navigation dead end detected"
  - "broken CTA link found"
  - "404 error unhandled"
  - "manual: /audit-user-flows"
escalates_to: "Product Designer"
---

## When to Run

- **Dead-end pages** detected (no way forward/back navigation)
- **Broken CTA links** found (404s, redirects)
- **404 pages unhandled** (user stuck)
- **Empty states missing** (no guidance when no data)
- **Error states incomplete** (no recovery path)
- **Redirect chains** (3+ redirects before landing)
- **New feature/page added** without flow validation
- **Scheduled monthly** for user journey audit
- Manual trigger: before public releases or new onboarding

## Memory Protocol

**Read First:**
- `CLAUDE.md` (app navigation structure, happy paths)
- Router configuration: `src/Router.tsx` or `src/routes.ts`
- All pages/components in `src/pages/`
- Empty state and error state components
- `/docs/USER_FLOWS.md` (if exists)
- `/reports/flows/` for previous audit results
- Google Analytics: common exit pages, drop-off points
- Figma: user journey maps or flow diagrams

**Update After:**
- Create `USER_FLOW_AUDIT_[timestamp].md` with dead-end analysis
- Fix navigation issues: add back buttons, breadcrumbs, etc.
- Create/update empty state components
- Update error pages (404, 500)
- Commit with `flow: ` prefix
- Document flows in `/docs/USER_FLOWS.md`

## Execution Pipeline

### Phase 1: Navigation Graph Mapping (10 mins)

1. **Document all routes**
   ```bash
   grep -r "path:" src/routes.ts --include="*.ts" | sort
   ```
   - List all pages: `/`, `/dashboard`, `/settings`, `/404`, etc.
   - Note: public vs. protected routes
   - Note: dynamic routes (e.g., `/device/:id`)

2. **Build navigation graph**
   ```
   / (home)
   ├── /dashboard (protected, requires auth)
   │   ├── /device/:id (view device)
   │   │   ├── /device/:id/settings (configure)
   │   │   └── /device/:id/logs (view logs)
   │   └── /devices (device list)
   ├── /onboarding (new user flow)
   │   └── /onboarding/:step
   ├── /settings (protected)
   │   ├── /settings/account
   │   ├── /settings/appearance
   │   └── /settings/billing
   ├── /login (public)
   └── /404 (catch-all)
   ```

3. **Identify navigation destinations**
   - From each page: what pages are reachable?
   - Buttons, links, navigation menu
   - Manual navigation: back button, breadcrumbs
   - Redirect chains: what happens after login?

### Phase 2: Dead-End Detection (8 mins)

1. **Find pages with no forward navigation**
   - Check: every page has either:
     - A "next" button or CTA to another page, OR
     - It's a final destination (confirmation, error recovery)
   - Example dead-ends:
   ```
   /device/:id/details → no way to go to settings, logs, or back
   /onboarding/:step → last step, but no "done" button
   /settings → no way to save or back to dashboard
   ```

2. **Check back navigation**
   - Every page except home should have back button
   - Pattern: use `<Link to={-1}>` or browser back
   - Better: breadcrumbs showing path taken
   - Mobile: hamburger back button accessible

3. **Audit redirect chains**
   ```bash
   # Check for redirect chains
   /login → /auth/verify → /auth/password → /dashboard
   # More than 2 redirects is excessive
   ```
   - Measure: each redirect adds ~100-300ms
   - Fix: direct to final destination if possible
   - Log redirects for troubleshooting

### Phase 3: CTA & Link Validation (10 mins)

1. **Find all clickable CTAs**
   ```bash
   grep -r "onClick\|href\|to=" src/components --include="*.tsx" | grep -i "button\|link\|click"
   ```
   - Document: every button and where it leads
   - Check: does link exist and is not broken
   - Test: manually click each CTA

2. **Validate link destinations**
   - Links point to existing routes (not 404)
   - External links have `target="_blank" rel="noopener noreferrer"`
   - Email links: `mailto:support@example.com`
   - Phone links: `tel:+1234567890`

3. **Check CTA accessibility**
   - Button text is descriptive: not "click here", but "View Details"
   - Icon buttons have `aria-label="action"`
   - All CTAs are keyboard accessible (Tab, Enter)
   - Focus indicator visible on buttons

### Phase 4: Empty States & Error States (10 mins)

1. **Identify empty state scenarios**
   ```typescript
   // Examples of empty states
   - Device list page with no devices
   - Search results with no matches
   - Notifications with no new notifications
   - Device logs with no recent activity
   - First-time user: empty dashboard
   ```

2. **Design empty state UI**
   ```tsx
   <div className="flex flex-col items-center justify-center py-20 text-center">
     <EmptyStateIcon className="w-16 h-16 mb-4 text-gray-400" />
     <h2 className="text-xl font-semibold text-gray-700 mb-2">
       No Devices Yet
     </h2>
     <p className="text-gray-500 mb-6">
       Get started by adding your first ShopSense device
     </p>
     <Button onClick={() => navigate('/onboarding')}>
       Add Device
     </Button>
   </div>
   ```
   - Icon: visual representation of empty state
   - Heading: explain what's empty
   - Description: why it's empty, when they'll see data
   - CTA: what to do next

3. **Design error state UI**
   ```tsx
   <div className="flex flex-col items-center justify-center py-20 text-center">
     <ErrorIcon className="w-16 h-16 mb-4 text-red-500" />
     <h2 className="text-xl font-semibold text-gray-700 mb-2">
       Device Connection Failed
     </h2>
     <p className="text-gray-500 mb-6">
       Cannot connect to device. Check power and network connection.
     </p>
     <div className="flex gap-3">
       <Button variant="secondary" onClick={handleRetry}>
         Retry
       </Button>
       <Button onClick={() => navigate('/help/device-troubleshooting')}>
         Need Help?
       </Button>
     </div>
   </div>
   ```
   - Error icon: red visual indicator
   - Clear message: what went wrong (not technical)
   - Recovery: action to fix (retry, troubleshoot, contact support)
   - Optional: link to help docs

4. **Loading states**
   - Show skeleton screens while data loads
   - Prevent interaction while loading
   - Show progress for long operations (upload, import)
   - Cancel button for long-running operations

### Phase 5: Error Page Handling (8 mins)

1. **Create comprehensive error pages**
   ```typescript
   // 404 Not Found
   <ErrorPage
     code="404"
     title="Page Not Found"
     description="The page you're looking for doesn't exist."
     actions={[
       { label: "Go Home", to: "/" },
       { label: "Back to Dashboard", to: "/dashboard" },
     ]}
   />

   // 403 Access Denied
   <ErrorPage
     code="403"
     title="Access Denied"
     description="You don't have permission to view this page."
     actions={[
       { label: "Go Home", to: "/" },
       { label: "Contact Support", href: "mailto:support@example.com" },
     ]}
   />

   // 500 Server Error
   <ErrorPage
     code="500"
     title="Server Error"
     description="Something went wrong. Our team has been notified."
     actions={[
       { label: "Retry", onClick: handleRetry },
       { label: "Go Home", to: "/" },
     ]}
   />
   ```

2. **Handle common errors**
   - 404: page not found
   - 403: unauthorized (no permission)
   - 401: unauthenticated (must login)
   - 500: server error
   - Network: offline, timeout
   - Validation: form errors

3. **Recovery options**
   - Provide actions on every error page
   - Avoid: error pages with no way out
   - Suggest: go home, retry, contact support

### Phase 6: Complete User Journeys (12 mins)

1. **Map happy path journeys**
   ```
   New User Onboarding:
   / (home) → /login → /onboarding/email → /onboarding/password 
   → /onboarding/device-selection → /onboarding/device-setup 
   → /onboarding/review → /dashboard ✓

   Adding Device:
   /dashboard → /devices → "Add Device" button → /onboarding/device-only 
   → /onboarding/device-setup → /dashboard ✓

   Changing Settings:
   /dashboard → /settings → /settings/appearance → change theme 
   → "Save" → /dashboard ✓
   ```

2. **Map error recovery journeys**
   ```
   Failed Device Connection:
   /dashboard → click device → loading → error modal 
   → "Retry" button → loading → success OR "Need Help?" link 
   → /help/device-troubleshooting ✓

   Invalid Form Submission:
   /onboarding → fill form with invalid data → click Next 
   → validation error shows → user fixes field → click Next → proceeds ✓
   ```

3. **Test journeys end-to-end**
   - Navigate happy path: all pages load, all CTAs work
   - Test error recovery: follow error handling paths
   - Test edge cases: network offline, session timeout, permission denied

### Phase 7: Mobile Flow Testing (8 mins)

1. **Test flows on mobile**
   - Same journeys as desktop
   - Check: buttons are 44px minimum
   - Check: keyboard doesn't overlap forms
   - Check: long content doesn't cause horizontal scroll

2. **Mobile-specific navigation**
   - Hamburger menu: responsive navigation
   - Back button: accessible on small screens
   - Bottom nav: primary actions reachable
   - Modals: full-screen or bottom sheet on mobile

3. **Orientation handling**
   - Portrait: normal flow
   - Landscape: layout adaptation
   - Rotation: data persists, no state loss
   - Modal behavior: closes on landscape if modal too large

### Phase 8: Analytics & Reporting (6 mins)

1. **Track user flows**
   ```typescript
   // Log page views
   useEffect(() => {
     analytics.pageView(location.pathname);
   }, [location]);

   // Log CTA clicks
   const handleCTAClick = (target) => {
     analytics.event('cta_click', { target, current_page: location.pathname });
   };

   // Log navigation
   const handleNavigate = (destination) => {
     analytics.event('navigation', { 
       from: location.pathname, 
       to: destination 
     });
   };
   ```

2. **Identify problem areas**
   - Exit pages: where do users leave?
   - Drop-off points: which page has low progression?
   - Error rates: which error appears most?

3. **Measure flow completion**
   - % of users completing onboarding
   - % of users adding device (successful vs. abandoned)
   - Average time per flow
   - Funnel: drop-off at each step

## Output Section

**Deliverables:**
1. **User Flow Audit** (`USER_FLOW_AUDIT_[timestamp].md`)
   - Navigation graph: all pages and connections
   - Dead-end analysis: pages with no forward nav
   - CTA validation: broken links, missing destinations
   - Empty state inventory: which pages need empty states
   - Error state coverage: which errors not handled
   - Redirect chains: >2 redirects identified
   - Analytics data: exit pages, drop-off points
   - Top recommendations

2. **Fixed Navigation**
   - Back buttons added where missing
   - Breadcrumbs for complex flows
   - 404/error pages created/updated
   - Empty state components added
   - CTA links validated and fixed

3. **Documentation**
   - Updated `/docs/USER_FLOWS.md`
   - User journey diagrams
   - Error handling guide
   - Analytics event tracking setup

**Success Criteria:**
- No dead-end pages (every page has forward/back nav)
- All CTA links valid (no 404s)
- Empty states on all list/data pages
- Error pages for 404, 403, 500
- No redirect chains >2 hops
- All flows testable and completable
- Mobile flows work on 375px viewport
- Analytics tracking all key flows

## Escalation Rules

**Escalate if:**
- >10 dead-end pages requiring UX redesign
- Complex conditional flows require navigation state machine
- Error recovery paths unclear (product decision needed)
- Multiple conflicting user journey priorities
- Performance: too many error states slowing page load

**Auto-escalate if:**
- Circular navigation detected (A→B→C→A)
- Missing error pages causing crashes (500 on 404 page)
- Users getting stuck due to missing back navigation
- Redirect loops detected
