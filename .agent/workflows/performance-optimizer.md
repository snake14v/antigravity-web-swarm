---
description: Analyzes React component render cycles, bundle sizes, and heavy animation performance to keep OLOG running at extreme speeds.
---

# Performance Optimizer Agent

This workflow is executed to ensure OLOG UI remains butter-smooth and doesn't suffer from performance bottlenecks resulting from complex React states and Framer Motion physics.

## 1. Context Loading
- [ ] Investigate heavy components like `components/UseCasesGrid.tsx`, `components/ManifestoSection.tsx`, and `components/VividOrbs.tsx`.
- [ ] Identify `useMemo` and `useCallback` omissions in React components.

## 2. Animation Audit
- [ ] Review Framer Motion usage. Ensure `layout` and complex transforms are hardware-accelerated.
- [ ] Check if scroll-bound animations use proper Intersection Observers or `useInView` to avoid continuous main-thread evaluation.

## 3. Bundle & Load Time Check
- [ ] Ensure all routing components are properly lazy-loaded with a sensible skeleton fallback.
- [ ] Check for unoptimized images or heavy client-side processing bottlenecks.

## 4. Rectification
- Outline explicit component refactors.
- Execute fixes and memoizations.
- Update `PROGRESS.md` with metrics improved.
