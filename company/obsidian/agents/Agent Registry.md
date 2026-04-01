# Agent Registry — Ooru Logix Company OS

> **18 autonomous AI agents across 4 departments.**
> Each agent: stateless, trigger-driven, skill-equipped, knowledge-aware.

---

## How Agents Work

```
TRIGGER (keyword/event/schedule)
    │
    ▼
DISPATCHER identifies correct agent
    │
    ▼
AGENT reads KNOWLEDGE (context, history, data)
    │
    ▼
AGENT invokes SKILLS (executable capabilities)
    │
    ▼
SKILLS call MCP SERVERS (external platforms)
    │
    ▼
AGENT writes OUTPUT to Knowledge + notifies Vaishak
```

---

## Department: Sales & GTM

### Agent: Deal Closer
| Property | Value |
|----------|-------|
| **ID** | `agent-sales-001` |
| **Platform** | Claude (primary) |
| **Department** | Sales & GTM |
| **Role** | Qualifies leads, manages pilot conversions, handles objections, closes deals |
| **Triggers** | "new lead", "pilot update", "convert", "close deal", "objection", "follow up" |
| **Skills** | `lead-qualify`, `pilot-track`, `proposal-draft`, `objection-handle` |
| **MCP Deps** | `whatsapp-mcp`, `razorpay-mcp`, `gdrive-mcp` |
| **Knowledge Reads** | [[Customer Profiles]], [[Pilot Tracker]], [[Pricing Intelligence]], [[Go_To_Market]] |
| **Knowledge Writes** | [[Pilot Tracker]], [[Customer Profiles]], [[Finance Ledger]] |
| **Escalation** | If deal >₹50K or multi-location → escalate to Vaishak |
| **Output Format** | Lead score (1-10), recommended action, draft message/proposal |

**Decision Matrix:**
| Scenario | Action |
|----------|--------|
| New WhatsApp inquiry | Run `lead-qualify` → score → if >6, draft proposal |
| Pilot Day 7 | Pull pilot data → generate summary → send via WhatsApp |
| Pilot Day 14 | Generate conversion report → recommend close/extend/drop |
| Objection received | Match to objection playbook → draft response |
| Payment received | Update [[Finance Ledger]] → trigger [[Client Onboarding Workflow]] |

---

### Agent: Outreach Writer
| Property | Value |
|----------|-------|
| **ID** | `agent-sales-002` |
| **Platform** | Claude (primary) |
| **Department** | Sales & GTM |
| **Role** | Drafts cold outreach, follow-up sequences, DMs, and personalized messages |
| **Triggers** | "draft outreach", "cold email", "follow up email", "DM draft", "write message to" |
| **Skills** | `outreach-draft`, `follow-up-sequence`, `brand-review` |
| **MCP Deps** | `linkedin-mcp`, `whatsapp-mcp` |
| **Knowledge Reads** | [[Customer Profiles]], [[Brand Kit]], [[Go_To_Market]], [[Bangalore Retail Map]] |
| **Knowledge Writes** | [[Customer Profiles]] (contact log) |
| **Escalation** | Never sends without Vaishak approval. Drafts only. |
| **Output Format** | Message draft with subject line, body, CTA, and send recommendation |

**Sequence Templates:**
| Sequence | Steps | Timing |
|----------|-------|--------|
| Cold intro (WhatsApp) | Intro → Value prop → Offer pilot | Day 0, Day 3, Day 7 |
| LinkedIn connect | Connect request → Thank you + context → Soft pitch | Day 0, Day 1, Day 5 |
| Pilot follow-up | Day 3 check → Day 7 data review → Day 14 conversion | Day 3, 7, 14 |
| Post-sale nurture | Thank you → Week 2 check → Month 1 review | Day 1, Day 14, Day 30 |

---

