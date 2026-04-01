# Lead Automation Workflow — Registration to Outreach

**Purpose:** Automated pipeline for converting new registrations → qualified leads → outreach → pilots.

**Trigger:** New document created in Firestore `registrations` collection
**Owner Agent:** Sales Prospector (primary) + Deal Closer (outreach)
**Timeline:** Immediate to <24 hours
**Output:** Lead record created, scored, enriched, and outreach queued

---

## Workflow Overview

```
New Registration (Firestore)
         │
         ▼
[Step 1] Enrich Lead Data
         │
         ├─ Apollo enrichment (company, role, seniority)
         ├─ Common Room signals (recent activity)
         └─ Industry/firmographic scoring
         │
         ▼
[Step 2] Score Lead (0-100 scale)
         │
         ├─ Fit score (how close to ICP)
         ├─ Engagement score (activity signals)
         └─ Total score (fit + engagement weighted)
         │
         ▼
[Step 3] Segment by Tier
         │
         ├─ Hot lead (80+): Immediate outreach
         ├─ Warm lead (50-79): Day 2 follow-up
         └─ Cold lead (<50): Queue for nurture
         │
         ▼
[Step 4] Draft Outreach
         │
         ├─ Personalized message (name, company, pain point)
         ├─ Channel: WhatsApp (primary) or LinkedIn
         └─ CTA: Schedule 15-min call or see demo
         │
         ▼
[Step 5] Queue in CRM
         │
         └─ Await agent approval + sending
```

---

## Step 1: Enrich Lead Data

### Trigger Detection

**Firestore listener on `registrations` collection:**

```javascript
db.collection('registrations').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const newLead = change.doc.data();
      if (newLead.status === 'new') {
        runLeadAutomation(newLead);
      }
    }
  });
});
```

**Expected registration document structure:**

```javascript
{
  registration_id: 'REG-20260401-001',
  created_at: timestamp,
  first_name: 'Rajesh',
  last_name: 'Sharma',
  email: 'rajesh@company.com',
  phone: '+91-98765-43210',
  company: 'Retail Chain Inc.',
  company_domain: 'company.com',
  role: 'Store Manager',
  interest: 'ShopSense',  // or list: ['ShopSense', 'inventory_optimization']
  message: '[Custom message from registration form]',
  source: 'website' | 'linkedin' | 'referral' | 'whatsapp',
  status: 'new',  // will be changed to 'enriched' after this step
}
```

### Enrichment Step 1: Apollo Data Enrichment

**MCP Tool:** Apollo (leads)

**Input:**
- first_name, last_name
- company, email domain
- role (if provided)

**Execution:**

```javascript
const apolloData = await apollo.enrich({
  first_name: newLead.first_name,
  last_name: newLead.last_name,
  company: newLead.company,
  domain: newLead.company_domain,
  role: newLead.role,
});

enrichment = {
  apollo_person_id: apolloData.id,
  decision_maker: apolloData.seniority,  // true if exec/director+
  company_size: apolloData.company_size,  // employees
  industry: apolloData.industry,
  company_revenue: apolloData.company_revenue,
  funding_status: apolloData.funding_status,  // profitable, funded, bootstrapped
  employee_emails: apolloData.email_count,  // how many emails in company on file
  verified_email: apolloData.email_verified,
}
```

**Error handling:**
- API rate-limited? Queue for retry in 5 minutes
- Company not found? Use domain-based industry guessing + mark as "manual_verify_needed"
- Email invalid? Flag for manual validation

**Update registration document:**

```javascript
await db.collection('registrations').doc(registration_id).update({
  enrichment_status: 'enriched',
  enrichment_data: enrichment,
  enrichment_timestamp: now(),
});
```

### Enrichment Step 2: Common Room Signals

**MCP Tool:** Common Room (accounts)

**Input:**
- company name
- company domain

**Execution:**

