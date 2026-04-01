# Daily Operations Workflow — Detailed Execution Guide

**Purpose:** Step-by-step automation for all 6 daily touchpoints (8 AM through 9 PM).

**Owner Agent:** Daily Dispatcher (from agent registry)
**Related Skill:** `scheduler/SKILL.md` (master schedule)
**Knowledge Files:** `obsidian/knowledge/operations/` (all daily logs)

---

## Workflow Overview

```
8:00 AM  → Morning Briefing
           ↓
8:30 AM  → Sales Pipeline Check
           ↓
9:00 AM  → Standup Generation
           ↓
[Work happens during day]
           ↓
12:00 PM → Content Queue Check
           ↓
5:00 PM  → Daily Close
           ↓
9:00 PM  → Night Review
```

Each step outputs to Obsidian knowledge files and coordinates agent dispatch via Slack.

---

## Step 1: Morning Briefing (8:00 AM)

### Execution Steps

#### 1.1 Initialize Briefing Session

```
Agent: Daily Dispatcher
Time: 8:00 AM IST (±5 min tolerance)
Preconditions:
  - Previous night's review exists OR create new template
  - Network/Firestore available
```

**Action:** Read existing briefing template or create from template

```
File location: obsidian/knowledge/operations/Daily_Briefing_[DATE].md
Check if exists:
  - If yes: read as baseline
  - If no: create new from template below
```

**Template:**

```markdown
# Morning Briefing — [DATE] ([DAY])

Status: BUILDING
Last Updated: [TIMESTAMP]
Briefing Agent: Daily Dispatcher

## Yesterday Summary
- Completed chunks: [PENDING — read from PROGRESS.md]
- Pipeline activity: [PENDING — read from Sales_Pipeline_[YESTERDAY].md]
- Revenue: [PENDING — read from Daily_Close_[YESTERDAY].md]
- Content: [PENDING — read from Daily_Content_[YESTERDAY].md]

## Today — Priority Stack
1. [PENDING — generated from sprint plan]
2. [PENDING — second priority]
3. [PENDING — third priority]

## Scheduled Meetings
- [PENDING — read from Google Calendar]

## Blockers & Alerts
- [PENDING — from previous night review or PROGRESS.md]

## Metrics Snapshot
- Active pilots: [PENDING]
- MTD revenue: [PENDING]
- Lead pool: [PENDING]
- Content engagement: [PENDING]
```

#### 1.2 Read Yesterday's Context

**Data Source 1: PROGRESS.md**

```
File location: obsidian/knowledge/operations/PROGRESS.md

Expected format:
---
current_sprint: [Sprint ID]
current_chunk: [Chunk ID]
status: in_progress | completed | blocked
started: [DATE]
---

[Chunk description and progress notes]

### Completed Yesterday
- [Task 1]: [duration]
- [Task 2]: [duration]

### Today's Focus
- [Chunk ID]: [description]

### Blockers
- [Blocker]: [status]
```

**Extraction steps:**
1. If file exists, read it
2. Extract "Completed Yesterday" section
3. Extract "Blockers" section
4. Note current chunk for today

**Error handling:**
- File missing? Create empty template, note in briefing
- File >24h old? Add alert: "PROGRESS.md not updated since [date]"
- Parsing error? Log to console, continue with available data

**Data Source 2: Sales_Pipeline_[YESTERDAY].md**

```
File location: obsidian/knowledge/operations/Sales_Pipeline_[YESTERDAY].md

Extract:
- New registrations count
- Follow-ups due count
- Pilot activity (startups, stops)
- Any deal updates
```

**Extraction steps:**
1. Read file if exists
2. Count entries in "New Registrations" section
3. Note any pilot status changes
4. Extract key deal updates

**Error handling:**
- File missing? Check if first day of month (might not exist yet)
- Parse error? Extract line count as fallback

**Data Source 3: Daily_Close_[YESTERDAY].md**

```
File location: obsidian/knowledge/operations/Daily_Close_[YESTERDAY].md

Extract:
- Revenue captured yesterday
- Total MTD revenue
- Burn rate
- Any anomalies
```

**Extraction steps:**
1. Read file
2. Extract "Total MTD Revenue" line
3. Extract daily burn rate
4. Note any large transactions (>₹5K)

**Error handling:**
- File missing? Query Firestore directly
- Parse error? Use regex to extract ₹[digits]

**Data Source 4: Slack Channels**

```
Channels to check:
- #standup (any overnight updates)
- @mentions directed at agents
- #sales (any customer contact)
- #engineering (any alerts)

Actions:
1. Count unread messages in each channel
2. Check for @here or @channel mentions
3. Extract any P0 alerts (keywords: error, critical, down)
```

**Extraction steps:**
1. Read Slack API (via MCP)
2. Filter by timestamp > 8 hours ago
3. Identify new unread threads
4. Check for critical keywords

