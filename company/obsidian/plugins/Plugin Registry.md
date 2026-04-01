# Plugin Registry — Ooru Logix Company OS

> **5 plugins: bundled Agent + Skill + MCP packages for each company function.**
> Plugins are composable departments you can activate, deactivate, or extend independently.

---

## What Is a Plugin?

A plugin bundles everything needed for one company function:

```
PLUGIN = AGENTS + SKILLS + MCP CONNECTIONS + KNOWLEDGE DEPS + WORKFLOWS
```

Plugins are **composable** — you can run `shopsense-sales` without `content-engine`. They share the Knowledge layer but don't depend on each other to function.

---

## Plugin: `shopsense-sales`

> **End-to-end ShopSense sales pipeline — from lead to paying customer.**

| Property | Value |
|----------|-------|
| **ID** | `plugin-sales-001` |
| **Version** | 1.0 |
| **Status** | Active |
| **Priority** | HIGHEST (serves ShopSense directly) |

### Agents Bundled
| Agent | Role in Plugin |
|-------|---------------|
| Deal Closer | Lead qualification, pilot management, conversion |
| Outreach Writer | Cold outreach, follow-up sequences |
| Pipeline Manager | Pipeline health, forecasting, hygiene |

### Skills Included
| Skill | Purpose |
|-------|---------|
| `lead-qualify` | Score inbound leads |
| `pilot-track` | Track 14-day pilots |
| `invoice-gen` | Create invoices + payment links |
| `proposal-draft` | Generate personalized proposals |
| `objection-handle` | Match objections to playbook |
| `outreach-draft` | Write cold outreach messages |
| `pipeline-review` | Weekly pipeline health check |
| `forecast-gen` | Revenue forecasting |

### MCP Dependencies
| Server | Tools Used |
|--------|-----------|
| `whatsapp-mcp` | send_text, send_template, send_document, read_messages |
| `razorpay-mcp` | payment_link_create, payment_link_status, invoice_create |
| `gdrive-mcp` | file_upload, folder_create, file_share |

### Knowledge Dependencies
| File | Access |
|------|--------|
| [[Customer Profiles]] | Read + Write |
| [[Pilot Tracker]] | Read + Write |
| [[Finance Ledger]] | Write (revenue events) |
| [[Go_To_Market]] | Read (playbook) |
| [[Pricing Intelligence]] | Read |
| [[Bangalore Retail Map]] | Read |

### Workflows Powered
| Workflow | Trigger |
|----------|---------|
| [[Sales Pipeline Workflow]] | New lead |
| [[Client Onboarding Workflow]] | Payment received (handoff) |

### Activation Checklist
- [ ] WhatsApp Business API access configured
- [ ] Razorpay account active with API keys
- [ ] Google Drive folder structure created
- [ ] Customer Profiles template populated
- [ ] Pilot Tracker initialized
- [ ] Go-To-Market strategy reviewed

---

## Plugin: `content-engine`

> **Marketing content creation, review, and publishing across LinkedIn and Instagram.**

| Property | Value |
|----------|-------|
| **ID** | `plugin-mkt-001` |
| **Version** | 1.0 |
| **Status** | Active |
| **Priority** | HIGH (brand awareness for ShopSense) |

### Agents Bundled
| Agent | Role in Plugin |
|-------|---------------|
| Content Engine | Writes posts, articles, captions |
| Brand Guardian | Reviews all content for voice/tone |
| SEO Strategist | Optimizes for search and discovery |
| Social Scheduler | Maintains calendar, tracks engagement |

### Skills Included
| Skill | Purpose |
|-------|---------|
| `linkedin-post` | Generate LinkedIn posts |
| `instagram-caption` | Generate Instagram captions |
| `blog-draft` | Write long-form articles |
| `brand-review` | Audit content against brand kit |
| `seo-audit` | SEO health check |
| `content-schedule` | Manage posting calendar |
| `engagement-report` | Track post performance |

