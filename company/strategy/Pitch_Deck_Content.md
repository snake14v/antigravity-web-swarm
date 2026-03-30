# Ooru Logix — Pitch Deck Content (12 Slides)

**For:** Angel investors, seed-stage funding round
**Target:** ₹50L seed round
**Format:** 15-minute pitch + 5-minute Q&A

---

## SLIDE 1: TITLE SLIDE

**Headline:** Ooru Logix

**Tagline:** Edge AI for offline retail. Recover ₹300+/day per shop.

**Subtext:**
- Founder: Vaishak (AI engineer, hardware hacker)
- xgo3d Engineering
- Bangalore, India

**Speaker Notes:**
"Hi, I'm Vaishak. I built ShopSense — an AI system that sits in chai shops and retail stores, watches what gets sold, and tells shop owners exactly where they're losing money. Today, I want to show you why we're betting our time on this market."

**Visual:**
- Sleek product shot: hardware unit on chai shop counter
- Shop owner smiling, looking at phone with data summary
- Color: dark blue + chai brown accent

---

## SLIDE 2: THE PROBLEM

**Headline:** ₹300–400 lost every single day in small retail.

**Bullet Points:**
1. **Shrinkage is invisible.** Shop owners know it happens but can't see where. Average chai shop loses 10–15% to theft, waste, ringing errors.
2. **Staff accountability is impossible.** No way to know who made the mistake or if cashier is skimming.
3. **Inventory decisions are guesses.** Owners stock by habit, not data. Result: stockouts and dead inventory.
4. **No digital footprint.** 95% of India's 2M+ chai shops are cash-only, unconnected. No POS, no data.

**Data Points:**
- Market size: 2M+ chai shops in India
- Average daily loss: ₹300–400 per shop
- Annual revenue opportunity: ₹2.2L–2.9L per shop
- Profit margin: 15–20% (so loss = major hit)

**Speaker Notes:**
"Walk into any chai shop in Bangalore. The owner will tell you they lose 10% of daily revenue to shrinkage. Let me put that in perspective. An average chai shop does ₹1,000–1,500 in sales every day. That's ₹100–200 in loss daily. ₹3,000–6,000 per month. ₹36,000–72,000 per year. For a shop earning ₹10–12L annually, that's 3–6% of net profit. Wiped out. No visibility into why. No way to fix it. They just accept it as the cost of doing business."

**Visual:**
- Red downward arrow showing loss
- Photo (anonymized) of bustling chai shop with morning rush
- Data visualization: annual loss by shop size

---

## SLIDE 3: THE SOLUTION

**Headline:** AI hardware + SMS. You see everything that sells.

**Bullet Points:**
1. **ShopSense:** A compact AI camera that sits on the counter. Tracks every item sold in real time.
2. **What it does:** No faces. No recordings. Just items: "3 chai, 2 samosa, 1 lassi." Sent as SMS every morning.
3. **Why it works:** Edge AI inference on Raspberry Pi. No internet needed. No cloud vendor lock-in. Offline-first.
4. **Result:** Shop owner sees exactly what was sold vs. what was rung up. Recovery: ₹250–400/day.

**Product Details:**
- Hardware: Hardened Pi 4, custom intake lens, 4-year battery life
- Inference: YOLOv8n custom item classifier
- Output: Daily SMS summary + optional dashboard
- Price: ₹25,000 (hardware + 1 year support + lifetime inference)

**Speaker Notes:**
"Here's how ShopSense works. The hardware is small — fits on any chai shop counter. It runs AI locally on a Raspberry Pi, so it doesn't need the internet. It sees items, not faces. At the end of every day, we send a simple SMS: 'Yesterday: 47 chai, 12 samosa, 8 lassi sold.' The shop owner compares that to what their cashier rung up. If they rung up 40 chai instead of 47, boom — they found ₹210 in loss they didn't know about. Do that every day, and you recover ₹6,000–12,000 per month."

