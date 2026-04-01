# Deal Closer Skill - Ooru Logix ShopSense
**Version:** 1.0 | **Target ICP:** Bangalore chai shops & kirana stores | **Product:** ShopSense (edge AI retail hardware)

---

## Purpose
Manage the transition of qualified leads through the final stages of the sales pipeline: pilot execution → success validation → objection handling on conversion → deal closure → handoff to onboarding. This skill guides AI agents through the critical 7-day pilot period and conversion decision-making process.

---

## Pipeline Stages & Definitions

### Stage 1: Lead → Qualified
**Entry Criteria:**
- Lead score 60+ (see Sales Prospector skill)
- Contact info verified (phone, WhatsApp active)
- At least one two-way conversation (WhatsApp response or demo attendance)
- Authority confirmed (speaking with owner/co-owner)

**Exit Criteria:**
- Score 75+, OR
- Demo scheduled within 7 days

**Owner:** Sales Prospector skill
**Duration:** 3-7 days from first contact

---

### Stage 2: Qualified → Demo Scheduled
**Entry Criteria:**
- Owner commits to a specific date/time for demo
- Calendar confirmation sent

**Activities:**
- Schedule demo (in-person or video)
- Gather pre-demo research (Common Room/Apollo)
- Prepare demo materials (hardware + talking points)

**Exit Criteria:**
- Demo date confirmed via WhatsApp
- Demo happened (in-person or video)

**Owner:** Sales Prospector skill (with Deal Closer coordination)
**Duration:** 1-7 days

---

### Stage 3: Demo Completed → Pilot Offer Extended
**Entry Criteria:**
- Demo happened (in-person or video call)
- Owner showed interest (at least medium buying signals)

**Demo Outputs:**
- Owner agreed to 7-day pilot, OR
- Owner said "need to think about it" (nurture, not yet pilot)

**Conversion Probability Signals During Demo:**
- **High (80%+ to pilot):** Owner asked 3+ questions, mentioned specific pain point, said "okay let's do it," asked about timeline
- **Medium (50%):** Owner interested but hesitant, asked about cost, wanted to "think about it" but didn't refuse
- **Low (20%):** Owner said "we're fine as is," showed no buying signals, kept checking phone

**Exit Criteria:**
- Pilot agreement signed OR
- Owner deferred ("let me think about it" → nurture sequence starts)

**Owner:** Sales Prospector skill (leading) + Deal Closer skill (supporting)
**Duration:** 0 days (decision happens during demo)

---

### Stage 4: Pilot Scheduled → Pilot Active (Days 1-7)
**Entry Criteria:**
- Pilot agreement signed
- Installation date locked in (usually Saturday morning)
- Hardware allocated

**Pilot Success Metrics:**
These are the "goalposts" for conversion:
1. **Accuracy >90%:** System correctly flags 90%+ of transactions as error-free or catches errors
2. **Billing time reduced >30%:** Average time per transaction drops from baseline (usually 4 min) to <3 min
3. **Zero customer billing complaints:** No customers complain about wrong bill amounts during 7 days
4. **System uptime >95%:** Hardware/software runs without major failures
5. **Owner/staff engagement high:** Owner actually uses the app daily, staff says "I like this"

**Daily Activities During Pilot:**
- Day 0 (Installation day): Hardware mounted, staff trained, system tested
- Day 1: Owner first check-in (WhatsApp)
- Day 3: Mid-pilot check-in (quick call or message)
- Day 5: Penultimate check-in ("How's it going?")
- Day 7: Decision day (conversion ask)

**Pilot Failure Indicators (Adjust expectations):**
- Owner doesn't engage (doesn't check app)
- Staff refuses to use system
- Hardware malfunction (wifi, camera)
- Accuracy <80% (not catching errors as expected)

**Exit Criteria:**
- Day 7 reached
- Owner makes final decision (Yes/No/Negotiate)

**Owner:** Deal Closer skill (primary)
**Duration:** 7 days (exactly)

---

