# Morning Briefing Skill — Daily Command Center Update

**Purpose:** Generate comprehensive daily briefing at 8:00 AM IST containing priorities, calendar, pipeline, metrics, and blockers.

**Triggers:** Daily at 8:00 AM IST (automated via scheduler)
**Owner Agent:** Daily Dispatcher
**Duration:** 5 minutes execution, 1-2 minutes to read
**Output:** Slack message + Obsidian daily note

---

## Briefing Architecture

The morning briefing pulls from 5 data sources and synthesizes them into a single prioritized view:

```
┌─────────────────────────────────────┐
│   MORNING BRIEFING (8:00 AM)        │
├─────────────────────────────────────┤
│ Input Sources:                      │
│  1. PROGRESS.md (yesterday's work)  │
│  2. Google Calendar (today's agenda)│
│  3. Firestore (overnight leads)     │
│  4. Slack (unread messages)         │
│  5. Git log (overnight commits)     │
├─────────────────────────────────────┤
│ Processing:                         │
│  • Extract key metrics              │
│  • Identify blockers                │
│  • Rank priorities by revenue impact│
│  • Detect escalations               │
├─────────────────────────────────────┤
│ Output:                             │
│  • Slack briefing (#standup)        │
│  • Obsidian daily note              │
│  • Email alert (P0 blockers only)   │
└─────────────────────────────────────┘
```

---

## Data Collection Phase

### Source 1: PROGRESS.md (Yesterday's Work)

**File location:** `obsidian/knowledge/operations/PROGRESS.md`

**Expected format:**

```markdown
---
current_sprint: Sprint 12
current_chunk: C-SHP-12
status: in_progress | completed | blocked
started: 2026-04-01
---

## Chunk C-SHP-12: Model Optimization

[Description of chunk]

### Completed Yesterday
- C-SHP-11: Deployed accuracy improvements (DONE in 6 hours)
- WhatsApp: Responded to 2 customer inquiries
- Sales: Follow-up call with [Company] (moved to demo stage)

### Today's Focus
- C-SHP-12: Optimize model inference speed
- Expected: Performance baseline report
- Dependencies: None

### Blockers
- NONE
```

**Extraction algorithm:**

```javascript
const progressData = await readFile('PROGRESS.md');

yesterday = {
  chunk_completed: extractValue(progressData, 'Completed Yesterday'),
  time_spent: extractTime(progressData),
  completeness: extractStatus(progressData),
};

today = {
  chunk_id: extractValue(progressData, 'current_chunk'),
  description: extractValue(progressData, 'Chunk [ID]: '),
  focus_areas: extractList(progressData, 'Today\'s Focus'),
  dependencies: extractList(progressData, 'Dependencies'),
  estimated_hours: estimateHours(progressData),
};

blockers = {
  list: extractList(progressData, 'Blockers'),
  count: blockers.list.length,
  severity: categorize(blockers.list),  // none, minor, major
};

return { yesterday, today, blockers };
```

**Error handling:**
- File missing → Create template, note in briefing
- File >24h old (last modified yesterday) → Add alert flag
- Parsing error → Extract what's readable, note parsing issues

### Source 2: Google Calendar (Today's Meetings)

**API endpoint:** Google Calendar API

**Query parameters:**

```javascript
calendar.list({
  calendarId: 'primary',
  timeMin: today 00:00:00,
  timeMax: today 23:59:59,
  singleEvents: true,
  orderBy: 'startTime',
})
```

**Extraction algorithm:**

```javascript
const events = await calendar.list(params);

meetings = [];
for (let event of events.items) {
  if (event.transparency !== 'transparent') {  // Not marked as free time
    meetings.push({
      title: event.summary,
      start_time: event.start.dateTime,
      duration_minutes: calculateDuration(event),
      attendees: event.attendees.length,
      notes: event.description || '',
      prep_needed: event.description?.includes('prep') ? true : false,
    });
  }
}

// Sort by time
meetings.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

// Flag any overlaps or back-to-back meetings
timeGaps = detectGaps(meetings);
if (timeGaps.shortest < 15_minutes) {
  alert('Busy day — limited breaks between meetings');
}

return meetings;
```

