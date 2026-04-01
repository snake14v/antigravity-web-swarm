# Weekly Business Review Workflow — Detailed Execution Guide

**Purpose:** Comprehensive Friday business review covering financials, sales, product, and strategic decisions.

**Owner Agent:** Weekly Reviewer (Ops Manager)
**Frequency:** Friday 4:00 PM IST
**Duration:** 1-2 hours
**Output:** WBR document + decision log + Slack briefing

---

## Workflow Overview

```
4:00 PM Friday
       │
       ▼
[Aggregate 7-day data]
       │
       ├─ Financial summary
       ├─ Sales pipeline analysis
       ├─ Product metrics review
       ├─ Content performance
       └─ Team/blocker assessment
       │
       ▼
[Identify variances & decisions]
       │
       ├─ What went well?
       ├─ What's at risk?
       ├─ Decisions needed?
       └─ What to focus next week?
       │
       ▼
[Generate WBR document + Slack briefing]
       │
       ▼
5:00 PM — Retrospective begins
```

---

## Step 1: Data Collection (4:00 - 4:15 PM)

### Collect Financial Data

**Source 1: Daily Close Files**

```
Files: Daily_Close_[MON-FRI].md
Action: Read all 5 files (Mon, Tue, Wed, Thu, Fri)

Extract from each:
  - revenue_captured
  - expenses_by_category
  - mtd_revenue (most recent value = current MTD)
  - daily_burn
```

**Aggregation:**

```
weekly_revenue = sum(daily_revenue Mon-Fri)
weekly_expenses = sum(daily_expenses Mon-Fri)
weekly_net = weekly_revenue - weekly_expenses

categories = {
  'cogs': sum(cogs expenses Mon-Fri),
  'sgna': sum(sgna expenses Mon-Fri),
  'rd': sum(rd expenses Mon-Fri),
  'marketing': sum(marketing expenses Mon-Fri),
}

burn_daily_avg = weekly_expenses / 5

mtd_metrics:
  - revenue: [from last Daily_Close]
  - expenses: [from last Daily_Close]
  - net: revenue - expenses
```

**Calculation: Gate 2 Progress**

```
gate_2_target = 25000  // ₹25K

days_in_month = current day of month
days_remaining = 30 - days_in_month
daily_rate_needed = (gate_2_target - mtd_revenue) / days_remaining

if mtd_revenue >= 25000:
  status = "GATE 2 ACHIEVED ✓"
  gate_progress = 100%
elif (daily_rate_needed * days_remaining) > mtd_revenue:
  status = "ON TRACK ✓"
  gate_progress = (mtd_revenue / gate_2_target) * 100
else:
  status = "AT RISK ⚠"
  gate_progress = (mtd_revenue / gate_2_target) * 100
```

### Collect Sales Pipeline Data

**Source: Sales_Pipeline_[WED].md**

```
Note: Use Wednesday snapshot (mid-week data)
Avoid Monday (may be incomplete) and Friday (end-of-week)

Extract:
  - new_leads_this_week (compare to weekly avg)
  - qualified_leads (in queue, awaiting follow-up)
  - demo_stage_count
  - active_pilots_count
  - expected_close_amount (pipeline value)
```

**Deeper analysis:**

```javascript
// Using Firestore queries directly

// Lead velocity
const newLeadsThisWeek = await db.collection('leads')
  .where('created_at', '>=', monday_of_week)
  .where('created_at', '<', saturday_of_week)
  .get();

// Lead distribution by status
const leadsByStatus = await db.collection('leads')
  .where('created_at', '>=', start_of_month)
  .get();

// Group and count by status
counts_by_status = {
  'new': [count],
  'qualified': [count],
  'contacted': [count],
  'demo': [count],
  'pilot': [count],
  'dead': [count],
}

// Calculate average lead score
leadScores = newLeadsThisWeek.docs.map(doc => doc.data().lead_score);
avg_lead_score = leadScores.reduce((a,b) => a+b) / leadScores.length;

// Identify high-value leads (>80 score)
hot_leads = newLeadsThisWeek.docs.filter(doc => doc.data().lead_score > 80);
```