**Error handling:**
- Slack API unavailable? Note in briefing, proceed
- No new messages? That's fine, note "no overnight activity"

**Data Source 5: Google Calendar**

```
Endpoint: Google Calendar API
Date: Today
Parameters: showDeleted=false, singleEvents=true

Extraction:
- Today's events
- Start times
- Attendees (for context)
- Prep needed (from description)
```

**Execution:**
```python
# Pseudocode
events = calendar.list(
  calendarId='primary',
  timeMin=[TODAY 00:00:00],
  timeMax=[TODAY 23:59:59],
  singleEvents=true,
  orderBy='startTime'
)

for event in events:
  if not event.get('transparency') == 'transparent':  # Not marked as free time
    add to briefing_meetings[]
```

**Error handling:**
- API unavailable? Note "calendar unavailable", continue
- No events? That's fine

**Data Source 6: Firestore — New Registrations**

```
Endpoint: Firestore
Collection: registrations
Query:
  where created_at >= [YESTERDAY 00:00:00]
  where created_at < [TODAY 00:00:00]

Extraction:
- Count of new registrations
- Lead scores (average)
- Any high-scoring leads (>80 points)
```

**Execution:**
```javascript
// Pseudocode — Firebase SDK
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
yesterday.setHours(0, 0, 0, 0);

const newRegistrations = await firebase.firestore()
  .collection('registrations')
  .where('created_at', '>=', yesterday)
  .where('created_at', '<', new Date(yesterday.getTime() + 86400000))
  .get();

const count = newRegistrations.size;
const scores = newRegistrations.docs.map(doc => doc.data().lead_score);
const avgScore = scores.reduce((a, b) => a + b) / scores.length;
const highScorers = newRegistrations.docs.filter(doc => doc.data().lead_score > 80);
```

**Error handling:**
- Firestore unavailable? Retry 3 times, then note "Firestore unavailable", continue
- Query returns 0? That's fine, note in briefing

**Data Source 7: Git Log**

```
Command: git log --oneline --since="24 hours ago" --author=[main dev]

Extraction:
- Commit count
- File types changed (TypeScript, Python, config, etc.)
- Commit messages (for context)
```

**Execution:**
```bash
git log --oneline --since="24 hours ago" --decorate
```

**Error handling:**
- Git unavailable? Skip this section
- No commits? Note "no development activity"

#### 1.3 Generate Priority Stack

**Algorithm:**

```
RANK by revenue impact:
1. Revenue-generating activities (deal follow-ups, pilot checks)
2. Blocking items (unresolved from yesterday)
3. Today's sprint chunk
4. Content/marketing activities
5. Admin/operational tasks

Take top 3 and display in briefing
```

**Example output:**

```markdown
## Today — Priority Stack

1. **Follow-up on Demo Lead (Company X)**
   - Last contact: 2 days ago
   - Status: Awaiting interest signal
   - Impact: Potential ₹5K deal this week

2. **Complete C-SHP-08 (Model Optimization)**
   - Sprint chunk for today
   - Estimated: 6 hours
   - Dependency: None

3. **Content Publishing (LinkedIn Post)**
   - Scheduled: 11 AM
   - Already approved
   - Expected reach: 500+ impressions
```

#### 1.4 Compile and Deliver Briefing

**Execution:**

```
Output 1: Obsidian Knowledge File
- File: obsidian/knowledge/operations/Daily_Briefing_[DATE].md
- Action: WRITE (new file each day)
- Format: Markdown with inline links to related docs

Output 2: Slack Message
- Channel: #standup
- Format: Markdown thread
- Message structure:
  1. Summary header (emojis ok for Slack)
  2. Priorities (numbered list)
  3. Meetings (time list)
  4. Blockers (if any)
  5. Metrics snapshot (as table or inline)

Output 3: Email (only if P0 blockers)
- Recipient: Vaishak
- Subject: "ALERT: Morning Briefing - P0 Blocker"
- Body: Blocker description + required action
```

**Slack message template:**

```
🌅 **Morning Briefing — [DATE] [DAY]**

**Yesterday Summary:**
- Completed: [chunk]
- New leads: [count]
- Revenue: ₹[amount]

**Today's Priorities:**
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

**Meetings Today:**
- [Time] — [Meeting]
- [Time] — [Meeting]

**Blockers:**
[If any: list and status]

**Metrics:**
| Metric | Value |
|--------|-------|
| Active Pilots | [#] |
| MTD Revenue | ₹[amount] |
| Lead Pool | [#] |

---
See full briefing: [[Daily_Briefing_[DATE]]]
```

**Error handling:**
- Slack send fails? Retry, then log error, proceed to next step
- File write fails? Alert and retry

#### 1.5 Escalation Checks

**Check 1: Critical Blockers**

