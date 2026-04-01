# Sales Prospector Skill - Ooru Logix ShopSense
**Version:** 1.0 | **Target ICP:** Bangalore chai shops & kirana stores | **Product:** ShopSense (edge AI retail hardware)

---

## Purpose
Automate lead prospecting, qualification, and initial outreach for ShopSense in target Bangalore neighborhoods. This skill guides AI agents through the full prospecting funnel: lead identification → qualification → scoring → personalized outreach → objection handling → demo scheduling.

---

## Lead Qualification Framework (BANT Adapted for SMB Retail)

### Qualification Criteria
Each prospect must have signals across these dimensions:

#### 1. **Budget Awareness (B)** - Can they afford ₹25K-35K?
- **Signal Present (2 pts):**
  - Store footfall 50-200 daily orders
  - Owner mentions cost concerns but recognizes pain point
  - Has invested in any technology (card machine, even basic POS)
  - Multiple staff handling billing suggests operational capacity

- **Signal Absent (0 pts):**
  - Ultra-low footfall (<30 orders/day)
  - Complete cash-only shop with zero tech
  - Owner expresses "no budget" immediately

#### 2. **Authority (A)** - Is decision maker present?
- **Signal Present (2 pts):**
  - Speaking with shop owner or co-owner
  - Owner says "I decide on everything here"
  - Owner has Smartphone/WhatsApp (required for coordination)

- **Signal Absent (0 pts):**
  - Only manager/staff available
  - Owner not present and unavailable within 3 days
  - No direct owner contact details

#### 3. **Need (N)** - Proof of manual billing pain?
- **Signal Present (2 pts):**
  - Owner mentions customer billing errors
  - Mentions lost sales due to slow billing during rush
  - Staff spend >10 min per transaction on average
  - Owner keeps manual notes/books for reconciliation
  - Customer complaints about billing/pricing discrepancies

- **Signal Absent (0 pts):**
  - Already has functional POS system
  - Owner says "billing works fine, no complaints"
  - Very low transaction volume doesn't require speed