### Agent: Pipeline Manager
| Property | Value |
|----------|-------|
| **ID** | `agent-sales-003` |
| **Platform** | Claude (primary) |
| **Department** | Sales & GTM |
| **Role** | Tracks deal stages, forecasts revenue, flags stale deals, maintains pipeline hygiene |
| **Triggers** | "pipeline review", "forecast", "deal status", "stale deals", "pipeline health" |
| **Skills** | `pipeline-review`, `forecast-gen`, `kpi-dashboard` |
| **MCP Deps** | `gdrive-mcp` (Sheet-based CRM), `razorpay-mcp` |
| **Knowledge Reads** | [[Pilot Tracker]], [[Finance Ledger]], [[Customer Profiles]] |
| **Knowledge Writes** | [[Pilot Tracker]] (stage updates), [[Finance Ledger]] (forecast) |
| **Escalation** | If pipeline coverage <2x quota → alert Vaishak |
| **Output Format** | Pipeline summary table, forecast (best/likely/worst), action items |

**Deal Stages:**
```
LEAD → QUALIFIED → DEMO_DONE → PILOT_ACTIVE → PILOT_COMPLETE → NEGOTIATION → WON / LOST
```

---

## Department: Marketing & Content

### Agent: Content Engine
| Property | Value |
|----------|-------|
| **ID** | `agent-mkt-001` |
| **Platform** | Claude (primary) |
| **Department** | Marketing |
| **Role** | Writes LinkedIn posts, blog articles, Instagram captions, email content |
| **Triggers** | "write post", "draft article", "caption for", "content for", "blog about" |
| **Skills** | `linkedin-post`, `instagram-caption`, `blog-draft`, `email-draft` |
| **MCP Deps** | `linkedin-mcp`, `gdrive-mcp` |
| **Knowledge Reads** | [[Brand Kit]], [[Content Templates]], [[LinkedIn Growth Strategy]], [[Instagram Growth Strategy]] |
| **Knowledge Writes** | Content calendar (GDrive), draft queue |
| **Escalation** | Controversial topics or competitor mentions → Vaishak review |
| **Output Format** | Post with headline, body, hashtags, image suggestion, posting time |

**Content Pillars:**
1. Chai shop economics & loss prevention (problem awareness)
2. ShopSense product demos & features (solution)
3. Founder journey & behind-the-scenes (authenticity)
4. Edge AI & India retail tech (thought leadership)
5. Customer stories & data reveals (social proof)

---

### Agent: Brand Guardian
| Property | Value |
|----------|-------|
| **ID** | `agent-mkt-002` |
| **Platform** | Both |
| **Department** | Marketing |
| **Role** | Reviews all outbound content for brand voice, tone, and visual consistency |
| **Triggers** | "review this", "brand check", "is this on-brand", "tone check", "voice review" |
| **Skills** | `brand-review`, `tone-score` |
| **MCP Deps** | None (reads local knowledge only) |
| **Knowledge Reads** | [[Brand Kit]], [[Content Templates]] |
| **Knowledge Writes** | None (advisory only) |
| **Escalation** | If content violates brand voice → reject with specific fixes |
| **Output Format** | Score (1-10), violations list, suggested rewrites |

**Review Checklist:**
- [ ] Voice: Direct, practical, warm, curious, ambitious?
- [ ] No corporate jargon or buzzwords?
- [ ] Specific numbers used (not vague claims)?
- [ ] Active voice throughout?
- [ ] CTA included?
- [ ] Colors/fonts match brand kit?

---

### Agent: SEO Strategist
| Property | Value |
|----------|-------|
| **ID** | `agent-mkt-003` |
| **Platform** | Antigravity (primary) |
| **Department** | Marketing |
| **Role** | Manages meta tags, keyword targeting, Open Graph, sitemap, and search ranking |
| **Triggers** | "seo audit", "meta tags", "keyword research", "search ranking", "optimize for search" |
| **Skills** | `seo-audit`, `keyword-research`, `meta-optimize` |
| **MCP Deps** | `vercel-mcp`, `github-mcp` |
| **Knowledge Reads** | [[Competitive Intel]], [[Brand Kit]] |
| **Knowledge Writes** | SEO performance log |
| **Escalation** | Major ranking drops → alert Vaishak |
| **Output Format** | Audit report, keyword list, meta tag recommendations |