**Error handling:**
- No events → That's fine, note "No scheduled meetings today"
- Calendar API unavailable → Note "Calendar unavailable", continue
- Parsing error → Extract titles only, skip other details

### Source 3: Firestore (Overnight Leads & Registration)

**Firestore queries:**

**Query 1: New registrations (last 24 hours)**

```javascript
const yesterday_midnight = new Date();
yesterday_midnight.setDate(yesterday_midnight.getDate() - 1);
yesterday_midnight.setHours(0, 0, 0, 0);

const newRegistrations = await db.collection('registrations')
  .where('created_at', '>=', yesterday_midnight)
  .where('status', '==', 'new')
  .orderBy('lead_score', 'desc')
  .limit(5)  // Top 5
  .get();

overnight_leads = {
  count: newRegistrations.size,
  top_scorer: newRegistrations.docs[0]?.data(),
  hot_leads_count: newRegistrations.docs.filter(d => d.data().lead_score > 80).length,
};
```

**Query 2: Active pilots requiring check-in**

```javascript
const activePilots = await db.collection('pilots')
  .where('status', '==', 'active')
  .where('last_checkin', '<', now() - 24_hours)  // Hasn't been checked in 24h
  .get();

pilot_checkins_needed = {
  count: activePilots.size,
  pilots: activePilots.docs.map(d => ({
    customer: d.data().customer_name,
    accuracy: d.data().accuracy,
    days_in: calculateDaysSince(d.data().started_at),
  })),
};
```

**Query 3: Payment status**

```javascript
const pendingPayments = await db.collection('transactions')
  .where('status', '==', 'pending')
  .where('created_at', '>=', now() - 7_days)  // Created in last week
  .get();

pending_revenue = {
  count: pendingPayments.size,
  total_amount: sum(pendingPayments.docs.map(d => d.data().amount)),
  oldest_pending_days: calculateDaysSince(pendingPayments.docs[0]?.data().created_at),
};
```

**Error handling:**
- Firestore timeout → Retry 2x, then use yesterday's snapshot
- No results → Note counts as 0

### Source 4: Slack (Overnight Unread Messages)

**MCP Tool:** Slack

**Query:** Unread messages in key channels

```javascript
const channels = ['#standup', '#sales', '#engineering', '#operations'];

overnight_activity = {};

for (let channel of channels) {
  const messages = await slack.getChannelHistory({
    channel: channel,
    oldest: 24_hours_ago,  // Last 24h
    include_attachments: true,
  });

  overnight_activity[channel] = {
    message_count: messages.length,
    critical_mentions: messages.filter(m => m.text.includes('@here') || m.text.includes('URGENT')).length,
    threads: messages.filter(m => m.thread_ts).length,
  };
}

// Check for @mentions directed at key agents
const mentions = await slack.searchMessages({
  query: '@Daily_Dispatcher OR @Deal_Closer OR @Content_Engine',
  oldest: 24_hours_ago,
});

overnight_activity.mentions = mentions.length;
overnight_activity.critical_alerts = mentions.filter(m =>
  m.text.includes('ERROR') || m.text.includes('DOWN') || m.text.includes('CRITICAL')
).length;
```

**Error handling:**
- Slack API unavailable → Skip, note "Slack unavailable"
- No activity → Note "No overnight activity"

### Source 5: Git Log (Overnight Commits)

**Local command execution:**

```bash
git log --since="24 hours ago" --oneline --author="[main developer]"
```

**Processing:**

