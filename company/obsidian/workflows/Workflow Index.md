# Workflow Index — Ooru Logix Company OS

> **5 core workflows that automate daily company operations.**
> Each workflow: trigger → agents → skills → MCP → output.

---

## Active Workflows

| # | Workflow | Trigger | Frequency | Agents Involved | Primary Output |
|---|---------|---------|-----------|----------------|----------------|
| 1 | [[Daily Operations Workflow]] | 9:00 AM IST / "morning standup" | Daily | Daily Dispatcher | Standup + task list |
| 2 | [[Sales Pipeline Workflow]] | New lead / "new inquiry" | Event-driven | Deal Closer, Outreach Writer, Pipeline Manager | Qualified lead + proposal |
| 3 | [[Content Calendar Workflow]] | Monday 10:00 AM / "content this week" | Weekly | Content Engine, Brand Guardian, Social Scheduler | Week's content drafted |
| 4 | [[Weekly Business Review Workflow]] | Friday 5:00 PM / "weekly review" | Weekly | Weekly Reviewer | WBR document |
| 5 | [[Client Onboarding Workflow]] | Payment received / "onboard customer" | Event-driven | Client Success, Revenue Tracker | Customer fully set up |

---

# Daily Operations Workflow

**ID:** `workflow-daily-001`
**Trigger:** 9:00 AM IST automatic / manual "morning standup"
**Duration:** ~5 minutes
**Owner agent:** Daily Dispatcher

### Flow

```
[9:00 AM TRIGGER]
       │
       ▼
┌──────────────────────────────────┐
│ STEP 1: Read current state       │
│ Agent: Daily Dispatcher          │
│ Reads:                           │
│   • PROGRESS.md (chunk status)   │
│   • Pilot Tracker (active pilots)│
│   • Finance Ledger (MTD revenue) │
│   • Content Calendar (posts due) │
│   • WhatsApp inbox (new msgs)    │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 2: Generate standup         │
│ Skill: standup-gen               │
│ Output:                          │
│   • Yesterday summary            │
│   • Today's priorities (top 3)   │
│   • Blockers                     │
│   • Metrics snapshot             │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 3: Check for triggers       │
│ Agent: Daily Dispatcher          │
│ Checks:                          │
│   • New WhatsApp leads? → route  │
│     to Sales Pipeline Workflow   │
│   • Pilot check-in due? → route  │
│     to Deal Closer               │
│   • Content posting day? → route │
│     to Social Scheduler          │
│   • Compliance deadline <7d? →   │
│     alert Compliance Bot         │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 4: Dispatch to Vaishak      │
│ Output:                          │
│   • Standup summary (markdown)   │
│   • Prioritized task list        │
│   • Any triggered sub-workflows  │
│ Write to: Daily dispatch log     │
└──────────────────────────────────┘
```

### Example Output

```markdown
# Daily Standup — April 2, 2026 (Wednesday)

## Yesterday
- Completed C-OS-04 (Session Handover)
- Started C-OS-05 (Home.md rebuild)
- No customer interactions
- LinkedIn post #3 published (47 impressions)

## Today — Priority Stack
1. **C-OS-05 → C-OS-11**: Complete Company OS vault build
2. **C-MKT-01**: Push ShopSense to GitHub (BLOCKED — Vaishak action)
3. **LinkedIn**: Queue Thursday post from content calendar

## Blockers
- C-MKT-01 requires manual Git push by Vaishak

## Metrics
- Pipeline: 0 leads | 0 pilots | 0 customers
- Revenue MTD: ₹0
- LinkedIn followers: — | Posts this week: 1
- Gate 1 (first pilot): NOT STARTED
- Runway: >12 months (bootstrapped, ₹0 burn)
```

---

# Sales Pipeline Workflow

**ID:** `workflow-sales-001`
**Trigger:** New WhatsApp message / LinkedIn DM / "new lead from..."
**Duration:** ~10 minutes (qualification), then ongoing (pilot tracking)
**Owner agent:** Deal Closer

### Flow