### Stage 5: Pilot Complete → Owner Decision
**Entry Criteria:**
- Day 7 reached
- Pilot metrics reviewed

**Three Possible Outcomes:**

#### Outcome A: "YES, I want to buy" (60%+ of pilots expected)
- Owner confirms intent to purchase
- Moves to Stage 6: Negotiating

#### Outcome B: "NO, not right now" (30% of pilots expected)
- Owner says system didn't work as expected, OR
- Owner wants to "think more," OR
- Owner says timing isn't right
- Moves to Stage 7: Win-Back (nurture, not pipeline)

#### Outcome C: "YES, but I need a better deal" (10% of pilots expected)
- Owner wants price discount, OR
- Owner wants payment plan, OR
- Owner wants subscription instead of purchase
- Moves to Stage 5B: Negotiating

**Owner:** Deal Closer skill
**Duration:** 0 days (decision happens at Day 7 morning call/message)

---

### Stage 6: Negotiating → Deal Won
**Entry Criteria:**
- Owner said "Yes" but with conditions (price/terms change)

**Negotiation Guardrails (See section below for details):**
- Floor price: ₹22K (Starter Kit), ₹32K (Pro Kit) — don't go below
- Payment plan OK: But preserve upfront payment (minimum ₹5K)
- Subscription OK: ₹3K/month, 12-month minimum
- Bundle deals OK: "Buy now get 6 months support free instead of 12"

**Activities:**
- Counter-offer with options (see Pricing Guardrails section)
- Owner picks option
- Send revised invoice + agreement

**Exit Criteria:**
- Owner accepts terms
- Agreement signed (WhatsApp or email is fine)
- Payment scheduled

**Owner:** Deal Closer skill
**Duration:** 1-3 days

---

### Stage 7: Deal Won → Closed
**Entry Criteria:**
- Owner accepted terms
- Payment received (or first installment received)

**Final Checklist:**
- [ ] Invoice marked "PAID" in Firestore
- [ ] Hardware serial numbers recorded
- [ ] Installation date scheduled (typically 1-2 weeks after payment)
- [ ] Owner contact (phone + email) updated in CRM
- [ ] Hardware allocated (check stock)
- [ ] Handoff to Onboarding (see section below)

**Exit Criteria:**
- Deal recorded as "Won"
- Customer handed off to onboarding process

**Owner:** Deal Closer skill (60%) + Onboarding (40%)
**Duration:** 1-2 days (admin)

---

### Stage 8: Onboarding → Live
**Entry Criteria:**
- Deal won, payment received
- Installation date scheduled

**Activities:**
- Final installation (permanent, not pilot)
- Deep staff training
- Go-live setup
- Post-sale support

**Exit Criteria:**
- System live and owner confirms working
- Ownership transferred (hardware is theirs)
- Support handoff complete

**Owner:** Onboarding team (not Deal Closer)
**Duration:** 1-2 weeks

---

### Stage 9 (Optional): Win-Back (For "No" outcomes)
**Entry Criteria:**
- Owner said "No" during pilot

**Activities:**
- Week 2: Check-in call ("What held you back?")
- Month 2: Outreach with new product info (Lite version, new pricing)
- Month 3: Light nurture (1-2 touches)
- Month 6: Re-prospect with refresh conversation

**Duration:** 6 months (loose nurture)
**Owner:** Marketing/Sales Prospector (not Deal Closer)

---

## Pilot Success Metrics & Tracking

### Metric 1: Accuracy (Target: >90%)
**What it measures:** % of transactions correctly processed without manual intervention

**How to calculate:**
```
Accuracy % = (Transactions without errors / Total transactions) × 100

Example:
- Total transactions during 7 days: 500
- Transactions flagged as error-free: 470
- Accuracy: 470/500 = 94% ✓ (above 90% threshold)
```

**What to watch for:**
- If accuracy <85% by Day 3, investigate camera angle/lighting
- If accuracy <80% on final day, system may not be right fit
- Accuracy typically improves Days 1-3 as staff get comfortable

---

