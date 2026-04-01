# Customer Health Scorecard Template — ShopSense

**For:** Monthly health check reviews and proactive customer management
**Frequency:** Monthly (same date each month, e.g., 5th)
**Audience:** Support team, Tier 3 engineers, Vaishak for at-risk accounts

---

## Customer Profile (Top of scorecard)

```
HEALTH CHECK COMPLETED: [DATE]
REVIEWED BY: [ENGINEER_NAME]

Customer Information
─────────────────────────────────────
Customer Name: [Shop Name]
Customer ID: [FIREBASE_ID]
Contact: [WhatsApp, Phone]
Shop Address: [Full Address]
Installation Date: [YYYY-MM-DD]
Plan: ShopSense Basic (₹25K kit + ₹2K/month)
Days Since Go-Live: [CALCULATED]
Payment Status: [Current / Late / Issue]
```

---

## System Metrics (Last 30 Days)

### Uptime
```
System Uptime: [X]%
─────────────────────────────────────
Target: >99%
Status: [GREEN ✓ / YELLOW ⚠ / RED ✗]

Breakdown:
  - Pi A Uptime: [X]%
  - Pi B Uptime: [X]%
  - Longest Offline Period: [X hours] on [DATE]

Interpretation:
  - >99%: Excellent. System is reliable.
  - 95–99%: Good. Minor outages, but acceptable.
  - 90–95%: Fair. Noticeable outages; investigate cause.
  - <90%: Poor. Recurring issues; urgent troubleshooting needed.
```

### Accuracy
```
Average Detection Accuracy: [X]%
─────────────────────────────────────
Target: >90%
Status: [GREEN ✓ / YELLOW ⚠ / RED ✗]

Trend (Last 30 days):
  - Week 1: [X]%
  - Week 2: [X]%
  - Week 3: [X]%
  - Week 4: [X]%

Per-Camera Accuracy (if available):
  - Camera 1: [X]%
  - Camera 2: [X]%
  - Camera 3: [X]%
  - Camera 4: [X]%

Interpretation:
  - >90%: Excellent. System is reliable.
  - 85–90%: Good. Minor tuning may help.
  - 75–85%: Fair. Recommend recalibration.
  - <75%: Poor. Immediate troubleshooting needed.
```

### Daily Transactions
```
Total Items Tracked (Last 30 days): [X]
─────────────────────────────────────
Average Daily Items: [X]
Busiest Day: [DATE] with [X] items
Quietest Day: [DATE] with [X] items

Interpretation:
  - Steady daily count: Shop is consistently using system.
  - Trending up: More sales, growing business. ✓
  - Trending down: Less sales, or system being used less. ⚠
  - Zero items: Shop may not be using system, or system is offline. ✗
```

### WiFi / Cloud Sync Status
```
Sync Success Rate: [X]%
─────────────────────────────────────
Target: >99% (system should successfully sync every sync interval)
Status: [GREEN ✓ / YELLOW ⚠ / RED ✗]

Interpretation:
  - >99%: Excellent WiFi; system syncs reliably.
  - 95–99%: Good. Minor drops, but offline buffering is working.
  - <95%: WiFi is unstable. Recommend improvements (see diagnostic playbook).
```

---

## Business Metrics

### Time Saved
```
Estimated Time Saved (Last 30 days): [X] hours
─────────────────────────────────────
Calculation:
  - System tracks [TRANSACTION_COUNT] items automatically
  - Manual counting would take ~[X minutes per 50 items]
  - Total time saved: [TRANSACTION_COUNT / 50] * [X minutes] = [HOURS]

Value: [HOURS] * [owner's hourly rate, e.g., ₹300/hr] = ₹[SAVED]

Interpretation:
  - >20 hours/month: Excellent ROI. System is adding value.
  - 10–20 hours/month: Good value. Worth the cost.
  - <10 hours/month: Still valuable, but shop may not be fully utilizing system.
```

### Billing Accuracy
```
Billing Errors in Last 30 days: [X]
─────────────────────────────────────
Target: 0
Status: [GREEN ✓ / YELLOW ⚠ / RED ✗]

Errors Found:
  - [None] or [Description of errors caught and corrected]

Trend:
  - This month: [X]
  - Previous month: [X]
  - Last 3 months: [TREND]

Interpretation:
  - 0 errors: Perfect.
  - 1–2 errors (caught and corrected): Acceptable; monitor closely.
  - >2 errors or recurring: Investigate root cause (see diagnostic playbook).
```

### Items Flagged as Low-Stock
```
Low-Stock Alerts Generated: [X]
─────────────────────────────────────
Items Commonly Flagged:
  - [Item 1]: [Y] times
  - [Item 2]: [Y] times
  - [Item 3]: [Y] times

Interpretation:
  - System is identifying reorder needs; helps prevent stockouts. ✓
  - Customer may not be configuring thresholds; offer education.
```