```javascript
const crSignals = await commonroom.getAccountSignals({
  company_name: newLead.company,
  domain: newLead.company_domain,
});

signals = {
  company_mentions: crSignals.mentions_30d,  // how many team mentions in last 30d
  engagement_score: crSignals.engagement_score,  // 0-100
  last_activity: crSignals.last_activity_date,
  activity_trend: crSignals.trend,  // increasing, stable, decreasing
  active_team_members: crSignals.active_members_count,
  communities_mentioned: crSignals.communities,  // [Slack communities, forums, etc.]
}
```

**What to look for:**
- If mentions > 5 in last 30d → Company actively discussing our space
- If engagement_score > 70 → High activity, ready for outreach
- If activity_trend = 'increasing' → Momentum, good time to pitch
- If last_activity < 24h ago → Fresh interest

**Update registration:**

```javascript
await db.collection('registrations').doc(registration_id).update({
  common_room_signals: signals,
});
```

**Error handling:**
- Company not found in Common Room? Continue with Apollo data only
- API unavailable? Skip this step, proceed to scoring

### Enrichment Step 3: Identify Decision Makers

**Logic:**

```
From Apollo enrichment:
  - role = 'CEO' | 'Founder' | 'Store Manager' | 'Operations Manager' | etc.

Decision maker tiers:
  Tier 1 (Highest priority):
    - Owner, Founder, CEO, President
    - VP Operations, VP Sales, Head of [function]
    - C-suite (CFO, CTO, etc.)

  Tier 2 (Good target):
    - Manager, Director, Senior [role]
    - Department head

  Tier 3 (Influencer, not decision maker):
    - Analyst, Coordinator, Associate
    - Support staff

is_decision_maker = role in tier1_or_tier2
decision_maker_tier = 1 or 2 or 3
```

**Update registration:**

```javascript
await db.collection('registrations').doc(registration_id).update({
  decision_maker: is_decision_maker,
  decision_maker_tier: decision_maker_tier,
});
```

---

## Step 2: Score Lead (0-100 Scale)

### Scoring Algorithm

**Component 1: Fit Score (40 points max)**

```
fit_score = 0

// Company size fit
if company_size in [10, 500]:  // SMB retail focus
  fit_score += 10
elif company_size in [500, 5000]:  // Growth target
  fit_score += 8
elif company_size > 5000:  // Enterprise, harder to close
  fit_score += 5
else:
  fit_score += 0  // Unknown

// Industry fit
if industry in ['retail', 'food_and_beverage', 'convenience']:
  fit_score += 15  // Perfect fit
elif industry in ['hospitality', 'logistics', 'healthcare']:
  fit_score += 10  // Adjacent fit
else:
  fit_score += 5   // Other (may be interested)

// Decision maker fit
if decision_maker_tier == 1:
  fit_score += 10  // Executive = easy approval
elif decision_maker_tier == 2:
  fit_score += 7   // Manager = can influence
else:
  fit_score += 2   // Analyst = must loop in decision maker

// Company traction
if funding_status == 'funded' or company_revenue > 1M:
  fit_score += 3   // Well-resourced = higher budget
```

**Component 2: Engagement Score (40 points max)**

```
engagement_score = 0

// Source quality
if source == 'referral':
  engagement_score += 20  // Someone trusted referred them
elif source == 'linkedin':
  engagement_score += 15  // Active on platform
elif source == 'website':
  engagement_score += 10  // Found us themselves
elif source == 'whatsapp':
  engagement_score += 10  // Direct contact
else:
  engagement_score += 5

// Message engagement
if message != null and message.length > 50:
  engagement_score += 10  // Detailed message = more intent
elif message != null:
  engagement_score += 5   // Some effort
else:
  engagement_score += 0   // Generic

// Company activity signals (from Common Room)
if common_room_signals.engagement_score > 70:
  engagement_score += 8   // Company actively engaged
elif common_room_signals.engagement_score > 50:
  engagement_score += 5
else:
  engagement_score += 2

// Recent company activity
if common_room_signals.last_activity < 7_days:
  engagement_score += 7   // Recent conversation
else:
  engagement_score += 2
```

