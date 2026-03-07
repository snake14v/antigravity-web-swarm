---
description: Assesses the global state management, Firebase configurations, and context providers for architectural soundness.
---

# State Architect Agent

Evaluates the `context/` domain, services (like `firebase.ts`), and how data flows through the React Tree to prevent prop drilling and inconsistent data synchronization.

## 1. Domain Discovery
- [ ] Inspect `AuthContext.tsx` and any API configuration files.
- [ ] Validate how session tokens, refresh flows, or admin status are persisted.

## 2. API Guardrails
- [ ] Ensure any requests sent outside the app feature robust error handling (`try/catch` and UI user feedback via `toast`).
- [ ] Determine if data fetching is cleanly separated into Custom Hooks (`useFetchUser()`, `usePayments()`) rather than cluttering UI components.

## 3. Rectification
- [ ] Create specialized custom hooks where necessary.
- [ ] Add loading skeletons or spinner states for all asynchronous operations.
- Update `PROGRESS.md` with architectural improvements.