```javascript
const commits = await execGit('log --since="24 hours ago" --oneline');

git_activity = {
  commit_count: commits.length,
  messages: commits.map(c => c.message),
  files_affected: await countChangedFiles(),
  test_files: commits.filter(c => c.message.includes('test')).length,
};

// Categorize commits
categories = categorizeCommits(commits);
// e.g., { features: 2, fixes: 1, docs: 0, chore: 1 }

// Check for concerning patterns
has_debug_code = commits.any(c => c.diff.includes('console.log') || c.diff.includes('debugger'));
if (has_debug_code) {
  alert('⚠ Debug code left in overnight commits — review before shipping';
}
```

**Error handling:**
- Git unavailable → Note "Git unavailable"
- No commits → Note "No development activity overnight"

---

## Processing & Prioritization Phase

### Extract Key Metrics

**From collected data:**

```javascript
metrics = {
  // Revenue
  mtd_revenue: getFromDailyCloseYesterday('mtd_revenue'),
  gate_2_target: 25000,
  gate_2_progress_pct: (mtd_revenue / gate_2_target) * 100,

  // Sales
  new_leads_overnight: overnight_leads.count,
  hot_leads_overnight: overnight_leads.hot_leads_count,
  pipeline_total_value: sum(allLeads.map(l => estimatedDealValue(l))),

  // Product
  active_pilots: pilot_checkins_needed.count + [other active pilots],
  pilots_requiring_checkin: pilot_checkins_needed.count,
  avg_pilot_accuracy: avg(activePilots.map(p => p.accuracy)),

  // Content
  pending_posts: countScheduledContent(),
  engagement_last_24h: getLastEngagementMetrics(),

  // Operations
  blockers_unresolved: blockers.list.length,
  pending_payments: pending_revenue.total_amount,
};
```

### Identify Blockers & Escalations

**Blocker detection:**

```javascript
escalations = [];

// Check 1: Unresolved blockers from yesterday
if (blockers.count > 0) {
  blockers.list.forEach(blocker => {
    if (blocker.duration > 2_days) {
      escalations.push({
        type: 'BLOCKER_PERSISTENT',
        severity: 'high',
        message: `${blocker} unresolved for ${blocker.duration}`,
      });
    }
  });
}

// Check 2: Pending payments
if (pending_revenue.oldest_pending_days > 3) {
  escalations.push({
    type: 'PAYMENT_PENDING',
    severity: 'medium',
    message: `₹${pending_revenue.total_amount} pending for ${pending_revenue.oldest_pending_days} days`,
  });
}

// Check 3: Critical Slack alerts
if (overnight_activity.critical_alerts > 0) {
  escalations.push({
    type: 'CRITICAL_ALERT',
    severity: 'critical',
    message: `${overnight_activity.critical_alerts} critical alerts in Slack overnight`,
  });
}

// Check 4: Pilot accuracy degradation
if (metrics.avg_pilot_accuracy < 75) {
  escalations.push({
    type: 'PILOT_QUALITY',
    severity: 'high',
    message: `Pilot accuracy ${metrics.avg_pilot_accuracy}% (target: >85%)`,
  });
}

// Check 5: Meetings without prep
if (meetings.filter(m => m.prep_needed && !meeting_has_agenda(m)).length > 0) {
  escalations.push({
    type: 'UNPREPARED_MEETING',
    severity: 'medium',
    message: 'Meetings today missing agendas — recommend 15 min prep',
  });
}

return escalations.sort((a, b) => prioritySeverity(a) - prioritySeverity(b));
```

### Rank Priorities

**Priority algorithm (revenue-weighted):**