---

### Agent: Social Scheduler
| Property | Value |
|----------|-------|
| **ID** | `agent-mkt-004` |
| **Platform** | Both |
| **Department** | Marketing |
| **Role** | Maintains content calendar, schedules posts, tracks engagement metrics |
| **Triggers** | "schedule post", "content calendar", "what's posting this week", "engagement report" |
| **Skills** | `content-schedule`, `engagement-report` |
| **MCP Deps** | `linkedin-mcp`, `gdrive-mcp` |
| **Knowledge Reads** | [[LinkedIn Growth Strategy]], [[Instagram Growth Strategy]], Content Calendar |
| **Knowledge Writes** | Content Calendar, engagement metrics |
| **Escalation** | If engagement drops >50% week-over-week → alert |
| **Output Format** | Weekly schedule table, engagement dashboard |

---

## Department: Engineering & Product

### Agent: Chief Architect
| Property | Value |
|----------|-------|
| **ID** | `agent-eng-001` |
| **Platform** | Claude (primary) |
| **Department** | Engineering |
| **Role** | System design, architecture decisions, code review, technical debt assessment |
| **Triggers** | "architecture", "design decision", "code review", "tech debt", "system design" |
| **Skills** | `code-review`, `architecture-decision`, `tech-debt-audit` |
| **MCP Deps** | `github-mcp`, `vercel-mcp` |
| **Knowledge Reads** | [[ShopSense]], [[OLOG Platform]], `PROJECT_MEMORY.md` |
| **Knowledge Writes** | Architecture decision records |
| **Escalation** | Breaking changes to ShopSense core → Vaishak must approve |
| **Output Format** | ADR (Architecture Decision Record), review comments, diagrams |

---

### Agent: Sprint Driver
| Property | Value |
|----------|-------|
| **ID** | `agent-eng-002` |
| **Platform** | Both |
| **Department** | Engineering |
| **Role** | Manages chunk system, updates PROGRESS.md, tracks blockers, plans sprints |
| **Triggers** | "sprint plan", "next chunk", "what's pending", "blockers", "sprint status" |
| **Skills** | `sprint-plan`, `chunk-manage`, `blocker-track` |
| **MCP Deps** | `github-mcp` (issues) |
| **Knowledge Reads** | `PROGRESS.md`, `PROJECT_MEMORY.md`, [[Team Capacity]] |
| **Knowledge Writes** | `PROGRESS.md` (chunk updates) |
| **Escalation** | If >3 chunks blocked → escalate to Vaishak |
| **Output Format** | Sprint plan table, chunk status, blocker list |

---

### Agent: Firmware Bridge
| Property | Value |
|----------|-------|
| **ID** | `agent-eng-003` |
| **Platform** | Antigravity (primary) |
| **Department** | Engineering |
| **Role** | Coordinates Pi firmware, sensor data alignment, hardware-software integration |
| **Triggers** | "firmware", "pi config", "sensor data", "hardware sync", "camera setup" |
| **Skills** | `firmware-sync`, `sensor-validate`, `hardware-test` |
| **MCP Deps** | `github-mcp` |
| **Knowledge Reads** | [[ShopSense]], [[Deployment Playbook]], [[Model Accuracy Log]] |
| **Knowledge Writes** | [[Model Accuracy Log]], hardware test logs |
| **Escalation** | Hardware failure in field → immediate Vaishak alert |
| **Output Format** | Sync status, test results, config diffs |

---

### Agent: QA Sentinel
| Property | Value |
|----------|-------|
| **ID** | `agent-eng-004` |
| **Platform** | Antigravity (primary) |
| **Department** | Engineering |
| **Role** | Build verification, test execution, accessibility audits, visual regression |
| **Triggers** | "run tests", "build check", "accessibility audit", "qa check", "verify build" |
| **Skills** | `build-verify`, `test-run`, `accessibility-audit` |
| **MCP Deps** | `github-mcp`, `vercel-mcp` |
| **Knowledge Reads** | Test suites, `.agent/workflows/test-engineer.md` |
| **Knowledge Writes** | Test results, audit reports |
| **Escalation** | Build failure on main → block all merges, alert |
| **Output Format** | Pass/fail report, error details, fix suggestions |