### MCP Dependencies
| Server | Tools Used |
|--------|-----------|
| `linkedin-mcp` | post_create, post_analytics, comment_reply |
| `gdrive-mcp` | file_upload, sheet_write (content calendar) |
| `vercel-mcp` | deploy_trigger (blog deploys) |

### Knowledge Dependencies
| File | Access |
|------|--------|
| [[Brand Kit]] | Read |
| [[Content Templates]] | Read |
| [[LinkedIn Growth Strategy]] | Read |
| [[Instagram Growth Strategy]] | Read |
| [[Competitive Intel]] | Read |

### Workflows Powered
| Workflow | Trigger |
|----------|---------|
| [[Content Calendar Workflow]] | Monday 10:00 AM |

### Content Cadence
| Platform | Frequency | Day/Time |
|----------|-----------|----------|
| LinkedIn | 2x/week | Tue 9:30 AM, Thu 9:30 AM |
| Instagram | 2x/week | Wed 6:00 PM, Sat 11:00 AM |
| Blog | 1x/month | First Monday |

### Activation Checklist
- [ ] LinkedIn OAuth configured
- [ ] Brand Kit reviewed and approved
- [ ] Content calendar template created in GDrive
- [ ] First 4 posts pre-drafted and approved
- [ ] Instagram business profile created

---

## Plugin: `dev-ops`

> **Engineering workflow automation — sprints, code review, deployments.**

| Property | Value |
|----------|-------|
| **ID** | `plugin-eng-001` |
| **Version** | 1.0 |
| **Status** | Active |
| **Priority** | HIGH (ShopSense development velocity) |

### Agents Bundled
| Agent | Role in Plugin |
|-------|---------------|
| Chief Architect | Architecture decisions, code review |
| Sprint Driver | Chunk management, sprint planning |
| Firmware Bridge | Pi hardware-software sync |
| QA Sentinel | Build verification, testing |
| GitHub Ops | Repo health, CI/CD, releases |

### Skills Included
| Skill | Purpose |
|-------|---------|
| `code-review` | Review PRs |
| `sprint-plan` | Plan sprints from PROGRESS.md |
| `deploy-check` | Pre-deploy verification |
| `firmware-sync` | Hardware config alignment |
| `bug-triage` | Categorize and assign bugs |
| `repo-manage` | Repo health operations |

### MCP Dependencies
| Server | Tools Used |
|--------|-----------|
| `github-mcp` | All tools (repos, PRs, issues, actions, releases) |
| `vercel-mcp` | deploy_trigger, deploy_status, logs_fetch |
| `firebase-mcp` | hosting_deploy, firestore_read |

### Knowledge Dependencies
| File | Access |
|------|--------|
| `PROGRESS.md` | Read + Write |
| `PROJECT_MEMORY.md` | Read + Write |
| [[ShopSense]] | Read |
| [[OLOG Platform]] | Read |
| [[Model Accuracy Log]] | Read + Write |
| [[Team Capacity]] | Read |

### Activation Checklist
- [ ] GitHub PAT configured with repo, workflow, admin scopes
- [ ] Vercel token configured
- [ ] Firebase service account configured
- [ ] All repos (OLOG, ShopSense) accessible
- [ ] CI/CD workflows defined in .github/workflows/

---

## Plugin: `finance-hub`

> **Financial operations, invoicing, compliance, and runway tracking.**

| Property | Value |
|----------|-------|
| **ID** | `plugin-fin-001` |
| **Version** | 1.0 |
| **Status** | Active |
| **Priority** | MEDIUM (critical for Gate tracking, not daily urgency yet) |

### Agents Bundled
| Agent | Role in Plugin |
|-------|---------------|
| Revenue Tracker | Revenue events, invoicing, MRR |
| Expense Logger | Cost tracking, runway, burn rate |
| Compliance Bot | GST, MSME, trademark, legal deadlines |