#### 4. **Timeline (T)** - When would they pilot?
- **Signal Present (2 pts):**
  - Owner says "can try next week"
  - Has space/counter for hardware placement
  - Not seasonal (won't close shop in next 3 months)
  - Current pain causes daily frustration

- **Signal Absent (0 pts):**
  - "Maybe next quarter"
  - Shop renovation/relocation planned soon
  - Seasonal shop (summer break, winter closure)
  - Owner wants to "think about it"

---

## Lead Scoring Rubric (0-100 Scale)

### Scoring Formula
**Total Score = (B_score × 0.25) + (A_score × 0.30) + (N_score × 0.35) + (T_score × 0.10) × 10**

### Score Interpretation

| Score Range | Tier | Action | Conversion Likelihood |
|-------------|------|--------|----------------------|
| 90-100 | A+ | Immediate demo scheduling | 70%+ |
| 75-89 | A | Priority follow-up within 24h | 50-70% |
| 60-74 | B | Standard nurture sequence | 30-50% |
| 45-59 | C | Extended outreach, gather more signals | 10-30% |
| <45 | D | Archive or 6-month re-prospect | <10% |

### Scoring Worksheet Example
```
Shop: JP Nagar Chai House
Budget (max 20): 16 (50-100 daily orders, has card machine)
Authority (max 30): 27 (Owner present, decides everything, has WhatsApp)
Need (max 35): 28 (Manual billing, billing errors mentioned, takes 15 min/transaction)
Timeline (max 15): 12 (Can try "next week", has counter space, not seasonal)
TOTAL: (16+27+28+12) = 83 → Tier A (Priority Follow-up)
```

---

## Outreach Templates

### Template 1: Cold WhatsApp Intro (Day 0)

**English Version:**
```
Hi [Owner Name],

I'm Vaishak from Ooru Logix. I work with chai shops and kirana stores in JP Nagar to help them reduce billing mistakes and serve customers faster during rush hours.

I noticed [SPECIFIC SIGNAL: your shop gets busy around 12-2pm / you're handling billing manually / customers wait while staff write bills].

I've built ShopSense — it's a compact AI camera system (₹25K) that catches billing errors before they happen and reduces billing time by 50%.

Would you be open to a 15-min chat this week to see if it fits your shop? No obligation, just a quick look.

Cheers,
Vaishak
Ooru Logix
9XXXXXXXX
```

**Kannada Version (WhatsApp-safe):**
```
ನಮಸ್ತೆ [ಪೆಸರೆ],

ನಾನು ವೈಷಾಕ್, ಓರೂ ಲೋಜಿಕ್‌ನಿಂದ. JP ನಗರದ ಚಹೆ ಮತ್ತು ಕಿರಾಣಿ ಗಳಿಕೆಗಳಿಗೆ ಬಿಲಿಂಗ್ ಸುಧಾರಕ್ಕೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.

ನಿಮ್ಮ ದೋಕಾಣದಲ್ಲಿ ಕಸೂರಿ ನಿವಾರಣೆ ಮತ್ತು ಗ್ರಾಹಕ ಸೇವೆ ತ್ವರಿತ ಮಾಡಲು ನಾವು ShopSense ರಚಿಸಿದ್ದೇವೆ. ಇದು AI ಕ್ಯಾಮೆರಾ ವ್ಯವಸ್ಥೆ (₹25,000) ಮತ್ತು ಬಿಲಿಂಗ್ ಸಮಯ 50% ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.

ಈ ವಾರ 15 ನಿಮಿಷದ ಚಾಟ್ ಮಾಡಲು ಇಚ್ಛೆ? ಯಾವುದೇ ಬಾಧ್ಯತೆ ಇಲ್ಲ.

ಧನ್ಯವಾದ,
ವೈಷಾಕ್
Ooru Logix
```

### Template 2: Follow-Up Sequence

**Day 0 (First message above)**
Wait 4 hours for response.

**Day 3 (If no response):**
```
Hi [Name], just checking in! Did you get my earlier message about ShopSense?

If you're swamped during peak hours, I can grab 15 mins on a slower day — evening or early morning works for me too.

Cheers,
Vaishak
```

**Day 7 (If no response to Day 3):**
```
[Name], last check-in from me!

I know you're busy. ShopSense is helping shops exactly like yours reduce billing errors by 95% and speed up customer checkout.

If you're interested, just reply "yes" and I'll set something up. If not, no worries — I'll check back in a few months.

Vaishak
```

**Day 14 (If no response to Day 7):**
```
[Name], moving on from my end — but I'm here if things change or if you want to revisit this later.

Would you like me to check back in 3 months when you might be looking for solutions?

Vaishak
```

### Template 3: Cold Walk-In Script

**Setup:** You've identified the shop from Apollo/Common Room or neighborhood canvassing. Walk in during non-peak hours (mid-afternoon, 4-6pm).

**Opening (30 sec):**
```
Namaste! I'm Vaishak from Ooru Logix. I work with chai shops and kirana stores in JP Nagar.
Do you have 2 minutes? I've got something quick that might help with your billing during rush hours.
```

**Problem Statement (45 sec) - Ask questions:**
```
When does it get most crowded here? (Listen for peak hours)
When it's busy, how long does it take to bill a customer?
Do you ever get mistakes in the bills—customers coming back, inventory mismatches?
If you could change one thing to make billing faster, what would it be?
```

**Pitch (60 sec) - Connect to their pain:**
```
We've built ShopSense—it's an AI camera system that sits above your counter. It watches your billing and catches mistakes before customers leave. Reduces billing time by half and errors by 95%.

It's ₹25K for the starter kit, and I can have it installed here in a day.

Better yet—I do a 7-day free pilot. You use it for a week, see if it works, then decide.
```

**Close (30 sec):**
```
Can I show you the hardware real quick? It's in my bag.
[Show phone mockup or physical demo unit if you have it]

What if I came back this Saturday morning at 9am, installed it for free, and you test it for 7 days?
```

**Objection Handling (See section below)**

---

## Objection Handling Matrix

### Objection 1: "Too expensive — ₹25K is too much"

**Root cause:** No context on ROI or urgency.

**Response Script:**
```
I hear you. ₹25K feels big on first look.

But think about it this way: if you make 100 sales a day at an average ₹150 per bill, that's ₹15,000/day revenue.
One billing error per day costs you ₹150, and the customer goodwill cost is another ₹300.

ShopSense prevents those 2-3 errors daily—that pays for itself in 4 weeks.

But here's what I do: first 7 days free. You see the savings yourself. No risk.

What's the number one issue during your busy hours? Slow billing or wrong bills?
```

**If still resistant:**
- Offer payment plan: "₹5K upfront, ₹4K monthly for 5 months, first 7 days free to confirm"
- Defer: "You test it free. Once you see it working, we can work out payment"

---

### Objection 2: "I don't need this — manual billing works fine for us"

**Root cause:** Either no pain (low transaction volume) OR they haven't realized their pain is a problem.

**Response Script:**
```
That's fair—many shops say the same thing until a busy Saturday afternoon hits.

Let me ask: on your busiest days, how many times have you had to:
- Stop to correct a bill because staff made a mistake?
- Have a customer complain about pricing?
- Spend time reconciling the register at the end of the day?

If that's less than once a month, you're right—you don't need it.

But if it's a few times a week, that's ₹500-₹1000 leaving the table weekly. ShopSense catches that.

Can I just come by next Saturday and set it up for one week free? You'll know in 7 days if you need it.
```

**If still resistant:**
- Archive prospect (Tier D): "No problem. I'm here if you change your mind. Can I check back in 6 months?"
- Note in CRM: "States no pain — revisit after seasonal growth or staffing changes"

---

### Objection 3: "Will it work without internet? Our WiFi is spotty"

**Root cause:** Technical concern about reliability/offline mode.

**Response Script:**
```
Great question—this is why we built it this way.

ShopSense cameras run AI models locally. They don't need internet to catch errors. They process everything on the device.

We sync data to the cloud when WiFi is available (for reports), but if WiFi is down, the system still works perfectly. Your customers still get tracked, errors still get caught.

So if your connection drops during a rush, no problem. Everything is stored locally.

We also provide a backup router (included in the kit) to keep your billing system stable. But you could run ShopSense with zero internet and it would work.

Does WiFi reliability worry you because it's crashed during busy times?
```

**If WiFi is a critical issue:**
- Offer to install backup router as part of pilot
- Guarantee "offline-first" operation in the pilot agreement

---

### Objection 4: "What happens after the pilot? Will I get stuck with support costs?"

**Root cause:** Concern about dependency, future costs, or vendor lock-in.

**Response Script:**
```
That's smart to think ahead.

Here's our deal: After the 7-day pilot, if you buy it, we give you 6 months of free support—installation, training, troubleshooting.

After that, support is ₹500/month optional (includes software updates, priority response).

If something breaks, we replace hardware at cost (we mark up 10% on replacement cameras ₹2K each).

But honestly—this hardware is built to run. We've got shops running our prototypes for 18 months with zero issues.

And you're not locked in. You own the hardware. If you want to stop using ShopSense tomorrow, you can.

The real question: does reducing billing errors and time right now feel worth exploring?
```

**If cost still an issue:**
- Offer: "No support costs for year 1 if you buy this month"
- Offer: "Subscription model—₹3K/month all-inclusive instead of ₹25K upfront"

---

### Objection 5: "I'll think about it" (vague stalling)

**Root cause:** Either low priority OR fear of change OR needs more social proof.

**Response Script:**
```
I appreciate that. Most people do need to sit with it.

But "thinking about it" usually means something's missing. Is it:
- Unclear if this actually works? (I can show you video proof from our pilot sites)
- Worried about the cost? (Let's talk payment options)
- Nervous about change/training staff? (Installation takes 1 day, staff training is 20 minutes)

What's the thing that would make you say yes next time we talk?
```

**If they commit to re-talking:**
- Lock in time: "Thursday at 6pm, I'll call you. That work?"
- Assign task: "Send me a photo of your billing counter—I want to make sure the cameras fit your setup"

**If they won't commit:**
- Add to nurture sequence: "I'll check in Friday to see if anything's changed"

---

## Demo Preparation Checklist

Before any in-person meeting or video demo:

### Pre-Demo (24 hours before)
- [ ] Confirm time/location via WhatsApp
- [ ] Prepare demo unit (cameras charged, power cables, WiFi ready)
- [ ] Research shop via Google Maps/Common Room:
  - Footfall patterns
  - Counter layout/space
  - Local competition
  - Current POS (if any)
- [ ] Draft personalized script referencing their specific pain
- [ ] Load 2-3 video testimonials from similar shops on phone
- [ ] Prepare simple ROI calculator on phone (cost vs. errors prevented)
- [ ] Check weather (rain = hard to do outdoor demo)

### During Demo (60 minutes max)
1. **Opening (5 min):**
   - "Thanks for making time. Before I show anything, tell me about your biggest frustration during peak hours."
   - Listen for NPS (if they mention 2+ pain points, NPS is high)

2. **Needs Discovery (10 min):**
   - How many transactions per day?
   - What's your staff size?
   - Current billing method?
   - Biggest error type (wrong amounts, wrong items, missing items)?
   - How does it impact you (revenue loss, customer churn, staff stress)?

3. **Product Walk-through (20 min):**
   - Show camera hardware—where would it mount?
   - Demo footage on phone: "Here's what ShopSense sees in real time—notice it catches the bill error before the customer pays"
   - Explain offline capability: "Works fine without internet"
   - Show accuracy metrics: "95%+ accuracy on billing errors"

4. **ROI Calculation (10 min):**
   - "You said you get 2-3 billing errors a day, each costing ₹200. That's ₹400-₹600 lost daily."
   - "ShopSense prevents 95% of those. In 6 weeks, you've made ₹25K back."
   - Use physical calculator: "Let's do the math together."

5. **Pilot Offer (10 min):**
   - "I install it free Saturday morning—takes 2 hours."
   - "You use it for 7 days. If you love it, we move to purchase. If not, I remove it—no cost to you."
   - Pull up pilot agreement (see section below)
   - Get verbal commit + WhatsApp confirmation

6. **Closing:**
   - Schedule install date/time in both phones
   - Take photo of shop for records
   - Confirm contact info

### Post-Demo
- [ ] Send WhatsApp confirmation within 1 hour: "Great meeting! Installing Saturday 9am. Your contact [name], address [address]. See you then!"
- [ ] Send pilot agreement PDF via WhatsApp
- [ ] Flag in CRM: Pilot Scheduled status
- [ ] Set reminder: Day 2 (check-in call), Day 4 (quick feedback), Day 7 (conversion decision)

---

## Pilot Proposal Template

See: `/templates/proposal-template.md`

---

## Using Apollo MCP for Lead Enrichment

### Apollo Prospect Workflow
When you have a target area (JP Nagar, Jayanagar) and ICP criteria:

```
Skill: apollo:prospect
Input:
  - Title: "Chai Shop Owner" OR "Kirana Store Owner"
  - Location: "JP Nagar, Bangalore"
  - Company size: 1-10 employees
  - Filter: Only those with LinkedIn OR verified phone numbers

Output:
  - 20-50 qualified leads with verified contact info
  - Company revenue signals (if any)
  - Decision-maker titles
  - Email + phone for direct outreach
```

### Apollo Enrich Lead Workflow
Once you have a prospect name and shop name:

```
Skill: apollo:enrich-lead
Input:
  - Person name: [from Lead]
  - Company: [Shop Name]
  - Location: "Bangalore"

Output:
  - Email address (usually personal email)
  - Phone number (usually personal phone)
  - LinkedIn profile (if exists)
  - Job title (will show "Owner" or "Manager")
  - Company revenue (if trackable)
  - Recommended outreach channel (will show "Phone" or "Email")
```

### Apollo Sequence Load
Once leads are enriched, create an automated outreach sequence:

```
Skill: apollo:sequence-load
Input:
  - Lead list (CSV of names, phones, emails from enrichment)
  - Sequence template: [Use WhatsApp intro from Section 3.1]
  - Cadence: Day 0 (WhatsApp intro), Day 3 (follow-up), Day 7 (final check-in)

Output:
  - Sequence loaded into Apollo
  - Auto-send outreach on schedule
  - Track open rates, response rates
```

---

## Using Common Room MCP for Account Signals

### Common Room Prospect Workflow
Research a specific shop or area for account signals:

```
Skill: common-room:prospect
Input:
  - Target: "JP Nagar Chai Shops" OR specific shop name
  - Signal types:
    - Recent hiring (new staff = growth)
    - Mentions of billing/POS pain
    - Equipment upgrades
    - Customer complaints about service speed
    - Local buzz about popular shops

Output:
  - Signal strength (high/medium/low)
  - Source (social media, local news, Google reviews)
  - Recommended outreach angle
```

### Common Room Account Research
Deep-dive on a specific prospect:

```
Skill: common-room:account-research
Input:
  - Shop name: "JP Nagar Chai House"
  - Interests to research: "billing pain", "POS systems", "customer service"

Output:
  - Recent mentions of pain points
  - Competitor research (other shops' POS tools)
  - Customer sentiment (Google reviews, local forums)
  - Growth signals (new location rumors, expansion plans)
```

### Common Room Compose Outreach
Generate personalized outreach based on account signals:

```
Skill: common-room:compose-outreach
Input:
  - Account research (from above)
  - Tone: "Casual, personal, problem-focused"
  - Channel: "WhatsApp"

Output:
  - Personalized outreach message
  - Hooks into specific signals found
  - Multi-variant options (different angle per variant)
```

---

## CRM/Firestore Logging Protocol

For each prospect interaction, log:

```json
{
  "lead_id": "unique_id",
  "shop_name": "JP Nagar Chai House",
  "owner_name": "Ramesh",
  "phone": "+919876543210",
  "location": "JP Nagar, Bangalore",
  "area": "JP Nagar",
  "lead_score": 83,
  "lead_tier": "A",
  "qualification_notes": {
    "budget_signal": 16,
    "authority_signal": 27,
    "need_signal": 28,
    "timeline_signal": 12,
    "scoring_reason": "High footfall, owner present, manual billing with errors, can pilot next week"
  },
  "last_outreach_date": "2026-04-01",
  "last_outreach_channel": "WhatsApp",
  "last_outreach_message": "Cold intro - Day 0",
  "responses": 0,
  "next_action": "Follow-up Day 3",
  "next_action_date": "2026-04-04",
  "stage": "Outreach",
  "status": "Pending Response",
  "created_date": "2026-04-01",
  "updated_date": "2026-04-01"
}
```

---

## Success Metrics for Prospecting Skill

Track these KPIs to measure skill effectiveness:

| Metric | Target | Current | Notes |
|--------|--------|---------|-------|
| Leads prospected per week | 20+ | - | From Apollo + walk-ins |
| Lead quality (Tier A+B %) | 40%+ | - | Score 75+ |
| WhatsApp response rate | 25%+ | - | Tier A leads |
| Demo scheduled rate | 70% of Tier A | - | From qualified leads |
| Demo-to-pilot conversion | 60%+ | - | From demo meetings |
| Pilot-to-deal conversion | 70%+ | - | From 7-day pilots |
| Average sales cycle | 3-4 weeks | - | From first contact to pilot |
| Cost per deal closed | <₹5K in time | - | Includes prospecting + demo + pilot |

---

## Next Steps
1. Use this framework to prospect in target areas
2. Score every lead (0-100 rubric)
3. Prioritize Tier A+B leads for immediate outreach
4. Track responses in CRM
5. Graduate qualified leads to deal-closer skill (see: `/sales-prospector/../deal-closer/SKILL.md`)