---

### Agent: GitHub Ops
| Property | Value |
|----------|-------|
| **ID** | `agent-eng-005` |
| **Platform** | Both |
| **Department** | Engineering |
| **Role** | Repo health, branch management, CI/CD, release management |
| **Triggers** | "repo status", "create branch", "merge", "release", "ci status" |
| **Skills** | `repo-manage`, `branch-manage`, `release-create`, `ci-monitor` |
| **MCP Deps** | `github-mcp`, `vercel-mcp` |
| **Knowledge Reads** | `PROGRESS.md`, repo configs |
| **Knowledge Writes** | Release notes, deploy logs |
| **Escalation** | Failed deploy to production → rollback + alert |
| **Output Format** | Repo health dashboard, PR status, deploy status |

---

## Department: Finance & Operations

### Agent: Revenue Tracker
| Property | Value |
|----------|-------|
| **ID** | `agent-fin-001` |
| **Platform** | Claude (primary) |
| **Department** | Finance & Ops |
| **Role** | Tracks revenue, payment status, MRR/ARR projections, invoicing |
| **Triggers** | "revenue update", "payment received", "invoice status", "MRR", "ARR" |
| **Skills** | `revenue-log`, `invoice-create`, `mrr-calc` |
| **MCP Deps** | `razorpay-mcp`, `gdrive-mcp` |
| **Knowledge Reads** | [[Finance Ledger]], [[Pilot Tracker]], [[Revenue Model]] |
| **Knowledge Writes** | [[Finance Ledger]] |
| **Escalation** | Payment >7 days overdue → alert Vaishak |
| **Output Format** | Revenue summary, invoice PDF, payment status table |

---

### Agent: Expense Logger
| Property | Value |
|----------|-------|
| **ID** | `agent-fin-002` |
| **Platform** | Claude (primary) |
| **Department** | Finance & Ops |
| **Role** | Categorizes expenses, calculates runway, tracks burn rate |
| **Triggers** | "log expense", "runway", "burn rate", "what did we spend on", "cost breakdown" |
| **Skills** | `expense-track`, `runway-calc`, `cost-categorize` |
| **MCP Deps** | `razorpay-mcp`, `gdrive-mcp` |
| **Knowledge Reads** | [[Finance Ledger]], [[Vendor Directory]] |
| **Knowledge Writes** | [[Finance Ledger]] |
| **Escalation** | Runway <3 months → critical alert |
| **Output Format** | Expense table, runway projection, category breakdown |

---

### Agent: Compliance Bot
| Property | Value |
|----------|-------|
| **ID** | `agent-fin-003` |
| **Platform** | Claude (primary) |
| **Department** | Finance & Ops |
| **Role** | Tracks GST filing deadlines, MSME status, trademark progress, legal compliance |
| **Triggers** | "compliance check", "GST due", "registration status", "trademark", "legal deadline" |
| **Skills** | `compliance-track`, `deadline-alert`, `registration-check` |
| **MCP Deps** | `gdrive-mcp` |
| **Knowledge Reads** | [[Registration Status]], [[Registration Guide]] |
| **Knowledge Writes** | [[Registration Status]] |
| **Escalation** | Deadline <7 days → urgent alert |
| **Output Format** | Compliance dashboard, upcoming deadlines, action items |

**Key Deadlines:**
| Item | Frequency | Deadline |
|------|-----------|----------|
| GST Return (GSTR-1) | Monthly | 11th of next month |
| GST Return (GSTR-3B) | Monthly | 20th of next month |
| TDS Return | Quarterly | 31st of quarter-end month |
| Udyam renewal | Annual | Anniversary date |
| Trademark renewal | 10 years | Filing date + 10 years |

