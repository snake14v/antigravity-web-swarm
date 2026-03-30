# OORU LOGIX — HYPOTHESIS TEST FRAMEWORK
## Validating the Core Business Assumption

**Document Date:** March 29, 2026
**Owner:** Vaishak (Product + GTM)
**Review Cadence:** Bi-weekly (Tuesdays)
**Final Decision Gate:** June 30, 2026

---

## THE CENTRAL HYPOTHESIS

> **"Bangalore chai shop owners will pay ₹25,000 for ShopSense hardware when presented with a 2-week free pilot, a clear ROI case, and professional support."**

This is the load-bearing assumption for the entire Ooru Logix business model. Everything else (cloud infrastructure, SaaS margins, venture funding, Series A) depends on this being true.

---

## WHY THIS MATTERS: THE RISK CASCADE

If this hypothesis is **FALSE**:

### Scenario 1: Price Resistance (Most Likely)
- **Evidence:** Chai shop owners decline after pilot, cite price as blocker
- **Impact:** Hardware price must drop to ₹12,000-15,000 (margin collapses to 20%)
- **Strategic Change:** Business becomes high-volume, low-margin retail hardware play (not venture-scale)
- **Path Forward:** Explore B2B2C (sell through distributors, accept lower margin)

### Scenario 2: No Value Perception
- **Evidence:** Owners run pilots but see no benefit to their business
- **Impact:** Feature set is wrong OR ICP is wrong
- **Strategic Change:** Target different customer (restaurants >20 seats, not chai angadis) OR pivot product entirely
- **Path Forward:** Retarget restaurants where inventory management has clearer ROI

### Scenario 3: Execution Risk
- **Evidence:** Pilot works, owner sees value, but setup too complex or support too weak
- **Impact:** Go-to-market must be different (bundled with deployment service, higher touch)
- **Strategic Change:** Become a services company, not a software company
- **Path Forward:** Add 2-3 field engineers, increase price to ₹35,000+ to cover service cost

**Core Point:** The entire strategy changes if this is false. Test it explicitly.

---

## EXPERIMENT DESIGN

### Test Period
**April 1 — June 30, 2026**
- 13 weeks total
- Structured in 3 waves (4-5 pilots per wave)
- Decision point each month

### Sample Size
**Target: 10 paid pilots offered** (actual target is 15-20 approaches to get 10 acceptances)

Why 10?
- Large enough to detect patterns (shop type, owner age, source)
- Small enough to iterate quickly (each pilot is 2 weeks)
- Statistical confidence: 3/10 conversions = 30% (meaningful signal)

### Success Criteria

| Metric | Meaning | Go/No-Go |
|--------|---------|----------|
| **By May 31:** 1 paid customer | Hypothesis "probably true" | GO (continue momentum) |
| **By June 15:** 0 paid customers | Hypothesis "at serious risk" | CAUTION (review ICP, double down on better sources) |
| **By June 30:** 3+ paid customers | Hypothesis "PROVEN" | GO (scale aggressively, plan Series A) |
| **By June 30:** 1-2 paid customers | Hypothesis "uncertain" | EXTEND (continue testing through September) |
| **By June 30:** 0 paid customers | Hypothesis "FALSE" | PIVOT (revisit ICP, price, or product) |

---

## VARIABLES: WHAT WE CONTROL AND MEASURE

### Independent Variables (What We Change)
These are the things Vaishak will deliberately vary across pilots to find what works:

1. **Source of Pilot Offer**
   - Cold walk-in (approach owner at shop)
   - Referral from existing contact
   - LinkedIn inbound (if any)
   - Local Facebook group
   - **Hypothesis:** Referral converts best (trust), cold walk-in requires more persuasion

2. **Timing of Pricing Conversation**
   - Before pilot ("Here's the cost, here's the value, try free for 2 weeks")
   - At end of pilot ("You've seen the value. Cost is ₹25,000. Pay now or pass?")
   - **Hypothesis:** End-of-pilot converts better (sunk cost + proven value)

3. **Pilot Duration**
   - 7-day pilot
   - 14-day pilot (standard)
   - 21-day pilot (rare, for hesitant owners)
   - **Hypothesis:** 14 days is sweet spot (long enough to see patterns, not too long to lose interest)