```
If PROGRESS.md contains:
  - "BLOCKED" status for >2 days
  - "P0" or "CRITICAL" label
  - "waiting on [external]" for >24h

Action: Add to escalation alert, set priority flag
```

**Check 2: Database Health**

```
If any Firestore queries failed:
  - Log attempt count
  - If >2 failures: send alert to Vaishak
```

**Check 3: Overnight Alerts**

```
Scan Slack messages for keywords:
  - error, critical, down, issue, help
  - If found: note in briefing, flag for prioritization
```

---

## Step 2: Sales Pipeline Check (8:30 AM)

### Execution Steps

#### 2.1 Query Lead Data

**Firestore Query 1: New Leads**

```javascript
const newLeads = await db.collection('leads')
  .where('status', '==', 'new')
  .orderBy('lead_score', 'desc')
  .limit(20)
  .get();

data: {
  lead_id: string,
  name: string,
  company: string,
  email: string,
  phone: string,
  created_at: timestamp,
  lead_score: 0-100,
  interests: string[],  // [ShopSense, feature1, feature2]
  status: 'new' | 'qualified' | 'contacted' | 'demo' | 'pilot' | 'dead'
}
```

**Firestore Query 2: Follow-ups Due**

```javascript
const followupsDue = await db.collection('leads')
  .where('next_followup_date', '<=', new Date())
  .where('status', 'in', ['qualified', 'contacted'])
  .orderBy('next_followup_date', 'asc')
  .get();

data: {
  lead_id: string,
  name: string,
  last_contact_date: timestamp,
  next_followup_date: timestamp,
  last_contact_notes: string,
  status: 'qualified' | 'contacted',
  expected_action: 'follow_email' | 'follow_call' | 'send_proposal',
}
```

**Firestore Query 3: Active Pilots**

```javascript
const activePilots = await db.collection('pilots')
  .where('status', '==', 'active')
  .orderBy('started_at', 'asc')
  .get();

data: {
  pilot_id: string,
  customer_name: string,
  started_at: timestamp,
  end_date: timestamp,
  accuracy: 0-100,  // percentage
  issues_reported: integer,
  last_checkin: timestamp,
  status: 'active' | 'paused' | 'completed' | 'failed',
}
```

**Error handling:**
- Query timeout? Retry 2 times, then use cached data from yesterday
- Database unavailable? Create alert, use previous day's snapshot

#### 2.2 Enrich Leads (Apollo MCP)

**For each new lead in newLeads:**

```
Input:
  - lead name
  - company name
  - email (if provided)

Apollo enrichment query:
  - company size
  - industry
  - funding status
  - decision makers
  - similar companies already using ShopSense
```

**Execution (pseudocode):**

```javascript
for (let lead of newLeads) {
  const enriched = await apollo.enrich({
    first_name: lead.name.split(' ')[0],
    last_name: lead.name.split(' ')[1],
    company_name: lead.company,
    domain: extractDomain(lead.email),
  });

  lead.company_size = enriched.company_size;
  lead.industry = enriched.industry;
  lead.seniority = enriched.seniority;
  lead.decision_makers = enriched.decision_makers;
}
```

**Error handling:**
- Apollo rate-limited? Use cached enrichment from prior month
- Apollo unavailable? Continue without enrichment, note in report

#### 2.3 Compile Pipeline Report

**File location:**
```
obsidian/knowledge/operations/Sales_Pipeline_[DATE].md
Action: WRITE (new file each day)
```

**File structure:**

```markdown
# Sales Pipeline — [DATE]

Generated: [TIMESTAMP]
Pipeline Agent: [Deal Closer | Sales Prospector]

## Quick Stats
- New leads this week: [count]
- Qualified in queue: [count]
- Expected close this month: ₹[amount]
- Active pilots: [count]

## New Registrations (Last 24h)
[Table format]

| # | Name | Company | Interest | Lead Score | Apollo Insights | Action |
|----|------|---------|----------|-----------|----------------|--------|
| 1 | [Name] | [Comp] | ShopSense | [80] | [Industry, Size] | Qualify |

[Details for each lead with Apollo enrichment]

## Follow-ups Due (This Week)
[Table format]

| Lead | Company | Last Contact | Days Since | Next Action | Priority |
|------|---------|------------|-----------|------------|----------|
| [Name] | [Comp] | [Date] | [3] | Send proposal | High |

[Details with suggested messaging]

## Active Pilots
[Table format]

| Pilot | Customer | Started | Duration | Accuracy | Status | Alert |
|-------|----------|---------|----------|----------|--------|-------|
| [ID] | [Name] | [Date] | [2 wks] | [92%] | Running | None |

## Pipeline Value Summary
- Expected revenue (qualified): ₹[amount]
- Expected revenue (demo): ₹[amount]
- Total pipeline: ₹[amount]

## Action Items
1. [Action 1] → [responsible agent]
2. [Action 2] → [responsible agent]
3. [Action 3] → [responsible agent]
```