**Visual:**
- Product diagram: hardware → Raspberry Pi → local inference → SMS output
- Sample SMS: "M7: 47 chai, 12 samosa, 8 lassi sold"
- Shop owner phone showing data summary

---

## SLIDE 4: WHY NOW

**Headline:** Edge AI inference just became viable on commodity hardware.

**Bullet Points:**
1. **YOLOv8n on Pi 4 is now real.** Sub-second inference, <5W power draw. Wasn't possible 2 years ago.
2. **Offline-first infrastructure is India's edge.** 95% of retail is unconnected. We don't need the cloud.
3. **No SaaS incumbents own offline retail.** Shopify, Square, Razorpay all focus on online. Offline AI retail = untapped.
4. **Founder validated the tech.** 3 live pilots running. Data proves 80%+ accuracy on item classification.

**Market Timing:**
- YOLOv8n released: Jan 2023
- Pi 4 8GB prices dropped: 2023–2024
- Indian retail digitization push: Government push for MSME data, credit access
- Founder ready: 5 years AI + hardware experience

**Speaker Notes:**
"Here's why we're not 2 years early or 2 years late. YOLOv8 nano is a game changer. It runs on a Raspberry Pi with sub-second latency. 5 watts of power. That means we can put AI where it actually matters — at the edge, in the shop, offline. No internet required. No cloud vendor lock-in. No monthly fees. This was not possible in 2021. Today it's not just possible, it's reliable. And India's retail ecosystem — 95% of shops are cash-only, unconnected — is exactly where this tech shines. Online retailers already use Shopify and Square. The opportunity is offline. The $5B problem nobody is solving."

**Visual:**
- Timeline: YOLOv8 release → Pi 4 cost decline → Market readiness
- Inference speed graph: YOLOv8n vs. older models
- Map of Bangalore: 1,000+ unconnected chai shops (beachhead market)

---

## SLIDE 5: MARKET SIZE

**Headline:** TAM: ₹4,400 Cr. SAM: ₹550 Cr. SOM: ₹5 Cr. Year 1.

**TAM (Total Addressable Market):**
- Retail shops in India: 20M+ (chai stalls, general stores, clothing)
- Average daily loss: ₹300
- Addressable loss: ₹2,200 Cr./year
- Software/hardware bundle: ₹4,400 Cr./year market

**SAM (Serviceable Addressable Market):**
- Focus: Chai + small food retail in Tier 2 cities
- 500K shops, ₹150–250 turnover each
- 25% digitization rate (willing to try ShopSense)
- SAM: ₹550 Cr.

**SOM (Serviceable Obtainable Market) — Year 1:**
- Conservative: 200 units sold
- Revenue: ₹50L (200 × ₹25K)
- Gross profit: ₹22.5L (45% margin)
- SOM: ₹5 Cr. (by Year 3)

**By The Numbers:**
- 2M+ chai shops in India
- ₹2.2L–2.9L loss per shop per year
- Total addressable TAM: ₹4,400 Cr.

**Speaker Notes:**
"Let's size this. India has 2 million chai shops. Not all are addressable — some are too small, some too big. But 500K–1M are in the Goldilocks zone: ₹8–15L annual revenue, single or 2–3 location operators. Each loses ₹3–6L per year to shrinkage. That's a ₹4,400 crore problem. We're not trying to capture all of it. Year 1, we're focused on Bangalore and Tier 2 cities: maybe 500K shops, 25% willing to try. That's SAM of ₹550 crore. Our Year 1 target? 200 units, ₹50 lakh revenue. Gross profit of ₹22.5 lakh. By Year 3, we want ₹5 crore SOM. Entirely doable in the offline retail space."

**Visual:**
- Funnel: TAM → SAM → SOM
- Map: India retail density heat map
- Market size waterfall chart

---

## SLIDE 6: PRODUCT & HOW IT WORKS

**Headline:** Hardware + AI + Offline = Recovery.