---

## Engagement Metrics

### Dashboard Usage
```
Dashboard Access Frequency (Last 30 days):
─────────────────────────────────────
Daily Views: [X]
Days Accessed: [X out of 30]
Average Views per Day: [X]

Frequency Interpretation:
  - Daily or near-daily: Owner is actively using system. ✓ Engaged.
  - 3–5 times per week: Good engagement.
  - 1–2 times per week: Minimal engagement; owner may not see full value.
  - <1 time per week: Very low engagement; follow up to understand why.

Next Action (if low):
  - Send: "I noticed you haven't checked the dashboard recently. Everything OK? Let us know if you have questions or need help."
  - Schedule: Brief refresher call on dashboard features and benefits.
```

### Support Tickets
```
Support Tickets (Last 30 days): [X]
─────────────────────────────────────
High-Priority Issues (P0/P1): [X]
Medium-Priority Issues (P2): [X]
Low-Priority / Questions (P3): [X]

Typical Issues:
  - [Issue 1]: [Y] tickets
  - [Issue 2]: [Y] tickets
  - [Issue 3]: [Y] tickets

Ticket Resolution Time:
  - Average: [X hours]
  - Fastest: [X hours]
  - Slowest: [X hours]
  - SLA Met: [X%]

Interpretation:
  - 0 tickets: No issues (good), OR customer not reporting issues (could be bad).
  - 1–3 tickets: Normal; minor troubleshooting.
  - 4+ tickets: Pattern of issues; investigate root cause.
  - P0/P1 tickets unresolved: Critical; escalate immediately.
```

### Customer Feedback / NPS
```
NPS Score (Net Promoter Score):
─────────────────────────────────────
Last Check: [X/10] on [DATE]
Previous Check: [X/10] on [DATE]
Trend: [Improving / Stable / Declining]

Verbatim Feedback:
  - [Quote from customer about what's working]
  - [Quote from customer about pain points]

Interpretation:
  - 9–10: Promoter. Likely to recommend. ✓
  - 7–8: Passive. Satisfied but not enthusiastic.
  - 0–6: Detractor. At churn risk. ✗ Immediate follow-up needed.
```

---

## Health Score Calculation

```
HEALTH SCORE: [CALCULATED] / 100

Formula:
  = (0.3 × Uptime_Score)
    + (0.25 × Accuracy_Score)
    + (0.2 × Engagement_Score)
    + (0.15 × Billing_Score)
    + (0.1 × Support_Score)

Score Breakdown:
  - Uptime Score (0–100):
    • [X]% uptime → [SCORE] points

  - Accuracy Score (0–100):
    • [X]% accuracy → [SCORE] points

  - Engagement Score (0–100):
    • [X] dashboard views/month → [SCORE] points

  - Billing Score (0–100):
    • [X] errors → [SCORE] points

  - Support Score (0–100):
    • [X] tickets, [X]% SLA met → [SCORE] points

Health Tier:
  - 80–100: THRIVING [GREEN ✓]
  - 60–79: HEALTHY [YELLOW ⚠]
  - 40–59: AT-RISK [ORANGE ⚠⚠]
  - 0–39: CRITICAL [RED ✗]
```

---

## Risk Indicators

### Red Flags (Act Immediately)
Check if any of these are true this month:

- [ ] Usage drop >20% compared to last month
- [ ] Accuracy drop >10% compared to baseline
- [ ] System offline >4 hours cumulatively
- [ ] >2 P0/P1 support tickets unresolved
- [ ] Payment late by >7 days
- [ ] Customer expressed frustration or dissatisfaction in calls
- [ ] Known competitor contact / customer considering alternatives
- [ ] Negative NPS feedback

**If any red flag: Escalate to Vaishak for immediate 1:1 call.**

### Yellow Flags (Monitor, Plan Action)
- [ ] Usage drop 5–20% compared to last month
- [ ] Accuracy drop 5–10% compared to baseline
- [ ] System offline 2–4 hours total
- [ ] 1 P0/P1 ticket unresolved, or 3+ P2 tickets
- [ ] Payment late by 3–7 days (but eventually paid)
- [ ] Dashboard accessed <1x per week
- [ ] NPS 6–7 (passive; not yet detractor, but not promoter)

**If 2+ yellow flags: Schedule proactive outreach call (within 3 days).**

### Green Signals (Healthy)
- [ ] Usage stable or growing
- [ ] Accuracy >90%
- [ ] System uptime >99%
- [ ] <1 support ticket per month
- [ ] Payment always on time
- [ ] Dashboard accessed 3+ times per week
- [ ] NPS 8–10 (promoter)