### Skills Included
| Skill | Purpose |
|-------|---------|
| `revenue-log` | Record revenue events |
| `expense-track` | Log and categorize expenses |
| `invoice-create` | Generate ShopSense invoices |
| `gst-calc` | Calculate GST liability |
| `runway-calc` | Compute runway from burn |
| `compliance-track` | Monitor deadlines |
| `deadline-alert` | Send deadline warnings |

### MCP Dependencies
| Server | Tools Used |
|--------|-----------|
| `razorpay-mcp` | payment_fetch, settlement_fetch, invoice_create |
| `gdrive-mcp` | sheet_write, file_upload (receipts) |

### Knowledge Dependencies
| File | Access |
|------|--------|
| [[Finance Ledger]] | Read + Write |
| [[Revenue Model]] | Read |
| [[Registration Status]] | Read + Write |
| [[Vendor Directory]] | Read + Write |

### Key Financial Thresholds
| Threshold | Trigger |
|-----------|---------|
| Monthly burn >₹20K | Alert Vaishak |
| Runway <3 months | Critical alert |
| GST deadline <7 days | Reminder |
| Payment >7 days overdue | Collection follow-up |

### Activation Checklist
- [ ] Razorpay account with API keys
- [ ] Finance Ledger template initialized
- [ ] Registration Status populated
- [ ] GST registration complete (when applicable)
- [ ] Business bank account opened

---

## Plugin: `company-brain`

> **Cross-functional operations intelligence — the glue that ties everything together.**

| Property | Value |
|----------|-------|
| **ID** | `plugin-ops-001` |
| **Version** | 1.0 |
| **Status** | Active |
| **Priority** | HIGH (coordinates all other plugins) |

### Agents Bundled
| Agent | Role in Plugin |
|-------|---------------|
| Daily Dispatcher | Morning standup, task routing |
| Weekly Reviewer | WBR generation, KPI tracking |
| Client Success | Customer health, NPS, support |

### Skills Included
| Skill | Purpose |
|-------|---------|
| `standup-gen` | Daily standup generation |
| `weekly-review` | Weekly business review |
| `kpi-dashboard` | Cross-department KPIs |
| `client-onboard` | Customer setup checklist |
| `health-check` | Customer health scoring |
| `nps-survey` | NPS collection and tracking |
| `task-dispatch` | Route work to correct agents |

### MCP Dependencies
| Server | Tools Used |
|--------|-----------|
| All 7 servers | Reads status from each |

### Knowledge Dependencies
| File | Access |
|------|--------|
| `PROGRESS.md` | Read |
| [[Pilot Tracker]] | Read |
| [[Finance Ledger]] | Read |
| [[Customer Profiles]] | Read + Write |
| Content Calendar | Read |
| [[Competitive Intel]] | Read |

### Workflows Powered
| Workflow | Trigger |
|----------|---------|
| [[Daily Operations Workflow]] | 9:00 AM daily |
| [[Weekly Business Review Workflow]] | Friday 5:00 PM |
| [[Client Onboarding Workflow]] | Payment received |

### Activation Checklist
- [ ] All knowledge files initialized with templates
- [ ] PROGRESS.md up to date
- [ ] At least one other plugin active (to have data to report on)

---

## Plugin Dependency Map

```
                    ┌──────────────┐
                    │ company-brain│
                    │  (orchestr.) │
                    └──────┬───────┘
                           │
              reads from all plugins
                           │
         ┌─────────┬───────┴────┬──────────┐
         │         │            │          │
    ┌────▼───┐ ┌───▼────┐ ┌────▼───┐ ┌────▼────┐
    │shopsense│ │content-│ │dev-ops │ │finance- │
    │-sales  │ │engine  │ │        │ │hub      │
    └────┬───┘ └───┬────┘ └────┬───┘ └────┬────┘
         │         │            │          │
         │    ┌────┘            │          │
         │    │                 │          │
    ┌────▼────▼─────────────────▼──────────▼────┐
    │           KNOWLEDGE LAYER                  │
    │  (shared by all plugins, single truth)     │
    └────────────────────────────────────────────┘
```

---

## Tags
#plugins #registry #departments #composable #company-os