#### 2.4 Trigger Lead Automation (if new leads)

**For each new lead with lead_score > 30:**

Trigger `lead-automation` workflow:

```
Input: lead_id
Workflow:
  1. Enrich lead (Apollo done in step 2.2)
  2. Score lead (0-100 scale)
  3. Segment by tier (hot/warm/cold)
  4. Draft initial outreach
  5. Queue in CRM for agent

See: workflows/lead-automation.md for full details
```

#### 2.5 Slack Notification

**Post to #sales channel:**

```
📊 **Sales Pipeline Update — [DATE]**

**New Registrations:** [count] new leads
- Highest score: [name] ([score])
- Industry focus: [top industry]

**Follow-ups Due:** [count]
- Most urgent: [name] (last contact [X] days ago)

**Active Pilots:** [count]
- Accuracy avg: [%]
- No issues reported ✓

**This Week's Expected Close:** ₹[amount]

---
Full report: [[Sales_Pipeline_[DATE]]]
See lead details: [[Sales_Pipeline_[DATE]#New Registrations]]
```

---

## Step 3: Standup Generation (9:00 AM)

### Execution Steps

#### 3.1 Read Previous Standup & Sprint Context

**Source 1: Yesterday's standup**

```
File: obsidian/knowledge/operations/Daily_Standup_[YESTERDAY].md
Extract:
  - completed_chunk: was yesterday's chunk completed?
  - blockers: any unresolved?
  - metrics: code commits, PRs reviewed
```

**Source 2: Current sprint plan**

```
File: obsidian/knowledge/operations/Sprint_[WEEK]_Plan.md
Extract:
  - sprint_id: which sprint are we in?
  - sprint_goal: what are we building this week?
  - daily_chunks: what's today's chunk?
  - velocity: what's our pace?
```

**Source 3: Git log (commits from yesterday)**

```
Command: git log --oneline --since="24 hours ago"
Count commits, extract message subjects
Categorize by type (feat, fix, docs, chore, refactor)
```

**Source 4: PROGRESS.md (current status)**

```
File: obsidian/knowledge/operations/PROGRESS.md
Extract:
  - current_chunk: which chunk is active?
  - status: in_progress | completed | blocked?
  - started: when did this chunk start?
  - progress_notes: detailed description
```

#### 3.2 Analyze Blockers

**Question 1: Is yesterday's chunk complete?**

```
If PROGRESS.md.status == 'completed':
  ✓ No blocker, proceed to today's chunk

Else if PROGRESS.md.status == 'in_progress':
  ? Check how long it's been in progress
  - If <3 days: normal, continue
  - If >3 days: potential blocker, flag

Else if PROGRESS.md.status == 'blocked':
  ! BLOCKER DETECTED
  - Extract blocker reason
  - Check how long blocked
  - Add to standup with severity
  - If >2 days: escalate to Vaishak
```

**Question 2: Dependencies blocking today?**

```
Read PROGRESS.md.blockers section:
  For each blocker:
    - Extract dependency (what's blocking)
    - Extract expected unblock date
    - If unblock > today: add to standup blockers
    - If unblock < today and still blocked: escalate
```

#### 3.3 Generate Standup Message

**File location:**
```
obsidian/knowledge/operations/Daily_Standup_[DATE].md
Action: APPEND to file (preserve history in single file per sprint)
```

**File structure:**

```markdown
# Daily Standups — [SPRINT] Week

## [DATE] — [DAY]

### Yesterday
✓ **Completed:** [Chunk ID] — [brief description]
  - Commits: [count]
  - Lines changed: [+X, -Y]
  - Key changes: [change 1, change 2]

💡 **Learnings:**
  - [Learning 1]
  - [Learning 2]

❌ **Blockers:** [None | blocker description]

### Today
🎯 **Chunk:** [Chunk ID] — [title]
  - **Expected Output:** [deliverable]
  - **Estimated Effort:** [X hours]
  - **Dependencies:** [None | list]

🔧 **Technical Focus:**
  - [Focus area 1]
  - [Focus area 2]

### Metrics
| Metric | Yesterday | This Sprint |
|--------|-----------|------------|
| Commits | [#] | [#] |
| PRs reviewed | [#] | [#] |
| Sprint progress | - | [%] |
| Velocity | - | [#] points |

### Notes
[Any additional context, ideas, or observations]

---
```

#### 3.4 Post to Slack

**Post to #standup channel:**

```
🚀 **Daily Standup — [DATE] [DAY]**

**Yesterday**
✓ Completed: [Chunk ID]
- [Commit count] commits
- [Key change 1, Key change 2]

**Today**
🎯 Working on: [Chunk ID]
- Expected: [output]
- Effort: [hours]
- No blockers ✓

**Blockers:** [None | description]

---
Full standup: [[Daily_Standup_[DATE]]]
```

