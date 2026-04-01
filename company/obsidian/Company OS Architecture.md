# Ooru Logix — Company OS Architecture

> **A company that runs on agents, skills, knowledge, plugins, and MCP servers.**
> Version 2.0 | April 2026 | Architect: Vaishak + Claude

---

## The Five Layers

Ooru Logix operates as an **AI-native company** built on five interconnected layers. Each layer has a defined role, and together they form the complete operating system that runs the business with minimal human intervention.

```
┌─────────────────────────────────────────────────────────────────┐
│                    VAISHAK (FOUNDER / CEO)                       │
│              Strategy · Decisions · Customer Relationships       │
└────────────────────────────┬────────────────────────────────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
    ┌────▼────┐        ┌─────▼─────┐       ┌─────▼─────┐
    │ CLAUDE  │        │ANTIGRAVITY│       │ FUTURE AI │
    │ (Opus)  │        │ (Gemini)  │       │  AGENTS   │
    └────┬────┘        └─────┬─────┘       └───────────┘
         │                   │
┌════════▼═══════════════════▼═══════════════════════════════════┐
║  LAYER 1: AGENTS                                               ║
║  Autonomous AI team members with defined roles & departments   ║
║  → [[Agent Registry]]                                          ║
╠════════════════════════════════════════════════════════════════╣
║  LAYER 2: SKILLS                                               ║
║  Executable capabilities agents invoke to complete tasks       ║
║  → [[Skill Catalog]]                                           ║
╠════════════════════════════════════════════════════════════════╣
║  LAYER 3: KNOWLEDGE                                            ║
║  Persistent memory, context, and intelligence agents read      ║
║  → [[Knowledge Base]]                                          ║
╠════════════════════════════════════════════════════════════════╣
║  LAYER 4: MCP SERVERS                                          ║
║  Authenticated connections to external tools & platforms       ║
║  → [[MCP Architecture]]                                        ║
╠════════════════════════════════════════════════════════════════╣
║  LAYER 5: PLUGINS                                              ║
║  Bundled Agent + Skill + MCP packages for company functions    ║
║  → [[Plugin Registry]]                                         ║
╚════════════════════════════════════════════════════════════════╝
```

---

## Layer 1: Agents

Agents are autonomous AI workers. Each agent has a name, a department, defined triggers, and a set of skills it can invoke. Agents don't hold state between sessions — they read from the Knowledge layer and write results back.

### Agent Taxonomy

| Department | Agent | Platform | Primary Skill Set |
|------------|-------|----------|-------------------|
| **Sales** | Deal Closer | Claude | Lead qualification, pilot tracking, objection handling |
| **Sales** | Outreach Writer | Claude | Cold email/DM drafts, follow-up sequences |
| **Sales** | Pipeline Manager | Claude | CRM updates, deal stage tracking, forecasting |
| **Marketing** | Content Engine | Claude | LinkedIn posts, blog articles, captions |
| **Marketing** | Brand Guardian | Both | Voice enforcement, tone review, copy audit |
| **Marketing** | SEO Strategist | Antigravity | Meta tags, keyword research, sitemap ops |
| **Marketing** | Social Scheduler | Both | Content calendar, posting cadence, engagement |
| **Engineering** | Chief Architect | Claude | System design, architecture decisions, code review |
| **Engineering** | Sprint Driver | Both | Chunk management, PROGRESS.md updates, blockers |
| **Engineering** | Firmware Bridge | Antigravity | Pi coordination, sensor data, hardware-software sync |
| **Engineering** | QA Sentinel | Antigravity | Build verification, test runs, accessibility |
| **Engineering** | GitHub Ops | Both | Repo health, CI/CD, branch management, PR reviews |
| **Finance** | Revenue Tracker | Claude | Invoice tracking, payment status, MRR/ARR |
| **Finance** | Expense Logger | Claude | Cost categorization, runway calculation |
| **Finance** | Compliance Bot | Claude | GST filing reminders, MSME status, legal deadlines |
| **Ops** | Daily Dispatcher | Both | Morning standup generation, task prioritization |
| **Ops** | Weekly Reviewer | Claude | Business review, KPI dashboards, strategy check |
| **Ops** | Client Success | Claude | Onboarding flows, health checks, NPS tracking |

→ Full profiles: [[Agent Registry]]

### Agent Invocation Protocol

```
1. Vaishak (or another agent) issues a TRIGGER
2. Dispatcher identifies the correct agent by trigger keyword
3. Agent reads relevant KNOWLEDGE files
4. Agent invokes required SKILLS
5. Skills call MCP SERVERS for external data/actions
6. Agent writes output to Knowledge layer + notifies Vaishak
```

