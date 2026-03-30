# 🤖 Agent Registry — Master Index

**Version:** 2.0 | **Updated:** 2026-03-29 | **Total Agents:** 22

This is the master index of all agents operating within the Ooru Logix dual-AI orchestration system. Each agent is a specialized workflow that Claude or Antigravity can trigger to automate a specific domain of work.

---

## Agent Quick Reference Table

| # | Agent Name | Department | Platform | Auto-Approve | Primary Trigger | Card |
|---|---|---|---|---|---|---|
| 01 | Security Auditor | Quality | Either | No | PR opened, Monthly audit | [📋](security-auditor.md) |
| 02 | Performance Optimizer | Engineering | Claude | No | Build >10s, Bundle >800KB | [📋](performance-optimizer.md) |
| 03 | Accessibility Auditor | Quality | Antigravity | No | UI changed, Pre-release | [📋](accessibility-auditor.md) |
| 04 | SEO Optimizer | Marketing | Antigravity | Yes | New page created | [📋](seo-optimizer.md) |
| 05 | Test Engineer | Quality | Antigravity | No | Before PR merge | [📋](test-engineer.md) |
| 06 | Docs Handler | Operations | Claude | Yes | API changed | [📋](docs-handler.md) |
| 07 | State Architect | Engineering | Claude | No | State in 5+ places | [📋](state-architect.md) |
| 08 | Responsive Scaler | Engineering | Antigravity | Yes | Mobile issue reported | [📋](responsive-scaler.md) |
| 09 | Animation Choreographer | Design | Antigravity | Yes | UX polish phase | [📋](animation-choreographer.md) |
| 10 | Component Librarian | Engineering | Antigravity | Yes | New component pattern | [📋](component-librarian.md) |
| 11 | Firebase Architect | Engineering | Claude | No | Schema change needed | [📋](firebase-architect.md) |
| 12 | Firmware Bridge | Engineering | Claude | No | New hardware board | [📋](firmware-bridge.md) |
| 13 | Copywriter Agent | Marketing | Claude | Yes | Campaign launch | [📋](copywriter-agent.md) |
| 14 | GitHub Agent | Operations | Antigravity | No | PR queue buildup | [📋](github-agent.md) |
| 15 | UI Designer | Design | Antigravity | Yes | Visual bug reported | [📋](ui-designer.md) |
| 16 | Wizard Architect | Engineering | Claude | No | Multi-step flow needed | [📋](wizard-architect.md) |
| 17 | User Flow Logic | Product | Claude | No | Journey broken | [📋](user-flow-logic.md) |
| 18 | 3D Scene Optimizer | Engineering | Antigravity | Yes | Three.js perf dip | [📋](3d-scene-optimizer.md) |
| 19 | Agent Architect | Operations | Claude | No | Process bottleneck | [📋](agent-architect.md) |
| 20 | Architectural Synchronizer | Engineering | Claude | No | Code diverges from arch | [📋](architectural-synchronizer.md) |
| 21 | Jules Meta-Loop | Operations | Either | No | Weekly maintenance | [📋](jules-meta-loop.md) |
| 22 | Onboarding Agent | Operations | Antigravity | Yes | New dev hired | [📋](onboarding.md) |

---

## Agents by Department

### Engineering (10 agents)
- Performance Optimizer (02)
- State Architect (07)
- Responsive Scaler (08)
- Component Librarian (10)
- Firebase Architect (11)
- Firmware Bridge (12)
- Wizard Architect (16)
- 3D Scene Optimizer (18)
- Architectural Synchronizer (20)

### Quality Assurance (3 agents)
- Security Auditor (01)
- Accessibility Auditor (03)
- Test Engineer (05)

### Design (3 agents)
- Animation Choreographer (09)
- UI Designer (15)
- User Flow Logic (17) *[Product + Design]*

### Marketing (2 agents)
- SEO Optimizer (04)
- Copywriter Agent (13)

### Operations (4 agents)
- Docs Handler (06)
- GitHub Agent (14)
- Agent Architect (19)
- Jules Meta-Loop (21)
- Onboarding Agent (22)

---

## Agents by Platform

### Claude (Strategy/Analysis)
- Performance Optimizer (02)
- State Architect (07)
- Firebase Architect (11)
- Firmware Bridge (12)
- Copywriter Agent (13)
- Wizard Architect (16)
- User Flow Logic (17)
- Agent Architect (19)
- Architectural Synchronizer (20)
- **Total: 9**