```javascript
priorities = [];

// Priority 1: Revenue-impacting activities (highest)
if (metrics.new_leads_overnight > 0) {
  priorities.push({
    rank: 1,
    category: 'SALES',
    task: `Qualify & outreach ${metrics.hot_leads_overnight} hot leads`,
    impact: 'HIGH',
    time_needed: '2-3 hours',
    revenue_potential: '₹10-50K',
  });
}

// Priority 2: Unresolved blockers (critical path)
if (blockers.count > 0) {
  priorities.push({
    rank: 2,
    category: 'UNBLOCK',
    task: `Resolve: ${blockers.list[0]}`,
    impact: 'HIGH',
    time_needed: '1-4 hours',
    revenue_potential: 'Enables other work',
  });
}

// Priority 3: Today's planned chunk (sprint work)
if (today.chunk_id) {
  priorities.push({
    rank: 3,
    category: 'SPRINT',
    task: `Complete ${today.chunk_id}: ${today.description}`,
    impact: 'MEDIUM',
    time_needed: `${today.estimated_hours} hours`,
    revenue_potential: 'Product quality',
  });
}

// Priority 4: Operational tasks (pilot check-ins, content publish, etc.)
if (metrics.pilots_requiring_checkin > 0) {
  priorities.push({
    rank: 4,
    category: 'OPERATIONS',
    task: `Check in on ${metrics.pilots_requiring_checkin} active pilots`,
    impact: 'MEDIUM',
    time_needed: '1-2 hours',
    revenue_potential: 'Pilot retention',
  });
}

// Priority 5: Admin (emails, scheduling, etc.)
priorities.push({
  rank: 5,
  category: 'ADMIN',
  task: 'Process emails, respond to messages, etc.',
  impact: 'LOW',
  time_needed: 'As time allows',
});

return priorities.slice(0, 3);  // Return top 3
```

---

## Output Generation Phase

### Slack Briefing Format

**Post to #standup channel:**

```
🌅 **Morning Briefing — [DATE] [DAY]**

---

**Yesterday's Summary**
✓ Completed: **C-SHP-11** (Accuracy improvements)
  • 6 hours of focused work
  • Improvement achieved: [specific metric]

📈 Metrics:
  • MTD Revenue: ₹**[amount]** ([% to ₹25K Gate 2])
  • Lead pool: **[#]** (new: **[#]** overnight)
  • Active pilots: **[#]** (accuracy avg: **[%]**)

🚨 Blockers: **NONE** ✓

---

**Today's Priorities** (Top 3)
1️⃣  **SALES** — Qualify 2 hot leads overnight
   Impact: ₹10-50K potential
   Time: 2-3 hours

2️⃣  **SPRINT** — C-SHP-12: Model optimization
   Focus: Inference speed baseline
   Time: 6 hours

3️⃣  **OPS** — Check in on 2 active pilots
   Impact: Retention, accuracy monitoring
   Time: 1-2 hours

---

**Today's Calendar**
⏰ 10:00 AM — Sprint standup (15 min)
⏰ 2:00 PM — Customer demo call (30 min) [PREP NEEDED]
⏰ 4:00 PM — 1:1 with [Stakeholder] (30 min)

**Heads up:** 2:00 PM demo call — [customer name]. See attached agenda.

---

**Key Alerts**
⚠️ **1 hot lead waiting:** [Name] from [Company] (score: 87/100)
→ Action: Outreach via WhatsApp this morning

💰 **Pending payment:** ₹[amount] from [Customer] ([X] days pending)
→ Action: Send reminder invoice

---

**Quick Stats**
| Metric | Value | Status |
|--------|-------|--------|
| Gate 2 Progress | ₹[X] / ₹25K ([%]) | [🟢 on track] |
| Daily burn | ₹[X]/day | [🟢 sustainable] |
| Content queue | [#] posts scheduled | [🟢 on track] |
| Sprint progress | [#% / sprint] | [🟢 on track] |

---

**Questions?** Reply in thread.
Full briefing: [[Daily_Briefing_[DATE]]]
```

### Obsidian Daily Note

**File location:** `obsidian/knowledge/operations/Daily_Briefing_[DATE].md`

**File structure:**

