# Financial Model: Ooru Logix v1.0

---

## EXECUTIVE SUMMARY

**Unit Economics (Per ShopSense Kit):**
- Hardware revenue: ₹25,000 (one-time)
- Hardware COGS: ₹12,000
- Hardware gross margin: ₹13,000 (52%)

**SaaS Revenue:**
- Base SaaS: ₹2,000/month (includes all 5 modules)
- Advanced analytics add-on: ₹500/month (optional)
- Gross margin SaaS: 85%+ (Firebase + support only ~₹300/month per customer)

**Customer LTV (24-month window):**
- Hardware: ₹25,000
- SaaS (24 months @ ₹2,000/month): ₹48,000
- Add-on (assume 30% adoption @ ₹500/month, 24 months): ₹3,600
- **Total LTV:** ₹76,600
- **LTV:CAC Ratio:** 8:1 (target: >3:1) ✅

**Break-Even Analysis:**
- Kit price ₹25K covers hardware manufacturing
- SaaS ₹2K/month is 85% margin = ₹1,700 profit per customer-month
- One customer at ₹2K SaaS = ₹20.4K profit/year
- **Break-even:** 2 customers generate ₹40.8K/year profit (covers Vaishak's salary + ops costs)

---

## HARDWARE ECONOMICS

### Cost Breakdown (Bill of Materials)

| Component | Qty | Unit Cost | Total Cost | Notes |
|-----------|-----|-----------|-----------|-------|
| **Compute** |
| Raspberry Pi 4 (8GB) | 2 | ₹3,000 | ₹6,000 | Core processing |
| 32GB microSD Card | 2 | ₹400 | ₹800 | Storage for models + DB |
| USB-C Power Supply | 2 | ₹750 | ₹1,500 | 30W, dual ports |
| **Networking** |
| Gigabit PoE Switch | 1 | ₹2,500 | ₹2,500 | Camera power + networking |
| Cat6 Ethernet Cables | 4 | ₹300 | ₹1,200 | 50ft runs |
| USB WiFi Adapter | 1 | ₹800 | ₹800 | Backup connectivity |
| **Sensors** |
| USB Camera (4MP) | 4 | ₹1,000 | ₹4,000 | 1080p, PoE capable |
| Overhead Mount Kit | 4 | ₹600 | ₹2,400 | Aluminum + acrylic (3D printed) |
| **Enclosure & Assembly** |
| Aluminum Case | 1 | ₹2,000 | ₹2,000 | Anodized, ventilated (xgo3d) |
| Cabling, connectors, misc | 1 | ₹500 | ₹500 | Bulk accessories |
| **Subtotal** | | | **₹21,800** | |
| **Assembly Labor** | 1 | ₹400 | ₹400 | 1 hour @ ₹400 |
| **Quality Check** | 1 | ₹200 | ₹200 | Testing, validation |
| **Packaging & Shipping** | 1 | ₹600 | ₹600 | Shipping to customer site |
| **TOTAL COGS** | | | **₹23,000** | |

**Selling Price:** ₹25,000
**Gross Margin:** ₹2,000/kit (8%)

### Hardware Margin Improvement Path

**Problem:** 8% margin is thin. Need 15–20% for sustainable hardware business.

**Options:**

1. **Negotiate supplier discounts** (bulk orders after 10+ kits)
   - RPi 4 (8GB): ₹3,000 → ₹2,500 (bulk rate)
   - Camera: ₹1,000 → ₹800 (10-unit MOQ)
   - **New COGS:** ₹21,000 → Margin 16% ✅

2. **Vertical integration: in-house camera assembly**
   - Use OV5647 sensor modules (₹400) instead of Logitech cameras (₹1,000)
   - Assemble USB adapters in-house
   - **Savings:** ₹2,400/kit
   - **New COGS:** ₹20,600 → Margin 18% ✅
   - **Risk:** Quality control, warranty liability

3. **Simplify hardware (BreakEven kit)**
   - Single RPi 4 instead of two
   - 2 cameras instead of 4
   - **New price:** ₹15K
   - **New COGS:** ₹10,000
   - **Margin:** 33%
   - **Trade-off:** Reduced redundancy, lower specifications

**Recommendation:**
- Launch with current (8% hardware margin) to reach customers fast
- Post-Gate 2 (3 customers): Negotiate bulk discounts → 16% margin
- Post-Gate 3 (5 customers): Consider vertical integration → 18% margin

---

## SAAS ECONOMICS

### Pricing Model

**Tier 1: Base SaaS (₹2,000/month)**
- Includes: All 5 modules (SmokeSense, BrewSense, SnackSense, StaffSense, ComboBilling)
- Dashboard access (cloud + local)
- Daily/weekly/monthly reports
- Email support, WhatsApp escalation
- Syncing to Firebase (unlimited)
- No AI model training (standard YOLOv8n)

**Tier 2: Advanced Analytics (₹500/month, optional add-on)**
- Custom model fine-tuning per customer
- Margin analysis (per-item profitability)
- Waste prediction (forecasting spoilage)
- Staff shift optimization recommendations
- Priority support (2-hour response SLA)
- API access (future: integrate with Khatabook, Vyapar)

**Estimated Adoption:**
- Base SaaS: 100% of customers
- Advanced Analytics: 30% of customers (power users, multi-location shops)

### Cost of Goods Sold (SaaS)

| Cost Item | Monthly Cost Per Customer | Notes |
|-----------|---------------------------|-------|
| **Infrastructure** |
| Firebase Realtime DB | ₹50 | Syncing, real-time updates (estimate) |
| Firestore reads/writes | ₹80 | Customer data, analytics queries |
| Cloud Storage | ₹20 | Model weights, backups |
| Cloud Functions | ₹30 | Sync workers, scheduled tasks |
| **Support** |
| AI agent time (24/7) | ₹100 | Support tickets, troubleshooting (shared) |
| Vaishak time (monthly check-in) | ₹200 | 30 min/month per customer @ ₹400/hr |
| **Maintenance** |
| Model retraining (quarterly) | ₹50 | YOLOv8n fine-tuning per customer |
| Bug fixes, updates | ₹30 | Shared across customer base |
| **Total COGS** | **₹560/month** | (Conservative estimate) |

### Gross Margin (SaaS)

**Base SaaS:**
- Revenue: ₹2,000/month
- COGS: ₹560/month
- Gross margin: ₹1,440/month (72%)

**Advanced Analytics (if 30% adoption):**
- Revenue: ₹500/month (per adopter)
- COGS: ₹100/month (additional model training)
- Gross margin: ₹400/month (80%)

**Blended Gross Margin (100 customers):**
- 100 customers × ₹2,000 base = ₹200,000
- 30 customers × ₹500 add-on = ₹15,000
- **Total revenue:** ₹215,000
- **Total COGS:** (100 × ₹560) + (30 × ₹100) = ₹59,000
- **Total gross margin:** ₹156,000 (73%)

### Pricing Tiers (Future, Post-Gate 2)

**Starter Kit (₹15K hardware + ₹1,500/month SaaS)**
- Target: Smaller chai shops, testing customers
- Hardware: Single RPi 4, 2 cameras
- SaaS: Base modules only (no custom analytics)
- Gross margin: 25% (hardware) + 75% (SaaS)

**Pro Kit (₹35K hardware + ₹2,500/month SaaS)**
- Target: Multi-location shops, high-volume operations
- Hardware: Dual RPi 4 (as current), 4 cameras + upgrade option (8 cameras)
- SaaS: Base + Advanced Analytics included
- Gross margin: 20% (hardware) + 80% (SaaS)

**Enterprise (Custom pricing)**
- Target: Shop networks, franchisors, corporate chains
- Hardware: 10+ kits, white-label enclosure
- SaaS: Custom modules, dedicated support
- Gross margin: Negotiable (target 25%+ hardware, 80%+ SaaS)

---

## REVENUE PROJECTIONS (Year 1)

### Customer Acquisition Timeline

**Assumptions:**
- Current status: 0 paying customers (pre-Gate 1)
- Sales cycle: 2 weeks (discovery call → deployment)
- Deployment success rate: 95%
- Churn: 0% (first customers will stay)

**Scenario: Conservative Growth to Gate 2**

| Month | Cumulative Customers | New Customers | Notes |
|-------|----------------------|---------------|-------|
| Apr | 0 | 0 | Pre-Gate 1, sales ramp |
| May | 1 | 1 | Gate 1 unlock (1st customer) |
| Jun | 2 | 1 | Organic referral |
| Jul | 3 | 1 | Gate 2 unlock (3 customers) |
| Aug | 4 | 1 | Slow sales (Vaishak capacity constrained) |
| Sep | 5 | 1 | Gate 3 unlock (5 customers) + can hire |
| Oct–Dec | 8–10 | 3–5 | Seasonal ramp (Q4 budget spending) |

### Revenue by Gate

**Gate 1 (1 Customer, May):**
- Hardware revenue: ₹25,000
- SaaS MRR: ₹2,000
- YTD revenue: ₹25,000 (hardware) + ₹2,000 (May SaaS) = ₹27,000

**Gate 2 (3 Customers, July):**
- Cumulative hardware revenue: ₹75,000
- SaaS MRR: ₹6,000 (3 customers × ₹2K)
- YTD revenue: ₹75,000 (hardware) + ₹14,000 (May, Jun, Jul SaaS) = ₹89,000

**Gate 3 (5 Customers, Sep):**
- Cumulative hardware revenue: ₹125,000
- SaaS MRR: ₹10,000 (5 customers × ₹2K)
- YTD revenue: ₹125,000 (hardware) + ₹36,000 (May–Sep SaaS) = ₹161,000

**Year 1 Projection (10 Customers, Dec):**
- Cumulative hardware revenue: ₹250,000
- SaaS MRR (Dec): ₹20,000 (10 customers × ₹2K)
- YTD revenue:
  - Hardware: ₹250,000
  - SaaS (8 months average, ramping): ₹60,000
  - **Total Year 1:** ₹310,000

### Gross Profit by Gate

**Gate 1:**
- Hardware margin: ₹2,000 × 1 kit = ₹2,000
- SaaS margin (May): ₹1,440 × 1 = ₹1,440
- **YTD gross profit:** ₹3,440

**Gate 2:**
- Hardware margin: ₹2,000 × 3 kits = ₹6,000
- SaaS margin (May–Jul): ₹1,440 × 3 customers × 3 months avg = ₹12,960
- **YTD gross profit:** ₹18,960

**Gate 3:**
- Hardware margin: ₹2,000 × 5 kits = ₹10,000
- SaaS margin (May–Sep): ₹1,440 × 5 customers × 5 months avg = ₹36,000
- **YTD gross profit:** ₹46,000

**Year 1 Projection:**
- Hardware margin: ₹2,000 × 10 kits = ₹20,000
- SaaS margin (8 months, ramping 1→10 customers): ₹84,000
- **YTD gross profit:** ₹104,000

---

## OPERATING EXPENSES & BURN RATE

### Fixed Monthly Costs (Current, Pre-Gate 1)

| Expense | Monthly | Notes |
|---------|---------|-------|
| **Salaries** |
| Vaishak (50 hrs/week @ ₹400/hr) | ₹80,000 | Conservative (₹10L/year) |
| AI agent services | ₹0 | Amortized in product cost |
| **Cloud & Infrastructure** |
| Firebase (Blaze plan, estimate) | ₹5,000 | Scales with customers |
| Development tools, APIs | ₹2,000 | GitHub, Vercel, monitoring |
| **Sales & Marketing** |
| WhatsApp Business API | ₹1,000 | Customer communication |
| Outreach (coffee, travel) | ₹3,000 | Customer discovery |
| **Operations** |
| Office / co-working space | ₹0 | Work from home |
| Legal, accounting | ₹2,000 | Quarterly filings |
| Miscellaneous | ₹2,000 | Supplies, software |
| **TOTAL FIXED COSTS** | **₹95,000/month** | |

### Burn Rate (Pre-Gate 1 to Gate 1)

**Assumption:** 2 months to close 1st customer (Apr–May)

- Fixed costs: ₹95,000 × 2 months = ₹190,000
- Hardware COGS (1 kit): ₹23,000
- **Total burn:** ₹213,000

**Runway:** With ₹5L in pre-seed funding or founder capital, runway to Gate 1 = 28 months (generous)

### Cost Structure at 10 Customers

| Expense | Monthly |
|---------|---------|
| Vaishak salary | ₹80,000 |
| Cloud (scales) | ₹8,000 |
| Support (AI agent + partial Vaishak) | ₹10,000 |
| Sales & marketing | ₹5,000 |
| Operations | ₹4,000 |
| **Total OpEx** | **₹107,000/month** |

**Gross profit (10 customers):** ₹29,000/month (hardware) + ₹14,400 (SaaS, blended)
**Net loss (10 customers):** ₹107,000 - ₹43,400 = ₹63,600/month loss

**Implication:** At 10 customers, still burning. Need 25+ customers for break-even.

---

## UNIT ECONOMICS & PAYBACK PERIOD

### Customer Payback (Hardware + 1 Year SaaS)

**Revenue per customer (Year 1):**
- Hardware: ₹25,000
- SaaS (12 months @ ₹2,000): ₹24,000
- **Total Year 1 revenue:** ₹49,000

**Cost per customer (Year 1):**
- Hardware COGS: ₹23,000
- SaaS COGS (12 months): ₹6,720
- Allocated support cost: ₹2,000
- **Total Year 1 COGS:** ₹31,720

**Gross profit (Year 1):** ₹49,000 - ₹31,720 = **₹17,280 per customer**

**Payback period:** Year 1 gross profit = ₹17,280 (positive from month 1)

### Customer Lifetime Value (24-Month Cohort)

**Revenue (24 months):**
- Hardware: ₹25,000 (one-time)
- SaaS (24 months @ ₹2,000): ₹48,000
- Add-on (assume 30% adoption @ ₹500 × 24): ₹3,600
- **Total:** ₹76,600

**Cost (24 months):**
- Hardware COGS: ₹23,000
- SaaS COGS: ₹13,440
- Support cost (allocated): ₹4,000
- Model retraining: ₹1,200
- **Total:** ₹41,640

**Net LTV:** ₹76,600 - ₹41,640 = **₹34,960**

**LTV:CAC Ratio:**
- Assuming CAC (customer acquisition cost) = ₹4,000 (Vaishak time + marketing)
- LTV:CAC = ₹34,960 / ₹4,000 = **8.7:1** ✅ (Target: >3:1)

---

## BREAK-EVEN ANALYSIS

### When Does Ooru Logix Break Even?

**Fixed costs:** ₹107,000/month (OpEx at 10 customers)
**Contribution margin per customer:** ₹2,900/month SaaS (blended base + add-on)

**Break-even customers:** ₹107,000 / ₹2,900 = **37 customers**

**Timeline to 37 customers:**
- Conservative growth: 1 customer/month
- Timeline: 37 months from now (Dec 2028)
- **Problem:** Too long, will burn through funding

**Alternative: Lean OpEx model**
- Reduce Vaishak salary to ₹40,000 (part-time, external funding)
- Reduce cloud costs to ₹3,000
- Reduce ops to ₹2,000
- **New fixed costs:** ₹50,000/month
- **Break-even customers:** ₹50,000 / ₹2,900 = **17 customers**
- **Timeline:** 17 months (Sep 2027)

**Recommendation:** Pursue external funding post-Gate 2 to accelerate to break-even. Accept 18–24 month runway.

---

## FINANCIAL DASHBOARD (Key Metrics)

### Metrics to Track Monthly

| Metric | Target (Year 1) | Notes |
|--------|-----------------|-------|
| **Revenue** |
| MRR (SaaS) | ₹20K by Dec | Ramping 1→10 customers |
| ARR (SaaS + hardware) | ₹310K by Dec | Annualized |
| **Profitability** |
| Gross margin % | 72% (SaaS), 8% (hardware) | Hardware improves with scale |
| Gross profit | ₹104K YTD | Positive from Day 1 |
| **Customer Health** |
| CAC (Customer Acquisition Cost) | ₹4,000 | Vaishak time + marketing |
| LTV (Lifetime Value) | ₹35,000 | 24-month horizon |
| LTV:CAC ratio | 8.7:1 | ✅ Well above 3:1 target |
| Churn rate | 0–5% | Target: <5% monthly |
| NPS (Net Promoter Score) | >30 | Post-deployment satisfaction |
| **Operational** |
| Burn rate | ₹95K/month | Fixed OpEx |
| Runway | 28 months | With ₹5L capital (conservative) |
| Customers acquired | 10 by Dec | Conservative sales ramp |

---

## SCENARIO ANALYSIS

### Bull Case (Faster Growth)

**Assumptions:**
- Vaishak hired help (contractor ₹30K/month) @ Gate 2
- Customer acquisition accelerates (2–3 per month post-Gate 3)
- SaaS add-on adoption: 50% (vs 30% base case)
- Churn: 0% (strong product-market fit)

**Outcomes:**
- Customers by Year-End: 20 (vs 10 in base case)
- Year 1 revenue: ₹650K (vs ₹310K)
- Break-even timeline: 12 months (vs 18 months)
- Gross margin: ₹420K (vs ₹104K)

**Triggers for bull case:**
- Strong product-market fit signals (>80% NPS, 0% churn at Gate 2)
- Word-of-mouth growth (referrals from early customers)
- Faster deployment cycle (templates, replicable process)

### Bear Case (Slower Growth)

**Assumptions:**
- Sales cycle extends to 6 weeks per customer
- Product-market fit takes longer (requires model tuning per shop)
- SaaS add-on adoption: 10% (vs 30% base case)
- Churn: 10% monthly (customer dissatisfaction, model accuracy)

**Outcomes:**
- Customers by Year-End: 3 (vs 10 in base case)
- Year 1 revenue: ₹90K (vs ₹310K)
- Break-even timeline: 36+ months (unfeasible without additional capital)
- Gross margin: ₹30K (vs ₹104K)

**Recovery actions:**
- Pivot to higher-paying customer segment (franchisors, POS resellers)
- Reduce hardware cost via integration (OV5647 cameras vs Logitech)
- Expand ICP geographically (other Indian cities, standardized deployment)
- Partner with Khatabook/Vyapar for distribution

---

## PRICING PHILOSOPHY

### Why ₹25K for Hardware?

**Anchoring:**
- RetailNext: ₹5L+ (too high)
- Khatabook: ₹0 (app-only, no hardware)
- Pine Labs: ₹30K+ (focused on payments, not inventory)
- **Sweet spot:** ₹25K = "investment, not expense" for a ₹15L/year shop

**Justification:**
- Hardware cost: ₹23K (2% margin for flexibility)
- Perceived value: "Professional retail system" (~₹50K positioning)
- ROI window: Saves ₹2K/month waste → breaks even in 12 months
- Payment friction: Single payment (not subscription fatigue)

### Why ₹2,000/Month SaaS?

**Market comparison:**
- Khatabook: ₹0–₹499/month (but manual inventory)
- Vyapar: ₹99–₹299/month (but manual inventory)
- ShopSense: ₹2,000/month (automatic inventory + insights)
- **Value gap:** ShopSense is 5–10x more automated

**Value prop:**
- Eliminates 2–3 hours/week of manual inventory work (worth ₹1K+)
- Saves ₹2K/month in waste (ROI immediately visible)
- Provides margin analysis (unlocks pricing optimization)

**Price elasticity:**
- Too low (<₹1K): Customers don't perceive value (think it's a cheap feature)
- Too high (>₹3K): Price-sensitive chai shops balk, churn risk
- ₹2K sweet spot: Justifiable ROI, healthy margin, sustainable