**Lead health metrics:**

```
conversion_rate = (leads_moved_to_qualified / new_leads) * 100
follow_up_rate = (leads_followed_up / qualified_leads) * 100
pilot_closure_rate = (pilots_successfully_deployed / pilots_started) * 100
```

### Collect Pilot Metrics

**Source: Firestore pilots collection**

```javascript
const activePilots = await db.collection('pilots')
  .where('status', '==', 'active')
  .get();

const completedPilots = await db.collection('pilots')
  .where('status', '==', 'completed')
  .where('end_date', '>=', monday_of_week)
  .get();

metrics = {
  active_count: activePilots.size,
  completed_count: completedPilots.size,
  accuracy_avg: avg(activePilots.docs.map(doc => doc.data().accuracy)),
  issues_reported: sum(activePilots.docs.map(doc => doc.data().issues_reported)),
  pilot_success_rate: (completedPilots.size / (activePilots.size + completedPilots.size)) * 100,
}
```

**Accuracy tracking:**

```
For each active pilot:
  - Accuracy percentage (target: >85%)
  - Issues reported count
  - Days in pilot
  - Expected end date
  - Customer satisfaction signal (if available)

Red flags:
  - Accuracy < 75%
  - Issues reported > 3
  - Pilot delayed beyond expected end date
  - No customer contact >1 week
```

### Collect Product Metrics

**Source: Multiple files**

**Code quality:**

```bash
# Git metrics for the week
git log --since="7 days ago" --oneline --author=[main dev]
# Extract: total commits, commit frequency, code churn

git diff HEAD~50..HEAD --stat
# Extract: files changed, lines added/removed, complexity
```

**Deployment metrics:**

```
Source: Deploy logs / GitHub Actions
Extract:
  - Deployments this week: [#]
  - Failed deployments: [#]
  - Rollbacks: [#]
  - Deployment frequency: [#]/week
  - Lead time for changes: [hours/days]
```

**Code review metrics:**

```
Source: GitHub PRs
Query: PRs merged this week
Extract:
  - PRs merged: [#]
  - Avg review time: [hours]
  - Feedback quality: [qualitative]
  - Blocker PRs: [list]
```

### Collect Content Performance

**Source: Google Analytics + Social platforms**

**Reach metrics:**

```
LinkedIn:
  - Posts published this week: [#]
  - Impressions: [#]
  - Engagement rate: [%]
  - Top post: [title] ([impressions])

Instagram:
  - Posts published: [#]
  - Reaches: [#]
  - Engagement rate: [%]
  - Follower growth: [+#]

Blog:
  - New articles: [#]
  - Page views: [#]
  - Avg time on page: [minutes]
  - Bounce rate: [%]
```

**Trend analysis:**

```
This week vs. last week:
  - Impressions: [+X% or -X%]
  - Engagement: [+X% or -X%]
  - Reach: [+X% or -X%]

Trending content themes:
  1. [Theme 1] — [engagement metric]
  2. [Theme 2] — [engagement metric]
  3. [Theme 3] — [engagement metric]
```

### Collect Team Activity

**Source: Slack + Git + Obsidian**

**Standup consistency:**

```
Check Daily_Standup_[MON-FRI].md files:
  - All days documented? [yes/no]
  - Blockers identified early? [yes/no]
  - Blockers resolved same day? [yes/no]
  - Standup consistency: [#]/5 days completed
```

**Blocker analysis:**

```
Blockers this week:
  1. [Blocker 1]: Duration [X days], Cause [reason]
  2. [Blocker 2]: Duration [Y days], Cause [reason]

Categories:
  - External dependencies: [#]
  - Technical challenges: [#]
  - Capacity issues: [#]
  - Data issues: [#]

Average time to resolve: [hours/days]
```