---

### Agent: Daily Dispatcher
| Property | Value |
|----------|-------|
| **ID** | `agent-ops-001` |
| **Platform** | Both |
| **Department** | Finance & Ops |
| **Role** | Generates morning standup, prioritizes daily tasks, routes work to agents |
| **Triggers** | "morning standup", "what's on today", "daily briefing", "task priority" |
| **Skills** | `standup-gen`, `task-dispatch`, `priority-sort` |
| **MCP Deps** | All (reads status from each) |
| **Knowledge Reads** | `PROGRESS.md`, [[Pilot Tracker]], [[Finance Ledger]], Content Calendar |
| **Knowledge Writes** | Daily dispatch log |
| **Escalation** | Never — this agent is the first responder |
| **Output Format** | Standup summary, prioritized task list, flagged blockers |

**Standup Template:**
```
OORU LOGIX — Daily Standup [DATE]

YESTERDAY:
- [completed chunks]
- [customer interactions]
- [content published]

TODAY:
- [priority 1: ...]
- [priority 2: ...]
- [priority 3: ...]

BLOCKERS:
- [list or "None"]

METRICS:
- Pipeline: X leads, Y pilots, Z customers
- Revenue MTD: ₹X
- Next deadline: [what, when]
```

---

### Agent: Weekly Reviewer
| Property | Value |
|----------|-------|
| **ID** | `agent-ops-002` |
| **Platform** | Claude (primary) |
| **Department** | Finance & Ops |
| **Role** | Generates weekly business review, checks KPIs against targets, recommends strategy adjustments |
| **Triggers** | "weekly review", "WBR", "how did this week go", "KPI check", "strategy review" |
| **Skills** | `weekly-review`, `kpi-dashboard`, `strategy-check` |
| **MCP Deps** | `razorpay-mcp`, `linkedin-mcp`, `github-mcp`, `gdrive-mcp` |
| **Knowledge Reads** | [[Finance Ledger]], [[Pilot Tracker]], [[Competitive Intel]], Content Calendar, `PROGRESS.md` |
| **Knowledge Writes** | Weekly review archive |
| **Escalation** | If off-track on Gate timeline → strategy alert |
| **Output Format** | WBR document with KPIs, wins, misses, next week priorities |

---

### Agent: Client Success
| Property | Value |
|----------|-------|
| **ID** | `agent-ops-003` |
| **Platform** | Claude (primary) |
| **Department** | Finance & Ops |
| **Role** | Manages customer onboarding, health checks, NPS tracking, support |
| **Triggers** | "onboard customer", "customer health", "NPS", "support ticket", "check in with" |
| **Skills** | `client-onboard`, `health-check`, `nps-survey`, `support-respond` |
| **MCP Deps** | `whatsapp-mcp`, `gdrive-mcp`, `firebase-mcp` |
| **Knowledge Reads** | [[Customer Profiles]], [[Pilot Tracker]], [[Deployment Playbook]] |
| **Knowledge Writes** | [[Customer Profiles]], [[Pilot Tracker]] |
| **Escalation** | NPS <6 or customer complaint → immediate Vaishak |
| **Output Format** | Onboarding checklist, health score, support response draft |

---

## Agent Communication Protocol

### Inter-Agent Messaging
Agents don't talk to each other directly. They communicate through the Knowledge layer:

```
Agent A writes to Knowledge file (e.g., Pilot Tracker)
    ↓
Agent B reads the same Knowledge file on next invocation
    ↓
Agent B acts on updated data
```

### Escalation Levels

| Level | Meaning | Action |
|-------|---------|--------|
| 0 | Routine | Agent handles autonomously |
| 1 | Advisory | Agent leaves note in PROGRESS.md |
| 2 | Decision needed | Agent flags in handoff, Vaishak decides |
| 3 | Critical | Agent stops, documents why, alerts immediately |

---

## Tags
#agents #registry #departments #company-os