### Antigravity (Execution/Building)
- Accessibility Auditor (03)
- SEO Optimizer (04)
- Test Engineer (05)
- Responsive Scaler (08)
- Animation Choreographer (09)
- Component Librarian (10)
- GitHub Agent (14)
- UI Designer (15)
- 3D Scene Optimizer (18)
- Onboarding Agent (22)
- **Total: 10**

### Either (Context-dependent)
- Security Auditor (01) — *escalates to Claude for deep analysis*
- Jules Meta-Loop (21) — *automated scanning, Claude for complex findings*
- **Total: 2** (but favor Claude for these)

---

## Auto-Approve Status

### Auto-Approve: Yes (10 agents)
These agents can execute autonomously and commit directly:
- SEO Optimizer (04)
- Docs Handler (06)
- Responsive Scaler (08)
- Animation Choreographer (09)
- Component Librarian (10)
- Copywriter Agent (13)
- UI Designer (15)
- 3D Scene Optimizer (18)
- Onboarding Agent (22)

### Escalate Required (12 agents)
These agents must review findings and wait for approval:
- Security Auditor (01)
- Performance Optimizer (02)
- Accessibility Auditor (03)
- Test Engineer (05)
- State Architect (07)
- Firebase Architect (11)
- Firmware Bridge (12)
- GitHub Agent (14)
- Wizard Architect (16)
- User Flow Logic (17)
- Agent Architect (19)
- Architectural Synchronizer (20)
- Jules Meta-Loop (21)

---

## Trigger Reference

### By Trigger Type

#### Git/Repository Triggers
- Security Auditor (01) — PR opened
- GitHub Agent (14) — PR queue buildup, CI/CD failure
- Docs Handler (06) — API changed, Architecture shift
- Jules Meta-Loop (21) — Weekly maintenance

#### Quality Gates
- Test Engineer (05) — Before PR merge
- Accessibility Auditor (03) — Pre-release
- Security Auditor (01) — Monthly audit
- Performance Optimizer (02) — Build/bundle thresholds

#### Content/Design Triggers
- SEO Optimizer (04) — New page created
- Copywriter Agent (13) — Campaign launch
- UI Designer (15) — Visual bug
- Animation Choreographer (09) — UX polish phase

#### Architecture/State Triggers
- State Architect (07) — State in 5+ components
- Firebase Architect (11) — Schema change
- Firmware Bridge (12) — New hardware board
- Architectural Synchronizer (20) — Code diverges from architecture

#### Feature-Specific Triggers
- Responsive Scaler (08) — Mobile issue
- Component Librarian (10) — New component pattern
- Wizard Architect (16) — Multi-step flow needed
- User Flow Logic (17) — Journey broken
- 3D Scene Optimizer (18) — Three.js performance
- Onboarding Agent (22) — New developer

---

## Agent Workflow Files

All 22 agents have corresponding workflow definitions in `.agent/workflows/`:

```
.agent/workflows/
├── security-auditor.md
├── performance-optimizer.md
├── accessibility-auditor.md
├── seo-optimizer.md
├── test-engineer.md
├── docs-handler.md
├── state-architect.md
├── responsive-scaler.md
├── animation-choreographer.md
├── component-librarian.md
├── firebase-architect.md
├── firmware-bridge.md
├── copywriter-agent.md
├── github-agent.md
├── ui-designer.md
├── wizard-architect.md
├── user-flow-logic.md
├── 3d-scene-optimizer.md
├── agent-architect.md
├── architectural-synchronizer.md
├── jules-meta-loop.md
└── onboarding.md
```

---

## Agent Profile Card Template

Each agent has a detailed profile card in this directory (`agents/`):

**Format:**
- **Identity** — Codename, department, platform, workflow path, auto-approve status
- **Mission** — What the agent does and why it matters
- **Triggers** — When to run this agent (manual or automatic)
- **Capabilities** — Specific skills and checks performed
- **Output** — Where results go (files created, locations)
- **Escalates To Vaishak When** — Conditions requiring human decision
- **Tags** — Searchable categories

---

## How to Use This Index

### Find an Agent by Task