```
[NEW LEAD TRIGGER]
       │
       ▼
┌──────────────────────────────────┐
│ STEP 1: Detect & capture lead    │
│ MCP: whatsapp-mcp (read_messages)│
│   or linkedin-mcp (connections)  │
│ Extract: name, shop type,        │
│   location, pain mentioned       │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 2: Qualify lead             │
│ Agent: Deal Closer               │
│ Skill: lead-qualify              │
│ Output: Score (1-10), tier,      │
│   recommended action             │
└──────────────┬───────────────────┘
               │
        ┌──────┴──────┐
        │             │
   Score ≥ 6     Score < 6
        │             │
        ▼             ▼
┌───────────┐  ┌───────────────┐
│ HOT/WARM  │  │ COLD — Nurture│
│           │  │ Add to list   │
│ Continue  │  │ Monthly check │
│ pipeline  │  │ No active     │
│           │  │ pursuit       │
└─────┬─────┘  └───────────────┘
      │
      ▼
┌──────────────────────────────────┐
│ STEP 3: Generate proposal        │
│ Agent: Deal Closer               │
│ Skill: proposal-draft            │
│ MCP: gdrive-mcp (save PDF)      │
│ Output: Personalized proposal    │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 4: Send to prospect         │
│ Agent: Deal Closer               │
│ Skill: sms-send                  │
│ MCP: whatsapp-mcp (send_document)│
│ Output: Proposal + intro message │
│ ⚠ Vaishak approves before send  │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 5: Update knowledge         │
│ Writes:                          │
│   • Pilot Tracker (new entry)    │
│   • Customer Profiles (new lead) │
│   • Finance Ledger (pipeline $)  │
│ Notify: Vaishak via standup      │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 6: Pilot tracking loop      │
│ (if prospect agrees to pilot)    │
│                                  │
│ Day 1: Deploy hardware           │
│ Day 3: Check-in call             │
│ Day 7: Data review + report      │
│ Day 14: Conversion decision      │
│                                  │
│ Skill: pilot-track (each day)    │
│ MCP: whatsapp-mcp (updates)      │
└──────────────┬───────────────────┘
               │
        ┌──────┴──────┐
        │             │
    CONVERT        DROP
        │             │
        ▼             ▼
┌───────────┐  ┌───────────────┐
│ Trigger   │  │ Log reason    │
│ Client    │  │ Update Pilot  │
│ Onboarding│  │ Tracker       │
│ Workflow  │  │ Nurture list  │
└───────────┘  └───────────────┘
```

---

# Content Calendar Workflow

**ID:** `workflow-content-001`
**Trigger:** Monday 10:00 AM IST / "content this week"
**Duration:** ~20 minutes
**Owner agent:** Content Engine

### Flow

```
[MONDAY 10:00 AM TRIGGER]
       │
       ▼
┌──────────────────────────────────┐
│ STEP 1: Review content calendar  │
│ Agent: Social Scheduler          │
│ Reads:                           │
│   • LinkedIn Growth Strategy     │
│   • Instagram Growth Strategy    │
│   • Last week's engagement data  │
│   • Any news/events this week    │
│ Output: This week's content plan │
│   (2 LinkedIn, 2 Instagram)      │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 2: Generate drafts          │
│ Agent: Content Engine            │
│ Skills:                          │
│   • linkedin-post (×2)           │
│   • instagram-caption (×2)       │
│ Output: 4 content pieces drafted │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 3: Brand review             │
│ Agent: Brand Guardian            │
│ Skill: brand-review              │
│ Each piece scored 1-10           │
│ Rewrites if score < 7            │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 4: Queue for publishing     │
│ Agent: Social Scheduler          │
│ MCP: gdrive-mcp (save drafts)   │
│ Schedule:                        │
│   Tue 9:30 AM — LinkedIn #1     │
│   Wed 6:00 PM — Instagram #1    │
│   Thu 9:30 AM — LinkedIn #2     │
│   Sat 11:00 AM — Instagram #2   │
│ ⚠ Vaishak reviews before publish│
└──────────────────────────────────┘
```

---

# Weekly Business Review Workflow

**ID:** `workflow-wbr-001`
**Trigger:** Friday 5:00 PM IST / "weekly review"
**Duration:** ~15 minutes
**Owner agent:** Weekly Reviewer

### Flow

```
[FRIDAY 5:00 PM TRIGGER]
       │
       ▼
┌──────────────────────────────────┐
│ STEP 1: Gather data              │
│ Agent: Weekly Reviewer           │
│ Reads:                           │
│   • PROGRESS.md (chunks done)    │
│   • Pilot Tracker (pipeline)     │
│   • Finance Ledger (rev/exp)     │
│   • Content Calendar (published) │
│   • Competitive Intel (updates)  │
│ MCP:                             │
│   • linkedin-mcp (post analytics)│
│   • github-mcp (commit/PR count) │
│   • razorpay-mcp (payments)      │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 2: Generate WBR             │
│ Skill: weekly-review             │
│ Sections:                        │
│   • Executive summary            │
│   • KPIs vs targets              │
│   • Sales pipeline update        │
│   • Marketing metrics            │
│   • Engineering velocity         │
│   • Financial snapshot           │
│   • Wins & misses                │
│   • Next week priorities         │
│   • Gate progress assessment     │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 3: Strategy check           │
│ Skill: strategy-check            │
│ Compare:                         │
│   • Actual vs roadmap timeline   │
│   • Burn rate vs runway          │
│   • Pipeline coverage vs target  │
│ Flag:                            │
│   • Off-track items              │
│   • Strategy pivots needed       │
│   • Gate timeline at risk?       │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 4: Save & notify            │
│ MCP: gdrive-mcp (save WBR doc)  │
│ Write: Weekly review archive     │
│ Notify: Vaishak                  │
│ Update: Product Focus Policy     │
│   gates if milestones hit        │
└──────────────────────────────────┘
```