---

## FUNDING & CAPITAL REQUIREMENTS

### Raise Plan

**Pre-seed (₹25–50 lakh):**
- Runway: 18–24 months to break-even
- Use for: Vaishak salary, cloud infrastructure, contractor support
- Timing: Now (pre-Gate 1)
- Dilution: 10–15% equity preferred
- Post-moneyValuation: ₹2–3 crore

**Seed (Post-Gate 3, ₹2–5 crore):**
- Use for: Sales team (1–2 BDRs), marketing, expansion to other cities
- Timing: Sep 2026 (post-5 customer milestone)
- Dilution: 15–20%
- Valuation: ₹12–25 crore

**Series A (Post-Gate 4, ₹10–25 crore):**
- Use for: Full GTM team, product engineering, IP (patents)
- Timing: 2027 (post-20 customer milestone)
- Dilution: 20–25%
- Valuation: ₹50–100 crore

---

## PROFITABILITY MILESTONES

| Milestone | Customer Count | MRR | Timeline | Action |
|-----------|---|---|---|---|
| **Gross Margin Positive** | 1 | ₹1.4K | May 2026 | Gate 1 unlock |
| **Software Contribution Positive** | 5 | ₹7K | Sep 2026 | Gate 3 unlock |
| **Break-Even (Lean OpEx)** | 17 | ₹49K | Sep 2027 | Hire sales team |
| **Profitability (Net Positive)** | 40 | ₹116K | 2028 | Series A ready |

---

## DOCUMENT VERSION

- **Version:** 1.0
- **Last Updated:** 2026-04-01
- **Owner:** Vaishak R N (vaishakrn@gmail.com)
- **Next Review:** 2026-06-01 (post-first customer deployment, validate assumptions)
- **Sensitivity Analysis:** Re-model monthly after each new customer to validate growth assumptions