### Metric 2: Billing Time Saved (Target: >30% reduction)
**What it measures:** Average time per customer transaction before vs. after

**How to calculate:**
```
Baseline: [Ask owner during demo] "How long does one transaction usually take?"
Typical answer: 4 minutes

With ShopSense:
- Day 1-2: Usually 3-3.5 min (learning curve)
- Day 3-7: Usually 2-2.5 min (staff comfortable)

Target reduction: 4 min → 2.8 min or faster = 30% improvement ✓
```

**What to watch for:**
- If time stays at 4+ min, staff may not be trusting the system
- If time drops <2 min, staff might be rushing (quality concern)
- Time usually drops most between Day 2-4 (learning curve)

---

### Metric 3: Customer Billing Complaints (Target: 0)
**What it measures:** Customer-initiated complaints about bill amounts

**How to track:**
- Ask owner daily: "Any customer complaints about billing today?"
- Check app logs (any disputes flagged)
- Compare to pre-pilot baseline (owner mentioned "1-2 per week" during demo)

**What to watch for:**
- If 1+ complaint on Day 7, ownership may hesitate
- If zero by Day 5, strong signal of value (build that into Day 7 pitch)
- Note patterns (same staff member making errors?)

---

### Metric 4: System Uptime (Target: >95%)
**What it measures:** % of time the system is running without critical failures

**How to calculate:**
```
Uptime % = (Hours system was operational / 168 hours in week) × 100

Target: >95% = <8.4 hours of downtime acceptable for entire week
```

**What to watch for:**
- WiFi disconnections (solve with backup router or app-based alerts)
- Power loss (should have battery backup, should be automatic)
- Camera angle/focus issues (rare, but check mounting)
- Report all issues immediately, fix same day if possible

---

### Metric 5: Owner Engagement (Subjective but important)
**What it measures:** Is the owner actually using the system and interested?

**Signals of HIGH engagement:**
- Owner checks app daily
- Owner asks follow-up questions
- Owner mentions specific transactions they remember the system catching
- Owner's tone is positive/excited in check-ins

**Signals of LOW engagement:**
- Owner never checks app (you have to prompt)
- Owner gives one-word responses ("Fine," "Okay")
- Owner seems distracted or uninterested during check-ins
- By Day 5, owner still hasn't seen the main dashboard

**If engagement is low by Day 3:**
- Call immediately: "How's it going? I noticed you haven't checked the app yet. Is everything okay?"
- Listen for hidden objections
- If system isn't working for them, better to know by Day 3 and adjust than surprise them at Day 7

---

## Conversion Playbook: Day 7 Decision Call

### Call Structure (30 minutes)

#### Opening (5 min)
```
[Owner Name], thanks for doing this! So we've got 7 days of data.
Let me share what I'm seeing, and then we'll talk about what comes next.

First, how are you feeling about ShopSense?
```
*(Listen for tone. Positive = likely Yes. Hesitant = likely No/Negotiate. Negative = likely No.)*

---

#### Present the Data (10 min)
**Use these exact numbers from the pilot tracking dashboard:**

```
Your accuracy this week: [NUMBER]% (Target was 90%+)
Your billing time average: [NUMBER] min (down from 4 min = [%] faster)
Customer billing complaints: [NUMBER] (vs. 2-3 usually per week)
System uptime: [%]
Days your staff felt confident using it: [DAYS]

---

Here's the money part. You were losing ₹150-₹300 per billing error.
This week we caught [X] errors that would have cost you ₹[total].

6-week ROI on ₹25K investment: [calculation]
```

---

#### Listen (5 min)
```
What stands out to you from these numbers?
Did anything surprise you (good or bad)?
What was your staff's feedback?
```

*(Let them talk. Note any objections or hesitations.)*

---

#### Conversion Ask (5 min)

**If signals are HIGH (strong data + positive engagement):**
```
So based on the numbers, ShopSense is working exactly as expected.
Your accuracy is at [94%], you're billing 40% faster, and you've had zero customer complaints.

This is a home run. Let's move forward.

I've got three ways to buy:
1. ₹25K upfront (6 months free support)
2. ₹5K now, ₹4K/month for 5 months (same support)
3. ₹3K/month subscription (everything included, no upfront)

Which one works best for you?
```

