---
name: "Performance Optimizer"
description: "Audit React render cycles, Vite bundle analysis, Framer Motion performance, lazy loading, code splitting, and Tailwind CSS purging for the OLOG platform"
version: "1.0"
triggers:
  - "bundle size regression >15%"
  - "Lighthouse performance <80"
  - "main branch commit to src/"
  - "manual: /optimize-performance"
escalates_to: "Architecture Review Agent"
---

## When to Run

- **Bundle size increases** >15% on any commit to `src/`
- **Lighthouse scores drop** below 80 in Performance category
- **Core Web Vitals** exceed thresholds (LCP >2.5s, CLS >0.1, FID >100ms)
- **React DevTools Profiler** shows components re-rendering >1x per interaction
- **Scheduled weekly** on Monday 02:00 UTC for baseline regression testing
- Manual trigger: when developer reports performance complaints in specific workflows

## Memory Protocol

**Read First:**
- `CLAUDE.md` in repository root (tech stack, conventions)
- `vite.config.ts` (build config, rollup plugins, optimizeDeps)
- `tailwind.config.ts` (content globs, purge settings)
- `package.json` (dependency tree, dev deps)
- `.github/workflows/performance-ci.yml` if exists (baseline thresholds)
- `/reports/performance/` folder for historical benchmarks

**Update After:**
- Create `PERFORMANCE_AUDIT_[YYYYMMDD_HHmmss].md` with findings
- Update `reports/performance/benchmarks.json` with new metrics
- If optimizations applied: commit performance gains with `perf: ` prefix
- Flag regression files in issue/PR comments

## Execution Pipeline

### Phase 1: Baseline Metrics Collection (8 mins)

1. **Build for production**
   ```bash
   npm run build
   # Generates dist/ with minified, code-split assets
   ```

2. **Run Lighthouse CI**
   ```bash
   npx lighthouse-ci --chrome-flags="--headless" http://localhost:5173
   # Output to reports/lighthouse/latest.json
   # Compare Performance, Accessibility, Best Practices, SEO, PWA scores
   ```
   - Record: Performance, Accessibility, Best Practices, SEO, PWA
   - Flag any regression >5% from baseline
   - Note: target Performance ≥80

3. **Extract Core Web Vitals**
   - LCP (Largest Contentful Paint): target <2.5s
   - FID (First Input Delay): target <100ms
   - CLS (Cumulative Layout Shift): target <0.1
   - Run Lighthouse 3x, average the results

4. **Analyze bundle with Vite visualizer**
   - If `rollup-plugin-visualizer` installed: `npm run build` generates visualization
   - Open `dist/stats.html` in browser
   - Identify chunks >250KB (gzipped)
   - List top 10 heaviest dependencies with sizes

### Phase 2: React Render Cycle Audit (12 mins)

1. **Detect unnecessary re-renders**
   - In development: open React DevTools > Profiler
   - Record: click CTA, navigate routes, load data
   - Flag components re-rendering 2+ times per user gesture
   - Export profiler data as JSON for report

2. **Audit Context API usage**
   - Grep for `useContext(` across `src/`
   - For each context found:
     - Verify split by concern (not mega-context)
     - Check consumers use only 1-2 values (not entire context)
     - Verify context value wrapped in `useMemo()` to prevent reference churn
   - Document findings in audit

3. **Check React.memo effectiveness**
   - Find components receiving props from parent
   - Verify heavy/pure components wrapped in `React.memo()`
   - If memo'd, check custom comparator or rely on default shallow compare
   - Flag: memoized components defined inside parent (anti-pattern)

4. **Validate useCallback/useMemo patterns**
   - Search all files: `useCallback(`, `useMemo(`
   - For each: verify dependency array is correct
   - Flag: useMemo wrapping trivial operations (<1ms cost)
   - Flag: callbacks passed to children without useCallback

### Phase 3: Vite Bundle Optimization (10 mins)

1. **Validate code splitting strategy**
   - Verify all route pages use `lazy(() => import())`
   - Example: `const Dashboard = lazy(() => import('./pages/Dashboard'))`
   - Check each lazy boundary wrapped in `<Suspense fallback={...}>`
   - Measure: main chunk should be <150KB gzipped
   - Target: 2-4 vendor chunks <200KB each, route chunks <100KB

2. **Optimize dependencies list**
   - Run `npm ls --all` to detect duplicates
   - Review `vite.config.ts` `optimizeDeps.include` list
   - Heavy libraries (>100KB) should be pre-bundled
   - Identify and remove unused imports with ESLint
   - Check for obsolete polyfills (IE11 not required anymore)

