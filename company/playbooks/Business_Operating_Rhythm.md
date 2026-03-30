# Business Operating Rhythm — Ooru Logix

Solo founder operating system. This ensures ShopSense deployments stay on track while building the business sustainably.

---

## Daily Ritual (30 minutes)

The non-negotiable daily minimum to keep the business moving forward.

### Morning Check (10 minutes)
**Do this first thing, before any meetings or deep work.**

- [ ] Open `Business_Dashboard.html` — check revenue target vs actual
- [ ] Check email/WhatsApp for customer messages (response time: same day max)
- [ ] Check GitHub notifications (PRs, issues)
- [ ] Check LinkedIn comments/DMs (respond to engagement)
- [ ] Scan 1-2 news feeds for relevant stories (AI, retail, hardware, India tech)

**Decision:** If a customer message exists → respond in next 2 hours

### Focus Block (4-6 hours)
**Choose ONE category and go deep.**

Available categories:
1. **Building** — firmware, hardware, OLOG integration, model training
2. **Selling** — pipeline outreach, demos, negotiations
3. **Deploying** — installation, Day 1 checks, customer support
4. **Ops** — invoicing, documentation, hiring prep

Theme each day of the week:
- Monday: Selling (pipeline review + 3 new shops)
- Tuesday: Building (firmware/model work)
- Wednesday: Selling (demos + conversions)
- Thursday: Deploying (unit checks, customer support)
- Friday: Ops (payroll, invoices, hiring) + weekly review prep

**Rule:** No context switching during focus block. Phone off. Slack off.

### End of Day Log (5 minutes)
**Fill this template every single day.**

| Date | What I Shipped | Customer Interactions | Blockers | Did I Talk to a Customer? |
|------|---|---|---|---|
| 2026-03-29 | Fixed CSI ribbon detection | Demo at Nilgiris | WiFi sync failing | Yes (2 shops, 1 pilot) |
| | | | | |

**Minimum standard:**
- "Shipped" = committed to git, deployed to prod, or customer-facing
- "Customer interactions" = count every call/msg/visit (minimum 1/day)
- "Blocker" = only log REAL blockers (not "I ran out of coffee")

**Red flag:** 3 days without customer interaction → you're in the wrong lane

---

## Weekly Review (1 hour, every Monday 9 AM)

**Calendar block:** 9-10 AM, non-negotiable.

### Step 1: Open Business Dashboard (5 min)
- Revenue vs ₹150K/month target
- Signed contracts vs pipeline
- NPS score from last month
- Days until next decision gate

### Step 2: Pipeline Status (10 min)
Update each shop in the pipeline:

| Shop Name | Owner | Stage | Days in Stage | Next Action | ETA |
|---|---|---|---|---|---|
| Nilgiris (Brigade Rd) | Rajesh | Pilot | 5 | Day 1 check | 2026-03-30 |
| Fresh Mart (Koramangala) | Priya | Demo | 8 | ROI conversation | 2026-04-01 |
| General Store (Whitefield) | Hari | Identification | 3 | First contact | 2026-03-31 |

**Status rules:**
- Stage >21 days with no progress = move to "Lost"
- Stage stuck? Update reason in "Next Action" field

### Step 3: Revenue Check (5 min)
- How much revenue this month (actual)?
- How many pilots running (duration)?
- How many paying customers (total)?
- Minimum: 1 new pilot OR 1 conversion this week

**Target math:**
- Month 1 (now): 1 paying customer = ₹25K
- Month 2: 2 paying = ₹50K
- Month 3: 4 paying = ₹100K
- Month 6: 15 units on contract = ₹150K/month recurring

### Step 4: Decision Gate Check (5 min)
Each week, exactly ONE decision gate must close. Check:

**Gate 1: Can I install the system reliably?**
- Status: _____ (Yes/Working/Need 1 more test)
- What's needed: _______
- Target close date: 2026-04-05

**Gate 2: Can I get a shop owner to say YES to a pilot?**
- Status: _____ (Yes/Need demo/Need pricing fix)
- What's needed: _______
- Target close date: 2026-04-12

**Gate 3: Can I convert a pilot to a paying customer?**
- Status: _____ (Too early/Testing/Ready)
- What's needed: _______
- Target close date: 2026-05-10

### Step 5: #1 Priority This Week (5 min)
**Pick ONE.**

