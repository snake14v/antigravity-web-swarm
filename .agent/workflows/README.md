# OLOG Agent Workflows

Production-grade agent playbook files for the Ooru Logix (OLOG) platform. Each workflow is a comprehensive guide for AI agents and team members to execute critical quality assurance, performance, and architectural tasks.

## Quick Links

### Core Workflows (11 Total)

| # | Workflow | Triggers | Escalates To |
|---|----------|----------|--------------|
| 1 | [Performance Optimizer](./performance-optimizer.md) | Bundle >15%, Lighthouse <80, commits to src/ | Architecture Review Agent |
| 2 | [Accessibility Auditor](./accessibility-auditor.md) | axe-core violations, contrast <4.5:1, keyboard broken | Design System Agent |
| 3 | [SEO Optimizer](./seo-optimizer.md) | SEO score drops, GSC errors, new content | Content Strategist |
| 4 | [Test Engineer](./test-engineer.md) | Coverage <80%, PR opened, manual trigger | QA Lead |
| 5 | [State Architect](./state-architect.md) | Re-render cascade, context splitting needed | Architecture Review Agent |
| 6 | [Responsive Scaler](./responsive-scaler.md) | Mobile layout broken, touch target <44px | Design System Agent |
| 7 | [Animation Choreographer](./animation-choreographer.md) | Animation jank, slow transitions | Design System Agent |
| 8 | [Component Librarian](./component-librarian.md) | Duplicate components, design token mismatches | Design System Lead |
| 9 | [Wizard Architect](./wizard-architect.md) | Multi-step form created, state lost, validation broken | Product Designer |
| 10 | [User Flow Logic](./user-flow-logic.md) | Navigation dead ends, broken CTAs, 404s | Product Designer |
| 11 | [Architectural Synchronizer](./architectural-synchronizer.md) | Type mismatches, Firebase schema changed, Pi API updated | Tech Lead |

---

## Workflow Structure

Every workflow includes:

```
FRONTMATTER (YAML)
├── name: Agent role name
├── description: Focus area (80-150 chars)
├── version: Semantic version
├── triggers: Event-based execution
└── escalates_to: Senior contact

WHEN TO RUN
└── Specific trigger conditions & scheduling

MEMORY PROTOCOL
├── Read First (context loading)
└── Update After (persistent state)

EXECUTION PIPELINE
├── Phase 1: Discovery/Audit (analysis)
├── Phase 2: Validation (checks)
├── Phase 3-6+: Implementation/Fixes
└── Final: Reporting

OUTPUT SECTION
├── Deliverables (files created)
├── Success Criteria (metrics)
└── Escalation Rules (when to escalate)
```

---

## Getting Started

### For Manual Execution
1. Select workflow by domain (performance, accessibility, etc.)
2. Read "When to Run" section to confirm trigger conditions
3. Follow "Memory Protocol" to load context
4. Execute numbered phases in "Execution Pipeline"
5. Output deliverables to locations specified in "Output Section"
6. Check success criteria and escalate if needed

### For CI/CD Integration
1. Use `triggers` field to wire up GitHub Actions / webhooks
2. Workflow execution happens automatically on condition
3. Check "Output Section" for where results are written
4. Use "Escalation Rules" for auto-escalation decisions

### For Team Training
1. Assign team members to workflow domains
2. Each team member becomes domain expert for their 1-2 workflows
3. Weekly/monthly scheduled executions (see "When to Run" schedules)
4. Escalation chain ensures senior review of critical issues

---

## Workflow Details

### 1. Performance Optimizer (React/Vite/CSS)
Measures and optimizes React render cycles, Vite bundle sizes, Framer Motion animation performance, and Tailwind CSS output.

**Run When:**
- Bundle size increases >15% on commits
- Lighthouse Performance score drops below 80
- Core Web Vitals exceed thresholds
- React DevTools shows excessive re-renders

**Deliverables:**
- `PERFORMANCE_AUDIT_[timestamp].md` report
- `reports/performance/benchmarks.json` metrics
- Optimization commits with `perf: ` prefix

**Success:** Lighthouse ≥80, Bundle <200KB gzipped, 60 FPS animations