**If signals are MEDIUM (mixed data or some hesitation):**
```
The data is strong, but I sense some hesitation. Talk to me.
What would need to change for you to say yes?

[Listen. Address specific concern.]

Is it the price, or something else about the system?
If we could address that, would you move forward?
```

**If signals are LOW (poor data or clear disengagement):**
```
I hear you. The data shows [specific issue], and I get why that's a concern.

Let me ask: Is this something we could fix with adjustments,
or does it feel like ShopSense isn't the right fit?

[If fixable] Here's what I'd suggest... Want to try [adjustment] for another 3 days?
[If not fixable] Then I'll uninstall today. No hard feelings. Can I ask what I should have done differently?
```

---

### Handling Day 7 Objections

#### Objection 1: "The accuracy is only 85%, not 90%"

**Response:**
```
Fair point. 85% is close but not quite there.

A few things:
- Days 1-2 are always lower (learning curve). Your Day 5+ accuracy was 91%.
- If we moved the camera 2 inches left, we can get it to 92%+.
- The errors we ARE catching are preventing ₹400/week in losses anyway.

Here's the deal: I'll adjust the angle right now. We'll run another 2 days.
If it hits 92%+, you buy. If not, I remove it, no cost.

Let's fix it.
```

#### Objection 2: "Billing time only dropped 20%, not 30%"

**Response:**
```
You're right—20% is solid but short of our target.

The reason: Your staff is still being cautious. Once they fully trust the system (week 2-3), time drops another 10-15%.

But here's what matters: You're saving 1 minute per transaction.
At [X] transactions per day, that's [X] minutes of labor per day = ₹[amount] per week saved.

Over 6 months, that's ₹[amount]. For ₹25K, that's a no-brainer.

Should we move forward?
```

#### Objection 3: "I'm still worried about support after I buy"

**Response:**
```
That's smart. Here's what you get:

Year 1:
- 6 months free support (calls, WhatsApp, troubleshooting)
- After that, ₹500/month for ongoing support (updates, priority response)
- Hardware warranty: 1 year free replacement if defect

Year 2+:
- Support is optional. System is very reliable.
- You can go self-service or keep paying ₹500/month.

But here's the thing—I'm here either way. If something breaks, call me.

Does that feel better?
```

#### Objection 4: "Can you do ₹20K instead of ₹25K?"

**Response (Guardrail check first):**
*Floor is ₹22K. So offer something instead:*
```
I can't go to ₹20K (costs us too much on hardware).

But I can do this:
Option A: ₹25K upfront, and I give you 12 months free support instead of 6
Option B: ₹23K, and you pay ₹500/month for support after month 6
Option C: ₹3K/month subscription (no upfront cost)

Which appeals to you?
```

#### Objection 5: "Let me think about it for a week"

**Response:**
```
I hear you. But here's the thing—we've already done the thinking.

You've tested it for 7 days. The data is clear. Either it's working for you or it's not.

What's the one thing that would make you say yes RIGHT NOW?
- Is it price? (We can adjust)
- Is it the support? (I just explained)
- Is it something about the hardware? (We can move the camera)
- Is it the process? (I can speed it up)

Tell me what it is, and let's solve it today. Because waiting another week doesn't change the data—you already know ShopSense works.
```

---

## Pricing Negotiation Guardrails

### Starter Kit (2 cameras)
- **List price:** ₹25,000
- **Floor price (hard stop):** ₹22,000
- **Acceptable discounts:**
  - Bundle with Pro support (add 6 months): No price reduction, add value
  - Early payment discount: ₹500 off if they pay within 24 hours
  - Referral bonus: ₹2,000 off if they refer another shop (paid when referral converts)

### Pro Kit (4 cameras)
- **List price:** ₹35,000
- **Floor price (hard stop):** ₹32,000
- **Same discount structure as Starter**