---

## Step 2: Analysis & Variance Identification (4:15 - 4:35 PM)

### Financial Variance Analysis

**Expected vs. Actual:**

```
If we have a budget:
  mtd_revenue_variance = (mtd_revenue - mtd_revenue_budget) / mtd_revenue_budget * 100
  mtd_expense_variance = (mtd_expenses - mtd_expenses_budget) / mtd_expenses_budget * 100

Interpretation:
  Revenue variance > +20%: Ahead of plan ✓ (accelerate investment?)
  Revenue variance -10% to +10%: On track ✓
  Revenue variance < -10%: Behind plan ⚠ (accelerate sales?)

  Expense variance > +10%: Over budget ⚠ (cost review)
  Expense variance -10% to +10%: On track ✓
  Expense variance < -10%: Under budget ✓ (but may lack investment)
```

**Cash flow projection:**

```
runway_days = available_cash / average_daily_burn
runway_months = runway_days / 30

if runway_months < 3:
  alert = "CRITICAL: Less than 3 months runway"
elif runway_months < 6:
  alert = "WARNING: Less than 6 months runway"
else:
  alert = "HEALTHY: 6+ months runway"
```

### Sales Performance Analysis

**Lead quality trends:**

```
This week vs. last week:
  - New leads: [+/-]%
  - Avg lead score: [+/- points]
  - Hot leads (>80): [+/- count]

Trend assessment:
  - If leads up 20%+ and quality maintained: ✓ Strong week
  - If leads down but quality up: ✓ More selective funnel
  - If leads and quality both down: ⚠ Sales weak
  - If leads up but quality down: ⚠ Lowered bar, may dilute effort
```

**Conversion metrics:**

```
new_to_qualified_rate = (leads_qualified / new_leads) * 100
qualified_to_demo_rate = (leads_in_demo / qualified_leads) * 100
demo_to_pilot_rate = (pilots_deployed / leads_in_demo) * 100

If rates declined week-over-week:
  - Where's the bottleneck? (qualify, demo, or deploy?)
  - Why? (technical, sales skill, product, market fit?)
  - Action: [Focus area for next week]
```

**Pipeline value assessment:**

```
expected_revenue = sum(lead_value * close_probability)
  For each lead in pipeline:
    - Typical deal size: ₹[X]
    - Probability: [%]
    - Expected value: ₹[X] * [%]

This week's expected revenue: ₹[amount]
This month's expected revenue: ₹[amount]
vs. Gate 2 target (₹25K): [on/off track]
```

### Product Performance Analysis

**Pilot success rate:**

```
pilots_completed_this_week = [#]
pilots_completed_successfully = [#]
success_rate = (pilots_completed_successfully / pilots_completed_this_week) * 100

If success_rate < 70%:
  ⚠ Below target success rate
  Action: Analyze what's causing failures
  - Product accuracy issues?
  - Customer data quality issues?
  - Expectation mismatch?
```

**Accuracy trends:**

```
avg_accuracy_this_week = [%]
avg_accuracy_last_week = [%]
trend = (this_week - last_week) / last_week * 100

If accuracy improved >5%: ✓ Product getting better
If accuracy stable: ✓ Consistent quality
If accuracy declined >5%: ⚠ Regression detected
  Action: Investigate recent code changes
```

**Issue patterns:**

```
Issues reported this week:
  - Category 1 (e.g., slow performance): [# count]
  - Category 2 (e.g., accuracy misses): [# count]
  - Category 3 (e.g., integration errors): [# count]

Most common issue: [Category] ([#] reports)
Severity of issues: [P0: #, P1: #, P2: #, P3: #]

If P0/P1 issues rising: ⚠ Quality concern, prioritize fixes
```

### Content Performance Analysis

**Engagement trends:**

