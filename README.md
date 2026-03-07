# Antigravity Web Builder Swarm 🚀

A modular collection of generic web-building AI Agents designed to snap directly into the **Antigravity Agent Manager**. These agents are completely agnostic and transferable across any frontend architecture (React, Next.js, Vite, Vue).

## Included Agents

1. **🪄 Wizard Architect** (`/wizard-architect`) - Builds state-driven, multi-step sequences.
2. **🎬 Animation Choreographer** (`/animation-choreographer`) - Designs high-framerate `framer-motion` timelines.
3. **🔍 SEO Optimizer** (`/seo-optimizer`) - Enforces semantic HTML, meta routing, and JSON-LD structure.
4. **✍️ Copywriter** (`/copywriter-agent`) - Generates A/B ready, high-conversion microcopy.
5. **📚 Component Librarian** (`/component-librarian`) - Abstracts DOM noise into clean, reusable generic components.
6. **⚖️ Accessibility Auditor** (`/accessibility-auditor`) - Adds ARIA bindings and manages focus-states for WCAG 2.1 compliance.
7. **📱 Responsive Scaler** (`/responsive-scaler`) - Transforms static bounds into fluid flex/grid constraints for mobile-first views.
8. **🐙 GitHub Agent** (`/github-agent`) - GitHub repository health agent to ensure repo organization and CI/CD setup.
9. **📖 Docs Handler** (`/docs-handler`) - Final documentation sweep ensuring docs stay consistent across sweeps.
10. **♾️ Jules Meta Loop** (`/jules-meta-loop`) - Executes the recursive four-phase maintenance sweep.
11. **🚀 Onboarding** (`/onboarding`) - Validates the environment and prints architecture overviews for new human developers.
12. **🏗️ Architectural Synchronizer** (`/architectural-synchronizer`) - Ensures integration alignment across the entire solution space.
13. **🔥 Firebase Architect** (`/firebase-architect`) - Evaluates Firestore rules, schema definitions, and read-write costs.
14. **🔌 Firmware Bridge** (`/firmware-bridge`) - Synchronizes RTOS/IoT binary payloads and schema mapping back to Web frontends.
15. **🧊 3D Scene Optimizer** (`/3d-scene-optimizer`) - Maximizes WebGL and Three.js framerates for integrated 3D configuration models.
16. **🛡️ Security Auditor** (`/security-auditor`) - Scans for API secrets, XSS hooks, and proper token configurations.
17. **🧪 Test Engineer** (`/test-engineer`) - Generates robust integration, unit, and end-to-end testing layers.

## Installation

Run this command in the root of *any* Antigravity project to instantly port these agents into your local workspace:

### Windows (PowerShell)
```powershell
iwr https://raw.githubusercontent.com/snake14v/antigravity-web-swarm/main/install.ps1 -UseBasicParsing | iex
```

### Manual Install
Simply copy the contents of the `.agent/workflows` folder directly into your new project's `.agent/workflows` folder. Antigravity will auto-detect them as slash commands.
