# Web Development Team — Ooru Logix Company OS

> **Dedicated agent team for oorulogix.com and xgo3d.com development.**
> Coordinates with Engineering, Marketing, and Sales agents via shared Knowledge layer.

---

## Team Overview

The Web Dev team is a **specialized sub-department under Engineering** responsible for all website development, deployment, and maintenance. Unlike other agents that operate on-demand, Web Dev agents work in **sprint cycles** tied to the chunk system in PROGRESS.md.

```
┌──────────────────────────────────────────────────────────────┐
│                     VAISHAK (FOUNDER)                         │
│                 Final approval on all deploys                 │
└────────────────────────────┬─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  WEB DEV LEAD   │
                    │  (Orchestrator) │
                    └──┬──┬──┬──┬──┬─┘
                       │  │  │  │  │
           ┌───────────┘  │  │  │  └───────────┐
           │              │  │  │              │
    ┌──────▼──────┐ ┌────▼──▼────┐ ┌──────▼──────┐
    │  FRONTEND   │ │   DESIGN   │ │  DEPLOY &   │
    │  ENGINEER   │ │  SYSTEMS   │ │  INFRA      │
    └──────┬──────┘ └─────┬──────┘ └──────┬──────┘
           │              │               │
    ┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼──────┐
    │  CONTENT    │ │    QA &    │ │    SEO &    │
    │  INTEGRATOR │ │  TESTING   │ │  ANALYTICS  │
    └─────────────┘ └────────────┘ └─────────────┘
```

---

## Agents

### Agent: Web Dev Lead
| Property | Value |
|----------|-------|
| **ID** | `agent-webdev-001` |
| **Platform** | Claude (primary) |
| **Role** | Orchestrates all web development work. Breaks features into tasks, assigns to sub-agents, reviews output, coordinates deploys. |
| **Triggers** | "website update", "new page", "site redesign", "web sprint", "deploy site" |
| **Skills** | `web-sprint-plan`, `component-spec`, `deploy-check`, `code-review` |
| **MCP Deps** | `github-mcp`, `vercel-mcp` |
| **Knowledge Reads** | [[Brand Kit]], [[ShopSense]], [[OLOG Platform]], `PROGRESS.md` |
| **Knowledge Writes** | `PROGRESS.md` (web chunks), Web Dev Sprint Log |
| **Escalation** | Production deploy → Vaishak approval required |

**Responsibilities:**
1. Receive feature requests from Vaishak or other agents (Marketing wants a new CTA, Sales wants a pricing page update)
2. Break into web-dev chunks (C-WEB-XX)
3. Assign to appropriate sub-agent (Frontend, Design, Content, etc.)
4. Review all output before merge
5. Coordinate with GitHub Ops for deployment

**Inter-Agent Communication:**
| Communicates With | Channel | Purpose |
|-------------------|---------|---------|
| Content Engine (Marketing) | Knowledge: Content Calendar | Receives copy for website sections |
| Brand Guardian (Marketing) | Knowledge: Brand Kit | Reads brand rules before any design work |
| Deal Closer (Sales) | Knowledge: Pilot Tracker | Gets customer testimonials for site |
| SEO Strategist (Marketing) | Knowledge: SEO audit results | Implements SEO recommendations |
| Chief Architect (Engineering) | Knowledge: Architecture docs | Aligns on tech stack decisions |
| GitHub Ops (Engineering) | MCP: github-mcp | PR creation, branch management |
| QA Sentinel (Engineering) | Skill: build-verify | Pre-deploy testing |

---

### Agent: Frontend Engineer
| Property | Value |
|----------|-------|
| **ID** | `agent-webdev-002` |
| **Platform** | Both (Claude for logic, Antigravity for UI) |
| **Role** | Implements React components, pages, state management, routing, and responsive layouts |
| **Triggers** | "build component", "new page", "fix layout", "add feature", "responsive fix" |
| **Skills** | `react-component`, `page-build`, `state-manage`, `responsive-fix` |
| **MCP Deps** | `github-mcp` |
| **Knowledge Reads** | [[OLOG Platform]], [[Brand Kit]], component library docs |
| **Escalation** | Breaking change to shared components → Web Dev Lead review |

**Tech Stack Mastery:**
| Technology | Usage | Version |
|------------|-------|---------|
| React | UI framework | 19 |
| TypeScript | Type safety | 5.x |
| Vite | Build tool | Latest |
| TailwindCSS | Styling | 4 (CDN) |
| Framer Motion | Animations | Latest |
| Lucide React | Icons | Latest |
| Firebase | Auth, Firestore, Analytics | Latest |