---

### 2. Accessibility Auditor (WCAG 2.1 AA)
Validates WCAG 2.1 AA compliance across all pages: ARIA labels, keyboard navigation, color contrast (4.5:1), focus management, screen reader support.

**Run When:**
- axe-core violations detected
- Color contrast below 4.5:1 on any text
- Keyboard navigation broken in user flows
- Screen reader testing fails

**Deliverables:**
- `ACCESSIBILITY_AUDIT_[timestamp].md` report
- `reports/accessibility/axe-report.json` scan results
- ARIA label and semantic HTML fixes

**Success:** Axe-core 0 violations, Lighthouse a11y ≥90, 4.5:1 contrast

---

### 3. SEO Optimizer (React SPA SEO)
Optimizes React SPA for search engines: title tags, meta descriptions, Open Graph, Twitter cards, structured data, Core Web Vitals.

**Run When:**
- Lighthouse SEO score <90
- Google Search Console reports errors
- New pages/routes added
- Meta tags need updates

**Deliverables:**
- `SEO_AUDIT_[timestamp].md` report
- Updated `sitemap.xml` and `robots.txt`
- JSON-LD structured data
- Meta tag configuration

**Success:** Lighthouse SEO ≥90, Core Web Vitals green, unique meta on all pages

---

### 4. Test Engineer (Vitest + RTL + Playwright)
Creates comprehensive test coverage: unit tests, integration tests with Firebase, E2E tests with Playwright.

**Run When:**
- Test coverage drops below 80%
- Pull request opens (auto-run in CI)
- Main branch commits
- Dependencies upgraded

**Deliverables:**
- `TEST_REPORT_[timestamp].md` report
- `reports/coverage/coverage.json` metrics
- New unit, integration, and E2E tests
- GitHub Actions CI workflow

**Success:** Coverage ≥80%, test suite <30s, E2E all pass

---

### 5. State Architect (React Context + Firebase)
Audits global state management: Context API organization, useReducer patterns, Firebase real-time sync, re-render cascades.

**Run When:**
- Re-render cascades detected
- New global state added without split strategy
- Firebase listeners added to Context
- Quarterly architecture review

**Deliverables:**
- `STATE_AUDIT_[timestamp].md` report
- Context splitting refactors with `refactor: ` commits
- Firebase listener cleanup fixes
- Updated `/docs/STATE_MANAGEMENT.md`

**Success:** No re-render cascades, memoized contexts, Firebase cleanup

---

### 6. Responsive Scaler (Mobile-First Design)
Validates mobile-first responsive design: Tailwind breakpoints, touch target sizes (44px), viewport configuration, orientation handling.

**Run When:**
- Mobile layouts broken
- Touch targets <44px detected
- Horizontal scroll appears
- New responsive feature added

**Deliverables:**
- `RESPONSIVE_AUDIT_[timestamp].md` report
- Device test matrix (5+ devices tested)
- Responsive class fixes with `mobile: ` prefix
- Updated breakpoint documentation

**Success:** No horizontal scroll, 44px targets, mobile-first Tailwind, 5+ devices

---

### 7. Animation Choreographer (Framer Motion)
Optimizes animations: Framer Motion variants, layout animations, scroll-based animations, reduced-motion compliance, 60 FPS target.

**Run When:**
- Animation jank detected (frames <60 FPS)
- Page transitions slow (>300ms)
- Reduced-motion not implemented
- New animated feature added

**Deliverables:**
- `ANIMATION_AUDIT_[timestamp].md` report
- Performance recordings from Chrome DevTools
- Optimized `src/motion/variants.ts`
- Reduced-motion hook utilities

**Success:** 60 FPS all animations, <300ms transitions, reduced-motion active

---

### 8. Component Librarian (Design System)
Builds design system: extract reusable components, enforce design tokens, variant APIs using cva(), Storybook documentation.

**Run When:**
- Duplicate components detected
- Design token inconsistencies found
- No variant API on components
- Component documentation missing

**Deliverables:**
- `COMPONENT_LIBRARY_AUDIT_[timestamp].md` report
- Extracted components in `src/components/`
- Component types in `Component.types.ts`
- Storybook stories for all components
- Updated `/docs/COMPONENT_API.md`