**Component 3: Bonus Points (20 points max)**

```
bonus = 0

// Existing relationship
if company in apollo_existing_customers:
  bonus += 10  // We already know them

// Competitive pressure
if common_room_signals.competitors_mentioned > 5:
  bonus += 5   // They're looking at competitors, time to engage

// Timing
if registration_day == 'Friday' or registration_day == 'Monday':
  bonus += 3   // Weekend/start-of-week research = higher intent (might spike)
else if common_room_signals.activity_trend == 'increasing':
  bonus += 3   // Rising momentum

// Email verified
if enrichment.verified_email == true:
  bonus += 2   // Reduces bounce risk
```

**Total Score:**

```
lead_score = fit_score + engagement_score + bonus
lead_score = min(lead_score, 100)  // Cap at 100
```

**Scoring interpretation:**

```
80-100: HOT LEAD (Immediate outreach)
  - Likely to convert, quick sales cycle
  - Action: WhatsApp outreach same day

50-79: WARM LEAD (Follow-up next day)
  - Good potential, needs nurturing
  - Action: Email + WhatsApp day 2

0-49: COLD LEAD (Nurture track)
  - Lower fit or engagement
  - Action: Weekly newsletter, monthly check-in
```

### Update Firestore with Score

**Collection:** `leads` (new document created from registration)

```javascript
const leadRecord = {
  lead_id: 'LEAD-' + registration_id,
  registration_id: registration_id,

  // Personal info
  first_name: registration.first_name,
  last_name: registration.last_name,
  email: registration.email,
  phone: registration.phone,

  // Company info
  company: registration.company,
  company_domain: registration.company_domain,
  industry: enrichment.industry,
  company_size: enrichment.company_size,

  // Role & decision making
  role: registration.role,
  decision_maker: registration.decision_maker,
  decision_maker_tier: registration.decision_maker_tier,

  // Scoring
  lead_score: lead_score,
  score_components: {
    fit: fit_score,
    engagement: engagement_score,
    bonus: bonus,
  },

  // Status
  status: 'new',  // new → qualified → contacted → demo → pilot
  tier: 'hot' | 'warm' | 'cold',  // based on lead_score

  // Timeline
  created_at: registration.created_at,
  scored_at: now(),
  next_followup_date: calculateFollowupDate(lead_score),

  // Enrichment
  enrichment_data: enrichment,
  common_room_signals: signals,

  // Interaction history
  interactions: [],  // Will be appended as emails/calls sent

  // Outreach
  outreach_draft: null,  // Will be filled by step 4
  outreach_status: 'pending',  // pending → sent → opened → responded → qualified
};

await db.collection('leads').doc(leadRecord.lead_id).set(leadRecord);
```

---

## Step 3: Segment by Tier & Set Follow-up Date

### Tier Assignment

**Based on lead_score:**

```javascript
if (lead_score >= 80) {
  tier = 'hot';
  next_followup_date = today;  // Outreach immediately
  outreach_channel = 'whatsapp';  // Direct, fast
  urgency = 'same_day';
} else if (lead_score >= 50) {
  tier = 'warm';
  next_followup_date = tomorrow;  // Day 2
  outreach_channel = 'email_then_whatsapp';  // Softer
  urgency = 'within_48h';
} else {
  tier = 'cold';
  next_followup_date = today + 7_days;  // Wait a week
  outreach_channel = 'email';  // Lowest touch
  urgency = 'weekly_nurture';
}
```

**Update lead record:**

```javascript
await db.collection('leads').doc(leadRecord.lead_id).update({
  tier: tier,
  next_followup_date: next_followup_date,
  urgency: urgency,
});
```

### Cold Lead Path (Nurture)

**For leads with score < 50:**

```
Action: Add to email nurture sequence
Sequence:
  Day 1 (registration): Auto-send welcome email
  Day 7: Check-in email + case study
  Day 14: Feature highlight email
  Day 21: Special offer / pilot invitation

At any point: If they engage (open 3+, click links), move to 'warm' track
```