#### 3.5 Update Firestore Metrics

**Collection:** `standups/[DATE]`
**Action:** CREATE new document

```javascript
{
  date: [today],
  day_of_week: 'Monday',
  sprint_id: 'Sprint 12',
  completed_chunk: 'C-SHP-08',
  completed_points: 5,
  commits: 3,
  blockers_count: 0,
  blocker_details: [],
  today_chunk: 'C-SHP-09',
  metrics: {
    sprint_progress: 65,
    velocity: 18,
    blockers_unresolved: 0,
  }
}
```

---

## Step 4: Work Execution (9 AM - 5 PM)

**NOT automated.** This is when Vaishak works on the day's chunk.

**Checkpoint at midday (12 PM):**
- Continue to Step 5 (Content Queue Check)

---

## Step 5: Content Queue Check (12:00 PM)

### Execution Steps

#### 5.1 Query Scheduled Content

**Source 1: Google Drive content calendar**

```
Endpoint: Google Drive
Folder: ShopSense/Content/Calendar

Query for files with:
  - status: "scheduled" or "approved"
  - publish_date: today or past
  - platform: LinkedIn, Instagram, Twitter, Blog
```

**Source 2: Obsidian Content Calendar**

```
File: obsidian/knowledge/marketing/Content_Calendar.md

Format expected:
---
week: [week #]
---

## Monday
- [ ] LinkedIn post #1 — title
- [ ] Instagram post #1 — title

## Tuesday
...

Status: "scheduled" = approve already given
Status: "draft" = awaiting review
Status: "published" = already posted
```

#### 5.2 Check Approval Status

**For each scheduled post for today:**

```
Question: Is this content approved?
  - Check Google Drive comment history (Brand Guardian approval?)
  - Check Obsidian status field
  - Check Slack #content channel for approval message

If approved:
  ✓ Mark as "ready_to_publish"
  ✓ Queue for platform scheduling (Buffer, Later, or direct)

If NOT approved:
  ? Flag as "awaiting_review"
  ? Check how long waiting
  ? If >24h: escalate to Brand Guardian with comment
```

#### 5.3 Publish Approved Content

**For each "ready_to_publish" post:**

**Buffer API Integration (if using Buffer):**

```javascript
for (let post of readyToPublish) {
  const result = await buffer.publish({
    profile_id: getProfileId(post.platform),
    text: post.copy,
    image: post.image_url,
    shorten_links: true,
    schedule_at: post.publish_time,
  });

  // Log published
  logContentPublication({
    content_id: post.id,
    platform: post.platform,
    buffer_update_id: result.id,
    status: 'published',
    timestamp: now(),
  });
}
```

**Direct Platform Publishing (if not using Buffer):**

```
For LinkedIn:
  - Use Slack command or API to post
  - Copy: post.copy
  - Image: upload image
  - Schedule: post.publish_time

For Instagram:
  - Use Later or manual scheduling
  - Image quality: ensure 1080x1350 or 1200x627

For Blog:
  - Deploy to website (WordPress or static site)
  - Trigger CDN cache clear
```

**Error handling:**
- API rate-limited? Queue for next available slot
- Image missing? Skip publication, alert team
- Text too long? Truncate intelligently or flag for review

#### 5.4 Compile Daily Content Report

**File location:**
```
obsidian/knowledge/marketing/Daily_Content_[DATE].md
Action: WRITE new file
```

**File structure:**

```markdown
# Content Queue — [DATE]

## Published Today
| Time | Content | Platform | Link |
|------|---------|----------|------|
| [time] | [title] | LinkedIn | [URL] |

## Scheduled (Pending Publish)
| Platform | Content | Schedule Time | Status |
|----------|---------|---------------|--------|
| Instagram | [title] | [time] | QUEUED |

## Awaiting Review
| Content | Submitted | Reviewer | Days Waiting |
|---------|-----------|----------|-------------|
| [title] | [date] | Brand Guardian | [2 days] |

## Weekly Summary
- Content published: [#]
- Scheduled pending: [#]
- Awaiting review: [#]
- Publishing rate: [#/day avg]

## Engagement (Last 24h)
| Platform | Impressions | Engagement Rate | Top Post |
|----------|------------|-----------------|----------|
| LinkedIn | [#] | [%] | [title] |
| Instagram | [#] | [%] | [title] |

## Alerts
[Any issues: rate-limited, submission missed, approval stuck, etc.]
```

#### 5.5 Slack Notification

**Post to #content channel:**

```
📱 **Content Queue — [DATE]**

**Published Today:** [#] posts
- LinkedIn: [title] — [impressions] impressions
- Instagram: [title] — [reaches] reaches

**Scheduled:** [#] posts queued
**Awaiting Review:** [#] posts

**Weekly Publishing Rate:** [#]/day

---
Full report: [[Daily_Content_[DATE]]]
Content calendar: [[Content_Calendar]]
```

