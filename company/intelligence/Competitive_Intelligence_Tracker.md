# OORU LOGIX — COMPETITIVE INTELLIGENCE TRACKER
## Market Monitoring & Strategic Response Framework

**Document Date:** March 29, 2026
**Owner:** Vaishak (Strategy)
**Review Cadence:** Monthly (last Friday of each month)
**Next Review:** April 25, 2026

---

## COMPETITIVE LANDSCAPE MAP

Ooru Logix operates in the intersection of **Edge AI + Retail Management + India Market**.

### 4-Quadrant Market Positioning

```
                    ONLINE
                      ▲
                      │
    SaaS Only          │          Hardware + SaaS
  (Khatabook)          │         (OORU LOGIX HERE)
    OkCredit           │              ↑
    Vyapar             │         ShopSense Hardware
    Zoho Books         │         + Cloud Platform
                      │
    ─────────────────────────────────── HARDWARE
    Old POS Systems   │       EDGE RETAIL AI
    (Offline, dying)  │       (YET TO EMERGE)
                      │
                    OFFLINE
```

### Market Positioning Analysis

**Quadrant 1: Hardware + Online (where Ooru Logix is)**
- **Current Players:** None significant (we are alone)
- **Latency:** 6-12 months before competitors can copy
- **Why we're here:**
  - Offline chai shops lack WiFi (cloud alone fails)
  - Edge AI on Raspberry Pi solves disconnection
  - Hardware creates margin + switching cost
- **Differentiation:** Inventory detection model trained on Indian shop footage (competitors will train on US retail)

**Quadrant 2: Software + Online (most competitors)**
- **Players:** Khatabook, OkCredit, Vyapar, Zoho Books
- **Focus:** Billing, credit tracking, bookkeeping
- **Why they don't compete yet:** Different UX (mobile app), different problem (cashflow), not inventory-focused
- **Threat level:** LOW (different value prop)

**Quadrant 3: Software + Offline (legacy)**
- **Players:** Old POS vendors, physical registers
- **Status:** Dying market (being automated out)
- **Threat:** NONE

**Quadrant 4: Hardware + Offline (theoretical)**
- **Players:** None yet
- **Use case:** Edge AI retail without cloud (e.g., camera-based security)
- **Relevance:** Low for inventory use case

---

## ACTIVE COMPETITORS TO MONITOR

### 1. SNAPBIZZ (High Priority)

**Company Profile**
- **Headquarters:** Bangalore
- **Founded:** ~2018
- **Funding:** Series B, ₹150 Cr raised (as of 2025)
- **Team:** ~100 employees
- **Website:** snapbizz.com

**Current Business Model**
- Tablet-based analytics + POS for kirana stores
- Hardware: Tablet computer + receipt printer
- Software: Inventory, sales, analytics on tablet
- Price point: ₹30,000-50,000 hardware + ₹500-1,000/month SaaS
- GTM: Direct sales to large kiranas (100+ seat stores)

**Technology Stack**
- Cloud-based (requires WiFi)
- Manual input or barcode scanning (no computer vision yet)
- Integration with suppliers (trying to build network effects)

**Threat Assessment**
- **Level:** MEDIUM
- **Why:** Similar market (retail analytics), proven funding, strong sales team
- **Why not higher:** Different ICP (larger stores, WiFi assumption), no edge AI, requires manual input
- **Timeline:** Could add computer vision features in 6-12 months if they choose to pivot

**Key Differences**
| Factor | SnapBizz | ShopSense |
|--------|----------|-----------|
| ICP | Large kirana (100+ items) | Chai/small general store |
| Hardware | Tablet + printer | Raspberry Pi + camera |
| Setup | Requires WiFi, power outlets | Works offline, USB power |
| Accuracy | Manual input + barcode | Automatic CV detection |
| Price | ₹40K hardware | ₹25K hardware |
| Model | High-touch sales | Freemium pilot-first |

**Watch For**
- Any announcement of "computer vision" or "edge AI" feature
- Hardware redesign or new product launch
- Partnership with camera company or CV startup
- Funding announcements (would signal expansion)
- Job postings for ML engineers

**Last Checked:** March 27, 2026
**Next Check:** April 30, 2026

---

### 2. KHATABOOK (Low Priority)

**Company Profile**
- **Headquarters:** Bangalore
- **Founded:** 2017
- **Funding:** Series C, ~₹300+ Cr raised
- **Status:** Well-funded, well-known
- **Website:** khatabook.com

**Current Business Model**
- Mobile app for shopkeeper bookkeeping
- Focus: Supplier credit tracking + digital ledger
- Price: Free + premium ₹100-500/month
- Users: ~8M+ registered users (mostly non-paying)

**Threat Assessment**
- **Level:** LOW
- **Why:** Different problem (credit tracking, not inventory). Mobile-first (not hardware). No computer vision.
- **Reason we monitor:** Large installed base could be future channel or acquisition target