**Component Conventions:**
```
- File: PascalCase.tsx (e.g., HeroSection.tsx)
- Export: default export, named function component
- Props: interface Props { } at top of file
- State: React hooks (useState, useContext)
- Styling: Tailwind classes, no inline styles
- Animations: Framer Motion variants
- Responsive: mobile-first (sm → md → lg → xl)
```

---

### Agent: Design Systems
| Property | Value |
|----------|-------|
| **ID** | `agent-webdev-003` |
| **Platform** | Both |
| **Role** | Maintains design system, enforces visual consistency, creates new design tokens |
| **Triggers** | "design system", "new token", "color update", "spacing fix", "typography check" |
| **Skills** | `design-token-manage`, `theme-audit`, `component-style` |
| **MCP Deps** | None (local knowledge only) |
| **Knowledge Reads** | [[Brand Kit]] |
| **Escalation** | Brand Kit changes → Vaishak + Brand Guardian approval |

**Design Tokens (from Brand Kit):**
```css
/* Colors */
--color-navy: #0B2648;
--color-chai-brown: #8B6F47;
--color-green: #2DB76F;
--color-off-white: #F8F7F4;
--color-dark-gray: #2D2D2D;
--color-light-gray: #7A7A7A;
--color-border: #D8D5CF;

/* Typography */
--font-heading: 'Inter', sans-serif;
--font-body: 'Lato', sans-serif;
--font-code: 'JetBrains Mono', monospace;

/* Spacing (4px grid) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;

/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-full: 9999px;
```

---

### Agent: Content Integrator
| Property | Value |
|----------|-------|
| **ID** | `agent-webdev-004` |
| **Platform** | Claude (primary) |
| **Role** | Translates marketing copy, product descriptions, and testimonials into website-ready content |
| **Triggers** | "update copy", "add testimonial", "change headline", "pricing update" |
| **Skills** | `copy-integrate`, `testimonial-format`, `pricing-display` |
| **MCP Deps** | None |
| **Knowledge Reads** | [[Brand Kit]], [[ShopSense]], [[Go_To_Market]], [[Customer Profiles]] |
| **Escalation** | Pricing changes → Vaishak approval |

**Communication with Marketing:**
```
Content Engine writes → Content Calendar (GDrive)
    ↓
Content Integrator reads → picks website-relevant copy
    ↓
Frontend Engineer receives → implements on site
    ↓
Brand Guardian reviews → approves/rejects
```

---

### Agent: Web QA & Testing
| Property | Value |
|----------|-------|
| **ID** | `agent-webdev-005` |
| **Platform** | Antigravity (primary) |
| **Role** | Tests builds, checks responsive behavior, validates accessibility, runs lighthouse audits |
| **Triggers** | "test build", "lighthouse", "check mobile", "accessibility check", "visual regression" |
| **Skills** | `build-verify`, `lighthouse-audit`, `accessibility-audit`, `responsive-test` |
| **MCP Deps** | `vercel-mcp` (preview deploys), `github-mcp` (CI status) |
| **Knowledge Reads** | `.agent/workflows/test-engineer.md`, `.agent/workflows/accessibility-auditor.md` |
| **Escalation** | Lighthouse score <80 → block deploy |

**QA Checklist (Pre-Deploy):**
- [ ] `npm run build` passes with 0 errors
- [ ] No TypeScript errors
- [ ] All pages render on mobile (375px), tablet (768px), desktop (1440px)
- [ ] Lighthouse Performance >80, Accessibility >90
- [ ] All links resolve (no 404s)
- [ ] SEO meta tags present on all pages
- [ ] Open Graph tags verified
- [ ] Forms submit correctly
- [ ] Firebase Auth flow works
- [ ] No console errors in production build

---

### Agent: SEO & Analytics
| Property | Value |
|----------|-------|
| **ID** | `agent-webdev-006` |
| **Platform** | Both |
| **Role** | Implements SEO recommendations, manages analytics events, tracks site performance |
| **Triggers** | "seo fix", "add tracking", "analytics report", "meta tags", "sitemap update" |
| **Skills** | `seo-implement`, `analytics-event`, `sitemap-gen`, `og-tag-manage` |
| **MCP Deps** | `vercel-mcp`, `firebase-mcp` (analytics) |
| **Knowledge Reads** | [[Competitive Intel]], [[Brand Kit]] |
| **Escalation** | Ranking drop >10 positions → alert |