---

## Layer 2: Skills

Skills are **executable capabilities** — discrete, reusable functions that agents call to get work done. Each skill has defined inputs, outputs, and dependencies.

### Skill Categories

| Category | Skills | Trigger Examples |
|----------|--------|-----------------|
| **Sales** | lead-qualify, pilot-track, invoice-gen, proposal-draft, objection-handle | "New lead from LinkedIn", "Pilot day 7 check-in" |
| **Marketing** | linkedin-post, instagram-caption, blog-draft, brand-review, seo-audit | "Write this week's LinkedIn post", "Review this copy" |
| **Engineering** | code-review, sprint-plan, bug-triage, deploy-check, firmware-sync | "Review PR #12", "Plan next sprint" |
| **Finance** | revenue-log, expense-track, invoice-create, gst-calc, runway-model | "Log payment from customer X", "What's our runway?" |
| **Ops** | standup-gen, weekly-review, client-onboard, kpi-dashboard, task-dispatch | "Morning standup", "Weekly business review" |
| **Cross-cutting** | web-fetch, doc-gen, email-draft, sms-send, file-sync | Used by multiple agents |

→ Full definitions: [[Skill Catalog]]

---

## Layer 3: Knowledge

Knowledge is **persistent context** that survives across sessions. Agents read knowledge before acting and write back after completing work.

### Knowledge Structure

```
knowledge/
├── shopsense/
│   ├── Product Spec.md          — Hardware BOM, architecture, modules
│   ├── Pilot Tracker.md         — Active pilots, status, metrics
│   ├── Customer Profiles.md     — ICP data, individual customer notes
│   ├── Deployment Playbook.md   — Step-by-step install guide
│   └── Model Accuracy Log.md   — YOLO model performance over time
│
├── market/
│   ├── Competitive Intel.md     — Competitor tracking, positioning
│   ├── Bangalore Retail Map.md  — Target neighborhoods, shop density
│   ├── Pricing Intelligence.md  — Price sensitivity data, willingness-to-pay
│   └── Industry Trends.md       — Edge AI, India retail tech landscape
│
├── operations/
│   ├── Finance Ledger.md        — Revenue, expenses, cash position
│   ├── Registration Status.md   — GST, MSME, trademark progress
│   ├── Vendor Directory.md      — Suppliers, component sources, costs
│   └── Team Capacity.md         — Vaishak's time allocation, AI agent hours
```

### Sacred Files (Never Delete, Append-Only)

| File | Purpose | Updated By |
|------|---------|-----------|
| `PROGRESS.md` | Global chunk tracker, handoff notes | All agents |
| `PROJECT_MEMORY.md` | Persistent cross-session context | All agents |
| `Finance Ledger.md` | Revenue and expense truth source | Finance agents |
| `Pilot Tracker.md` | Customer deployment status | Sales + Ops agents |

→ Full structure: [[Knowledge Base]]

---

## Layer 4: MCP Servers

MCP (Model Context Protocol) servers are **authenticated bridges** to external platforms. They let agents read data from and write actions to tools like GitHub, Firebase, Razorpay, etc.

### MCP Server Registry

| Server | Platform | Capabilities | Auth Method |
|--------|----------|-------------|-------------|
| `github-mcp` | GitHub | Repos, PRs, issues, Actions, releases | PAT token |
| `firebase-mcp` | Firebase | Firestore CRUD, Auth users, Analytics | Service account JSON |
| `razorpay-mcp` | Razorpay | Payment links, order creation, refunds | API key + secret |
| `whatsapp-mcp` | WhatsApp Business | Send/receive messages, templates, media | Cloud API token |
| `linkedin-mcp` | LinkedIn | Post creation, analytics, profile updates | OAuth 2.0 |
| `gdrive-mcp` | Google Drive | File CRUD, sharing, folder management | OAuth 2.0 / service account |
| `vercel-mcp` | Vercel | Deploy, env vars, domain management | API token |

### Security Model

```
┌─────────────────────────────────────────┐
│  .env.local (NEVER committed to git)    │
│                                         │
│  GITHUB_PAT=ghp_xxxx                    │
│  FIREBASE_SERVICE_ACCOUNT=base64(...)   │
│  RAZORPAY_KEY_ID=rzp_xxxx              │
│  RAZORPAY_KEY_SECRET=xxxx              │
│  WHATSAPP_TOKEN=xxxx                    │
│  LINKEDIN_ACCESS_TOKEN=xxxx            │
│  GDRIVE_SERVICE_ACCOUNT=base64(...)    │
│  VERCEL_TOKEN=xxxx                      │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│  MCP Server reads token at runtime      │
│  Agent calls MCP server via tool use    │
│  MCP server authenticates to platform   │
│  Returns structured data to agent       │
└─────────────────────────────────────────┘
```