### Payment Plans (Acceptable structures)
**Standard plan (Recommended):**
- ₹5,000 upfront (non-refundable, covers pilot removal if they say No)
- ₹4,000 × 5 months = ₹20,000
- Total: ₹25,000

**Extended plan (If they insist):**
- ₹3,000 upfront
- ₹3,500 × 6 months + final ₹2,000 payment
- Total: ₹25,000
- *But add ₹1K interest (₹26K total) or add ₹100/month support cost*

**DO NOT go below ₹4K first payment. They won't follow through.**

### Subscription Option (Preserve if they can't afford upfront)
- ₹3,000/month, 12-month minimum commitment
- Includes hardware, support, updates, replacements
- After 12 months, they own the hardware
- Break-even: Month 9 vs. upfront purchase

### Bundle Deals (Only if they say "Yes" to everything else)
- **Buy Starter + Pro upgrade later:** ₹3K discount on Pro (₹35K → ₹32K)
- **Buy 2 kits (for 2 shops):** 5% bundle discount (₹25K + ₹25K = ₹50K → ₹47.5K)
- **Refer another shop:** ₹2K off their future purchase (only counts if referral converts)

### Deal-Breaker Lines (Do NOT cross)
- Do NOT go below ₹22K Starter, ₹32K Pro (margin too low)
- Do NOT offer zero upfront payment on installment (they will ghost)
- Do NOT extend payment terms beyond 6 months (cash flow issues)
- Do NOT offer 0% service/support to close (unsustainable)
- Do NOT offer "we'll see" on price (lock it in writing)

---

## CRM/Firestore Logging Protocol

### Log Structure for Each Deal Stage

```json
{
  "deal_id": "unique_id_e.g._jp_nagar_chai_house_v1",
  "shop_name": "JP Nagar Chai House",
  "owner_name": "Ramesh",
  "owner_phone": "+919876543210",
  "owner_email": "ramesh@shop.com",
  "location": "JP Nagar, Bangalore",

  // Pipeline tracking
  "stage": "Pilot Active",
  "substage": "Day 5 Check-in",
  "status": "On Track",
  "created_date": "2026-04-01",
  "updated_date": "2026-04-05",
  "expected_close_date": "2026-04-08",

  // Product & terms
  "product_selected": "Starter Kit",
  "price": 25000,
  "payment_plan": "Standard (₹5K upfront, ₹4K × 5 months)",
  "contract_signed_date": "2026-04-01",

  // Pilot tracking
  "pilot_start_date": "2026-04-06",
  "pilot_end_date": "2026-04-13",
  "installation_address": "[confirmed address]",
  "hardware_serial_numbers": {
    "camera_1": "SC-001234",
    "camera_2": "SC-001235",
    "router": "WR-000567"
  },

  // Pilot metrics (log daily)
  "pilot_metrics": {
    "day_1": {
      "accuracy": 85,
      "avg_billing_time_min": 3.5,
      "customer_complaints": 0,
      "system_uptime_pct": 100,
      "owner_engagement": "high",
      "notes": "Staff learning to use system, accuracy improving"
    },
    "day_3": {
      "accuracy": 91,
      "avg_billing_time_min": 3,
      "customer_complaints": 0,
      "system_uptime_pct": 98,
      "owner_engagement": "high",
      "notes": "Owner reports positive feedback from staff"
    },
    "day_7": {
      "accuracy": 94,
      "avg_billing_time_min": 2.5,
      "customer_complaints": 0,
      "system_uptime_pct": 99,
      "owner_engagement": "high",
      "notes": "Ready for conversion"
    }
  },

  // Conversion tracking
  "conversion_status": "Pending Day 7 Call",
  "day_7_call_date": "2026-04-13",
  "day_7_call_outcome": null, // "Yes" or "No" or "Negotiate"
  "objections_raised": [],
  "negotiation_notes": "",

  // Deal closure
  "deal_won_date": null,
  "deal_lost_date": null,
  "deal_lost_reason": null,
  "final_payment_plan": null,
  "final_price": null,
  "payment_received": false,
  "payment_received_date": null,
  "invoice_number": "INV-001",

  // Handoff to onboarding
  "onboarding_status": "Pending",
  "final_installation_date": null,
  "onboarding_owner": null,

  // Notes & history
  "notes": "Owner enthusiastic about reducing billing errors",
  "next_action": "Day 7 conversion call",
  "next_action_date": "2026-04-13"
}
```