```
This week avg engagement rate: [%]
Last week avg engagement rate: [%]
Trend: [+X% or -X%]

Content reaching: [# impressions/week]
Content converting: [# clicks/links clicked]

Best performing content:
  1. [Title]: [metric] [value]
  2. [Title]: [metric] [value]
  3. [Title]: [metric] [value]

Worst performing content:
  1. [Title]: [metric] [value]
```

**Content fit assessment:**

```
Audience response to content themes:
  Theme A: High engagement [emoji]
  Theme B: Medium engagement [emoji]
  Theme C: Low engagement [emoji]

Recommendation: Focus next week on [Theme A and B]
Stop or rethink: [Theme C]
```

### Team Velocity & Blockers

**Sprint progress:**

```
Sprint capacity: [# points]
Completed this week: [# points]
Velocity: [#]/[#] points = [%] complete

If velocity on track (70%+ of plan):
  ✓ Sprint healthy, maintain pace

If velocity behind (< 50% of plan):
  ⚠ Blockers or capacity issue
  Action: Unblock, reduce scope, or add support
```

**Blocker impact:**

```
Blockers resolved: [#]/[total] ([%])
Avg resolution time: [# hours]

Top 3 blockers this week:
  1. [Blocker]: Impact [high/med/low], Resolution [in progress/waiting]
  2. [Blocker]: Impact [high/med/low], Resolution [in progress/waiting]
  3. [Blocker]: Impact [high/med/low], Resolution [in progress/waiting]

Unresolved blockers: [#]
Escalation needed? [yes/no]
```

---

## Step 3: Strategic Decisions (4:35 - 4:50 PM)

### Identify Decision Points

**Question 1: Are we on track for Gate 2?**

```
Gate 2 = ₹25K revenue by May 2026
Current month: [March/April/May]
Days remaining: [#]
Revenue needed: ₹[X]
Daily run rate needed: ₹[X]/day

if current_run_rate >= needed_run_rate:
  decision = "STAY THE COURSE ✓"
  recommendation = "Continue current sales + product strategy"

elif current_run_rate >= 0.7 * needed_run_rate:
  decision = "ACCELERATE SALES ⚡"
  recommendation = "Double outreach, fast-track hot leads, consider discounts"

else:
  decision = "PIVOT OR ACCEPT DELAY ⚠"
  recommendation = "Either (A) change GTM strategy, (B) extend timeline, or (C) find alternative revenue"
```

**Question 2: Should we accelerate or pivot?**

```
Data to consider:
  - Lead quality: [improving/stable/declining]
  - Conversion rates: [improving/stable/declining]
  - Pilot success: [improving/stable/declining]
  - Customer satisfaction: [high/medium/low]
  - Burn rate: [sustainable/unsustainable]

If product working well but leads low:
  Decision: ACCELERATE SALES
  Actions: LinkedIn campaign, referral incentives, direct outreach

If leads good but conversion low:
  Decision: FIX SALES MOTION
  Actions: Sales training, demo script optimization, shorter trial

If pilots failing:
  Decision: STABILIZE PRODUCT
  Actions: Accuracy improvements, customer support, data quality

If everything struggling:
  Decision: PIVOT or STRETCH TIMELINE
  Actions: Market research, repositioning, timeline adjustment
```

**Question 3: What's the top priority for next week?**

```
Candidates:
  1. Sales acceleration (leads/follow-ups)
  2. Product stabilization (accuracy/bugs)
  3. Content/marketing (brand/awareness)
  4. Infrastructure/code quality
  5. Customer success (onboarding/support)

Rank by:
  - Direct impact on Gate 2: [Yes/No]
  - Difficulty: [Easy/Medium/Hard]
  - Time required: [< 1 day / 1-3 days / > 3 days]
  - Dependencies: [None/Few/Many]

Top 3 priorities next week:
  1. [Priority]: [because...]
  2. [Priority]: [because...]
  3. [Priority]: [because...]
```

**Question 4: Are there risks we need to mitigate?**