```markdown
# Daily Briefing — [DATE] [DAY]

Generated: [TIMESTAMP]
Briefing Agent: Daily Dispatcher

---

## Yesterday (Summary)

### Completed Work
- **Chunk:** C-SHP-11 (Model Optimization, Completed)
  - Duration: 6 hours
  - Output: [What was delivered]
  - Quality: [Assessment]

### Key Interactions
- Sales: Follow-up with [Company], moved to demo stage
- Support: Responded to 2 customer inquiries (non-critical)

### Metrics Yesterday
- Revenue captured: ₹[amount]
- MTD total: ₹[amount] / ₹25K target ([%])
- New leads: [#]
- Content published: [#] posts

---

## Today (Priorities)

### Top 3 Priorities
1. **SALES — Qualify overnight leads**
   - 2 hot leads arrived overnight (scores 80+, 87)
   - Action: WhatsApp outreach, initial qualification
   - Time: 2-3 hours
   - Revenue impact: ₹10-50K potential
   - Success metric: 1+ qualified → call booked

2. **SPRINT — C-SHP-12: Model Optimization**
   - Focus: Inference speed baseline measurement
   - Dependencies: None
   - Estimated: 6 hours
   - Success metric: Performance baseline documented
   - **Block today if needed:** No, all dependencies clear

3. **OPS — Pilot Check-ins**
   - [Pilot 1]: [Customer], day 4, accuracy [%]
   - [Pilot 2]: [Customer], day 10, accuracy [%]
   - Action: Brief status check (5 min each)
   - Time: 1-2 hours
   - Success metric: No critical issues, accuracy trending positive

---

## Calendar (Today)

| Time | Event | Duration | Attendees | Prep Needed |
|------|-------|----------|-----------|------------|
| 10:00 AM | Sprint standup | 15 min | [Team] | No |
| 2:00 PM | Customer demo: [Company] | 30 min | [Attendees] | ✓ YES — review agenda |
| 4:00 PM | 1:1 with [Stakeholder] | 30 min | [Person] | No |

**Prep for 2:00 PM demo:**
- Customer: [Name], [Company], [Industry]
- Key pain point: [What they're trying to solve]
- Demo focus: [Which ShopSense capability]
- Expected outcome: [Move to next stage]
- Talking points: [[Link to sales playbook]]

---

## Overnight Activity

### New Registrations
| # | Name | Company | Score | Interest | Action |
|----|------|---------|-------|----------|--------|
| 1 | [Name] | [Co.] | 87 | ShopSense | WhatsApp outreach |
| 2 | [Name] | [Co.] | 81 | ShopSense | WhatsApp outreach |

### Slack Activity
- #standup: 3 messages (no critical alerts)
- #sales: 2 messages (one follow-up question answered)
- #engineering: 1 message (build passing)

### Git Activity
- Overnight commits: 4
  - 2 fixes (bug resolutions)
  - 1 feature (small addition)
  - 1 docs update
- Status: All tests passing ✓

---

## Current Metrics

### Revenue & Financial
- **MTD Revenue:** ₹[amount] / ₹25,000 target
- **Progress to Gate 2:** [%]
- **Daily burn:** ₹[X]/day
- **Runway:** [#] months
- **Pending revenue:** ₹[amount] ([X] days)

### Sales
- **New leads (overnight):** 2
- **Total lead pool:** [#]
- **Pipeline value:** ₹[amount]
- **Qualified leads:** [#] (next step: [demo/proposal/pilot])
- **Active pilots:** [#] (accuracy avg: [%])

### Content
- **Scheduled posts:** [#] (approved, ready)
- **Posts due today:** [#] (publish times listed)
- **Last 24h engagement:** [# impressions, # engagements]

### Sprint
- **Sprint progress:** [#% of sprint]
- **Velocity:** [# points completed] / [# points planned]
- **Days remaining:** [#]

---

## Blockers & Escalations

### Blockers (Unresolved)
- NONE ✓

### Escalations (if any)
⚠️ **Pending payment reminder needed:**
- Customer: [Name]
- Amount: ₹[X]
- Days pending: [#]
- Action: Send reminder invoice by 11 AM

---

## Key Decisions/Notes for Today

1. [Note 1]
2. [Note 2]
3. [Note 3]

---

## Tomorrow's Priorities (Peek Ahead)

1. [If today completes X, tomorrow's priority is Y]
2. [If today gets blocked, need to unblock Z]

---

**Full daily operations guide:** [[Daily Operations Workflow]]
**See sales pipeline:** [[Sales_Pipeline_[DATE]]]
**See finance:** [[Daily_Close_[YESTERDAY]]]
```