Options:
- [ ] Get first paying customer (if pilot data looks good)
- [ ] Fix a critical bug (if deployments breaking)
- [ ] Run 3 new demos (if pipeline empty)
- [ ] Launch OLOG website (if marketing needed)
- [ ] Hire first support person (if drowning in support)

Write it here: ___________

### Step 6: Hypothesis Check (10 min)
From McKinsey report: "15 units in 6 months via brutal beachhead strategy"

- Assumption A: Bangalore shops will pay ₹25K for ShopSense → Still holding?
- Assumption B: Model accuracy will be 80%+ in real shops → Actual: ____%
- Assumption C: Shops can afford ₹300/month error loss to lose → Evidence: (customer quotes)
- Assumption D: Solo founder can support 10-15 units → Actual load: ___ units

**If ANY assumption breaking:** flag it here and reprioritize

### Step 7: Content & Community (5 min)
- [ ] Did I post on LinkedIn this week? (1-2 posts minimum)
- [ ] Did I engage with 5+ relevant posts?
- [ ] Did I write 1 thread about a learning?
- [ ] Did I update GitHub with progress?

**Why:** Founder visibility builds trust + attracts pilots + shows progress to future investors

### Weekly Review Template
**Copy this to a Google Doc and fill weekly:**

```
## Week of [DATE]

**Revenue This Week:** ₹_____
**Pilots Running:** ___ units
**Customers Added:** ___
**Pipeline Size:** ___ shops

**Decision Gate Closing This Week:** [Gate 1/2/3]

**#1 Priority:** [description]

**Assumptions Holding?**
- [ ] Bangalore willingness to pay
- [ ] Model accuracy
- [ ] Error loss calculation
- [ ] Solo founder scaling capacity

**Content Done:**
- LinkedIn posts: ___
- GitHub commits: ___
- Customer calls: ___

**Next Week's Theme:** [Building/Selling/Deploying/Ops]

**Blockers:** [list here]
```

---

## Monthly Review (2 hours, first Sunday of month)

**Calendar block:** 10 AM - 12 PM. Make it sacred.

### Step 1: P&L Review (20 min)
Against financial model assumptions:

- Actual revenue this month: ₹_____
- Actual COGS (parts cost): ₹_____
- Gross margin: ____% (target: 60%+)
- Operating costs: ₹_____
- Net this month: ₹_____

**Check:** Does actual COGS match the ₹12,500/unit assumption?

### Step 2: Unit Economics (15 min)

| Metric | Assumption | Actual | Delta |
|---|---|---|---|
| COGS per unit | ₹12,500 | ₹_____ | _____ |
| Install + training time | 6 hours | ____ hours | _____ |
| Time to conversion (days) | 21 | ____ | _____ |
| Pilot-to-paid conversion rate | 60% | ____% | _____ |
| Support time per unit/month | 2 hours | ____ hours | _____ |

**Rule:** If actual COGS >15% above assumption → investigate immediately

### Step 3: Customer Feedback Synthesis (15 min)
Pull all customer messages, calls, feedback from the month:

- What's working (2-3 things): _____
- What's breaking (1-2 things): _____
- What customers ask for (top 3 feature requests): _____
- NPS comments (aggregate): _____

**Output:** Email summary to yourself for future reference

### Step 4: Agent Swarm Audit (10 min)
Which background workflows need to run this month?

- [ ] Model retraining (collect false positives + retrain)
- [ ] Hardware inventory check (do we have spares?)
- [ ] Firmware security audit
- [ ] Competitor monitoring (quarterly)
- [ ] Content creation (marketing)
- [ ] Help doc updates (based on support tickets)

**Decision:** Assign each to a subagent workflow or defer to next month

### Step 5: Roadmap vs Reality (15 min)
Check 1/3/6/12-month plan:

**1-Month Targets (this month):**
- [ ] Target: ___
- [ ] Actual: ___
- [ ] On track? YES/NO

**3-Month Targets (Q2 2026):**
- [ ] Target: 15 units across 3 cities
- [ ] Current trajectory: _____ units
- [ ] Adjustment needed? YES/NO

**6-Month Targets (Q3 2026):**
- [ ] Target: 40 units, ₹5L/month ARR
- [ ] Current trajectory: _____
- [ ] Adjustment needed? YES/NO