```
Risk assessment:
  1. Cash runway: [Green/Yellow/Red]
  2. Product quality: [Green/Yellow/Red]
  3. Sales velocity: [Green/Yellow/Red]
  4. Team capacity: [Green/Yellow/Red]
  5. Market traction: [Green/Yellow/Red]

Any Yellow or Red items?
  - Document the risk
  - Assign mitigation owner
  - Set deadline for mitigation
```

---

## Step 4: Generate WBR Document (4:50 - 5:00 PM)

### Create Main WBR File

**File location:**
```
obsidian/knowledge/operations/Weekly_Review_[DATE].md
Action: WRITE new file
```

**File structure:**

```markdown
# Weekly Business Review — Week of [START] to [END]

**Generated:** [TIMESTAMP]
**Reviewer:** Weekly Reviewer (Ops Manager)
**Status:** Active review | Complete

---

## Executive Summary

One-paragraph overview of the week: What went well, what's concerning, what's the priority.

**Gate 2 Status:** [On Track | At Risk | Achieved]
**Financial Health:** [Healthy | Caution | Alert]
**Team Morale:** [Good | Neutral | Concerning]
**Product Quality:** [Good | Stable | Degrading]

---

## Section 1: Gate 2 Progress

### Gate 2: First Paying Customer (May 2026)

**Target:** ₹25,000 revenue
**Period:** [Current month] 2026
**Current Achieved:** ₹[amount]
**Progress:** [%]
**Status:** [On Track ✓ | At Risk ⚠ | Achieved ✓✓]

### Weekly Revenue Snapshot
| Category | This Week | MTD | Target |
|----------|-----------|-----|--------|
| Revenue Captured | ₹[X] | ₹[X] | ₹25,000 |
| Expenses | ₹[X] | ₹[X] | < ₹[X] |
| Net | ₹[X] | ₹[X] | ₹[X] |

### Revenue Breakdown
- Customer subscriptions: ₹[X]
- Custom work/consulting: ₹[X]
- Other: ₹[X]

### Variance Analysis
- Revenue vs. plan: [+X% or -X%]
- Expenses vs. plan: [+X% or -X%]
- Burn rate: ₹[X]/day (sustainable for [#] months)

---

## Section 2: Sales & Pipeline

### Lead Velocity
| Metric | This Week | Last Week | Trend |
|--------|-----------|-----------|-------|
| New Leads | [#] | [#] | [+/- %] |
| Qualified | [#] | [#] | [+/- %] |
| In Demo | [#] | [#] | [+/- %] |
| Pilots | [#] | [#] | [+/- %] |

### Lead Quality
- Avg lead score: [X]/100
- Hot leads (>80): [#]
- Lead source breakdown: [X% inbound, X% outreach, X% referral]

### Pipeline Health
| Stage | Count | Value | Days in Stage |
|-------|-------|-------|---------------|
| New | [#] | ₹[X] | - |
| Qualified | [#] | ₹[X] | [avg days] |
| Demo | [#] | ₹[X] | [avg days] |
| Pilot | [#] | ₹[X] | [avg days] |

**Total Pipeline Value:** ₹[amount]
**Weighted Expected Revenue:** ₹[amount] (based on probabilities)

### Conversion Metrics
- New to qualified: [X%]
- Qualified to demo: [X%]
- Demo to pilot: [X%]
- Pilot to customer: [X%] (if applicable)

### Key Sales Wins & Challenges
**Wins:**
- [Win 1]: [customer/deal size]
- [Win 2]: [customer/deal size]

**Challenges:**
- [Challenge 1]: [reason/mitigation]
- [Challenge 2]: [reason/mitigation]

---

## Section 3: Product & Pilots

### Pilot Summary
| Metric | This Week | Status |
|--------|-----------|--------|
| Active Pilots | [#] | On track |
| Completed | [#] | - |
| Success Rate | [%] | [Green/Yellow/Red] |

### Accuracy Performance
- Avg accuracy (active): [%]
- Target: >85%
- Trend: [Improving ↑ / Stable → / Declining ↓]

### Issues & Incidents
| Severity | This Week | MTD | Resolution |
|----------|-----------|-----|-----------|
| P0 | [#] | [#] | [avg hours] |
| P1 | [#] | [#] | [avg hours] |
| P2 | [#] | [#] | [avg hours] |

**Top Issues:**
1. [Issue 1]: [impact], [mitigation]
2. [Issue 2]: [impact], [mitigation]

### Product Roadmap Progress
- [Feature 1]: [% complete]
- [Feature 2]: [% complete]
- [Feature 3]: [% complete]

---

## Section 4: Content & Marketing

### Publishing Activity
| Platform | Posts | Reach | Engagement |
|----------|-------|-------|-----------|
| LinkedIn | [#] | [#] | [%] |
| Instagram | [#] | [#] | [%] |
| Blog | [#] | [#] | [%] |

### Engagement Trends
- Impressions this week: [#]
- Impressions last week: [#]
- Trend: [+X% or -X%]

**Top Content:**
1. [Post 1]: [platform] — [impressions] impressions
2. [Post 2]: [platform] — [impressions] impressions

### Audience Insights
- Follower growth: [+#] net new followers
- Audience demographics: [X% B2B, X% target industry]
- Content themes resonating: [Theme 1, Theme 2]

---

## Section 5: Team & Operations

### Sprint Progress
- Sprint plan: [# points]
- Completed: [# points]
- Velocity: [% of plan]

### Blockers & Issues
**Resolved This Week:** [#]
- [Blocker 1]: Resolved in [# hours]
- [Blocker 2]: Resolved in [# days]

**Unresolved/Carry Over:** [#]
- [Blocker 1]: [status], blocking [what]
- [Blocker 2]: [status], blocking [what]

### Team Health
- Standup completion: [#]/5 days
- Blockers identified early: [Yes/No]
- Morale indicators: [Good/Neutral/Concerning]

---

## Section 6: Strategic Decisions & Next Week

### Key Decisions Made This Week
1. **[Decision 1]**
   - Context: [Why we needed to decide]
   - Options considered: [Option A, Option B, Option C]
   - Decision: [We chose Option X]
   - Expected impact: [Outcome]
   - Owner: [Who's executing]
   - Deadline: [When]

2. **[Decision 2]**
   - [Same structure]

### Recommendations for Next Week
1. **[Recommendation 1]** — [Priority: High/Medium/Low]
   - Why: [Reasoning]
   - Action: [What to do]
   - Owner: [Who's responsible]
   - Deadline: [When]

2. **[Recommendation 2]** — [Priority: High/Medium/Low]
   - [Same structure]

3. **[Recommendation 3]** — [Priority: High/Medium/Low]
   - [Same structure]

### Top 3 Priorities for Next Week
1. [Priority 1]: [What] [Why]
2. [Priority 2]: [What] [Why]
3. [Priority 3]: [What] [Why]

---

## Section 7: Risk Assessment & Mitigation

### Current Risks (Traffic Light System)
| Risk | Status | Mitigation | Owner | Deadline |
|------|--------|-----------|-------|----------|
| Runway | [Green/Yellow/Red] | [Action] | [Owner] | [Date] |
| Gate 2 | [Green/Yellow/Red] | [Action] | [Owner] | [Date] |
| Product Quality | [Green/Yellow/Red] | [Action] | [Owner] | [Date] |
| Team Capacity | [Green/Yellow/Red] | [Action] | [Owner] | [Date] |
| Market Traction | [Green/Yellow/Red] | [Action] | [Owner] | [Date] |

### Escalations (if any)
- [Issue 1]: Requires Vaishak decision by [date]
- [Issue 2]: Requires Vaishak decision by [date]

---

## Section 8: Success Metrics (Weekly Scorecard)

| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| Revenue | ₹[X] | ₹[X] | [✓/✗] |
| Lead velocity | [#] | [#] | [✓/✗] |
| Pilot accuracy | >85% | [%] | [✓/✗] |
| Content reach | [#] impressions | [#] | [✓/✗] |
| Sprint velocity | [# points] | [#] | [✓/✗] |
| Blocker resolution | [%] | [%] | [✓/✗] |

**Overall Score:** [# Green / 6 KPIs]

---

## Appendix: Raw Data

### Daily Metrics Summary
| Date | Revenue | Expenses | Burn | Lead Count |
|------|---------|----------|------|-----------|
| Mon | ₹[X] | ₹[X] | ₹[X] | [#] |
| Tue | ₹[X] | ₹[X] | ₹[X] | [#] |
| Wed | ₹[X] | ₹[X] | ₹[X] | [#] |
| Thu | ₹[X] | ₹[X] | ₹[X] | [#] |
| Fri | ₹[X] | ₹[X] | ₹[X] | [#] |
| **Total** | **₹[X]** | **₹[X]** | **₹[X]** | **[#]** |

### Issue Backlog
[List of open issues, priority, assigned owner, expected resolution date]

---

**End of WBR Document**
```