---

## Step 4: Draft Outreach Message

### For Hot Leads (score >= 80)

**Agent:** Sales Prospector (drafts) → Deal Closer (reviews & sends)

**Message type:** Personalized WhatsApp

**Template:**

```
Hi [First Name],

Thanks for checking out ShopSense! 👋

I noticed you're with [Company] — sounds like you're probably handling [pain point from industry/role inference].

We've helped [# companies] in retail reduce shrinkage and improve accuracy by [X%] with edge AI.

Would you have 15 minutes this [day] or [day] for a quick call? Happy to show you how this could work for your stores.

Cheers,
[Agent Name]
```

**Personalization logic:**

```javascript
pain_point = inferPainPoint(registration.role, registration.company_size, registration.industry);
// e.g., Store Manager + retail → "managing multiple store operations efficiently"

metric = selectRelevantMetric(registration.industry);
// e.g., retail → "reduce theft" / hospitality → "inventory accuracy"

social_proof = getRecentCaseStudy(registration.industry);
// e.g., retail → case study of [similar company]

days = getAvailableDays();
// Mon-Fri, suggest next 2 business days
```

**Example personalized message:**

```
Hi Rajesh,

Thanks for checking out ShopSense! 👋

I noticed you're with Retail Chain Inc. — managing inventory across multiple stores is no small task.

We've helped 3+ retail chains reduce shrinkage by 18% on average using edge AI.

Would you have 15 minutes Thursday or Friday for a quick call? Happy to show you how this could work for your stores.

Cheers,
[Agent Name]
```

**Message data structure (Firestore):**

```javascript
{
  outreach_id: 'OUT-' + lead_id,
  lead_id: lead_id,

  channel: 'whatsapp',
  tier: 'hot',

  message_subject: 'Quick call about ShopSense for [Company]',
  message_body: '[Full message text above]',

  personalization_factors: {
    pain_point: 'manage multi-store operations efficiently',
    industry: 'retail',
    role: 'Store Manager',
    metric: 'reduce shrinkage',
    social_proof: '[case study ref]',
  },

  cta: {
    type: 'schedule_call',
    duration: '15 min',
    platform: 'Zoom',
    suggested_dates: ['[Thu, Apr 4]', '[Fri, Apr 5]'],
  },

  status: 'draft',  // draft → approved → sent → opened → replied
  created_at: now(),
  created_by: 'Sales Prospector',

  // Tracking
  sent_at: null,
  opened_at: null,
  clicked_at: null,
  replied_at: null,
  response_sentiment: null,  // positive, neutral, negative
}
```

### For Warm Leads (score 50-79)

**Message type:** LinkedIn message + follow-up email

**LinkedIn message (Day 1):**

```
Hi [First Name],

Saw that you joined our ShopSense waitlist — thanks! Your industry profile caught our attention.

We're building edge AI for retail operations — helping stores cut losses and improve accuracy without massive infrastructure.

Drop me a message if you'd like to explore whether this fits your roadmap.

[Link to demo video]

Talk soon,
[Agent Name]
```

**Email follow-up (Day 2):**

```
Subject: ShopSense — Quick example for [Company]

Hi [First Name],

Following up on my LinkedIn message — thought you might find this interesting.

[Company] deals with [typical pain point for that industry].

ShopSense can help with [specific capability matching their pain point].

[Include: 2-min demo video or case study]

If you're open to it, I'd love to grab 15 minutes to see if it's a fit.

Cheers,
[Agent Name]
```

### For Cold Leads (score < 50)

**Message type:** Email nurture

**Subject line options:**
- "Does your team [pain point]?"
- "Quick question about [Company]"
- "[Company] + ShopSense?"

**Body template:**

```
Hi [First Name],

Came across [Company] in my research — impressive what you all do with [something positive about company/industry].

We're working with [industry] leaders to solve [pain point].

Not sure if it's relevant for you, but [include: helpful resource, blog post, or case study].

If you think there's something here, happy to chat. Otherwise, best of luck with everything you're building!

[Agent name]
```