---

## Step 6: Daily Close (5:00 PM)

### Execution Steps

#### 6.1 Query Today's Transactions

**Firestore Query: Revenue Transactions**

```javascript
const transactions = await db.collection('transactions')
  .where('date', '==', new Date())
  .where('type', 'in', ['payment', 'refund'])
  .get();

data: {
  transaction_id: string,
  date: timestamp,
  type: 'payment' | 'refund',
  amount: number,  // ₹ amount
  customer_id: string,
  customer_name: string,
  description: string,  // "Pilot subscription renewal" or "Custom fee"
  status: 'captured' | 'pending' | 'failed',
  payment_method: 'bank_transfer' | 'upi' | 'card',
  notes: string,
}
```

**Firestore Query: Expenses**

```javascript
const expenses = await db.collection('expenses')
  .where('date', '==', new Date())
  .get();

data: {
  expense_id: string,
  date: timestamp,
  category: 'cogs' | 'sgna' | 'rd' | 'marketing',
  amount: number,  // ₹ amount
  description: string,
  receipt_url: string,
  status: 'pending' | 'approved' | 'rejected',
  approved_by: string,
  notes: string,
}
```

#### 6.2 Aggregate Daily Metrics

**Calculation 1: Daily Revenue**

```
revenue_today = sum(transactions where status='captured' and type='payment')
revenue_today = transactions[0].amount + transactions[1].amount + ...

For pending transactions:
  - Mark separately
  - Track expected capture date
```

**Calculation 2: Daily Expenses**

```
expenses_today = sum(expenses where status in ['approved', 'pending'])
expenses_by_category = {
  'cogs': [sum],
  'sgna': [sum],
  'rd': [sum],
  'marketing': [sum],
}
```

**Calculation 3: MTD (Month-to-Date) Totals**

```
start_of_month = new Date(today.getFullYear(), today.getMonth(), 1)

mtd_revenue = sum(transactions
  where date >= start_of_month
  and date < today + 1 day
  and status='captured'
)

mtd_expenses = sum(expenses
  where date >= start_of_month
  and date < today + 1 day
  and status='approved'
)

mtd_net = mtd_revenue - mtd_expenses
```

**Calculation 4: Burn Rate**

```
// Weekly average burn
average_daily_burn = mtd_expenses / days_in_month_so_far

// Runway
estimated_monthly_revenue = mtd_revenue * (30 / days_in_month_so_far)
monthly_burn_projection = average_daily_burn * 30

runway_days = available_cash / average_daily_burn
runway_months = runway_days / 30
```

#### 6.3 Update Finance Ledger

**File location:**
```
obsidian/knowledge/financials/Finance_Ledger.md
Action: APPEND (sacred file, never overwrite)
```

**File structure:**

```markdown
# Finance Ledger — [MONTH] 2026

**Last Updated:** [TIMESTAMP]
**Current Status:** Month in progress | Month closed

---

## Transaction Register

### [DATE]

#### Revenue
| ID | Customer | Amount | Status | Notes |
|----|----------|--------|--------|-------|
| TXN-001 | Company A | ₹25,000 | Captured | Pilot subscription |

**Total Today:** ₹25,000
**Total Captured:** ₹25,000
**Pending:** ₹0

#### Expenses
| ID | Category | Description | Amount | Status |
|----|----------|-------------|--------|--------|
| EXP-001 | Marketing | Google ads | ₹500 | Approved |

**Total Today:** ₹500
**Approved:** ₹500
**Pending:** ₹0

---

## MTD Summary

**Period:** [START] to [TODAY]
**Days elapsed:** [#]

### Revenue
- Total captured: ₹[amount]
- Pending: ₹[amount]
- Expected this month: ₹[amount]

### Expenses
- Approved: ₹[amount]
- Pending: ₹[amount]
- By category:
  - COGS: ₹[amount]
  - SG&A: ₹[amount]
  - R&D: ₹[amount]
  - Marketing: ₹[amount]

### Net
- MTD Net: ₹[amount] (revenue - expenses)
- Daily average burn: ₹[amount]
- Runway: [#] days at current burn
- Runway (months): [#.#]

### Gate Progress (Gate 2: ₹25K/month)
- Target: ₹25,000
- Achieved: ₹[amount]
- Progress: [%]
- Days remaining in month: [#]
- Daily rate needed: ₹[amount] to hit target

---

## Transaction Details (History)
[Detailed log of all transactions for audit trail]
```

#### 6.4 Create Daily Close File

**File location:**
```
obsidian/knowledge/operations/Daily_Close_[DATE].md
Action: WRITE new file
```

**File structure:**