3. **Review dynamic imports**
   - Find all top-level `import()` statements (not module-level)
   - Verify inside event handlers, route transitions, or Suspense boundaries
   - Confirm `/* webpackChunkName: "name" */` comments for debugging
   - Measure: dynamic import delay <500ms on 4G network

### Phase 4: Framer Motion Performance (8 mins)

1. **Audit animation properties**
   - List all `<motion.*>` components
   - Check `whileHover`, `whileTap`, `animate` props
   - Flag: animating `width`/`height` (use `scale` instead)
   - Flag: animating `left`/`top` (use `x`/`y` transforms instead)
   - Verify `transition` includes `duration` (default OK) and `type`

2. **Review layout animations**
   - Find `layoutId`, `layout`, `layoutDependency` usage
   - Verify only on stable DOM elements (not conditionally rendered)
   - Check no excessive re-layout thrashing (nested animated children)
   - Record: animations should maintain 60 FPS

3. **Performance testing**
   - Chrome DevTools > Performance > Recording
   - Interact with animated elements for 10s
   - Check frames don't drop below 60 FPS
   - Flag any jank or GPU memory pressure

### Phase 5: Lazy Loading & Route Splitting (10 mins)

1. **Validate route lazy loading**
   - Confirm all route-level pages lazy-loaded
   - Router-level Suspense boundary exists with loading UI
   - Check preload strategy (hover, intersection observer, etc.)
   - Measure: initial bundle before first route load

2. **Component lazy loading audit**
   - Identify heavy components: modals, charts, tables >50KB minified
   - Determine if critical path or deferred load
   - Verify lazy boundaries have Suspense fallbacks
   - Document: which components are lazy vs. eager

3. **Image optimization check**
   - Find all `<img>` tags
   - Verify below-fold images have `loading="lazy"`
   - Check responsive `srcSet` for multiple screen sizes
   - Verify WebP with JPEG fallback if using image optimization

### Phase 6: Tailwind CSS Purge Validation (6 mins)

1. **Check Tailwind content config**
   - Open `tailwind.config.ts`
   - Verify `content` includes `./src/**/*.{js,jsx,ts,tsx}`
   - Ensure globs aren't too narrow (catches all files with classes)
   - Build in production mode: `NODE_ENV=production npm run build`

2. **Measure CSS output**
   - Check final `dist/assets/*.css` size (target: <50KB gzipped)
   - If >80KB, audit for:
     - Unused utility classes in components
     - Overly broad content globs matching unrelated files
     - Custom CSS that could be replaced with Tailwind utilities

3. **Verify no unused utilities**
   - Manual spot-check: search for obscure utilities in codebase
   - Example: `hidden` class that component is never rendered
   - If using Tailwind 4+, check built-in coverage reports

## Output Section

**Deliverables:**
1. **Performance Audit Report** (`PERFORMANCE_AUDIT_[timestamp].md`)
   ```
   - Lighthouse scores before/after (if optimized)
   - Core Web Vitals metrics (LCP, FID, CLS)
   - Bundle size breakdown (main, vendors, routes)
   - Top 5 bottlenecks with fix recommendations
   - React render cycle issues with code examples
   - Framer Motion animation performance notes
   - Tailwind CSS size analysis
   ```

2. **Benchmark JSON** (`reports/performance/benchmarks.json`)
   ```json
   {
     "timestamp": "2026-03-29T10:30:00Z",
     "lighthouse": { "performance": 85, "accessibility": 92 },
     "bundle_kb": 145,
     "largest_chunks": [{ "name": "vendor.js", "size_kb": 120 }],
     "core_web_vitals": { "lcp_ms": 2100, "fid_ms": 80, "cls": 0.05 }
   }
   ```

3. **Optimization commits** (if issues found)
   - Code changes for memo/callback patterns
   - Vite config adjustments
   - Route lazy loading setup
   - Tailwind rule updates

**Success Criteria:**
- Lighthouse Performance ≥80
- Bundle <200KB gzipped total
- No re-renders >1x per interaction
- All animations 60 FPS
- CSS <50KB gzipped

## Escalation Rules

**Escalate if:**
- Bundle >250KB without removing features
- Performance fixes require cross-module refactoring
- Framer Motion redesign needed for component structure
- Lighthouse consistently <70 despite optimizations
- Circular dependencies detected in module graph

**Auto-escalate if:**
- Audit fails 3+ consecutive times
- Bundle increases >20% in single commit
- Core Web Vitals exceed thresholds 2+ consecutive days