**Watch For**
- Hardware product announcement (would signal pivot to inventory)
- Computer vision integration
- Partnership with equipment company
- Expansion into analytics/insights

**Last Checked:** March 28, 2026
**Next Check:** April 30, 2026

---

### 3. DOTPE / PAY1 (Low Priority)

**Company Profile**
- **Headquarters:** Mumbai
- **Founded:** ~2019-2020
- **Status:** Growing fintech/payments focus
- **Current Model:** QR-code-based payments + basic POS

**Threat Assessment**
- **Level:** LOW
- **Why:** Focused on payments, not inventory. No hardware-plus-software model.

**Watch For**
- QR code camera integration with inventory detection
- Computer vision feature launch
- Any "retail intelligence" module

**Last Checked:** March 28, 2026
**Next Check:** April 30, 2026

---

### 4. OKCREDIT (Low Priority)

**Company Profile**
- **Headquarters:** Gurgaon
- **Status:** Well-funded but narrowly focused
- **Current Model:** Digital credit tracking between shops and suppliers

**Threat Assessment**
- **Level:** NONE
- **Why:** Completely different use case. No inventory focus. No hardware.

**Watch For**
- Inventory feature announcement
- Acquisition by a larger retail platform
- Pivot to hardware-based inventory

**Last Checked:** March 28, 2026
**Next Check:** May 30, 2026

---

## NEW ENTRANTS TO WATCH

These are potential threats that don't exist yet. Search monthly for these patterns:

### Search Keywords (Monthly)
Execute monthly Google + GitHub searches for these terms:

1. **"edge AI retail India"** (GitHub + Google)
   - Alert: If any GitHub repo with >100 stars appears doing similar
   - Check: Issues asking about "chai shop" or "kirana"

2. **"YOLOv8 retail detection"** or **"computer vision POS India"**
   - Alert: Academic papers, startups, or open-source implementations
   - Threat: MIT/IIT spinoff with better model

3. **"Raspberry Pi kirana"** or **"edge retail analytics"**
   - Alert: Hackathon projects, indie founders, other bootstrapped companies
   - Threat: Someone smarter with same idea but faster execution

4. **"inventory detection India"** or **"stock tracking camera"**
   - Alert: Any startup with similar product
   - Threat: Well-funded competitor entering space

5. **LinkedIn: "founder" + "retail AI" + "Bangalore"**
   - Search monthly for people raising money in this space
   - Alert: Series A announcements in retail AI

### Screening Process
When you find something suspicious:
1. **Clone the repo** (if open source) and assess code quality
2. **Check funding** (Crunchbase, LinkedIn, Twitter)
3. **Check hiring** (job posts on LinkedIn/Naukri = expansion signal)
4. **Assess market overlap** (are they targeting same ICP?)
5. **Document** in this file with date, threat level, and action

---

## MONTHLY INTEL UPDATE TEMPLATE

Copy this template and complete monthly (last Friday of each month):

```markdown
## Competitive Update — [Month Year]

**Date:** [Date]
**Analyst:** Vaishak
**Review Period:** [Start Date] - [End Date]

### New Developments
- **SnapBizz:** [What happened this month, if anything]
- **Khatabook:** [Any news]
- **DotPe/Pay1:** [Any news]
- **OkCredit:** [Any news]
- **New entrants:** [Any suspicious activity in GitHub/Google]

### Threat Assessment Changes
- [Did any competitor move from Low → Medium threat?]
- [Did we discover a new competitor?]
- [Did we dismiss a perceived threat?]

### Market Signals
- [Any sector-wide news? Funding trends? Acquisitions?]
- [Any tech trends affecting retail AI? (e.g., YOLOv9 release, Raspberry Pi shortage, WiFi costs)]

### Competitive Advantage Checklist
- [ ] Still alone in Hardware + Edge AI + India market? (YES = advantage intact)
- [ ] Model quality still ahead? (assess by sampling public demos)
- [ ] GTM still differentiated? (pilot-first vs traditional sales)
- [ ] Hardware cost still at ₹25K vs competitors >₹40K? (check pricing)

### Action Required
- [Do we need to adjust our strategy?]
- [Should we accelerate or decelerate any initiative?]
- [Do we need to talk to investors about competitive risk?]

### Next Month's Focus
- [What specific things to monitor in [Next Month]]
- [Any specific competitor moves to watch for]
```

---

## EARLY WARNING SIGNALS & STRATEGIC RESPONSE

These developments would require **immediate strategic response** (within 48 hours):

### SIGNAL 1: SnapBizz Announces Hardware + Computer Vision
**Evidence:**
- Product launch announcement with camera hardware
- GitHub repo with YOLOv8 or similar
- Job posting for "Computer Vision Engineer"