### Email Alert (P0 Blockers Only)

**Trigger:** If any escalation has severity = "critical"

**Email to:** Vaishak
**Subject:** "ALERT: Morning Briefing — Critical Issue Detected"

**Body:**

```
Good morning,

Your morning briefing detected a critical issue requiring immediate attention:

⚠️ [Critical issue description]
Impact: [What's at risk]
Action needed: [Specific action required]
Timeline: [Urgency]

Details:
[Full context]

—
Auto-generated by Daily Dispatcher
Reply to escalate or clarify
```

---

## Briefing Variants

### Weekend Briefing (Saturday/Sunday)

**Different format — lighter, forward-looking:**

```
🌅 **Weekend Briefing — Sunday [DATE]**

---

**This Week Summary**
- Revenue captured: ₹[X]
- New leads: [#]
- Pilots active: [#]
- Content published: [#] posts
- Sprints completed: [#] points

**Biggest win:** [What worked well]
**Biggest challenge:** [What was hard]
**Biggest lesson:** [What we learned]

---

**Next Week (Monday's Start)**
- Sprint starting: [Sprint #]
- Sales focus: [Focus area]
- Product focus: [Focus area]
- Content focus: [Content theme]

**Heads up:** [Any long-lead items to prepare for next week]

---

**Enjoy your weekend! 🎉**
```

### Holiday/Vacation Briefing

If no work scheduled:
```
🌅 **Today is [Holiday Name]**

No briefing scheduled.
Have a great day!

[If urgent: escalation contact info]
```

---

## Error Handling & Resilience

### Graceful Degradation

```javascript
// If ANY data source fails, continue with available data

try {
  progressData = readPROGRESS();
} catch {
  progressData = null;  // Will be noted in briefing
}

try {
  calendarData = getCalendar();
} catch {
  calendarData = null;  // Skip calendar section
}

try {
  leadData = queryLeads();
} catch {
  leadData = null;  // Use yesterday's snapshot
}

// Build briefing from available data
briefing = generateBriefing({
  progress: progressData || "Not available",
  calendar: calendarData || "Not available",
  leads: leadData || cachedYesterdayData,
  // ... etc
});
```

### Retry Logic

```javascript
retryConfig = {
  Firestore: { retries: 3, backoff: 30_seconds },
  GoogleCalendar: { retries: 2, backoff: 10_seconds },
  Slack: { retries: 2, backoff: 10_seconds },
  Git: { retries: 1, backoff: none },  // Local, don't retry much
};

// If all retries fail, continue without that data
```

### Logging & Alerts

```javascript
// Log every data collection attempt
log({
  timestamp: now(),
  source: 'PROGRESS.md',
  status: 'success' | 'retry' | 'failed',
  duration_ms: elapsed,
  error: error_message || null,
});

// If execution takes >10 min, alert Vaishak
if (execution_time > 10_minutes) {
  slack_alert_vaishak('Morning briefing slow: took [X] minutes');
}
```

---

## Success Criteria

✓ Briefing delivered to #standup by 8:15 AM
✓ All 5 data sources queried (or gracefully degraded)
✓ Top 3 priorities clearly identified
✓ Any P0 escalations flagged in email
✓ Calendar section accurate and actionable
✓ Metrics up-to-date and trustworthy
✓ Briefing readable in <2 minutes
✓ Links to detailed docs (PROGRESS.md, Daily_Close, etc.)

If any of the above fails, escalate to Vaishak.

