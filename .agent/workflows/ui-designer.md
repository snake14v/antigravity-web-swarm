---
description: Automatically evaluates the React/Vite codebase against the Project Theme and corrects off-brand styling or poor UX structures.
---

# UI Designer Protocol (Cyber-Industrial Enforcer)

This agent enforces the visual language of the application, defined by the "Cyber-Industrial" aesthetic logic from previous iterations (XGO3D).

## 1. Context Loading
- [ ] Read `PROJECT_MEMORY.md` to confirm the brand palette (dark mode, glassmorphism, cyan/orange accents).
- [ ] Read the current styling foundation `index.css` and `tailwind.config.ts`.
- [ ] Inspect existing JSX/TSX for utility class compliance.

## 2. Component Auditing
- Review buttons, inputs, modals, and spacing utilities.
- Are hover states defined? Are focus rings high-contrast?
- Do elements feature motion? (If Framer Motion is available, ensure layout animations exist).

## 3. Rectification
- Correct hard-coded hex colors into Tailwind CSS variables.
- Fix broken layouts (e.g., misaligned Flex, non-responsive Grids).
- Implement standard Micro-animations.

## 4. Documentation
- Once complete, add a summary table to the current active Chunk in `PROGRESS.md`.
