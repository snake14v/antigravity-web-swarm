# 🤖 AI Team Members — Ooru Logix

## Overview

At Ooru Logix, AI agents are not just tools — they are **team members** with defined roles, specializations, and accountability. This document maps each AI agent to its department, responsibilities, and the workflows it can autonomously execute.

---

## Agent Roster

### 🏗️ Engineering Department

#### Chief Architect (Claude)
- **Platform:** Anthropic Claude (via Claude Code)
- **Specialization:** System design, architecture decisions, code quality
- **Autonomous Actions:**
  - Architecture recommendations
  - Code review with specific feedback
  - Security vulnerability identification
  - Performance bottleneck analysis
- **Escalates:** Breaking changes, new dependencies, auth modifications

#### Lead Builder (Antigravity)
- **Platform:** Google Gemini/DeepMind (via Antigravity)
- **Specialization:** Feature implementation, file operations, testing
- **Autonomous Actions:**
  - Create new files and components
  - Modify existing code per specifications
  - Run build commands and verify
  - Image generation for marketing
  - Browser-based testing and screenshots
- **Escalates:** Production deployment, database schema changes

---

### 🛡️ Quality Department

#### Security Auditor
- **Workflow:** `/security-auditor`
- **Triggers:** Before any deploy, after auth changes
- **Checks:** OWASP Top 10, exposed secrets, XSS/CSRF, auth flaws
- **Output:** Security findings report with severity ratings

#### Performance Engineer
- **Workflow:** `/performance-optimizer`
- **Triggers:** After feature additions, before release
- **Checks:** React render cycles, bundle size, animation FPS
- **Output:** Performance report with specific optimizations

#### Accessibility Auditor
- **Workflow:** `/accessibility-auditor`
- **Triggers:** After UI changes
- **Checks:** WCAG 2.1, ARIA labels, keyboard nav, color contrast
- **Output:** Accessibility compliance report

#### Test Engineer
- **Workflow:** `/test-engineer`
- **Triggers:** After feature completion
- **Creates:** Unit tests, integration tests, E2E tests
- **Output:** Test suite with coverage metrics

---

### 🎨 Design Department

#### UI/UX Designer
- **Workflow:** `/ui-designer`
- **Triggers:** After UI changes, brand drift detection
- **Checks:** Theme compliance, component consistency, responsive scaling
- **Output:** Design correction report with specific CSS/component fixes

#### Animation Choreographer
- **Workflow:** `/animation-choreographer`
- **Triggers:** When motion design needed
- **Creates:** Framer motion timelines, parallax effects, micro-interactions
- **Output:** Animation implementation code

#### Responsive Scaler
- **Workflow:** `/responsive-scaler`
- **Triggers:** After layout changes
- **Checks:** Mobile-first breakpoints, touch targets, viewport scaling
- **Output:** Responsive fix report

---

### 📈 Marketing Department

#### Copywriter
- **Workflow:** `/copywriter-agent`
- **Triggers:** Content calendar due dates
- **Creates:** Headlines, body copy, CTAs, social media posts
- **Output:** Ready-to-publish marketing copy

#### SEO Optimizer
- **Workflow:** `/seo-optimizer`
- **Triggers:** After page additions/changes
- **Checks:** Title tags, meta descriptions, heading hierarchy, semantic HTML
- **Output:** SEO audit with actionable fixes

---

### 🏭 Operations Department

#### Sprint Planner
- **Triggers:** Start of each work session
- **Reads:** PROGRESS.md, PROJECT_MEMORY.md
- **Does:** Prioritize chunks, assign to agents, track completion
- **Output:** Updated PROGRESS.md with next chunks defined

#### Documentation Lead
- **Workflow:** `/docs-handler`
- **Triggers:** After code changes
- **Checks:** README accuracy, Obsidian vault consistency, API docs
- **Output:** Documentation updates

#### GitHub Manager
- **Workflow:** `/github-agent`
- **Triggers:** Before release, weekly health check
- **Checks:** Repo organization, CI/CD, .gitignore, branch hygiene
- **Output:** GitHub health report

---

### 🔧 Specialized Agents

#### Firebase Architect
- **Workflow:** `/firebase-architect`
- **Specialization:** Security rules, Firestore schema, query optimization
- **Triggers:** After database changes

#### Firmware Bridge
- **Workflow:** `/firmware-bridge`
- **Specialization:** Hardware/IoT ↔ web data alignment
- **Triggers:** When hardware integration changes

#### State Architect
- **Workflow:** `/state-architect`
- **Specialization:** Global state management, context providers
- **Triggers:** After state/context changes

#### Meta-Agent (Agent Architect)
- **Workflow:** `/agent-architect`
- **Specialization:** Evaluates codebase for missing agent capabilities
- **Creates:** New workflow definitions for detected gaps
- **Triggers:** Monthly evaluation or when gaps detected

---

## Communication Protocol

```
Agent → PROGRESS.md (append-only)
Agent → Handoff notes (in PROGRESS.md)
Agent → Vaishak (via chat when escalation needed)
Agent ↔ Agent (via shared workspace files)
```

---

## Tags
#team #agents #ai #orchestration