**12-Month Targets (Q1 2027):**
- [ ] Target: 100+ units, fundraise-ready
- [ ] Current trajectory: _____
- [ ] Adjustment needed? YES/NO

### Step 6: Monthly OKR Check (15 min)
Grade each:

**OKR Set at Month Start:**
- OKR 1: _____ → Actual progress: ____% → Grade: A/B/C
- OKR 2: _____ → Actual progress: ____% → Grade: A/B/C
- OKR 3: _____ → Actual progress: ____% → Grade: A/B/C

**Grading:**
- A = 80%+ of goal
- B = 50-80%
- C = <50%

**If any grade C:** diagnose why next week

### Step 7: Next Month Priorities (10 min)
Set 3 OKRs for next month:

1. **OKR 1 (Revenue):** Get [X] pilots signed OR convert [Y] to paying
2. **OKR 2 (Product):** Ship [feature] OR fix [bug]
3. **OKR 3 (Ops):** [hiring/process/document]

### Monthly Review Template
**Save to Google Drive, link from Business_Dashboard:**

```
# Monthly Review — [Month/Year]

## Financial Summary
- Revenue: ₹_____
- COGS: ₹_____
- Margin: _____%
- Net: ₹_____

## Unit Economics Check
[table from Step 2]

## Customer Feedback
- What's working: _____
- What's breaking: _____
- Top feature requests: _____

## Roadmap Status
- 1-month: ____% on track
- 3-month: ____% on track
- 6-month: ____% on track

## OKR Grades
- OKR 1: A/B/C
- OKR 2: A/B/C
- OKR 3: A/B/C

## Next Month's OKRs
1. _____
2. _____
3. _____

## Blockers
- _____
```

---

## The Daily Decision Filter

Every task/request/idea goes through this filter. Use it ruthlessly.

### Question 1: Does this directly help deploy or sell a ShopSense unit?
**YES → DO IT NOW (interrupt everything)**
- Examples: customer call, firmware bug, demo prep, financing issue

**NO → Go to Q2**

### Question 2: Does this help a current customer?
**YES → DO IT SOON (same day if possible)**
- Examples: support ticket, model accuracy issue, feature request from paying customer

**NO → Go to Q3**

### Question 3: Is this required for operations (legal, tax, bank)?
**YES → DO IT SOON (schedule it, don't procrastinate)**
- Examples: GST filing, payroll, bank reconciliation, contract signature

**NO → Go to Q4**

### Question 4: Is this for OLOG, Web Design, or another product?
**YES → FREEZE until Gate 3 is fully closed (≥5 paying ShopSense customers)**
- Decision: Park this in "Product Backlog", not "Now"
- Revisit: When you have 5 paying customers + 10 units deployed

**NO → Go to Q5**

### Question 5: Is this something cool/interesting but not mission-critical?
**YES → BACKLOG (revisit monthly)**
- Examples: "wouldn't it be cool if...", learning new framework, side experiment, content

**NO → Do it**

---

## Anti-Patterns to Avoid

These were flagged by the McKinsey & Claude analysis. Watch for them.

### Anti-Pattern 1: Writing docs instead of talking to customers
**Signal:** You've written 10 docs this week but talked to 0 new shops
**Fix:** Delete the doc. Go talk to 3 shops.

### Anti-Pattern 2: Building features for imaginary customers
**Signal:** You're building a feature "for scale" but no customer asked for it
**Fix:** Park the feature. Ask next 5 customers what they actually need.

### Anti-Pattern 3: Pursuing web design clients instead of ShopSense sales
**Signal:** You're saying "ShopSense is my focus" but spending 20 hours on a web design quote
**Fix:** Decline the web design work. Or hire someone. Or be honest you're pivoting.

### Anti-Pattern 4: Planning fundraising before 3 paying customers
**Signal:** You're working on a deck, picking a VC, preparing a pitch
**Fix:** Close Investor_Readiness_Scorecard first. You need 3+ paying customers before any investor conversation.

### Anti-Pattern 5: Building OLOG features while pilots are running
**Signal:** 3 pilots are running but you're coding OLOG features
**Fix:** PAUSE OLOG. All hands on customer success until pilots convert.

**Weekly check:** Read this list every Monday. If ANY pattern is happening → stop and recalibrate.