### Daily Pilot Logging (Deal Closer updates daily)

**Every morning during pilot (Days 1-7):**
1. Check owner's app usage
2. Record accuracy % from dashboard
3. Call or WhatsApp owner: "Quick check-in—how'd it go yesterday?"
4. Log engagement level (high/medium/low)
5. Note any issues or early objections
6. Update next_action in CRM

**At Day 7:**
1. Pull all metrics (accuracy, time, uptime, complaints)
2. Schedule decision call
3. Prepare negotiation options if needed
4. Have invoice templates ready

---

## Post-Deal Handoff to Onboarding

### What Happens When Deal is Won

**Day of payment receipt (Update Firestore):**
```json
{
  "deal_won_date": "2026-04-08",
  "deal_status": "WON",
  "payment_received_date": "2026-04-08",
  "payment_amount": 5000,
  "payment_method": "Bank transfer",
  "next_phase": "Onboarding",
  "onboarding_owner": "Vaishak", // or whoever will do final install
  "final_installation_date": "2026-04-18", // 10 days after payment
  "hardware_allocated": true,
  "hardware_serial_numbers": ["SC-001234", "SC-001235", "WR-000567"]
}
```

**Handoff checklist:**
- [ ] Invoice marked PAID in CRM
- [ ] Receipt sent to owner
- [ ] Hardware serial numbers recorded
- [ ] Final installation date scheduled + confirmed via WhatsApp
- [ ] Onboarding checklist sent to owner (what to prepare: counter space, WiFi password, staff ready for training)
- [ ] Deal closed in Sales pipeline
- [ ] Deal opened in Onboarding pipeline

### What Onboarding Does (Not Deal Closer's responsibility)
- Final installation (permanent, not pilot)
- Deep staff training (30 min)
- Go-live testing
- Post-install support (Week 1-4)
- Upsell opportunities (Pro Kit upgrade, additional hardware)

### Deal Closer's responsibilities end when:
- Payment received, OR
- Invoice and agreement sent and signed

---

## Success Metrics for Deal Closer Skill

Track these KPIs:

| Metric | Target | Owner | Notes |
|--------|--------|-------|-------|
| Pilot-to-Deal conversion % | 70%+ | Deal Closer | % of pilots that convert to "Yes" |
| Avg deal value | ₹25K | Sales + Deal Closer | Starter kit is baseline |
| Avg time from demo to deal won | 14 days | Deal Closer | Usually: Demo (Day 1) → Pilot (Days 1-7) → Conversion call (Day 7) → Payment (Days 8-14) |
| Avg negotiation discount | <₹2K | Deal Closer | Track how much we give away to close |
| Payment compliance | 95%+ | Deal Closer | % of installment plans that complete on-time |
| Post-sale satisfaction | 4.5+/5 | Onboarding | Owner NPS after final install |
| Churn (12-month) | <5% | Onboarding | % who cancel subscription or don't renew |

---

## Dealing with "No" Outcomes

### If owner says "No" at Day 7

**Immediate response (same day):**
1. Don't push back—accept gracefully
2. Ask root cause: "What held you back?"
3. Listen to answer (could be: price, accuracy not high enough, worried about support, staff resistance, etc.)
4. Offer to remove hardware same day
5. Send follow-up message: "No problem. I'll check back in 3 months—things might have changed."

**CRM updates:**
```json
{
  "deal_lost_date": "2026-04-13",
  "deal_status": "LOST",
  "deal_lost_reason": "Owner said accuracy wasn't high enough",
  "objection": "Accuracy only 85%, needed 90%+",
  "feedback": "Also worried about ongoing support costs",
  "next_action": "Win-back outreach in 3 months"
}
```

