# 🤖 Agent Orchestration Master — Ooru Logix

## Overview

Ooru Logix runs on a **dual-AI orchestration model** where **Claude** (via Claude Code/Sonnet) and **Antigravity** (Google Gemini/Deepmind) share a common workspace folder and take turns executing work in a **chunk-based system**.

This document defines the protocol for how both AI platforms coordinate, hand off work, maintain memory continuity, and operate as a unified engineering team.

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                    VAISHAK (FOUNDER)                   │
│            Senior Developer / Final Authority          │
│                                                        │
│   Assigns tasks → Reviews output → Makes decisions     │
└────────────┬──────────────────────┬───────────────────┘
             │                      │
     ┌───────▼───────┐      ┌──────▼────────┐
     │    CLAUDE      │      │  ANTIGRAVITY   │
     │  (Anthropic)   │      │   (Gemini)     │
     │                │      │                │
     │ • Strategy     │      │ • Execution    │
     │ • Planning     │      │ • Building     │
     │ • Research     │      │ • UI/UX        │
     │ • Code Review  │      │ • Deployment   │
     │ • Architecture │      │ • Testing      │
     │ • Marketing    │      │ • File ops     │
     │   copy         │      │ • Browser      │
     └───────┬───────┘      └──────┬────────┘
             │                      │
     ┌───────▼──────────────────────▼───────┐
     │         SHARED WORKSPACE              │
     │   c:\Users\VAISHAK\olog antigrav v1\  │
     │                                       │
     │   📄 PROGRESS.md      (chunk tracker) │
     │   📄 PROJECT_MEMORY.md (context)      │
     │   📂 company/          (company ops)  │
     │   📂 .agent/workflows/ (agent defs)   │
     └──────────────────────────────────────┘
```

---

## The Chunk System

All work is organized into **chunks** (C-XX format). Each chunk is an atomic unit of work that:
- Has a clear title and scope
- Can be completed in a single AI session
- Updates PROGRESS.md when complete
- Defines the next chunk(s) to be picked up

### Chunk Lifecycle

```
⬜ PENDING  →  🔄 IN PROGRESS  →  ✅ COMPLETE
                      │
                      ▼ (if blocked)
                 ⏸️ BLOCKED (needs Vaishak decision)
```

### Chunk Format in PROGRESS.md

```markdown
| Chunk | Title | Status | Agent | Date | Notes |
|-------|-------|--------|-------|------|-------|
| C-12 | LinkedIn Content Creation | ✅ COMPLETE | Antigravity | 2026-03-29 | Created 7 posts |
| C-13 | Instagram Visual Strategy | 🔄 IN PROGRESS | Claude | 2026-03-29 | Awaiting brand assets |
| C-14 | ShopSense GitHub Release | ⬜ PENDING | — | — | Depends on C-13 |
```

---

## Turn-Taking Protocol

### How Claude and Antigravity Coordinate

1. **Session Start**: Agent reads `PROGRESS.md` and `PROJECT_MEMORY.md`
2. **Claim Work**: Agent picks the next `⬜ PENDING` chunk
3. **Execute**: Agent completes the chunk using available tools
4. **Update**: Agent marks chunk `✅ COMPLETE` and defines next chunks
5. **Handoff**: Agent writes a brief handoff note in PROGRESS.md for the next agent

### Handoff Format

```markdown
---
## 🔄 Handoff Note (C-XX → C-YY)
**From:** [Claude/Antigravity]
**To:** [Claude/Antigravity/Either]
**Context:** [What was done, what's next]
**Blockers:** [Any decisions needed from Vaishak]
**Files Modified:** [List of files changed]
---
```

### Priority Rules
1. **Vaishak-assigned tasks** always take priority
2. **Blocked items** escalate to Vaishak via notes
3. **No parallel conflicts** — only one agent works on a file at a time
4. **Memory files** (PROGRESS.md, PROJECT_MEMORY.md) are append-only during active work

---

## Agent Specialization Matrix

| Task Category | Primary Agent | Secondary | Rationale |
|---------------|--------------|-----------|-----------|
| Architecture design | Claude | — | Deep reasoning, system thinking |
| Feature building | Antigravity | Claude | Browser tools, file creation |
| UI/UX implementation | Antigravity | — | Design system, responsive |
| Marketing copywriting | Claude | Antigravity | Persuasive writing |
| SEO optimization | Antigravity | — | Meta tags, sitemap, OG |
| Code review | Claude | — | Bug finding, security |
| Documentation | Both | — | Split by domain |
| Testing | Antigravity | — | Build verification |
| Research | Claude | — | Web search, analysis |
| Client communication | Claude | — | Professional tone |
| File operations | Antigravity | — | Directory creation, bulk ops |
| Image generation | Antigravity | — | Generate tool access |

---

## Workspace Conventions

### File Naming
- Obsidian: `Title Case With Spaces.md`
- Code: `kebab-case.ts` or `PascalCase.tsx`
- Marketing: `platform_content-type_date.md`
- Config: `lowercase.json`

### Branch Strategy
- `main` — Production-stable code
- `dev` — Active development
- `feature/X` — Feature branches
- `marketing/X` — Marketing content branches

### Memory Files (Sacred — Never Delete)
- `PROGRESS.md` — Global work tracker
- `PROJECT_MEMORY.md` — Persistent context for all agents

---

## Workflow Integration

The `.agent/workflows/` directory contains 22 specialized agent playbooks:

| Workflow | Purpose |
|----------|---------|
| `/ui-designer` | Brand enforcement, styling fixes |
| `/copywriter-agent` | Marketing copy, headlines, CTAs |
| `/seo-optimizer` | Meta tags, Open Graph, semantics |
| `/security-auditor` | OWASP, secrets, auth |
| `/performance-optimizer` | Render cycles, bundle size |
| `/test-engineer` | Unit, integration, E2E tests |
| `/github-agent` | Repo health, CI/CD |
| `/docs-handler` | Documentation consistency |
| `/agent-architect` | Spawn new agent workflows |
| `/jules-meta-loop` | Four-phase maintenance sweep |
| `/state-architect` | Global state management audit |
| `/responsive-scaler` | Mobile-first breakpoints |
| `/accessibility-auditor` | WCAG, ARIA, keyboard nav |
| `/animation-choreographer` | Motion design, parallax |
| `/component-librarian` | Design system enforcement |
| `/firebase-architect` | Security rules, Firestore schema |
| `/firmware-bridge` | Hardware/IoT data alignment |
| `/wizard-architect` | Multi-step flow design |
| `/user-flow-logic` | User journey optimization |
| `/3d-scene-optimizer` | Three.js/WebGL performance |
| `/onboarding` | New developer setup |
| `/architectural-synchronizer` | Cross-target alignment |

---

## Escalation Protocol

```
Level 0: Agent handles autonomously (routine tasks)
Level 1: Agent leaves note in PROGRESS.md (needs input next session)
Level 2: Agent flags blocker in handoff note (needs Vaishak decision)
Level 3: Agent stops work and documents why (critical blocker)
```

---

## Tags
#orchestration #agents #protocol #workflow