---

## Step 5: Queue Outreach for Agent Approval & Sending

### Create Task in CRM

**Firestore collection:** `outreach_queue`

```javascript
{
  task_id: 'TASK-' + outreach_id,
  outreach_id: outreach_id,
  lead_id: lead_id,

  assigned_to: tier == 'hot' ? 'Deal Closer' : 'Sales Prospector',

  channel: channel,  // whatsapp, linkedin, email
  message_draft: message_body,
  cta: cta,

  priority: tier,  // hot, warm, cold
  due_date: next_followup_date,

  status: 'awaiting_approval',  // awaiting_approval → approved → sent
  created_at: now(),

  approval_by: null,  // Will be filled by agent
  approved_at: null,
  sent_at: null,

  // Tracking
  open_rate: null,
  click_rate: null,
  response: null,
}
```

### Slack Alert to Agent

**Post to #sales channel:**

```
🔥 **Hot Lead — Immediate Outreach**

**Lead:** [Name] ([Score: 85/100])
**Company:** [Company] ([Size], [Industry])
**Role:** [Role]

**Pain Point:** [Inferred pain point]
**Why hot:** [Scoring rationale]

**Draft Message (WhatsApp):**
---
[Message text]
---

✅ Approve & send
❌ Modify & resend
🗑️ Skip

Link to draft: [Firestore doc link]
```

### Send via WhatsApp (if hot lead)

**Agent approves in Slack reaction:**

If ✅ reaction:

```javascript
// Send WhatsApp via Twilio or WhatsApp API
const result = await whatsapp.send({
  to: lead.phone,  // +91-XXXXX-XXXXX format
  message: message_body,
  track_opens: true,  // Request read receipt
});

// Update tracking
await db.collection('leads').doc(lead_id).update({
  outreach_status: 'sent',
  last_outreach_date: now(),
  last_outreach_channel: 'whatsapp',
});

await db.collection('outreach_queue').doc(task_id).update({
  status: 'sent',
  sent_at: now(),
  whatsapp_message_id: result.message_id,
});

// Slack confirmation
postToSlack('#sales', `✅ Outreach sent to ${lead.first_name} (${lead.company})`);
```

### Follow-up Scheduling

**Set automatic follow-up tasks:**

```javascript
// If no reply within 24 hours (hot leads)
const followup_date = now() + 24_hours;
await createTask({
  task_id: 'TASK-' + outreach_id + '-FOLLOWUP-1',
  lead_id: lead_id,
  action: 'Send follow-up message',
  message: '[Follow-up variant]',
  due_date: followup_date,
  assigned_to: 'Deal Closer',
});

// If no reply within 3 days (warm leads)
const followup_date_2 = now() + 3_days;
await createTask({
  task_id: 'TASK-' + outreach_id + '-FOLLOWUP-2',
  lead_id: lead_id,
  action: 'Send second follow-up',
  message: '[Final follow-up]',
  due_date: followup_date_2,
  assigned_to: 'Sales Prospector',
});

// After 30 days with no response, mark as dead lead
const dead_lead_date = now() + 30_days;
await createScheduledTask({
  function: 'markLeadAsDead',
  parameters: { lead_id: lead_id },
  due_date: dead_lead_date,
});
```

---

## Step 6: Track Response & Move Through Pipeline

### Response Tracking

**Firestore listener on lead document:**

