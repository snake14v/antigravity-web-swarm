---
description: Automatically evaluates the user journey, ensuring buttons, navigation links, and call-to-actions logically guide the user through the application without dead ends or confusing states.
---

# User Flow Logic Agent

This workflow validates that all interactive UI elements trigger correct business logic, routing, or state changes. It prevents dead-ends ("buttons that do nothing") and ensures clear user navigation.

## 1. Context Loading
- [ ] Scan over `App.tsx` and map out all defined API hooks and `<Route>` mappings.
- [ ] Investigate major interactive sections: `Navbar.tsx`, `Footer.tsx`, `BottomNav.tsx`, and CTAs on `Home.tsx` / `AdminDashboard.tsx`.

## 2. Interaction Audit
- [ ] Check every `<button>` and `<Link>` element across the codebase.
- [ ] Do Buttons have an `onClick` or `type="submit"`? 
- [ ] If a button submits a form or triggers an async function, does it have a visually distinct `disabled` or "loading" state?
- [ ] Verify that protected actions (e.g., viewing admin panels, modifying data) appropriately redirect unauthorized users rather than failing silently.

## 3. Rectification
- [ ] Wire up dead buttons to real functions or logical placeholders (e.g., `toast('Feature coming soon')`).
- [ ] Implement `aria-label` or role semantic tags for complex custom buttons to ensure accessibility.
- [ ] Update `PROGRESS.md` after the interaction map is fully secured.