→ Full specs: [[MCP Architecture]]

---

## Layer 5: Plugins

Plugins are **bundled packages** that combine agents + skills + MCP connections into a single installable unit for a company function. Think of them as "departments in a box."

### Plugin Registry

| Plugin | Agents | Skills | MCP Deps | Purpose |
|--------|--------|--------|----------|---------|
| `shopsense-sales` | Deal Closer, Outreach Writer, Pipeline Manager | lead-qualify, pilot-track, invoice-gen, proposal-draft | razorpay-mcp, whatsapp-mcp | End-to-end ShopSense sales pipeline |
| `content-engine` | Content Engine, Brand Guardian, Social Scheduler | linkedin-post, instagram-caption, blog-draft, brand-review | linkedin-mcp, gdrive-mcp | Marketing content creation and publishing |
| `dev-ops` | Chief Architect, Sprint Driver, GitHub Ops, QA Sentinel | code-review, sprint-plan, deploy-check | github-mcp, vercel-mcp, firebase-mcp | Engineering workflow automation |
| `finance-hub` | Revenue Tracker, Expense Logger, Compliance Bot | revenue-log, expense-track, invoice-create, gst-calc | razorpay-mcp, gdrive-mcp | Financial operations and compliance |
| `company-brain` | Daily Dispatcher, Weekly Reviewer, Client Success | standup-gen, weekly-review, client-onboard, kpi-dashboard | All MCP servers | Cross-functional operations intelligence |

→ Full specs: [[Plugin Registry]]

---

## How It All Connects: A Real Example

**Scenario:** A chai shop owner DMs Vaishak on WhatsApp saying "I'm interested in ShopSense."

```
1. whatsapp-mcp receives inbound message
2. Daily Dispatcher agent detects "new lead" trigger
3. Dispatcher routes to Deal Closer agent
4. Deal Closer reads:
   - knowledge/shopsense/Customer Profiles.md (check if existing)
   - knowledge/shopsense/Product Spec.md (latest pricing)
   - knowledge/market/Bangalore Retail Map.md (shop location context)
5. Deal Closer invokes skills:
   - lead-qualify (score the lead based on ICP criteria)
   - proposal-draft (generate personalized proposal PDF)
6. Deal Closer calls MCP servers:
   - whatsapp-mcp → send reply + proposal PDF
   - gdrive-mcp → save proposal to Sales folder
7. Deal Closer writes back to Knowledge:
   - Updates Pilot Tracker.md with new lead
   - Updates Finance Ledger.md with pipeline value
8. Dispatcher notifies Vaishak: "New qualified lead. Proposal sent. Score: 8/10."
```

---

## Implementation Priority

### Phase 1: Foundation (This Session)
- [x] Architecture document (this file)
- [ ] Agent Registry with full profiles
- [ ] Skill Catalog with input/output specs
- [ ] MCP Architecture with connection specs
- [ ] Knowledge Base structure with templates
- [ ] Plugin Registry with dependency maps
- [ ] Workflow definitions for daily operations

### Phase 2: Activation (Next Session)
- [ ] Configure MCP servers with real credentials
- [ ] Build first Claude skill (standup-gen)
- [ ] Build first workflow (daily-ops)
- [ ] Test end-to-end: trigger → agent → skill → MCP → output

### Phase 3: Scale (Week 2+)
- [ ] All skills operational
- [ ] All MCP servers connected
- [ ] Automated daily/weekly rhythms running
- [ ] First customer interaction handled by agents

---

## Design Principles

1. **Agents are stateless.** They read knowledge, act, and write back. No hidden state.
2. **Skills are pure functions.** Given inputs, they produce outputs. No side effects except via MCP.
3. **Knowledge is the single source of truth.** If it's not in the vault, it doesn't exist.
4. **MCP servers are the only external interface.** Agents never call APIs directly.
5. **Plugins are composable.** You can install/uninstall a department without breaking others.
6. **Vaishak is the override.** Any agent decision can be overridden. Agents escalate, never assume.
7. **ShopSense is the priority.** Every agent, skill, and workflow serves ShopSense until Gate 2 is hit.

---

## Tags
#architecture #company-os #agents #skills #mcp #plugins #knowledge