1. **I need to fix a security bug** → [Security Auditor (01)](security-auditor.md)
2. **My page loads slowly** → [Performance Optimizer (02)](performance-optimizer.md)
3. **Need accessibility audit** → [Accessibility Auditor (03)](accessibility-auditor.md)
4. **Created new landing page** → [SEO Optimizer (04)](seo-optimizer.md)
5. **Need unit tests written** → [Test Engineer (05)](test-engineer.md)
6. **Update API documentation** → [Docs Handler (06)](docs-handler.md)
7. **Refactor state management** → [State Architect (07)](state-architect.md)
8. **Fix mobile layout** → [Responsive Scaler (08)](responsive-scaler.md)
9. **Add animations** → [Animation Choreographer (09)](animation-choreographer.md)
10. **Create design system** → [Component Librarian (10)](component-librarian.md)
11. **Design Firestore schema** → [Firebase Architect (11)](firebase-architect.md)
12. **Connect hardware** → [Firmware Bridge (12)](firmware-bridge.md)
13. **Write marketing copy** → [Copywriter Agent (13)](copywriter-agent.md)
14. **Review PR queue** → [GitHub Agent (14)](github-agent.md)
15. **Fix visual bug** → [UI Designer (15)](ui-designer.md)
16. **Create multi-step flow** → [Wizard Architect (16)](wizard-architect.md)
17. **Analyze user journey** → [User Flow Logic (17)](user-flow-logic.md)
18. **Optimize Three.js** → [3D Scene Optimizer (18)](3d-scene-optimizer.md)
19. **Design new agent** → [Agent Architect (19)](agent-architect.md)
20. **Check architecture alignment** → [Architectural Synchronizer (20)](architectural-synchronizer.md)
21. **Weekly health check** → [Jules Meta-Loop (21)](jules-meta-loop.md)
22. **Onboard new developer** → [Onboarding Agent (22)](onboarding.md)

### Find an Agent by Platform

**Claude (Strategic Analysis):** 01, 02, 07, 11, 12, 13, 16, 17, 19, 20

**Antigravity (Execution):** 03, 04, 05, 08, 09, 10, 14, 15, 18, 22

**Either (Context-dependent):** 01, 21

### Find an Agent by Department

- **Engineering:** 02, 07, 08, 10, 11, 12, 16, 18, 20
- **Quality:** 01, 03, 05
- **Design:** 09, 15, 17
- **Marketing:** 04, 13
- **Operations:** 06, 14, 19, 21, 22

---

## Agent Specialization Matrix

| Skill | Agents |
|---|---|
| Security & Compliance | 01, 11, 20 |
| Performance & Optimization | 02, 08, 18 |
| Accessibility & UX | 03, 09, 15, 17 |
| Documentation | 06, 16, 20 |
| Testing & QA | 05, 01 |
| Marketing & Content | 04, 13 |
| Architecture & Design | 07, 11, 16, 19, 20 |
| Automation & Operations | 06, 14, 19, 21, 22 |
| Hardware & Integration | 12, 21 |
| Design Systems | 09, 10, 15 |

---

## Agent Workflow Coordination

### Sequential Dependencies

Some agents should run in a specific order:

1. **Before release:**
   - 01 (Security) → 03 (Accessibility) → 05 (Tests) → 21 (Jules health check)

2. **For new feature:**
   - 16 (Design flow) → 10 (Components) → 15 (UI) → 09 (Animations) → 05 (Tests)

3. **For new page:**
   - 15 (UI) → 04 (SEO) → 13 (Copywriting) → 05 (Tests)

### Parallel Agents

These can run simultaneously without conflict:
- 02 & 18 (performance optimizations)
- 04 & 13 (content creation)
- 08 & 09 (styling & animation)
- 14 & 21 (automation & health checks)

---

## Contact & Escalation

**All agents route escalations through:** PROGRESS.md

**Escalation levels:**
- **Level 1** (auto-handle): Routine, low-risk changes
- **Level 2** (note in memory): Needs input next session
- **Level 3** (flag blocker): Requires Vaishak decision
- **Level 4** (stop work): Critical issue, can't proceed

---

## Tags

#agents #orchestration #automation #workflow #dispatch

---

**Last Updated:** 2026-03-29
**Maintained By:** Jules Meta-Loop (Automated) + Vaishak (Manual)
**Next Review:** 2026-04-05 (Weekly)