```javascript
db.collection('leads').doc(lead_id).onSnapshot(doc => {
  const lead = doc.data();

  if (lead.outreach_status == 'sent') {
    // Check if message was opened/replied
    const whatsappStatus = await checkWhatsappStatus(lead.whatsapp_message_id);

    if (whatsappStatus.opened) {
      await updateLead(lead_id, { last_interaction: 'opened' });
    }

    if (whatsappStatus.replied) {
      const reply = whatsappStatus.reply_text;

      // Sentiment analysis
      const sentiment = await analyzeSentiment(reply);

      await updateLead(lead_id, {
        outreach_status: 'replied',
        response_text: reply,
        response_sentiment: sentiment,  // positive, neutral, negative
        last_interaction_date: now(),
      });

      // Notify agent in Slack
      notifyAgent(lead.assigned_agent, {
        lead_id: lead_id,
        message: `Reply from ${lead.first_name}: "${reply}"`,
        sentiment: sentiment,
        action_needed: 'Schedule call or send demo link',
      });
    }
  }
});
```

### Lead Status Progression

```
new
  ↓
enriched
  ↓
scored
  ↓
qualified (once outreach sent + positive response)
  ↓
contacted (conversation started)
  ↓
demo (scheduled or watching demo video)
  ↓
pilot (approved for trial deployment)
  ↓
customer (payment received)
  OR
dead_lead (no response after 30 days + follow-ups)
```

### Qualified Lead Trigger

**When a lead moves from 'scored' to 'qualified':**

```javascript
if (lead.outreach_status == 'replied' && lead.response_sentiment == 'positive') {
  await db.collection('leads').doc(lead_id).update({
    status: 'qualified',
    qualified_date: now(),
    next_action: 'Schedule demo call',
    next_followup_date: now() + 2_days,
  });

  // Create demo scheduling task
  await createTask({
    task_id: 'DEMO-' + lead_id,
    lead_id: lead_id,
    action: 'Schedule 30-min demo call',
    assigned_to: 'Deal Closer',
    due_date: now() + 1_day,
  });
}
```

---

## Dead Lead Recovery

### Dead Lead Definition

**A lead is marked "dead" if:**
```
1. Outreach sent > 30 days ago
2. No response to 2+ follow-ups
3. No positive interaction signals
```

### Win-Back Campaign

**Trigger:** Daily check (part of Night Review automation)

```javascript
const deadLeads = await db.collection('leads')
  .where('status', '==', 'dead_lead')
  .where('dead_since', '<', now() - 60_days)  // Dead for 60 days+
  .get();

for (let lead of deadLeads) {
  // Check if company showing new activity (from Common Room)
  const newSignals = await commonroom.getUpdatedSignals(lead.company_domain);

  if (newSignals.activity_increased) {
    // Company is active again — time to re-engage

    const winback_message = `
Hi ${lead.first_name},

Haven't connected in a while, but saw [Company] is [recent activity].

Thought now might be a good time to revisit ShopSense — we've [new feature or metric].

5 min for a quick catch-up?
    `;

    await createTask({
      task_id: 'WINBACK-' + lead_id,
      lead_id: lead_id,
      action: 'Send win-back message',
      message: winback_message,
      assigned_to: 'Sales Prospector',
      due_date: now(),
    });

    await db.collection('leads').doc(lead_id).update({
      status: 'warm',  // Move back to warm
      winback_attempt: true,
      last_outreach_date: now(),
    });
  }
}
```

---

## Error Handling & Escalation

| Error | Handling |
|-------|----------|
| Apollo enrichment fails | Use domain-based guessing, mark manual_verify |
| Invalid phone number | Flag for manual validation, don't send WhatsApp |
| Rate limit on WhatsApp | Queue for retry in 2 hours |
| Message send fails | Retry 2x, then escalate to Sales Prospector |
| No response after 30 days | Mark as dead_lead, trigger win-back in 60 days |
| Negative sentiment in reply | Alert Deal Closer, handle objections |

---

## Success Metrics

**Lead Automation Success:**

✓ Enrichment completes within 2 minutes
✓ Score assigned within 5 minutes of registration
✓ Hot lead outreach sent within 2 hours
✓ Warm lead outreach sent within 24 hours
✓ 30%+ reply rate on hot leads (WhatsApp)
✓ 50%+ of replied leads move to "qualified"
✓ 20%+ of qualified leads move to "demo"
✓ 50%+ of demo leads move to "pilot"