**Product Architecture:**
1. **Hardware:** Compact unit, sits on counter. Raspberry Pi 4 8GB, custom lens, Li-ion battery (4 years).
2. **Software:** YOLOv8n custom classifier trained on ₹5L+ of chai shop footage. 85%+ accuracy on 30-item taxonomy (chai, samosa, lassi, etc.).
3. **Data Pipeline:** Local inference → daily SMS → optional cloud dashboard for power users.
4. **Support:** Warranty 1 year, free repairs, remote diagnostics.

**Value Prop in 10 Seconds:**
"Sits on your counter. Tells you what sold. Helps you recover ₹300+/day. Pays for itself in 80 days."

**Competitive Advantages:**
1. **Offline-first:** No internet needed. Works where 95% of Indian retail lives.
2. **No SaaS lock-in:** One-time payment. No monthly subscriptions (yet). Your data stays local.
3. **Zero privacy concerns:** No faces, no PII. Just items + counts.
4. **Founder-led:** Not a VC commodity play. We live with the problem, build the solution.

**Speaker Notes:**
"ShopSense is three things working together. First: hardware. A small, durable unit that sits on your counter. It has a Raspberry Pi 4 — that's off-the-shelf compute — and a custom lens we designed for capturing items in low light. 4-year battery. IP67 waterproof. Built for a dusty, humid chai shop. Second: software. We trained a custom YOLOv8 nano model on 10,000+ images of chai shop counters. It learned to distinguish 30 items: chai, samosa, lassi, biscuit, etc. No faces. Just items. 85% accuracy in real-world conditions. Third: the data loop. Every night at midnight, we collect what the device saw and send the shop owner an SMS: 'You sold 47 chai, 12 samosa, 8 lassi.' They compare to their rung-up numbers and find the gap. The magic is all happening locally on the device. No internet. No cloud dependency. No monthly SaaS bill. That's why it works in offline India."

**Visual:**
- Product photo: compact, sleek hardware
- Architecture diagram: device → local inference → SMS → optional dashboard
- YOLOv8n model architecture simplified
- Sample output: "Today: 47 chai, 12 samosa, 8 lassi"

---

## SLIDE 7: BUSINESS MODEL & UNIT ECONOMICS

**Headline:** ₹25K upfront. 45% margins. Zero CAC.

**Revenue Model:**
1. **Hardware:** ₹25,000 per unit (one-time)
2. **Year 2+:** ₹50/month SaaS (advanced analytics, multi-location, cloud dashboard) → OPT-IN
3. **Year 3:** Integration fees (POS link-up) + consulting + professional services

**Unit Economics:**
| Metric | Value |
|--------|-------|
| Unit Price | ₹25,000 |
| COGS (hardware + setup) | ₹13,750 |
| Gross Profit | ₹11,250 |
| Gross Margin % | 45% |
| Customer Payback Period | 80 days |
| LTV (Year 1) | ₹25K + ₹5K service revenue = ₹30K |
| CAC (direct sales) | ₹0 (founder walks in) |
| LTV/CAC Ratio | Infinite |

**Why This Works:**
- No paid ads (founder sales only)
- High gross margin (hardware + SaaS sustains team)
- Fast payback (shop owner recovers cost in 2.5 months)
- Referral natural (happy customer tells friends)

**Speaker Notes:**
"Unit economics are straightforward. We sell for ₹25,000. Cost to make and support: ₹13,750. Gross profit: ₹11,250. That's 45% margin. For a shop losing ₹300 a day, that's ₹9,000 a month in recovery potential. They break even on our hardware in less than 3 months. After that, it's pure upside. And CAC? Zero. The founder walks in, shows up at the shop, does the demo. No marketing spend. No paid ads. Just founder hustle. That's how we go from 0 to 25 units in Year 1 with almost no customer acquisition cost. By Year 2, as we get inbound from GitHub and LinkedIn, that ratio stays incredibly healthy."

