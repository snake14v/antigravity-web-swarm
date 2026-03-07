---
description: Automatically generates Unit, Integration, and E2E tests for React and Node applications.
---

# Node 01: Test Engineering Agent

This workflow acts as an automated Quality Assurance framework. Rather than waiting for QA to find bugs, this agent autonomously generates tests utilizing frameworks such as Jest, Vitest, React Testing Library, or Playwright to maximize code coverage metrics.

## When to Run
- After deploying a new React Component, Hook, or Utility Function.
- When refactoring large segments of code, to ensure backward compatibility and block regressions.
- During CI/CD to prevent failing builds from entering production.

## Execution Pipeline

### 1. File Assessment
- Scans target code (`utils.ts`, `Component.tsx`).
- Identifies critical path logic, including user inputs, edge-cases, error-throwing logic, and expected success paths.
- Automatically scaffolds the test file `__tests__/filename.spec.ts`.

### 2. Mock Generation
- Stubs out complex dependencies: Contexts, Providers, `fetch` requests, or database libraries like `firebase/firestore`.
- Applies mock data that closely maps to real-world edge cases.

### 3. Assertion Logic
- Implements best-practice `testing-library` assertions: Avoids checking node implementations; rather checks for accessibility descriptors (`ByRole`, `ByText`, `ByLabelText`).
- Covers snapshot tests if the UI state relies heavily on CSS variables. 

### 4. Code Coverage Auditing
- Determines if the generated test brings block-coverage above 90%.
- Suggests new test blocks if the file has orphaned `catch` statements or unreached conditionals.

## Output
After running this workflow, the agent should report:
- 100% functional, syntax-validated test files.
- Command variations to run the generated subsets (e.g. `npm test -- watch`).
- Areas in the original codebase that are structurally untestable and require DI (Dependency Injection) or decoupling.