---

## Step 5: Create Decision Log Entry

### File: Strategy_Decisions.md

**File location:**
```
obsidian/knowledge/operations/Strategy_Decisions.md
Action: APPEND (sacred file, never overwrite)
```

**Append format:**

```markdown
## Week of [DATE] — Decision Log

### Decision 1: [Title]
**Date:** [DATE]
**Owner:** Vaishak
**Context:** [Why we needed to decide]
**Decision:** [What we decided]
**Rationale:** [Why we chose this]
**Implementation:** [How we'll execute]
**Expected Outcome:** [What we expect to happen]
**Review Date:** [When we'll revisit]
**Status:** Active

---

### Decision 2: [Title]
[Same format]

---
```

---

## Step 6: Generate Slack Briefing

### Post to #executive channel

```
📊 **Weekly Business Review — Week Ending [DATE]**

**Gate 2 Progress (₹25K target):**
- Achieved: ₹[amount] ([%])
- Trend: [✓ On track | ⚠ At risk | ✓✓ Achieved]
- Days remaining: [#]

**Financial Health:**
- Revenue this week: ₹[amount]
- Burn rate: ₹[X]/day
- Runway: [# months]

**Sales Pipeline:**
- New leads: [#]
- Pipeline value: ₹[amount]
- Pilots active: [#]
- Success rate: [%]

**Product Quality:**
- Pilot accuracy: [%]
- Issues: P0 [#], P1 [#], P2 [#]
- Status: ✓ Stable | ⚠ Degrading

**Team Status:**
- Sprint velocity: [% of plan]
- Blockers resolved: [#]/[#]
- Unresolved blockers: [#]

**Key Decisions This Week:**
1. [Decision 1]
2. [Decision 2]

**Top 3 Priorities Next Week:**
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

**Alerts/Escalations:**
[If any: red flags requiring attention]

---
Full WBR: [[Weekly_Review_[DATE]]]
See decisions: [[Strategy_Decisions#Week of [DATE]]]
```

---

## Error Handling

| Error | Recovery |
|-------|----------|
| Missing Daily_Close file | Use Firestore query directly |
| Sales_Pipeline file outdated | Run fresh Firestore queries |
| Analytics data delayed | Use previous day's snapshot |
| Firestore unavailable | Postpone WBR 1 hour, retry |
| Multiple critical blockers | Escalate to Vaishak immediately |

---

## Success Criteria

WBR is successful when:

✓ Document generated by 4:50 PM Friday
✓ All 7 sections complete (executive summary through appendix)
✓ At least 3 strategic decisions/recommendations identified
✓ Gate 2 progress clearly articulated (on/off track)
✓ Slack briefing sent to #executive before 5:00 PM
✓ Decision log updated in Strategy_Decisions.md
✓ Top 3 priorities clear for next sprint planning