**Visual:**
- Unit economics table
- Payback period timeline: ₹25K → paid off in 80 days
- LTV/CAC ratio: ∞ (or very large number)
- Gross margin trend (stay at 45%)

---

## SLIDE 8: TRACTION & VALIDATION

**Headline:** Not revenue yet. But architecture validated. 3 pilots live.

**What We've Built:**
- ✓ Hardware v1 designed, tested, produced 3 units
- ✓ YOLOv8n custom classifier trained on 10K+ real chai shop images
- ✓ Edge inference validated on Raspberry Pi 4
- ✓ 3 pilot units deployed in Bangalore chai shops
- ✓ 2 weeks of real-world data collected (80%+ accuracy confirmed)

**What We've Learned:**
1. Chai shop owners immediately understand ROI ("If I recover ₹250/day, that's ₹7,500/month")
2. Accuracy is good enough on Day 1 (85%+, improves with more data)
3. Staff doesn't push back (no privacy concerns with item-only data)
4. Biggest objection: price (₹25K feels like a lot upfront)

**Pilot Status:**
| Shop | Days Live | Items Tracked | Accuracy | Owner Reaction |
|------|-----------|---------------|----------|---|
| Shop A | 14 days | 30 items | 87% | "Surprised by the data, want to buy" |
| Shop B | 7 days | 28 items | 82% | "Wait and see, ask for 2-week free trial" |
| Shop C | 3 days | 25 items | 85% | "Too new, come back in 2 weeks" |

**Milestones Completed:**
- Q1 2026: Founder + Claude AI (Superpowers) finalized product spec
- Q2 2026: Hardware manufactured, ML models trained
- Q2 2026: 3 pilots deployed
- Q3 2026: First revenue (first paid customer conversion)

**What's Next (Q3–Q4 2026):**
- Convert 3 pilots to paid (₹75K revenue)
- Add 5–10 more units sold
- Hire 1 BD person (Feb 2026 budget)
- GitHub open-source launch (Month 3 of seed)
- Target: 25–30 units sold by Dec 2026 (₹62.5–75L revenue)

**Speaker Notes:**
"I want to be honest about where we are. We're not generating revenue yet. But we've validated the core problem and the solution. We've built working hardware, trained an AI model that works in real chai shops, and we have 3 pilots running today. One shop owner saw the data and said 'Yes, I want to buy.' The other two are in evaluation mode. By end of Q3, we'll have our first paying customer. That's the milestone we're working toward. Revenue of ₹50–75 lakh by end of Year 1 is achievable if we execute on sales and hire the right person to scale founder-led sales."

**Visual:**
- Hardware product photo
- Map: 3 live pilot locations in Bangalore
- Chart: accuracy trends over 2 weeks
- Timeline: milestones from Jan–Dec 2026

---

## SLIDE 9: COMPETITIVE LANDSCAPE

**Headline:** We own the offline AI hardware quadrant.

**2×2 Matrix: Hardware vs Software × Online vs Offline**

```
                SOFTWARE ONLY           HARDWARE + SOFTWARE
ONLINE       Shopify, Square          Impossible to compete
             (national, VC-backed)

OFFLINE      [EMPTY]                  *** SHOPSENSE HERE ***
             [No one owns this]        Edge AI for chai shops
```

**Why We're Alone:**
1. **Shopify/Square/Razorpay:** Focus on online, POS software, payments. Don't touch offline. Can't scale to ₹0-revenue cash-only shops.
2. **OLOG Platform (us, year 2+):** Will add SaaS layer. But core moat = hardware.
3. **Competitors don't exist:** No one is selling edge AI directly to Bangalore chai shops.

**Defensibility:**
- **Data moat:** Every shop we install = training data for the AI model. Model gets better.
- **Hardware moat:** Custom optics, thermal signature, form factor. Takes time to copy.
- **Brand + trust:** "The founder who drinks chai with you." Hard to compete with.
- **Network effects:** Referrals compound (shop A recommends to B, B to C).

