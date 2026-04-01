# Scheduler Skill — Ooru Logix Automation System

**Purpose:** Define all recurring scheduled workflows, trigger-based automations, and timing cadences for the Ooru Logix Company OS.

**Scope:** Daily, weekly, monthly automations + event-driven triggers. Master schedule for all company operations.

---

## System Overview

The Scheduler coordinates:
- **Daily automations** (6 touchpoints)
- **Weekly automations** (5 recurring reviews)
- **Monthly automations** (5 business closes)
- **Trigger-based automations** (5 event-driven flows)

All scheduled tasks write state to Obsidian knowledge files and coordinate agent dispatch via Slack.

---

## Daily Automation Schedule

### 8:00 AM — Morning Briefing

**Agent:** Daily Dispatcher
**Skill:** `morning-briefing`
**Input sources:**
- `obsidian/knowledge/operations/PROGRESS.md` (what's being worked on)
- Slack (unread messages in #standup, @mentions)
- Google Calendar (today's meetings)
- Firestore `registrations` collection (new signups since yesterday)
- Git log (commits from last 24h)

**Output destinations:**
- Slack `#standup` channel (markdown briefing)
- `obsidian/knowledge/operations/Daily_Briefing_[DATE].md` (knowledge append)
- Email to Vaishak (if any P0 blockers)

**Briefing structure:**
```
# Morning Briefing — [DATE]

## Yesterday Summary
- Completed chunks: [list from PROGRESS.md]
- Pipeline activity: [new leads, deal updates]
- Metrics: [revenue, pilot accuracy, content engagement]

## Today — Priorities (Ranked by Revenue Impact)
1. [Highest revenue impact task]
2. [Second highest]
3. [Third]

## Scheduled Meetings
- [Time] — [Meeting] (duration, attendees)

## Blockers & Alerts
- [Critical items blocking progress]
- [Escalations needed]

## Daily Metrics Snapshot
- Active pilots: [count]
- MTD revenue: ₹[amount]
- Lead pool: [new registrations count]
- Content engagement: [likes/shares from yesterday]
```

**Error handling:**
- If PROGRESS.md missing → create empty template
- If Slack unreachable → skip Slack metrics, proceed with available data
- If calendar unavailable → briefing proceeds without meeting schedule
- If any critical blocker detected → add "ESCALATION NEEDED" banner

**Escalation trigger:**
- Database error or data unavailable for >2 hours → escalate to Vaishak

---

### 8:30 AM — Sales Pipeline Check

**Agent:** Deal Closer / Sales Prospector
**Skill:** `sales-pipeline-check`
**Input sources:**
- Firestore `leads` collection:
  - Filter: `status` in ('new', 'qualified', 'contacted')
  - Sort by: `lead_score DESC`, `created_at DESC`
- Firestore `pilots` collection:
  - Filter: `status` = 'active'
  - Sort by: `started_at ASC` (oldest first)
- Apollo API (lead enrichment data)
- Common Room (account signals)

**Output destinations:**
- Slack `#sales` channel (daily standup)
- `obsidian/knowledge/operations/Sales_Pipeline_[DATE].md`
- Firestore `daily_metrics/sales_[DATE]` collection

**Pipeline check structure:**
```
# Sales Pipeline — [DATE]

## New Registrations (Last 24h)
| Lead Name | Company | Interest | Lead Score | Action |
|-----------|---------|----------|-----------|--------|
| [name] | [company] | [product interest] | [0-100] | Qualify |

## Follow-up Due (This Week)
| Lead | Last Contact | Days Since | Next Step | Priority |
|------|------------|-----------|-----------|----------|
| [name] | [date] | [days] | [action] | High/Med/Low |

## Active Pilots
| Pilot Name | Started | Accuracy | Status | Alert |
|-----------|---------|----------|--------|-------|
| [name] | [date] | [%] | [status] | [any anomaly] |

## Deal Pipeline Summary
- Qualified in queue: [count]
- Expected follow-ups: [count]
- Pilots requiring check-in: [count]
```

**Automation logic:**
- For each new lead: run through `lead-automation` workflow (see workflows/lead-automation.md)
- For each lead with `next_followup_date <= today`: create task for Deal Closer
- For each active pilot: schedule accuracy check for 9 AM (separate trigger)
- For any lead > 30 days without contact: mark as `dead_lead`, trigger win-back campaign

**Error handling:**
- If Firestore connection fails → retry up to 3 times, then alert Vaishak
- If Apollo API rate-limited → use cached data, log incident
- If no new leads → still generate report, note in metrics

**Escalation trigger:**
- Pilot accuracy dropped >10% overnight → immediate alert to Vaishak

---

### 9:00 AM — Standup Generation

**Agent:** Daily Dispatcher / Sprint Planner
**Skill:** `standup-gen`
**Input sources:**
- `obsidian/knowledge/operations/PROGRESS.md` (current sprint chunk)
- Git log (commits from yesterday)
- Firestore `daily_standups` collection (previous standup for context)
- Sprint schedule from `sprint-planner/SKILL.md`

**Output destinations:**
- Slack `#standup` thread (formatted standup)
- `obsidian/knowledge/operations/Daily_Standup_[DATE].md` (appended to knowledge)
- Firestore `standups/[DATE]` document

**Standup structure:**
```
# Standup — [DATE] [DAY]

## Yesterday
- Completed: [completed chunk]
- Blockers: [what stopped progress]
- Learnings: [what was discovered]

## Today
- Chunk: [chunk ID] — [description]
- Expected output: [deliverable]
- Dependencies: [what needs to be unblocked]

## Blockers
- [Blocker 1]: Waiting for [reason], unblocks [what]
- [Blocker 2]: [reason], unblocks [what]

## Metrics
- Progress: [% of sprint complete]
- Code commits: [count]
- PRs reviewed: [count]
```

**Automation logic:**
- Extract previous day's chunk from PROGRESS.md
- Parse git log to find all commits from last 24h
- Pull yesterday's standup for continuity
- Generate today's standup based on sprint plan

**Error handling:**
- If git log unavailable → note in standup, continue with PROGRESS.md
- If PROGRESS.md outdated (>24h old) → add alert to standup
- If blocker detected from PROGRESS.md → escalate

**Escalation trigger:**
- Any blocker marked "CRITICAL" → immediate alert to Vaishak

---

### 12:00 PM — Content Queue Check

**Agent:** Content Engine / Brand Guardian
**Skill:** `content-queue-check`
**Input sources:**
- Google Drive `ShopSense/Content Calendar` (scheduled posts)
- `obsidian/knowledge/marketing/Content_Calendar.md`
- Slack `#content` channel (approvals/feedback)
- Buffer/Later API (scheduled posts status)

**Output destinations:**
- Slack `#content` channel (status update)
- `obsidian/knowledge/marketing/Daily_Content_[DATE].md`
- Buffer/Later (auto-publish approved posts)

**Content queue structure:**
```
# Content Queue — [DATE]

## Ready to Publish Today
| Content | Type | Platform | Time | Status |
|---------|------|----------|------|--------|
| [title] | [blog/post/caption] | [LinkedIn/Instagram/Twitter] | [time] | READY |

## Awaiting Review
| Content | Type | Submitted | Reviewer | Status |
|---------|------|-----------|----------|--------|
| [title] | [type] | [date] | [reviewer] | PENDING |

## Publishing Schedule (This Week)
| Day | Content | Platforms | Time |
|-----|---------|-----------|------|
| [day] | [title] | [platforms] | [time] |

## Engagement Metrics (Last 7 Days)
- LinkedIn impressions: [count]
- Instagram reaches: [count]
- Blog views: [count]
```

**Automation logic:**
- For each scheduled post: check if approved (Brand Guardian review complete)
- If approved and publish time has passed → publish to Buffer/Later
- If awaiting review for >24h → escalate to Brand Guardian
- At 12 PM, publish all posts scheduled for "now" or past

**Error handling:**
- If Buffer API unavailable → hold in queue, alert team
- If content missing approval → do NOT publish, create escalation task
- If platform rate-limited → queue for next available slot

**Escalation trigger:**
- Any content awaiting review >48h → escalate to Brand Guardian
- Publishing failed for >2 attempts → alert Vaishak

---

### 5:00 PM — Daily Close

**Agent:** Finance Tracker / Ops Manager
**Skill:** `daily-close`
**Input sources:**
- Firestore `transactions` collection (revenue/expenses from today)
- Firestore `pilots` collection (pilot updates)
- Google Drive `ShopSense/Financials` (expense receipts)
- `obsidian/knowledge/financials/Finance_Ledger.md`

**Output destinations:**
- `obsidian/knowledge/financials/Daily_Close_[DATE].md`
- Firestore `daily_metrics/close_[DATE]` document
- Google Sheets `ShopSense/Metrics Dashboard` (auto-update)

**Daily close structure:**
```
# Daily Close — [DATE]

## Revenue Captured
| Transaction ID | Customer | Amount | Status |
|----------------|----------|--------|--------|
| [txn-id] | [name] | ₹[amount] | [captured/pending] |

**Total MTD Revenue:** ₹[amount]
**Target (Gate 2):** ₹25,000
**Progress:** [%]

## Expenses Logged
| Category | Description | Amount | Approved |
|----------|-------------|--------|----------|
| [category] | [description] | ₹[amount] | [yes/no] |

**Total MTD Expenses:** ₹[amount]

## Pilot Metrics
- Active pilots: [count]
- Accuracy checks run: [count]
- Issues found: [count]

## Key Metrics
- Lead pool size: [count]
- Pipeline value: ₹[estimated]
- Burn rate (daily): ₹[amount]
- Runway: [days at current burn]
```

**Automation logic:**
- Pull all Firestore transactions from today
- Match to customers, aggregate by type
- Update MTD totals in knowledge file
- Calculate burn rate based on weekly expense average
- Check if any revenue milestones reached (Gate 2 → ₹25K?)
- If revenue milestone reached → trigger celebration/escalation workflow

**Error handling:**
- If transactions missing → list as "pending capture"
- If customer match fails → create manual review task
- If data >2h old → flag as stale, escalate

**Escalation trigger:**
- Daily burn >₹5,000 → escalate to Vaishak
- Any revenue transaction pending >24h → escalate to Finance Tracker
- If Gate 2 milestone reached (₹25K) → immediate celebration alert

---

### 9:00 PM — Night Review

**Agent:** Ops Manager
**Skill:** `night-review`
**Input sources:**
- PROGRESS.md (today's completion)
- `obsidian/knowledge/operations/Daily_Standup_[DATE].md`
- `obsidian/knowledge/operations/Daily_Close_[DATE].md`
- Tomorrow's calendar from Google Calendar

**Output destinations:**
- Slack `#standup` (evening summary)
- `obsidian/knowledge/operations/Night_Review_[DATE].md`
- `obsidian/knowledge/operations/Tomorrow_Priorities.md` (append)

**Night review structure:**
```
# Night Review — [DATE]

## Today's Summary
- Completed chunks: [list]
- Blockers unresolved: [list]
- Revenue captured: ₹[amount]
- Content published: [count]

## Tomorrow's Schedule
- [Time] — [Meeting]
- [Time] — [Meeting]

## Tomorrow's Priorities
1. [Highest impact]
2. [Second highest]
3. [Third]

## Blocked Items (Carry Over)
- [Blocker 1]: [status], [when unblocks]
- [Blocker 2]: [status], [when unblocks]

## Evening Metrics
- Daily burn: ₹[amount]
- Progress to Gate 2: [% to ₹25K]
```

**Automation logic:**
- Summarize today's progress from PROGRESS.md
- Identify any unresolved blockers from standup
- Pull tomorrow's calendar events
- Generate priority ranking for tomorrow
- Flag any blocked items that need escalation

**Error handling:**
- If PROGRESS.md not updated by 8 PM → add alert, escalate
- If blockers unresolved → add reminder to Morning Briefing

**Escalation trigger:**
- Any blocker unresolved >2 days → escalate to Vaishak
- Tomorrow's first meeting in <1 hour and unprepared → alert

---

## Weekly Automation Schedule

### Monday 9:00 AM — Sprint Planning

**Agent:** Sprint Planner
**Skill:** `sprint-planning` (from sprint-planner/SKILL.md)
**Duration:** 1 hour
**Input sources:**
- Firestore `backlog` collection
- `obsidian/knowledge/operations/Blockers_Queue.md` (carry-over items)
- Previous sprint metrics (velocity)
- Current capacity (Vaishak's available hours)

**Output destinations:**
- `obsidian/knowledge/operations/Sprint_[WEEK]_Plan.md`
- PROGRESS.md (reset for new sprint)
- Slack `#standup` (sprint goals announcement)

**Process:**
1. Estimate backlog items (story points)
2. Calculate sprint capacity (28 hours baseline)
3. Commit items (target 18-24 points)
4. Create daily chunks (1-2 per day)
5. Identify risks and dependencies

See `sprint-planner/SKILL.md` for detailed estimation guide.

---

### Wednesday 2:00 PM — Content Review

**Agent:** Brand Guardian
**Skill:** `brand-review`
**Input sources:**
- All drafts in Google Drive `ShopSense/Content/Drafts`
- `obsidian/knowledge/brand/Brand_Guidelines.md`
- Previous published content (tone/style reference)

**Output destinations:**
- Google Drive feedback comments
- Slack `#content` (approval/revision summary)
- `obsidian/knowledge/marketing/Content_Review_[WEEK].md`

**Review criteria:**
- Voice & tone match brand guidelines
- Value proposition clear (ShopSense benefit)
- No competitor mentions without context
- CTA appropriate and conversion-focused
- Images/graphics on-brand

**Automation logic:**
- Scan all drafts for brand compliance
- Comment on drafts needing revision
- Flag approved drafts for publishing queue
- Compile weekly review summary

---

### Friday 4:00 PM — Weekly Business Review

**Agent:** Weekly Reviewer (Ops Manager)
**Skill:** `weekly-business-review`
**Duration:** 1-2 hours
**Input sources:**
- `obsidian/knowledge/financials/Daily_Close_*.md` (all 7 days)
- `obsidian/knowledge/operations/Sales_Pipeline_*.md`
- Git commits (velocity metric)
- Firestore `pilots` (pilot status)
- Google Analytics (content performance)

**Output destinations:**
- `obsidian/knowledge/operations/Weekly_Review_[DATE].md` (WBR document)
- Slack `#executive` (summary for Vaishak)
- `obsidian/knowledge/operations/Strategy_Decisions.md` (append decisions)

**WBR structure:**
```
# Weekly Business Review — Week of [DATE]

## Gate Progress (Gate 2: First Paying Customer by May 2026)
- Target: ₹25K revenue
- Current: ₹[amount]
- Progress: [%]
- Runway: [weeks]

## Financial Summary
- Revenue: ₹[total for week]
- Expenses: ₹[total for week]
- Burn rate: ₹[per day]
- Cash position: ₹[remaining]

## Sales Pipeline
- New leads: [count]
- Qualified: [count]
- In demo/trial: [count]
- Expected close: ₹[amount]

## Product Metrics
- Active pilots: [count]
- Pilot accuracy: [% avg]
- Issues reported: [count]

## Content Performance
- LinkedIn impressions: [count]
- Engagement rate: [%]
- Follower growth: [count]

## Key Achievements This Week
- [Achievement 1]
- [Achievement 2]
- [Achievement 3]

## Blockers & Risks
- [Blocker 1]: [impact], [mitigation]
- [Blocker 2]: [impact], [mitigation]

## Decision Required
- [Decision 1]: [options], [recommendation]
- [Decision 2]: [options], [recommendation]

## Next Week Priorities
1. [Highest priority]
2. [Second]
3. [Third]
```

**Automation logic:**
- Aggregate daily close reports into weekly totals
- Calculate pipeline value and close probability
- Analyze content engagement trends
- Compare actual vs. planned metrics
- Generate insights (what worked, what didn't)
- Create decision items for Vaishak

---

### Friday 5:00 PM — Retrospective

**Agent:** Sprint Planner / Ops Manager
**Skill:** `retrospective`
**Duration:** 30 min (async)
**Input sources:**
- Completed sprint chunks
- Blockers from sprint
- Velocity (actual vs. planned)
- Team feedback (Slack messages)

**Output destinations:**
- `obsidian/knowledge/operations/Sprint_[WEEK]_Retro.md`
- Slack `#standup` (key learnings)

**Retro structure:**
```
# Retrospective — Sprint [WEEK]

## What Went Well
- [Success 1 + why]
- [Success 2 + why]
- [Success 3 + why]

## What Could Be Better
- [Gap 1]: [what happened], [why], [fix]
- [Gap 2]: [what happened], [why], [fix]
- [Gap 3]: [what happened], [why], [fix]

## Metrics
- Planned: [X points]
- Completed: [Y points]
- Velocity: [Y/X %]
- Blockers encountered: [count]
- Average blocker duration: [days]

## Action Items (Next Sprint)
1. [Action 1]: Assigned to [person], due [sprint]
2. [Action 2]: Assigned to [person], due [sprint]
3. [Action 3]: Assigned to [person], due [sprint]

## Process Improvements
- [Improvement 1]: Implement [change]
- [Improvement 2]: Implement [change]
```

---

### Sunday 8:00 PM — Week-Ahead Prep

**Agent:** Ops Manager
**Skill:** `week-ahead-prep`
**Input sources:**
- Google Calendar (full week ahead)
- `obsidian/knowledge/marketing/Content_Calendar.md` (week's posts)
- Next week's sprint plan
- Sales pipeline (expected follow-ups)

**Output destinations:**
- `obsidian/knowledge/operations/Week_Ahead_[DATE].md`
- Slack `#standup` (weekly preview)

**Week-ahead structure:**
```
# Week Ahead — Week of [DATE]

## Calendar Overview
| Day | Time | Event | Duration | Prep Needed |
|-----|------|-------|----------|-------------|
| Monday | [time] | [event] | [duration] | [yes/no] |

## Content Publishing Schedule
| Day | Time | Content | Platform | Approval |
|-----|------|---------|----------|----------|
| [day] | [time] | [title] | [platform] | [status] |

## Sales Activities Scheduled
- Follow-ups due: [count]
- Pilots to check: [count]
- Proposals to send: [count]

## Dependencies & Risks
- [Risk 1]: [mitigation]
- [Risk 2]: [mitigation]

## Prep Checklist
- [ ] All calendar events have agendas
- [ ] All content approved and scheduled
- [ ] Sales follow-ups prepared
- [ ] Pilot check-ins scheduled
```

---

## Monthly Automation Schedule

### 1st of Month — Financial Close

**Agent:** Finance Tracker
**Skill:** `monthly-financial-close`
**Duration:** 2-3 hours
**Input sources:**
- All daily close files from month
- Firestore `transactions` collection
- Google Drive `ShopSense/Financials`
- Receipts and invoices

**Output destinations:**
- `obsidian/knowledge/financials/Monthly_Close_[MONTH].md`
- Google Sheets `ShopSense/Monthly P&L`
- Firestore `monthly_metrics/[MONTH]` document

**Close deliverables:**
- Revenue reconciliation (expected vs. captured)
- Expense categorization (COGS, SG&A, R&D, etc.)
- P&L statement (monthly)
- Cash flow statement
- Variance analysis (vs. budget if exists)

---

### 1st of Month — SEO Report

**Agent:** SEO Monitor
**Skill:** `seo-report`
**Input sources:**
- Google Search Console (keywords, impressions, CTR)
- Google Analytics (organic traffic)
- Competitor research (Common Room)
- Backlink analysis (if applicable)

**Output destinations:**
- `obsidian/knowledge/marketing/SEO_Report_[MONTH].md`
- Slack `#marketing` (key metrics summary)

**Report sections:**
- Keyword rankings (top 20)
- Organic traffic trends
- New opportunities
- Competitor movements
- Action items

---

### 5th of Month — Invoice Generation

**Agent:** Finance Tracker / Deal Closer
**Skill:** `invoice-gen`
**Trigger:** Subscription renewals due
**Input sources:**
- Firestore `customers` collection (active subscriptions)
- Customer contracts (billing terms)
- Previous invoices (template)

**Output destinations:**
- Google Drive `ShopSense/Invoices/[MONTH]`
- Customer email (via Gmail)
- Firestore `invoices/[MONTH]` (record)

**Process:**
1. Identify all active subscriptions
2. Generate invoices from template
3. Send to customers
4. Log in Firestore with tracking number
5. Add to payment follow-up calendar

---

### 15th of Month — Competitive Intel Refresh

**Agent:** Sales Prospector / Competitive Intel
**Skill:** `competitive-intel`
**Input sources:**
- Common Room (news, mentions)
- LinkedIn (competitor updates)
- Product Hunt (new launches)
- G2, Capterra (reviews)

**Output destinations:**
- `obsidian/knowledge/intelligence/Competitive_[MONTH].md`
- Slack `#sales` (summary)
- Strategy notes for sales team

**Intelligence gathered:**
- Competitor pricing changes
- New features launched
- Customer testimonials/issues
- Market positioning shifts
- Threat assessment

---

### Last Day of Month — Monthly Review

**Agent:** Ops Manager / Vaishak
**Skill:** `monthly-review`
**Duration:** 2-3 hours
**Input sources:**
- All weekly reviews from month
- Monthly financial close
- Customer feedback
- Team performance data
- Product metrics

**Output destinations:**
- `obsidian/knowledge/operations/Monthly_Review_[MONTH].md`
- Slack `#executive` (all-hands summary)
- Strategy decisions appended to `obsidian/knowledge/operations/Strategy_Decisions.md`

**Review structure:**
```
# Monthly Review — [MONTH] 2026

## Gate Progress Summary
### Gate 2: First Paying Customer (May 2026)
- Target: ₹25K revenue
- Achieved: ₹[amount]
- Progress: [%]
- On track: [yes/no]

## Key Metrics
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Revenue | ₹[target] | ₹[actual] | [on/off track] |
| Pilots deployed | [#] | [#] | [on/off track] |
| Leads qualified | [#] | [#] | [on/off track] |
| Burn rate | ₹[/day] | ₹[/day] | [on/off track] |

## Achievements
- [Major win 1]
- [Major win 2]
- [Major win 3]

## Challenges
- [Challenge 1]: [resolution]
- [Challenge 2]: [resolution]
- [Challenge 3]: [resolution]

## Strategic Decisions Made
- [Decision 1]: [rationale], [implementation]
- [Decision 2]: [rationale], [implementation]

## Next Month Focus
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
```

---

## Trigger-Based Automation

### Trigger 1: New Registration → Lead Qualification

**Trigger:** New document in Firestore `registrations` collection
**Automation:** `lead-automation` workflow (see workflows/lead-automation.md)
**Timeline:** Immediate (< 5 min)
**Output:** Lead record created, scoring complete, outreach queued

---

### Trigger 2: Pilot Started → Daily Accuracy Check

**Trigger:** Firestore `pilots.status` = 'active' and created_at < 1 day
**Automation:** Run accuracy validation against ShopSense model
**Timeline:** Daily at 9:30 AM during pilot duration
**Output:** Accuracy report, anomaly alerts if accuracy drops >5%

---

### Trigger 3: Payment Received → Revenue Capture & Onboarding

**Trigger:** Firestore `transactions` created with `type` = 'payment'
**Automation:** `client-onboarding` workflow
**Timeline:** Same day (< 2h)
**Output:**
1. Update customer ledger
2. Generate receipt
3. Send thank you email
4. Trigger customer onboarding workflow
5. Add to pilot tracking

---

### Trigger 4: Code Pushed → TS Check + Deploy Preview

**Trigger:** GitHub push to `main` or `develop` branch
**Automation:** `code-architect` skill + deployment workflow
**Timeline:** Immediate (<5 min)
**Output:**
1. Run TypeScript type checker
2. Deploy to preview URL
3. Notify team in Slack `#deployments`
4. If errors: create GitHub issue, notify Vaishak

---

### Trigger 5: Customer Issue Reported → Triage & Escalation

**Trigger:** WhatsApp message containing keywords (error, issue, bug, help) OR GitHub issue created
**Automation:** `customer-escalation` workflow
**Timeline:** Immediate to 1 hour
**Output:**
1. Triage severity (P0, P1, P2, P3)
2. If P0/P1: immediate Slack alert to Vaishak
3. If P2/P3: log in issue tracker, add to backlog
4. Send acknowledgment to customer

**Severity levels:**
- **P0:** Customer unable to use product, revenue at risk
- **P1:** Core feature broken, pilot at risk of stopping
- **P2:** Feature degraded, workaround exists, pilot can continue
- **P3:** Minor issue, cosmetic bug, no impact to pilot

---

## Automation Execution Model

### How Scheduled Tasks Are Triggered

All daily/weekly/monthly automations are executed via Claude Code's `schedule` skill, creating tasks in `C:\Users\VAISHAK\Documents\Claude\Scheduled/`.

**Example scheduled task for Morning Briefing:**

```
Task ID: morning-briefing-daily
Cron: 0 8 * * * (8:00 AM IST, every day)
Prompt: Execute morning-briefing skill, pull calendar/Slack/PROGRESS.md, generate standup
Status: Active
```

See `scheduler/workflows/daily-ops.md` for step-by-step execution of each daily automation.

---

## Knowledge File Append Model

All automations are **append-only** for critical files:

**Sacred files (append-only):**
- `obsidian/knowledge/financials/Finance_Ledger.md`
- `obsidian/knowledge/operations/Daily_Standup_*.md`
- `obsidian/knowledge/operations/Daily_Close_*.md`
- `obsidian/knowledge/operations/Strategy_Decisions.md`

**Safe to overwrite:**
- `obsidian/knowledge/operations/PROGRESS.md` (updated daily)
- `obsidian/knowledge/operations/Tomorrow_Priorities.md`
- Daily briefing documents (new file per day)

---

## Error Handling & Escalation

### Retry Logic

| Error Type | Retry Count | Retry Delay | Escalation |
|-----------|-----------|-----------|-----------|
| Network timeout | 3 | 30 sec | After 3 failures |
| Firestore unavailable | 3 | 1 min | After 3 failures |
| API rate limit | 1 | 60 sec | After 1 failure |
| Missing data source | 1 | None | Immediate |

### Escalation Triggers

**Immediate escalation to Vaishak (Slack alert):**
1. Database unavailable for >30 min
2. Automated workflow fails >2 times
3. P0 customer issue reported
4. Revenue transaction pending >24h
5. Blocker unresolved >2 days
6. Critical metric misses threshold (burn >₹5K/day, accuracy <80%)
7. Gate 2 milestone achieved (₹25K revenue)

---

## Metrics Tracked by Automation

| Metric | Calculated | Frequency | Purpose |
|--------|-----------|-----------|---------|
| Daily revenue | Daily Close | Daily | Gate progress |
| Burn rate | Daily Close | Daily | Runway calculation |
| Lead pool size | Sales Pipeline Check | Daily | Sales capacity |
| Pilot accuracy | Accuracy Check | Daily (pilots) | Product quality |
| Content engagement | Content Queue Check | Daily | Marketing effectiveness |
| Sprint velocity | Retrospective | Weekly | Capacity planning |
| Customer satisfaction | N/A (manual) | N/A | Reported via WhatsApp |

---

## Related Files

- **Daily Ops Workflow:** `scheduler/workflows/daily-ops.md`
- **Weekly Review Workflow:** `scheduler/workflows/weekly-review.md`
- **Lead Automation:** `scheduler/workflows/lead-automation.md`
- **Content Pipeline:** `scheduler/workflows/content-pipeline.md`
- **Morning Briefing Skill:** `scheduler/morning-briefing/SKILL.md`
- **Sprint Planning:** `sprint-planner/SKILL.md`
- **Knowledge Base:** `obsidian/knowledge/Knowledge_Base.md`