### WBR Template

```markdown
# Weekly Business Review — Week of [DATE]

## Executive Summary
[2-3 sentences: biggest win, biggest concern, one number that matters]

## KPIs
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Leads generated | 3 | ? | 🟢/🟡/🔴 |
| Pilots active | 1 | ? | 🟢/🟡/🔴 |
| Revenue MTD | ₹X | ₹Y | 🟢/🟡/🔴 |
| LinkedIn posts | 2 | ? | 🟢/🟡/🔴 |
| Chunks completed | 5 | ? | 🟢/🟡/🔴 |
| Burn rate | ₹10.5K | ₹? | 🟢/🟡/🔴 |

## Sales Pipeline
[Funnel: leads → qualified → demo → pilot → conversion]

## Wins
- [what went well]

## Misses
- [what didn't happen and why]

## Next Week Priorities
1. [top priority]
2. [second]
3. [third]

## Gate Progress
- Current gate: Gate [X]
- Target date: [date]
- On track: YES/NO
- If NO: [what needs to change]
```

---

# Client Onboarding Workflow

**ID:** `workflow-onboard-001`
**Trigger:** Payment received / "onboard [customer name]"
**Duration:** 2-3 days (setup), then 14 days (monitoring)
**Owner agent:** Client Success

### Flow

```
[PAYMENT RECEIVED TRIGGER]
       │
       ▼
┌──────────────────────────────────┐
│ STEP 1: Confirm payment          │
│ Agent: Revenue Tracker           │
│ Skill: revenue-log               │
│ MCP: razorpay-mcp (verify)      │
│ Write: Finance Ledger            │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 2: Create customer accounts │
│ Agent: Client Success            │
│ Skill: client-onboard            │
│ MCP:                             │
│   • firebase-mcp (create user)   │
│   • gdrive-mcp (create folder)   │
│ Write:                           │
│   • Customer Profiles (new entry)│
│   • Pilot Tracker (status: PAID) │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 3: Welcome message          │
│ Agent: Client Success            │
│ MCP: whatsapp-mcp               │
│   (send_template: shopsense_     │
│    intro)                        │
│ Include:                         │
│   • Welcome message              │
│   • Installation date/time       │
│   • What to expect               │
│   • Vaishak's direct number      │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 4: Hardware prep            │
│ ⚠ VAISHAK MANUAL STEP           │
│   • Assemble ShopSense kit       │
│   • Flash Pi with latest firmware│
│   • Load trained models          │
│   • Test cameras + touchscreen   │
│   • Pack for delivery            │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 5: Installation             │
│ ⚠ VAISHAK ON-SITE               │
│   • Mount cameras                │
│   • Connect Pi nodes             │
│   • Configure WiFi               │
│   • Run calibration              │
│   • Train staff (15 min)         │
│   • Verify first detection       │
│ Update: Pilot Tracker → ACTIVE   │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│ STEP 6: Post-install monitoring  │
│ Agent: Client Success            │
│ Automated check-ins:             │
│                                  │
│ Day 1: Verify data flowing       │
│ Day 3: Call → "How's it going?"  │
│ Day 7: Data review with owner    │
│   Skill: pilot-track (report)    │
│   MCP: whatsapp-mcp (send report)│
│ Day 14: Full assessment          │
│ Day 30: NPS survey               │
│                                  │
│ Write: Customer Profiles, Pilot  │
│   Tracker (ongoing updates)      │
└──────────────────────────────────┘
```

---

## Workflow Dependencies

```
Daily Operations ──→ triggers Sales Pipeline (if new lead)
                 ──→ triggers Content Calendar (if content day)
                 ──→ triggers Compliance alerts

Sales Pipeline ──→ triggers Client Onboarding (on conversion)

Content Calendar ──→ feeds Weekly Business Review (engagement data)

Weekly Business Review ──→ informs next week's Daily Operations
                       ──→ informs Content Calendar topics

Client Onboarding ──→ feeds Daily Operations (pilot check-ins)
                  ──→ feeds Weekly Business Review (customer metrics)
```

---

## Tags
#workflows #automation #operations #company-os
