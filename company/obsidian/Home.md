# Ooru Logix — Company Command Center

> **AI-native company OS** — Agents, Skills, Knowledge, MCP Servers, Plugins
> Founded 2026, Bangalore | Vaishak (Founder & Senior Dev)

---

## System Status

| Layer | Status | Count | Health |
|-------|--------|-------|--------|
| [[Agent Registry]] | Active | 18 agents | Operational |
| [[Skill Catalog]] | Active | 28 skills | Operational |
| [[Knowledge Base]] | Active | 12 knowledge files | Current |
| [[MCP Architecture]] | Configured | 7 servers | Awaiting credentials |
| [[Plugin Registry]] | Defined | 5 plugins | Ready to activate |

---

## Product Focus

> **ShopSense is the ONLY active product.** Everything else is frozen/paused until Gate 2.
> See [[Product_Focus_Policy]] for gate definitions.

| Gate | Target | Metric | Status |
|------|--------|--------|--------|
| Gate 1 | April 2026 | First free pilot deployed | ⬜ Pending |
| Gate 2 | May 2026 | First paying customer (₹25K) | ⬜ Pending |
| Gate 3 | Aug 2026 | 3 paying customers | ⬜ Pending |
| Gate 4 | Nov 2026 | 5 paying customers | ⬜ Pending |
| Gate 5 | Q2 2027 | 20 customers, ₹50K+/mo MRR | ⬜ Pending |

---

## Daily Operations Checklist

```
Morning (9:00 AM):
□ Run [[Daily Operations Workflow]] → generates standup
□ Check [[Pilot Tracker]] for active pilot status
□ Check WhatsApp for inbound leads
□ Review PROGRESS.md for today's chunk

Afternoon (2:00 PM):
□ Execute assigned chunk (C-XX)
□ Update PROGRESS.md on completion
□ If customer interaction → update [[Customer Profiles]]

Evening (6:00 PM):
□ Log any revenue/expenses → [[Finance Ledger]]
□ Write handoff note if switching agents
□ Queue tomorrow's LinkedIn post → [[Content Calendar Workflow]]
```

---

## The Five Layers

### Layer 1: Agents → [[Agent Registry]]
18 autonomous AI workers across 4 departments. Each has defined triggers, skills, and escalation rules. Agents are stateless — they read knowledge, act, and write back.

| Department | Agents | Primary Platform |
|------------|--------|-----------------|
| Sales & GTM | Deal Closer, Outreach Writer, Pipeline Manager | Claude |
| Marketing | Content Engine, Brand Guardian, SEO Strategist, Social Scheduler | Both |
| Engineering | Chief Architect, Sprint Driver, Firmware Bridge, QA Sentinel, GitHub Ops | Both |
| Finance & Ops | Revenue Tracker, Expense Logger, Compliance Bot, Daily Dispatcher, Weekly Reviewer, Client Success | Claude |

### Layer 2: Skills → [[Skill Catalog]]
Executable capabilities agents invoke. Pure functions: inputs → outputs, side effects only via MCP.

| Category | Key Skills |
|----------|-----------|
| Sales | lead-qualify, pilot-track, invoice-gen, proposal-draft, objection-handle |
| Marketing | linkedin-post, instagram-caption, blog-draft, brand-review, seo-audit |
| Engineering | code-review, sprint-plan, bug-triage, deploy-check, firmware-sync |
| Finance & Ops | revenue-log, expense-track, gst-calc, standup-gen, weekly-review, client-onboard |

### Layer 3: Knowledge → [[Knowledge Base]]
Persistent memory that survives across sessions. Sacred files are append-only.

| Domain | Key Files |
|--------|----------|
| ShopSense | [[Pilot Tracker]], [[Customer Profiles]], [[Deployment Playbook]], [[Model Accuracy Log]] |
| Market | [[Competitive Intel]], [[Bangalore Retail Map]], [[Pricing Intelligence]] |
| Operations | [[Finance Ledger]], [[Registration Status]], [[Vendor Directory]], [[Team Capacity]] |

### Layer 4: MCP Servers → [[MCP Architecture]]
7 authenticated bridges to external platforms.

| Server | Platform | Key Capability |
|--------|----------|---------------|
| `github-mcp` | GitHub | Repos, PRs, issues, CI/CD |
| `firebase-mcp` | Firebase | Firestore, Auth, Analytics |
| `razorpay-mcp` | Razorpay | Payments, invoices, settlements |
| `whatsapp-mcp` | WhatsApp Business | Messages, templates, media |
| `linkedin-mcp` | LinkedIn | Posts, analytics, engagement |
| `gdrive-mcp` | Google Drive | File storage, Sheets, Docs |
| `vercel-mcp` | Vercel | Deployments, domains, logs |

### Layer 5: Plugins → [[Plugin Registry]]
Bundled department packages combining agents + skills + MCP.

| Plugin | Function |
|--------|---------|
| `shopsense-sales` | End-to-end ShopSense sales pipeline |
| `content-engine` | Marketing content creation and publishing |
| `dev-ops` | Engineering workflow automation |
| `finance-hub` | Financial operations and compliance |
| `company-brain` | Cross-functional operations intelligence |

---

## Workflows → [[Workflow Index]]

| Workflow | Trigger | Frequency | Output |
|----------|---------|-----------|--------|
| [[Daily Operations Workflow]] | 9:00 AM IST | Daily | Standup, task list, blockers |
| [[Sales Pipeline Workflow]] | New lead detected | Event-driven | Qualified lead, proposal sent |
| [[Content Calendar Workflow]] | Monday 10:00 AM | Weekly | Week's posts drafted and queued |
| [[Weekly Business Review Workflow]] | Friday 5:00 PM | Weekly | KPI dashboard, strategy check |
| [[Client Onboarding Workflow]] | New customer signed | Event-driven | Setup complete, pilot deployed |

---

## Quick Navigation

**Starting your day?**
→ [[Daily Operations Workflow]] → Check [[Pilot Tracker]] → Review `PROGRESS.md`

**New lead came in?**
→ [[Sales Pipeline Workflow]] → [[Customer Profiles]] → [[Pilot Tracker]]

**Writing content?**
→ [[Content Calendar Workflow]] → [[Brand Kit]] → [[Content Templates]]

**Working on ShopSense?**
→ [[ShopSense]] → `PROGRESS.md` → `.agent/workflows/`

**Checking finances?**
→ [[Finance Ledger]] → [[Revenue Model]] → [[Registration Status]]

**Onboarding a customer?**
→ [[Client Onboarding Workflow]] → [[Deployment Playbook]] → [[Customer Profiles]]

---

## Architecture Reference

→ [[Company OS Architecture]] — Master 5-layer blueprint
→ [[ORCHESTRATION_MASTER]] — Claude + Antigravity coordination protocol
→ [[AGENT_DISPATCH]] — Live dispatch board and decision matrix
→ [[Product_Focus_Policy]] — ShopSense-first enforcement

---

## Vault Stats

| Metric | Value |
|--------|-------|
| Total vault files | 90+ |
| Agent workflow files | 22 |
| Obsidian knowledge files | 50+ |
| Company doc files | 20+ |
| MCP servers defined | 7 |
| Plugins defined | 5 |
| Workflows defined | 5 |
| Last updated | April 2026 |

---

#home #dashboard #company-os