**Success:** Zero duplicates, all typed, cva() variants, Storybook stories

---

### 9. Wizard Architect (Multi-Step Forms)
Designs robust wizards: step flows, validation, state persistence, progress indicators, ShopSense onboarding patterns.

**Run When:**
- Multi-step form/wizard created
- Wizard state lost on page reload
- Step validation broken
- Mobile wizard UX poor

**Deliverables:**
- `WIZARD_AUDIT_[timestamp].md` report
- Reusable `WizardContainer` component
- Custom `useWizardForm` hook
- Wizard stories in Storybook
- Updated `/docs/WIZARD_PATTERNS.md`

**Success:** State persists, validation works, mobile-optimized, analytics tracking

---

### 10. User Flow Logic (Navigation + UX)
Audits user journeys: navigation dead ends, CTA link validation, empty states, error handling, flow completion.

**Run When:**
- Navigation dead ends detected
- Broken CTA links found
- 404 pages unhandled
- New feature/page added

**Deliverables:**
- `USER_FLOW_AUDIT_[timestamp].md` report
- Navigation graph diagram
- Fixed 404/error pages
- Empty state components
- Analytics funnel tracking setup

**Success:** No dead-end pages, all CTAs valid, empty/error states on all pages

---

### 11. Architectural Synchronizer (TypeScript + Firebase)
Synchronizes architecture: TypeScript types shared across modules, API contracts between components/services, Firebase schema consistency.

**Run When:**
- Type mismatches between modules detected
- Firebase schema changed
- ShopSense Pi API updated
- New data model added

**Deliverables:**
- `ARCHITECTURE_SYNC_[timestamp].md` report
- Consolidated `src/types/` folder
- Firebase schema type definitions
- ShopSense Pi data contract
- Updated `/docs/ARCHITECTURE.md`

**Success:** No type duplication, Firebase types match schema, no `any` types

---

## Tech Stack

- **Frontend:** React 19 + Vite 5 + TailwindCSS 4 + Framer Motion
- **Backend:** Firebase (Firestore + Realtime DB)
- **Testing:** Vitest + React Testing Library + Playwright
- **DevTools:** Lighthouse CI, axe-core, Chrome DevTools
- **Integration:** ShopSense Pi (YOLO v5/v8 edge AI)
- **Brand:** Cyber-Industrial (dark, glassmorphism, cyan/orange)

---

## Execution Mode

### Automated (CI/CD)
- GitHub Actions triggers workflows on events
- Scheduled daily/weekly/monthly runs
- Results posted to PR comments or issue updates
- Auto-escalation on critical failures

### Manual
- Team members invoke via `/optimize-performance`, `/audit-accessibility`, etc.
- On-demand execution for specific domains
- Results committed to repository
- Escalation via issue assignment

### Hybrid
- Scheduled baseline runs
- Manual deep-dives when triggered
- Escalation chain for critical issues
- Team review of recommendations

---

## Escalation Chain

```
Issue Detected
↓
Workflow executes (6-8 phases)
↓
Success? → Commit changes, close
↓ No
Escalation Rule Met? → Yes → Escalate
↓ No
Retry phase → Max 3 attempts
↓ Still Failing
Auto-escalate → Tech Lead review
```

---

## Metrics Dashboard

Track across all 11 workflows:
- Performance: Lighthouse ≥80, bundle <200KB
- Accessibility: Axe 0 violations, contrast 4.5:1
- Tests: Coverage ≥80%, suite <30s
- Design: No duplicate components, all typed
- UX: No dead-end pages, all CTAs valid
- Architecture: No type mismatches, Firebase synced

---

## Support & Documentation

- Each workflow has built-in documentation
- See "Memory Protocol" for context loading
- Check "Output Section" for result locations
- Review "Escalation Rules" for senior contact info
- Update `/docs/` after each workflow execution

---

## Version History

- **v1.0** (2026-03-29): Initial release, all 11 workflows production-ready

---

**Last Updated:** 2026-03-29
**Total Workflows:** 11
**Total Lines:** 3,521
**Status:** Production-Ready