```markdown
# Daily Close — [DATE]

**Closed By:** Finance Tracker
**Timestamp:** [TIMESTAMP]

## Revenue Captured Today
✓ **Total:** ₹[amount]

[Transaction table with details]

**Pending Capture:** ₹[amount]
[Pending transaction details]

## Expenses Logged Today
**Total:** ₹[amount]

[Expense table by category]

## MTD Summary
| Metric | Amount |
|--------|--------|
| Revenue captured | ₹[amount] |
| Expenses approved | ₹[amount] |
| Net MTD | ₹[amount] |
| Burn rate (daily) | ₹[amount] |
| Runway (days) | [#] |

## Gate 2 Progress
- Target: ₹25,000
- Achieved: ₹[amount]
- Progress: [%]
- Remaining: ₹[amount]
- Days to deadline: [#]

## Key Observations
- [Observation 1]
- [Observation 2]
- [Observation 3]

## Alerts
[Any issues: high burn, low revenue, pending transactions, etc.]
```

#### 6.5 Update Dashboard

**Google Sheets:** `ShopSense/Metrics Dashboard`

```
Action: Auto-update (via Apps Script or Zapier)

Cells to update:
- Total MTD Revenue: ₹[amount]
- Total MTD Expenses: ₹[amount]
- Daily Burn: ₹[amount]
- Runway: [#] days
- Gate 2 Progress: [%]
- Active Pilots: [#]
- Lead Pool: [#]
```

#### 6.6 Slack Notification

**Post to #operations channel:**

```
💰 **Daily Close — [DATE]**

**Revenue Captured:** ₹[amount]
- [Customer 1]: ₹[amount]
- [Customer 2]: ₹[amount]

**Expenses Logged:** ₹[amount]

**MTD Summary:**
- Revenue: ₹[amount] ([%] to Gate 2 ₹25K target)
- Burn: ₹[/day]
- Runway: [#] days

**Alerts:** [None | description]

---
Full report: [[Daily_Close_[DATE]]]
Dashboard: [[Metrics_Dashboard]]
```

#### 6.7 Escalation Checks

**Check 1: Gate 2 Milestone**

```
If mtd_revenue >= 25000:
  ✓ GATE 2 ACHIEVED!
  Action: Post celebration message
  Action: Trigger escalation alert to Vaishak
  Action: Log milestone in obsidian/knowledge/Strategy_Decisions.md
```

**Check 2: Burn Rate Alert**

```
If average_daily_burn > 5000:
  ! HIGH BURN ALERT
  Action: Calculate remaining runway
  Action: Post alert to Vaishak in Slack
  Action: Recommend cost review or revenue acceleration
```

**Check 3: Pending Revenue**

```
If pending_revenue > 0:
  ? Pending capture
  Action: List amount pending
  Action: Follow up with Finance Tracker to capture
  Action: If pending >24h: escalate to Vaishak
```

---

## Step 7: Night Review (9:00 PM)

### Execution Steps

#### 7.1 Read Day's Output Files

**Files to read:**

```
1. Daily_Standup_[DATE].md — today's progress
2. Daily_Close_[DATE].md — revenue/expense summary
3. PROGRESS.md — any updates since 9 AM
4. Daily_Content_[DATE].md — content activity
5. Sales_Pipeline_[DATE].md — lead activity
```

#### 7.2 Summarize Day

**Algorithm:**

```
questions:
1. What was completed today?
2. What revenue was captured?
3. Are there any unresolved blockers?
4. What's the status of today's sprint chunk?
5. What's tomorrow's priority?
6. Are there any escalations needed?
```

#### 7.3 Generate Night Review File

**File location:**
```
obsidian/knowledge/operations/Night_Review_[DATE].md
Action: WRITE new file
```

**File structure:**

```markdown
# Night Review — [DATE]

**Reviewed By:** Ops Manager
**Timestamp:** [TIMESTAMP]

## Today's Summary

### Work Completed
✓ **Chunk:** [Chunk ID]
  - Status: [completed | in-progress | blocked]
  - Commits: [#]
  - Delivery: [on-time | delayed]

### Revenue
- Captured: ₹[amount]
- Pending: ₹[amount]
- MTD total: ₹[amount] ([%] to Gate 2)

### Content
- Published: [#] posts
- Scheduled: [#] posts
- Engagement: [avg engagement %]

### Sales
- New leads: [#]
- Follow-ups completed: [#]
- Pilots active: [#]

## Blockers (Unresolved)
[List any blockers from PROGRESS.md status = 'blocked']

**Status:** [None | list with mitigation]

## Tomorrow's Schedule
[List meetings from Google Calendar]

## Tomorrow's Priorities (Ranked)
1. [Priority 1 — why]
2. [Priority 2 — why]
3. [Priority 3 — why]

## Key Metrics
| Metric | Today | MTD | Target |
|--------|-------|-----|--------|
| Revenue | ₹[X] | ₹[X] | ₹25K |
| Burn | ₹[X] | - | < ₹5K/day |
| Lead pool | [#] | - | - |
| Pilots | [#] | - | - |

## Notes for Tomorrow
- [Note 1]
- [Note 2]
- [Note 3]

## Escalations Required
[Any issues needing Vaishak's attention]
```