**Incumbent Threat (Low Probability):**
- Could Square / Razorpay build this? Yes, but they're obsessed with payment volume. Offline retail is "noise" to them.
- Timeline: Even if they try, 2–3 years to market. We'll have 500+ units deployed by then.

**Speaker Notes:**
"Here's the competitive landscape. On one axis: hardware vs. software. On the other: online vs. offline. If you're online and software-only, Shopify and Square own that quadrant. They're raising billions, they're national. We can't compete there. But look at offline retail — cash-only, unconnected shops. It's empty. Shopify and Square don't care about that market. It's too small for them, too hard to scale without internet. That's our moat. We're building hardware for offline. By the time Amazon or Razorpay notices, we'll have 500 units deployed across Bangalore and Tier 2 cities. Data advantage. Customer relationships. The game gets a lot harder for them then."

**Visual:**
- 2×2 matrix (four quadrants)
- Competitor logos: Shopify, Square, Razorpay, Zomato
- "We are here" arrow pointing to offline hardware quadrant
- Timeline: competitive threats (2–3 years out)

---

## SLIDE 10: TEAM & APPROACH

**Headline:** Solo founder, 5 years AI + hardware. AI-augmented team (Claude).

**Founder: Vaishak**
- **Background:** AI engineer, hardware hacker, xgo3d Engineering founder
- **Relevant experience:**
  - Built AurumGuard MK II: All-ESP32-S3 smart vault (embedded systems, battery power management, real-world edge AI)
  - 5+ years experience: ML (YOLOv8, PyTorch), hardware (Raspberry Pi, ARM, thermal design), AWS CDK, Go backend, React frontend
  - Based in Bangalore, knows the chai shop ecosystem intimately
- **Why him:** Has actually built hardware that works in real conditions. Understands edge AI + offline systems. Not just a software engineer.

**Augmented Team:**
- **Claude (Anthropic AI):** Superpowers plugin for ideation, technical decisions, spec writing, agent orchestration
- **Contractor network:** Electronics assembly, firmware optimization (as-needed)
- **Planned hires (Month 3+):**
  - 1 BD/Sales person (₹50K/month) — scales founder-led sales
  - 1 Electronics tech (contract) — hardware assembly, testing

**Why This Works:**
- Lean operation (₹2.5L/month runway initially)
- Founder is technical + sales-capable (no time wasted on context switching)
- Claude offloads research, documentation, decision-making (force multiplier)
- Can scale from 1→5→15 units/month without huge hiring

**Speaker Notes:**
"I'm the founder and builder. I've spent the last 5 years building hardware and AI systems that work offline, in real conditions. I built a smart vault system — AurumGuard — that runs on battery, uses edge AI, survives Bangalore heat and humidity. That experience is directly relevant to ShopSense. I know how to balance power, reliability, and accuracy. I live in Bangalore, I know the chai shop ecosystem. I can walk into a shop, do the demo, listen to objections, and adjust. Plus, I'm augmented by Claude — an AI assistant that helps me think through technical decisions, write specs, organize the business. That's how a solo founder moves fast. By Month 3, I'll bring on a sales person to scale beyond what I can do alone. That's the plan."

**Visual:**
- Founder photo + background highlights
- Icon: Claude (Anthropic) as force multiplier
- Org chart: Vaishak (founder) → BD hire (M3) → Tech hire (M6)
- Timeline: headcount growth with CAC payback period

---

## SLIDE 11: FINANCIALS & USE OF FUNDS

**Headline:** ₹50 lakh seed. 6-month runway + inventory + hiring.

**3-Year Projection (Conservative Base Case)**