**If mostly green: Continue monthly check-ins; explore upsell/expansion opportunities.**

---

## Recommended Actions

Based on health score and risk indicators, select actions:

### For THRIVING Customers (80–100, all green)
- [ ] Continue monthly health check
- [ ] Send thank-you message + appreciation offer (e.g., "you're a valued customer")
- [ ] Request testimonial / referral
- [ ] Explore upsell: additional cameras, extended support package, or advanced features
- [ ] Invite to community event or webinar (if offered)

### For HEALTHY Customers (60–79, mostly green/yellow)
- [ ] Continue monthly health check
- [ ] Proactive support: offer help on low-engagement features
- [ ] If accuracy drifting: offer free recalibration
- [ ] If WiFi unstable: offer WiFi extender or mesh network recommendation
- [ ] Gather feedback: what could we do better?

### For AT-RISK Customers (40–59, yellow/red flags)
- [ ] IMMEDIATE: Call customer within 24 hours
- [ ] Listen actively to pain points: "What's the biggest frustration?"
- [ ] Offer concrete help: free on-site recalibration, WiFi upgrade, additional training
- [ ] If technical issue: escalate to Tier 3 for urgent fix
- [ ] If expectation issue: reset expectations or offer trial period extension
- [ ] If cost issue: discuss payment plan or offer discount (within authority)
- [ ] Schedule follow-up call 3 days later to confirm improvement

### For CRITICAL Customers (0–39, multiple red flags)
- [ ] URGENT: Call customer immediately (same day)
- [ ] Involve Vaishak (CEO) for personal outreach
- [ ] Understand root cause: technical? relational? financial?
- [ ] Offer path forward: fix technical issue, offer significant discount, or negotiate separation
- [ ] Daily check-ins for 1 week (if customer stays)
- [ ] Consider: is this a good customer fit? If not, graceful exit.

---

## Call Script (For Monthly Check-In)

**Opening (Warm):**
> "Hi [Customer Name]! It's [Your Name] from Ooru Logix. Just checking in on how ShopSense is doing for you!"

**Celebrate Wins (Be specific):**
> "I wanted to share some great news: Your system has been rock-solid this month. [UPTIME]% uptime, [ACCURACY]% accuracy, and you've saved about [X hours] of manual counting. That's excellent."

**Ask About Pain (Listen):**
> "Anything bugging you about the system lately? Any features you wish we had?"
>
> *Listen without interrupting. Take notes.*

**Share Recommendations (Based on scorecard):**
> "Based on what I'm seeing, I'd recommend: [SPECIFIC ACTION]."
>
> Examples:
> - "Your accuracy dipped slightly last week. Let's do a quick recalibration—should take 20 minutes."
> - "I noticed you haven't checked the dashboard in a while. Want me to send a quick video on the features you might be missing?"
> - "Your WiFi seems a bit unstable. A WiFi extender would help—want me to send you the details?"

**Next Steps (Concrete):**
> "Here's what I'll do: [ACTION]. And let's chat again on [DATE] same time. Sound good?"

**Close (Warm):**
> "Thanks for being such a great customer. We're here if you need anything."

---

## Documentation & Follow-Up

After completing health check:

1. **Update Firebase:**
   - Record health score and components
   - Log any issues found and actions planned
   - Update next check date

2. **Create Follow-Up Tasks:**
   - If red/yellow flags: create Tier 2/3 task for urgent action
   - If action recommended: assign to team member with deadline

3. **Schedule Next Check:**
   - Automatic reminder for next month (same date)
   - Mark in calendar if high-touch needed

4. **Archive Scorecard:**
   - Save this scorecard in customer folder in Firebase
   - Track health score trend over time (for quarterly reviews)

---

## Health Score Trends (Quarterly Review)

Track health score over time to identify patterns:

```
HEALTH SCORE TREND (Last 3 months)

Month 1 (Jan): [SCORE]
Month 2 (Feb): [SCORE]
Month 3 (Mar): [SCORE]

Trend: [Improving ↑ / Stable → / Declining ↓]

Interpretation:
  - Improving: Actions are working; continue current approach. ✓
  - Stable: Customer is healthy or stable at current level.
  - Declining: Underlying issues (technical, relational, or external); investigate.
```

Use quarterly trends to refine support strategy and identify customers needing intervention.

---

## Notes & Additional Context

```
NOTES FROM THIS CHECK-IN:
(Free-form space for observations, conversations, or follow-ups)

[Notes here]

NEXT CHECK-IN:
Date: [DATE]
Focus Areas: [Any specific items to investigate next month]
Owner: [Who will do the check]
```