**SEO Standards:**
| Element | Requirement |
|---------|------------|
| Title tag | <60 chars, keyword + brand |
| Meta description | <155 chars, includes CTA |
| H1 | One per page, contains primary keyword |
| Open Graph | og:title, og:description, og:image on every page |
| Sitemap | Auto-generated, submitted to Google |
| Robots.txt | Allow all public pages |
| Canonical | Self-referencing on all pages |
| Schema | LocalBusiness + Product JSON-LD |

---

## Web Dev Workflow

```
┌──────────────────────────────────────────────────────────────┐
│ STEP 1: Feature Request                                       │
│ Source: Vaishak / Marketing / Sales / Sprint Plan              │
│ → Web Dev Lead receives and scopes                            │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 2: Task Breakdown                                        │
│ Web Dev Lead creates C-WEB-XX chunks in PROGRESS.md           │
│ Assigns to: Frontend / Design / Content / SEO                 │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 3: Implementation                                        │
│ Frontend Engineer builds components                           │
│ Design Systems enforces visual rules                          │
│ Content Integrator plugs in copy                              │
│ SEO & Analytics adds meta/tracking                            │
└───────────────────────┬──────────────────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 4: Review                                                │
│ Web Dev Lead reviews code                                     │
│ Brand Guardian reviews visual/copy                            │
│ Web QA runs test suite + Lighthouse                           │
└───────────────────────┬──────────────────────────────────────┘
                        │
              ┌─────────┴──────────┐
              │                    │
         PASS ▼              FAIL  ▼
   ┌──────────────┐    ┌──────────────┐
   │ STEP 5: PR   │    │ Back to      │
   │ Create + Push│    │ Step 3 with  │
   │ via GitHub   │    │ fix notes    │
   │ Ops          │    └──────────────┘
   └──────┬───────┘
          │
          ▼
┌──────────────────────────────────────────────────────────────┐
│ STEP 6: Deploy                                                │
│ Vaishak approves → Vercel deploy triggered                    │
│ Post-deploy: verify live site, check analytics                │
└──────────────────────────────────────────────────────────────┘
```

---

## Communication Bridges

### How Web Dev Team Talks to Other Departments

| From | To | Data Flow | Channel |
|------|----|-----------|---------|
| **Marketing → Web Dev** | Content Engine sends new copy | Content Calendar → Content Integrator reads | Knowledge (GDrive) |
| **Marketing → Web Dev** | Brand Guardian flags brand violation on site | Brand review results → Design Systems fixes | Knowledge (Brand Kit) |
| **Marketing → Web Dev** | SEO Strategist flags missing meta tags | SEO audit → SEO & Analytics implements | Knowledge (SEO audit) |
| **Sales → Web Dev** | Deal Closer has new testimonial | Customer Profiles → Content Integrator adds to site | Knowledge (Customer Profiles) |
| **Sales → Web Dev** | Pipeline Manager wants pricing page update | Price change request → Content Integrator + Frontend | Knowledge (Pricing Intelligence) |
| **Engineering → Web Dev** | Chief Architect sets architecture constraint | Architecture docs → Web Dev Lead enforces | Knowledge (Architecture) |
| **Engineering → Web Dev** | QA Sentinel reports build failure | Build status → Web QA investigates | MCP (github-mcp) |
| **Finance → Web Dev** | Compliance Bot requires legal page update | Legal requirements → Content Integrator + Frontend | Knowledge (Registration Status) |
| **Web Dev → Marketing** | New page deployed, needs announcement | Deploy log → Social Scheduler creates post | Knowledge (Content Calendar) |
| **Web Dev → Sales** | Landing page live, ready for lead capture | Deploy notification → Pipeline Manager tracks | Knowledge (Pilot Tracker) |

---

## Web Dev Sprint Format

```markdown
## Web Sprint [WS-XX] — [Date Range]

### Goals
1. [Primary goal]
2. [Secondary goal]

### Chunks
| Chunk | Task | Agent | Status | Notes |
|-------|------|-------|--------|-------|
| C-WEB-01 | [task] | [agent] | ⬜/🔄/✅ | [notes] |

### Dependencies
- Needs copy from: Content Engine (by [date])
- Needs design approval from: Brand Guardian (by [date])

### Deploy Target
- Date: [date]
- Approval: Vaishak
- Post-deploy check: Web QA
```

---

## Tags
#webdev #team #agents #frontend #deployment #company-os