| Metric | Year 1 | Year 2 | Year 3 |
|--------|--------|--------|--------|
| Units Sold | 25 | 100 | 300 |
| Hardware Revenue | ₹62.5L | ₹250L | ₹750L |
| SaaS Revenue (₹50/mo) | — | ₹5L | ₹20L |
| Total Revenue | ₹62.5L | ₹255L | ₹770L |
| Gross Profit | ₹28L | ₹130L | ₹380L |
| Gross Margin | 45% | 51% | 49% |
| EBITDA | -₹15L | ₹60L | ₹280L |
| EBITDA Margin | -24% | 24% | 36% |

**Use of ₹50L Seed:**
| Item | Amount | Purpose |
|------|--------|---------|
| Operations (salary, domain, servers) | ₹15L | 6 months runway (Vaishak ₹10L, contractor ₹3L, ops ₹2L) |
| Hardware Inventory | ₹20L | 50 units to keep on shelf for sales demos + pilots |
| BD Hire (salary + benefits) | ₹8L | 1 FTE sales person, Month 3–Month 12 |
| Development (firmware, ML, platform) | ₹4L | Cloud infra, GPU rentals for model training |
| Marketing + Content | ₹2L | GitHub launch, Medium posts, LinkedIn ads (light touch) |
| Legal + Miscellaneous | ₹1L | Incorporation, IP filings, insurance |
| **Total** | **₹50L** | **12-month runway + growth** |

**Key Assumptions:**
- Conservative: 25 units in Year 1 (1.7 units/month on average, but ramp to 4–5/month by Q4)
- Base case: 100 units Year 2 (hiring + inbound kicks in)
- Optimistic: 300 units Year 3 (channel partners, market expand)
- Gross margin holds at 45% (no pressure on price, no COGS inflation)
- SaaS take rate: 30% of customers opt into ₹50/month cloud (Year 2+)

**Path to Profitability:**
- Year 1: -₹15L EBITDA (expected for seed stage)
- Year 2: +₹60L EBITDA (breakeven by Month 8–9 of Year 2)
- Year 3: +₹280L EBITDA (high gross margins, operating leverage)

**Speaker Notes:**
"We're asking for ₹50 lakh. Here's how we use it. ₹15 lakh goes to operations — my salary, contractor support, cloud services. That's 6 months of runway if we don't sell a single unit. ₹20 lakh goes to inventory — we'll manufacture 50 units so we always have something to demo. ₹8 lakh hires a sales person to scale beyond what I can do alone. ₹4 lakh is development overhead — model training, cloud infrastructure. ₹2 lakh is marketing — content, GitHub launch, some LinkedIn ads. The financials are conservative. We assume 25 units sold Year 1. That's 1–2 per month to start, ramping to 4–5 per month by Q4. Gross margin is 45% on hardware. Year 2, SaaS kicks in, we hit breakeven on EBITDA. Year 3, we're doing ₹770 lakh revenue, ₹280 lakh EBITDA. Healthy unit economics. The math works."

**Visual:**
- 3-year revenue chart (hardware vs. SaaS)
- EBITDA trend line (losses → profitability in Year 2)
- Use of funds pie chart
- Unit sales ramp by quarter (Y1 Q1 vs. Q4)

---

## SLIDE 12: THE ASK

**Headline:** ₹50 lakh seed round. Today's decision is a bet on offline AI in India.

**Investment Opportunity:**
- **Round:** ₹50 lakh seed
- **Valuation:** ₹5 crore (pre-money) — 10% equity ask
- **Use:** 12-month runway, inventory, hiring, launch
- **Timeline:** Close by end of Q2 2026, deploy capital by July 2026

**Return Thesis:**
1. **Market:** ₹4,400 crore addressable (chai shops alone)
2. **Wedge:** ShopSense wins offline retail AI hardware category
3. **Upside:** OLOG Platform (SaaS layer) in Year 2 → enterprise play
4. **Exit:** Series A in Year 2 (if we hit 100 units, ₹250L revenue) at ₹50–100 crore valuation
5. **IRR:** 3–5x on seed in Year 2–3 (conservative)