#### 7.4 Update Tomorrow's Priorities File

**File location:**
```
obsidian/knowledge/operations/Tomorrow_Priorities.md
Action: OVERWRITE (daily priority file, safe to replace)
```

**File structure:**

```markdown
# Tomorrow's Priorities — [TOMORROW'S DATE]

**As of:** [TODAY] 9 PM
**Review date:** [TOMORROW] 8 AM

## Tomorrow's Meetings
[List from Google Calendar]

## Priority Stack
1. **[Chunk ID]** — [description]
   - Estimated: [hours]
   - Dependencies: [list or none]
   - Impact: [High | Medium | Low]

2. **[Sales/content task]** — [description]
   - Due: [time or EOD]
   - Impact: [High | Medium | Low]

3. **[Operational task]** — [description]
   - Due: [time or EOD]
   - Impact: [High | Medium | Low]

## Blockers (Carry Over from Today)
[List any unresolved blockers with status]

## Key Numbers
- MTD Revenue: ₹[amount] / ₹25K target ([%])
- Lead pool: [#]
- Runway: [#] days
- Active pilots: [#]

## Urgent Actions
[Any items requiring immediate attention tomorrow morning]
```

#### 7.5 Slack Notification

**Post to #standup channel:**

```
🌙 **Night Review — [DATE]**

**Today's Summary**
✓ Completed: [Chunk ID]
💰 Revenue: ₹[amount]
📊 Gate 2 progress: [%] of ₹25K target

**Tomorrow's Focus**
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]

**Blockers:** [None | list]

**Runway:** [#] days at current burn

---
See tomorrow's plan: [[Tomorrow_Priorities]]
See full review: [[Night_Review_[DATE]]]
```

#### 7.6 Check Calendar for Next Day Prep

**Questions to ask:**

```
1. Are there any early morning meetings tomorrow? (before 9 AM)
   → If yes: alert in briefing, add prep notes

2. Are there any critical decision-making meetings? (demos, customer calls)
   → If yes: prepare materials/talking points

3. Are there any external dependencies needed? (approvals, reviews)
   → If yes: send reminder requests before 8 AM

4. Are tomorrow's meetings properly scheduled with agendas?
   → If no: escalate as alert
```

#### 7.7 Escalation Checks

**Check 1: Blocker Persistence**

```
If blocker has been unresolved for >2 days:
  ! PERSISTENT BLOCKER
  Action: Add to escalation alert
  Action: Send Slack message to Vaishak with context
  Action: Request decision/unblock action
```

**Check 2: Gate Progress**

```
If (days_remaining_in_month < 10) AND (mtd_revenue < 20000):
  ⚠ GATE 2 AT RISK
  Action: Calculate daily revenue needed
  Action: Send alert to Vaishak with recommendations
```

**Check 3: Revenue Pending**

```
If pending_revenue > 25000:
  $ MAJOR CAPTURE PENDING
  Action: List pending transactions
  Action: Send reminder to follow up with customers
```

**Check 4: Pilot Issues**

```
If any active pilot has accuracy < 70%:
  ⚠ PILOT QUALITY ALERT
  Action: Flag in night review
  Action: Schedule urgent accuracy investigation
  Action: Alert Vaishak if accuracy <60%
```

---

## Error Handling Summary

| Error | Retry | Escalation | Fallback |
|-------|-------|-----------|----------|
| Firestore timeout | 3x / 30s | After 3 fails | Use cached data |
| Slack unavailable | 2x / 60s | After 2 fails | Log locally |
| File write failed | 2x / 60s | After 2 fails | Alert and re-queue |
| Google Calendar API error | 2x / 30s | After 2 fails | Proceed without calendar |
| Apollo rate-limited | 1x / 60s | After 1 fail | Use cached enrichment |
| Git unavailable | Skip section | N/A | Continue without commits |

---

## Success Criteria

Each daily operation is successful when:

✓ **Morning Briefing:** Briefing delivered to Slack + Obsidian by 8:15 AM
✓ **Sales Pipeline Check:** Report generated + new leads processed by 8:45 AM
✓ **Standup Generation:** Standup posted to Slack + file updated by 9:15 AM
✓ **Content Queue Check:** All approved content published by 12:15 PM
✓ **Daily Close:** Metrics updated + escalations (if any) sent by 5:15 PM
✓ **Night Review:** Tomorrow's priorities updated by 9:15 PM

Any operation missing its deadline = escalate to Vaishak.