**Handoff to win-back nurture:**
- Do NOT stay in Deal Closer pipeline
- Move to Marketing/Prospector win-back sequence
- 4-week gap, then monthly touch
- Re-prospect after 6 months with new product features or pricing

---

## Summary: Deal Closer Workflow

```
INPUT: Qualified lead from Sales Prospector (Demo completed, owner said "Yes to pilot")
↓
PREP PHASE (Days 1-2)
├─ Schedule pilot installation (usually Saturday)
├─ Confirm address, contact, shop hours
└─ Prepare hardware + staff training materials
↓
PILOT ACTIVE (Days 1-7)
├─ Day 0: Install hardware, train staff
├─ Days 1-3: Daily check-ins, gather metrics
├─ Days 4-6: Monitor pilot metrics, watch for objections
└─ Day 7: Final review, prepare decision call
↓
DECISION CALL (Day 7 morning)
├─ Present metrics (accuracy %, billing time, uptime, engagement)
├─ Ask: "Ready to buy?"
├─ Handle objections → Offer solutions
├─ Present pricing options (purchase, installment, subscription)
└─ Outcome: Yes / No / Negotiate
↓
NEGOTIATION (If "Negotiate")
├─ Counter-offer within guardrails
├─ Lock in terms
└─ Get signature on agreement
↓
CLOSURE (Day 8-10)
├─ Receive payment (or first installment)
├─ Update CRM
└─ Handoff to Onboarding
↓
OUTPUT: Deal Won + Owner handed off to onboarding
```

---

## Appendix: Template Messages for Day 7 Call

### If accuracy/metrics are STRONG (Go for close):
```
[Name], we've got 7 days of data and it's all pointing in the right direction.

Accuracy at 94%, billing time down 40%, zero customer complaints, and your team is comfortable with it.

This is working. Should we lock this in?

Here are your options on pricing:
1. ₹25K upfront
2. ₹5K now, ₹4K per month for 5 months
3. ₹3K/month subscription

Which one works for you?
```

### If accuracy/metrics are WEAK (Diagnose issue):
```
[Name], I'm looking at the data and I see some areas where we're not hitting our targets.

Accuracy is at 82%, which is close but not quite 90%. And billing time hasn't dropped as much.

A couple of things could help:
1. Adjust the camera angle (sometimes 2 inches changes a lot)
2. Your staff might need another 3-5 days to fully trust the system
3. Could be a WiFi issue slowing things down

Want to try one of these adjustments and run another 3 days?
Or is this not looking like the right fit?
```

### If owner seems HESITANT (Build confidence):
```
[Name], I'm sensing some hesitation. Talk to me.

Is it the price? Not sure about ongoing costs? Worried the team won't actually use it long-term?

Whatever it is, let's address it. Because the numbers show this works for you—I just need to make sure you feel confident owning it.
```

---

## Final Reminders

1. **Pilot metrics are TRUTH.** Don't over-promise or under-deliver. If accuracy is 85%, say 85%. If time only dropped 20%, say 20%. Then explain the "so what."

2. **Day 7 is binary.** You're not looking for "maybe"—you're looking for Yes, No, or Negotiate. If they say "let me think about it," push back gently: "You've tested it. What's the thing that would make you say yes today?"

3. **Guardrails are guardrails.** Don't go below ₹22K Starter. Don't offer 6-month-or-longer payment plans. These kill profitability.

4. **Objections are information.** If someone says "I don't trust the support," that tells you what to emphasize. Address the specific concern, not the generic "You should buy this."

5. **Remove hardware immediately if they say No.** Same day, take the cameras, cables, router. Don't leave it hanging. Uninstall professionally, thank them, leave the door open for 3-month re-prospect.

6. **Track everything in CRM.** Daily pilot metrics, final decision, objections raised, terms negotiated. This data helps predict future pilots and improve conversion rates.

---

**Deal Closer success = ₹25K per pilot conversion × 3-4 pilots per month = ₹75-100K MRR when running smoothly.**