**Key Milestones (Investor Tracking):**
- **Month 3:** First paying customer, GitHub 100+ stars
- **Month 6:** 5 paying customers, ₹12.5L ARR (annualized run rate)
- **Month 9:** 10 paying customers, ₹25L ARR
- **Month 12:** 25 units, ₹62.5L revenue, inbound demand exceeds supply
- **Series A readiness (Month 15):** 100 units deployed, ₹250L revenue run rate, clear path to profitability

**Investor Rights:**
- **SAFE (Simple Agreement for Future Equity)** or **Convertible note** (standard startup terms)
- **Board seat / observer:** Angel investor + Vaishak
- **Quarterly updates:** Metrics, fundraising progress, risks

**Why Now?**
- Market timing is right (YOLOv8 + Pi 4 + India retail digitalization)
- Founder is ready (5 years relevant experience, built and shipped hardware before)
- Product is validated (3 pilots, 85%+ accuracy, customer interest confirmed)
- Team can execute (lean, focused, AI-augmented, sales-capable)

**Final Thought:**
"The next 3 years belong to companies building for offline markets. We're building the edge AI layer for the 2 million unconnected chai shops in India. This is the beginning of that story."

**Speaker Notes:**
"Here's the ask: ₹50 lakh, seed round. We're pre-revenue but post-product validation. We have 3 pilots live, one customer ready to convert. We have a clear GTM — founder sales, GitHub inbound, referrals. The market is enormous. The team is lean and capable. You're betting on three things: One, that offline retail in India is huge and unsolved. Two, that edge AI on commodity hardware is the right solution. And three, that Vaishak can execute. I've built hardware before. I live in the market. I understand the problem. Give us ₹50 lakh, and in 12 months I'll show you 25 units deployed, ₹60+ lakh revenue, and a clear path to ₹250 lakh Year 2. If that happens, Series A happens easily. You're looking at a 3–5x return in Year 2–3. That's the opportunity."

**Visual:**
- Investment ask summary box: "₹50L seed at ₹5Cr pre (10% equity)"
- Return thesis visual: seed → Series A → potential exit
- Milestone roadmap: M3 / M6 / M9 / M12 (with tracking metrics)
- Quote: "Offline AI in India. This is the beginning."

---

## APPENDIX: SPEAKER NOTES SUMMARY

### Timing Cues
- **Total presentation time:** 15 minutes
- **Slides per minute:** ~1.25 slides/minute
- **Slide 1–3:** 2.5 min (problem + solution hook)
- **Slide 4–6:** 2.5 min (market size + product + why now)
- **Slide 7–9:** 3 min (unit economics + traction + competitive)
- **Slide 10–12:** 3.5 min (team + financials + ask)
- **Buffer:** 3.5 min for breathing, emphasis, natural pauses

### Tone & Delivery
- **Tone:** Confident, not arrogant. Specific, not fluffy. Problem-first.
- **Delivery style:** Conversational. Reference personal experience ("I drink chai at these shops"). Use data, not hype.
- **Visual aids:** Show working product or pilot data (not mockups). Concrete proof beats assertions.
- **Anticipate questions:** Have 1-slide backup for each slide covering:
  - How did you pick this market? (Founder lives there + huge problem)
  - Why not sell to big chains? (Different motion, lower margin, distraction)
  - What if someone copies you? (Data moat, customer relationships, 2–3 year head start)
  - What's your biggest risk? (Hardware reliability in field; mitigation: warranty + spares)

### Post-Pitch Q&A (Expected)
- **"How do you go from 1 to 100 units?"** → (Hire BD person, inbound from GitHub, referrals, add Tier 2 cities)
- **"Why not build an app first?"** → (No internet. Offline is the insight. Hardware is the moat.)
- **"What if the cafe owner doesn't trust AI?"** → (No faces, just items. Proven in pilots. Frame as "better inventory, not surveillance.")
- **"How's the unit economics after year 1?"** → (Gross margin stable at 45%; SaaS layer adds 10% by Year 2)

---

**End of Pitch Deck Content**