### Dependent Variable (What We Measure)
**Primary outcome:** Did the owner pay ₹25,000 and sign contract?
- **Yes:** Hypothesis supported (count as conversion)
- **No:** Hypothesis challenged (track why)
- **Pending:** Owner still deciding (follow up monthly)

### Control Variables (What We Keep Constant)
These must NOT change during the test:

- **Price:** ₹25,000 (no discounting, no negotiation)
- **Product:** ShopSense Pro Kit (no feature additions during test)
- **Hardware:** Raspberry Pi 5 + camera + Mount (same config for all)
- **Support Quality:** Same response time, same training quality for all pilots
- **Model:** YOLOv8 inventory detection (no model swaps)
- **SaaS Pricing:** ₹2,500/month (fixed during test)

---

## MEASUREMENT: WHAT WE TRACK FOR EACH PILOT

Create a **Pilot Tracker** (in PROGRESS.md, updated weekly):

```
Pilot #1 — Mumbai Chai Co., Koramangala
├─ Source: Cold walk-in (shopkeeper friend introduction)
├─ Shop Type: Chai + cigarette shop
├─ Owner Age: 42, digital comfort: 3/5
├─ Pilot Start: April 7, 2026
├─ Pilot Duration: 14 days (standard)
├─ Pricing Timing: End-of-pilot
├─ Hardware Issues: None
├─ Owner Feedback: "Useful for stock tracking, but seems expensive"
├─ Outcome: DECLINED
├─ Decline Reason: Price resistance (owner said "₹15,000 is my max")
├─ Key Insight: Chai shops see ₹25K as maintenance cost, not growth investment
└─ Follow-up: Rejected but willing to revisit if we lower price

Pilot #2 — JK General Store, Indiranagar
├─ Source: Referral from existing contact
├─ Shop Type: General store + some groceries
├─ Owner Age: 38, digital comfort: 4/5
├─ Pilot Start: April 14, 2026
├─ Pilot Duration: 14 days
├─ Pricing Timing: Before pilot (set expectations early)
├─ Hardware Issues: Camera mounting took 45 mins
├─ Owner Feedback: "I like it, but let me think for a week"
├─ Outcome: PENDING (as of April 28)
├─ Next Follow-up: May 5
└─ Key Insight: Owner sees value. May need payment plan or financing.
```