**Threat Level:** HIGH
**Our Response:**
1. Within 24 hours: Vaishak reviews their product on-site (visit a pilot customer)
2. Within 48 hours: Assess feature completeness vs ShopSense (accuracy, speed, offline capability)
3. Within 1 week: Update positioning (emphasize what we do better)
4. Possible acceleration: Shorten pilot duration, increase # of pilots in April (first-mover advantage)
5. Fundraising angle: "Incumbent (SnapBizz) is 12+ months away from our product. We're 6 months ahead on deployment."

### SIGNAL 2: Anyone Raises >₹50Cr for Retail AI
**Evidence:**
- TechCrunch/YourStory article about "retail AI startup raises Series B"
- Target market includes India or Bangalore
- Focus on inventory, supply chain, or shop analytics

**Threat Level:** MEDIUM-HIGH
**Our Response:**
1. Within 24 hours: Research the company (founding team, tech, GTM)
2. Within 48 hours: Assess overlap with our target market
3. Within 1 week: Update pitch deck to address "well-funded competitor" question
4. Fundraising angle: "Competing against better-funded players means we need to be faster, smarter, and closer to customer"

### SIGNAL 3: Raspberry Pi Announces Price Increase or Shortage
**Evidence:**
- Raspberry Pi Foundation announces ₹1000+ price or supply issues
- Alternative boards (Jetson Nano, BeagleBone) become cheaper or more available

**Threat Level:** MEDIUM (operational)
**Our Response:**
1. Within 1 week: Evaluate alternative hardware (Jetson Nano, Orange Pi, Rock 5B)
2. Build prototype with alternative
3. Assess cost impact
4. Plan migration if needed

### SIGNAL 4: YOLOv8 License Changes or Becomes Expensive
**Evidence:**
- Ultralytics announces paid license for YOLOv8
- Commercial restrictions introduced
- Regulatory changes

**Threat Level:** LOW-MEDIUM (unlikely but possible)
**Our Response:**
1. Within 1 week: Evaluate alternative models (YOLO-NAS, RT-DETR, EfficientDet)
2. Benchmark accuracy on chai shop footage
3. Plan migration if YOLO becomes non-viable

### SIGNAL 5: Someone Else Targets Chai Shops with Same Idea
**Evidence:**
- Startup announces "AI inventory for small shops"
- Product appears on ProductHunt targeting India
- GitHub repo with similar functionality gets >100 stars

**Threat Level:** HIGHEST (direct competition)
**Our Response:**
1. Within 24 hours: Assess technology (is it better/worse?)
2. Within 48 hours: Assess funding (are they venture-backed? Can they out-execute us?)
3. Within 1 week: Accelerate our pilots (get 3 paying customers before they do)
4. Fundraising angle: "Race to get first paying customer in this market"

---

## COMPETITIVE ADVANTAGE ASSESSMENT CHECKLIST

Run this monthly (in your Monthly Intel Update):

### Technology
- [ ] Our model accuracy still best-in-class for Indian shops?
- [ ] Our edge AI implementation faster/cheaper than alternatives?
- [ ] Our offline-first approach still unique?

### Market Position
- [ ] Still alone in hardware + edge AI + India retail?
- [ ] Still best price point for our feature set?
- [ ] Still fastest deployment (2-week pilot)?

### Customer Relationship
- [ ] Do we have testimonials/case studies they don't?
- [ ] Are our early customers "sticky"?
- [ ] Do we understand their pain better?

### Operational
- [ ] Can we scale deployment faster than competitors?
- [ ] Do we have a repeatable playbook?
- [ ] Is our supply chain more efficient?

**If we fail 3+ of these → Competitive advantage eroding. Plan adjustment.**

---

## HISTORICAL COMPETITIVE LOG

| Date | Event | Threat Level | Response | Outcome |
|------|-------|--------------|----------|---------|
| March 29, 2026 | Initial competitive mapping | N/A | Baseline scan | Identified SnapBizz as medium threat |

---

## FILING SYSTEM

**Location:** `/sessions/amazing-epic-ptolemy/mnt/olog antigrav v1/company/intelligence/`

**Keep:**
- This file (update monthly)
- Competitor pricing data (screenshot)
- Competitor product screenshots (if changed)
- Any articles about competitors

**Delete after 3 months:**
- Old search results
- Outdated threat assessments

---

## KEY PRINCIPLE

**Monitoring ≠ Paranoia**

We track competitors to stay aware, not to copy them. Our job is to:
1. Stay 6 months ahead on execution
2. Have a repeatable, capital-efficient GTM
3. Build customer relationships they can't replicate

If a well-funded competitor enters with better tech, our moat is: **We moved first. We have customers. We understand the market.**

Speed wins when capital is equal. Relationships win when tech is equal. We need to win on both.

---

**Last Updated:** March 29, 2026
**Next Full Review:** April 25, 2026
**Next Competitive Intel Search:** April 10, 2026