**For each pilot, capture:**
- Pilot number and shop name
- Source (how we found them)
- Shop type (chai, general, cigarette, kirana, restaurant)
- Owner demographics (age, digital literacy 1-5, education level if known)
- Dates (start, end)
- Outcome (Paid / Declined / Pending / Lost to followup)
- If declined: specific reason (price / didn't see value / timing / tech issues / other)
- Key insights (what surprised us, what worked, what didn't)
- Revenue impact ($0 = declined, ₹27,500 = paid)

---

## PIVOT TRIGGERS: WHEN TO CHANGE STRATEGY

Monitor these signals weekly. If any trigger activates, flag for immediate discussion:

### Trigger 1: Price Resistance Pattern
**When:** 3+ pilots decline specifically citing price
**Action:** Price sensitivity is real. Options:
- Lower price to ₹18,000 (still profitable)
- Pivot to restaurants where ₹25K is more acceptable
- Introduce payment plan (₹5,000 upfront, 5× ₹4,000 monthly)
- Shift to SaaS-only model (no hardware)

### Trigger 2: Source Performance Divergence
**When:** Referral source converts 50%, cold walk-in converts 0%
**Action:** Stop cold walk-ins. Focus 100% on referrals + inbound. Network + evangelist strategy.

### Trigger 3: Hardware/Tech Blocker
**When:** 3+ pilots fail due to camera mounting, WiFi issues, or software bugs
**Action:** Fix the issue before starting new pilots. Don't collect bad data.

### Trigger 4: Owner Age/Digital Divide
**When:** All successful pilots are with owners <40, all declines are >50
**Action:** Retarget younger owners or add more hand-holding for older owners.

### Trigger 5: Shop Type Divergence
**When:** Restaurants see value but chai shops don't (or vice versa)
**Action:** Pivot ICP immediately. Focus on the type that converts.

### Trigger 6: Lost to Followup
**When:** 2+ pilots decline because we didn't follow up well or didn't send invoice
**Action:** Improve operational execution. Add CRM to track followups.

---

## DECISION GATE MEETING: JUNE 30, 2026

On June 30, 2026 (or close to it), Vaishak holds a formal review:

**Attendees:** Vaishak, + one external advisor if possible (for objectivity)

**Agenda:**

1. **Review Actual Data**
   - How many pilots offered? How many accepted?
   - How many converted to paid? How many declined?
   - What was the conversion rate? (actual ÷ offered)

2. **Analyze Patterns**
   - Which shop types converted vs. declined?
   - Which sources drove conversions?
   - What was the most common decline reason?
   - Price resistance? Value perception? Timing? Execution?

3. **Model Accuracy Feedback**
   - Did the inventory model work in real shops?
   - Any surprising accuracy issues?
   - Any shops where the model was much better/worse than expected?

4. **Assess Hypothesis**
   - True? Uncertain? False? Probably true?
   - What was the evidence?

5. **Make a Decision**
   - **If 3+ paid:** SCALE AGGRESSIVELY. Plan for 20 pilots in H2. Start Series A prep.
   - **If 1-2 paid:** EXTEND TESTING. Continue through September. Analyze what made the paid ones work.
   - **If 0 paid:** MAJOR PIVOT. Revisit price (₹15K?), ICP (restaurants?), or model (SaaS-only?).

6. **Next Quarter Plan**
   - If scaling: What resources needed? More pilots? Field engineers? Marketing?
   - If extending: What changes to test next? Different source? Different price point?
   - If pivoting: What's the new hypothesis? When do we test it?

---

## SUCCESS LOOKS LIKE

By June 30, 2026:
- 10 pilots offered to chai/general shop owners
- At least 1 signed a ₹25,000 contract
- Ideally 3+ signed
- Clear pattern of what worked (source, ICP, timing)
- Confidence to scale in H2 2026
- Customer testimonials for fundraising

---

## DOCUMENTATION

**Live tracking document:** `/sessions/amazing-epic-ptolemy/mnt/olog antigrav v1/company/PROGRESS.md`

Update weekly:
- Pilots offered this week
- Pilots completed this week
- Outcomes
- Key learnings
- Any pivot signals triggered

---

## HYPOTHESIS VALIDATION SUMMARY (June 30 Review Template)

```markdown
# Hypothesis Validation Report — June 30, 2026

## The Hypothesis
"Bangalore chai shop owners will pay ₹25,000 for ShopSense hardware."

## Results
- **Pilots offered:** [X] (target: 10)
- **Pilots started:** [X]
- **Pilots completed:** [X]
- **Paid customers:** [X] (target: 3)
- **Conversion rate:** [X]% (target: 30%)

## By Shop Type
- Chai shops: X offered, Y converted
- General stores: X offered, Y converted
- Restaurants: X offered, Y converted

## By Source
- Cold walk-in: X offered, Y converted
- Referral: X offered, Y converted
- Other: X offered, Y converted

## Top Decline Reasons
1. [Reason 1]: X mentions
2. [Reason 2]: X mentions
3. [Reason 3]: X mentions

## Hypothesis Assessment
- [ ] TRUE (3+ paid customers, clear conversion pattern)
- [ ] PROBABLY TRUE (1-2 paid, signal present but uncertain)
- [ ] UNCERTAIN (unclear pattern, needs more data)
- [ ] FALSE (0 paid, multiple signals saying no)
- [ ] NEEDS PIVOT (validation of different hypothesis required)

## Strategic Decision
- [ ] SCALE (execute 20 more pilots in H2, plan Series A)
- [ ] EXTEND (continue testing through September with modifications)
- [ ] PIVOT (change price/ICP/product model)

## Next Steps
[Detailed plan for Q3 2026]
```

---

## FINAL NOTE

This is not about being "right" — it's about learning fast. The hypothesis might be partly true, conditionally true, or false. Our job is to find out which, quickly, with real data.

Every pilot interaction, every declined pitch, every customer question is data. Treat it that way.
