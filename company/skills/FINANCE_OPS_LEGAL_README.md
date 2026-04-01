# Finance, Operations & Legal Compliance System - Ooru Logix

**Created**: April 2026
**Status**: Complete & Ready for Use
**Document owner**: Vaishak R N (Founder)

---

## SYSTEM OVERVIEW

This comprehensive system provides Ooru Logix with enterprise-grade financial management, operations excellence, and legal compliance frameworks tailored to Indian startup regulations and the company's specific business model (hardware + SaaS + data insights).

The system is built around **4 growth gates** (1 → 3 → 5 → 20 customers) and includes actionable protocols, templates, and checklists that evolve with company maturity.

---

## FILES CREATED (7 Core Documents)

### 1. Finance Tracker Skill (₹25K/kit hardware + ₹2K/mo SaaS)

**File**: `/finance-tracker/SKILL.md` (733 lines, 25KB)

**Coverage**:
- Daily/weekly/monthly financial logging protocol
- Revenue recognition rules (hardware vs. SaaS vs. data revenue)
- Expense categorization (COGS ₹12K/kit, OpEx ₹15K/month)
- Cash flow forecasting model (3-month rolling forecast)
- Unit economics dashboard (LTV, CAC, MRR, ARR, payback, burn rate)
- Invoice generation (GST-ready numbering: OL-YYYY-MM-NNNN)
- Payment tracking (Razorpay, UPI, bank transfer)
- Monthly close checklist (3-day close cycle)
- Tax preparation (GST triggers at ₹20L, advance tax, TDS, Startup India)
- Financial reporting templates (P&L, balance sheet, cash flow, variance analysis)

**Key metrics to track**:
- MRR (Monthly Recurring Revenue): Target ₹10K by Gate 2
- Burn rate: Currently ₹500/day (₹15K/mo)
- Runway: Recalculate monthly
- Gross margin: Target >50%
- Payback period: <12 months (hardware + 2-year SaaS)

**Monthly time commitment**: 2–3 hours

---

### 2. Invoice Template

**File**: `/finance-tracker/templates/invoice-template.md` (150 lines, 4.9KB)

**Format**:
- Invoice numbering: OL-YYYY-MM-NNNN (sequential per month)
- Seller: Ooru Logix (founder's PAN until entity registered)
- Buyer: Customer legal name + GST (if applicable)
- Line items: Hardware (HSN 8471.30, 5% GST ready), SaaS (HSN 6110.90, 18% GST), Data (HSN 6110.90, 18% GST)
- Payment methods: Bank transfer, UPI, Razorpay
- Terms: Net 30
- Multi-component bundling (e.g., 2 kits + 6-month SaaS + 12-month data)

**Ready to use**: Print on letterhead or email as PDF

---

### 3. Monthly Report Template

**File**: `/finance-tracker/templates/monthly-report.md` (200 lines, 13KB)

**Sections**:
- Executive summary (revenue, expenses, burn, runway, customer count)
- Revenue by source (hardware, SaaS, data)
- Expense breakdown (COGS per category, OpEx details)
- Profitability (gross margin %, EBITDA)
- Cash flow (inflows, outflows, position, burn rate)
- Unit economics (LTV, churn rate, margin metrics)
- Receivables (invoices pending payment, collection actions)
- Variance analysis (forecast vs. actual)
- Inventory snapshot (components, finished goods, days of stock)
- Vendor updates (delivery status, quality issues, cost changes)
- Support tickets (open, resolved, SLA status)
- Customer health (churn, at-risk accounts, satisfaction)
- Actions for next month (prioritized)
- Next month forecast

**Frequency**: Monthly (due 3rd business day of following month)
**Time to complete**: 1.5–2 hours

---

### 4. Operations Manager Skill (Supply chain, QA, logistics, KPIs)

**File**: `/ops-manager/SKILL.md` (660 lines, 22KB)

**Coverage**:
- Vendor management framework (component suppliers, PCB, assembly, logistics, cloud services)
- Vendor scorecard (quality, on-time delivery, responsiveness, cost, communication)
- Supply chain protocol (reorder points, lead times, POs, inventory tracking)
- Inventory system (components, finished goods, reconciliation)
- Quality control (incoming inspection, assembled kit QA, SaaS QA)
- Logistics protocol (hardware deployment workflow, delivery tracking)
- SLA definitions (99% uptime, <4hr response, <24hr resolution)
- Incident management (categories, response protocol, escalation matrix)
- Weekly ops review (7-section template)
- KPI dashboard (deploy success >95%, MTTR <4hrs, uptime 99%, satisfaction >8/10)

**Key suppliers to establish**:
- Raspberry Pi: Pi India (lead time 3–5 days)
- Cameras: Arrow India (lead time 5–7 days)
- PCB: JLCPCB (lead time 10–14 days)
- Assembly: Local contractor (lead time 5–7 days)
- Logistics: Ecom Express (local), DHL (pan-India)

**Weekly time commitment**: 45 minutes (ops review) + ad-hoc support

---

### 5. Vendor Directory Template

**File**: `/ops-manager/templates/vendor-directory.md` (150 lines, 9.1KB)

**Includes**:
- Tier-1 & Tier-2 suppliers (primary + backup for each component)
- Component suppliers table (name, contact, lead time, MOQ, price, quality rating)
- PCB & assembly vendors
- Logistics providers (local & pan-India)
- Cloud services (AWS, monitoring)
- Professional services (accounting, legal)
- Vendor communication log
- Vendor onboarding checklist

**To fill in**: Vendor names, contact details, pricing (customized per Bangalore availability)

---

### 6. Weekly Ops Review Template

**File**: `/ops-manager/templates/weekly-ops-review.md` (150 lines, 9.7KB)

**Sections**:
- Executive summary (production, quality, deployment, support)
- Production metrics (kits built, QC pass rate, defects, rework)
- Deployment status (installations completed, issues, customer satisfaction)
- Inventory snapshot (stock levels, reorder actions)
- Vendor updates (delayed shipments, quality issues, cost changes)
- Support tickets (open, resolved, SLA breaches, recurring issues)
- Customer health (churn, at-risk accounts, satisfaction scores)
- KPI dashboard (deploy success, MTTR, uptime, satisfaction)
- Actions from last week (status tracking)
- New action items (high/medium/low priority)
- Risks & blockers (mitigation plans)
- Upcoming priorities (next week events)

**Frequency**: Weekly (Monday 10 AM IST recommended)
**Time to complete**: 30–45 min

---

### 7. Legal & Compliance Skill (Indian startup law, GST, DPDP, IP, customer agreements)

**File**: `/legal-compliance/SKILL.md` (1,084 lines, 38KB)

**Coverage**:
- Company registration roadmap (Sole Prop → LLP/Pvt Ltd conversion timeline)
- GST registration (trigger at ₹20L turnover, filing requirements, post-registration obligations)
- MSME registration (Udyam portal, benefits: priority lending, patent subsidies)
- Startup India registration (tax holiday, patent fast-tracking, regulatory relief)
- IP protection (trademark ShopSense, patent for edge AI, trade secrets)
- Customer agreements (MSA template, SaaS subscription agreement, hardware warranty)
- Privacy policy (DPDP Act 2023 compliance, camera footage handling, user rights)
- Employee compliance (PF/ESI thresholds, employment agreements, contractor vs. employee)
- Insurance (product liability ₹50L Gate 2, professional indemnity Gate 3)
- Regulatory watchlist (BIS, STQC, MEITY, RoHS/WEEE if exporting)
- Compliance calendar (quarterly deadlines, annual ITR filing)
- Legal document templates checklist

**India-specific sections**:
- DPDP Act 2023 (data privacy law)
- HSN codes for GST (hardware 8471.30, SaaS 6110.90)
- PAN requirements
- ITR filing (individual proprietor)
- TDS (tax deducted at source)
- Startup India tax holiday (3 years out of 7)
- Camera footage as personal data (DPDP implications)

**Key dates**:
- GST registration: Upon ₹20L turnover
- ITR filing: 31st July annually
- Entity incorporation: Gate 2 (₹3–5L MRR) or if pursuing funding

---

## QUICK START: BY ROLE

### Founder (Vaishak R N)
1. **Weekly**: Run ops review (30 min Monday)
2. **Monthly**: Close financials (2 hrs, 3rd business day)
3. **Quarterly**: Review KPIs, update forecast, assess compliance
4. **Annually**: File income tax (ITR), review vendor contracts

**Must-have system access**:
- Google Sheets (Finance Tracker + Ops metrics)
- Bank account online portal
- Razorpay dashboard
- Vendor contacts database

### Support Lead (when hired)
1. **Daily**: Log support tickets, track SLA compliance
2. **Weekly**: Report on ticket backlog, identify patterns
3. **Monthly**: Calculate customer satisfaction, churn analysis

### Operations Coordinator (when hired)
1. **Daily**: Inventory tracking, vendor follow-up
2. **Weekly**: Prep ops review (production metrics, vendor status)
3. **Monthly**: Reconcile inventory, prepare delivery forecasts

### Finance/Accounting Partner (CA)
1. **Monthly**: Review P&L, check expense categorization
2. **Quarterly**: Tax planning, GST reconciliation
3. **Annually**: Audit books, file income tax, plan next year

---

## IMPLEMENTATION ROADMAP

### Phase 1: Months 1–3 (Pre-revenue → Gate 1)

**Finance**:
- [ ] Set up Google Sheets with daily logging template
- [ ] Create invoice template in Canva/Word
- [ ] Establish Razorpay account (if taking payments)
- [ ] Open bank account (founder's personal initially)
- [ ] Collect first month's invoices/receipts

**Operations**:
- [ ] Identify 2–3 primary component suppliers
- [ ] Establish assembly partner relationship
- [ ] Document QC checklist (incoming + post-assembly)
- [ ] Set up SLA template for customer agreements

**Legal**:
- [ ] Draft customer MSA (with CA support)
- [ ] Create privacy policy (DPDP-ready template)
- [ ] Maintain business records (invoices, receipts, agreements)
- [ ] Research trademark availability (ShopSense)

**Effort**: 40 hours (founder focus)

---

### Phase 2: Months 4–6 (Gate 1: 1st customer → Gate 2: 3 customers)

**Finance**:
- [ ] Complete first monthly report
- [ ] Prepare month 3 P&L projection
- [ ] Analyze unit economics (LTV, payback)
- [ ] Identify cost optimization opportunities

**Operations**:
- [ ] Standardize production workflow
- [ ] Begin weekly ops reviews
- [ ] Build vendor scorecard
- [ ] Plan inventory management system

**Legal**:
- [ ] Register for Udyam (MSME) – FREE, 15 min
- [ ] File Sole Proprietorship with municipality – ₹1K, 2 weeks
- [ ] Finalize customer agreements (get 1st customer to sign)
- [ ] Research GST registration process (prep for ₹20L threshold)

**Effort**: 60 hours (shared with operations partner if any)

---

### Phase 3: Months 7–12 (Gate 2: 3 customers → Gate 3: 5 customers + ₹100K revenue)

**Finance**:
- [ ] File GST registration (if ₹20L turnover achieved)
- [ ] Set up monthly GSTR filing process
- [ ] Complete 6-month P&L + cash flow
- [ ] Build 3-month rolling forecast model
- [ ] Prepare for annual ITR filing (Dec planning)

**Operations**:
- [ ] Hire part-time operations coordinator (₹15–20K/month)
- [ ] Implement inventory tracking system (spreadsheet or simple software)
- [ ] Establish logistics partnership (negotiate volume discounts)
- [ ] Document 2nd assembly batch (identify improvements)

**Legal**:
- [ ] Apply for Startup India registration (if incorporating or planning to)
- [ ] File trademark application (ShopSense) – ₹27K, 12–18 month process
- [ ] Engage CA for quarterly GST reconciliation
- [ ] Consider product liability insurance – ₹5–10K/year (Gate 2 trigger)

**Effort**: 80 hours (mix of founder + hired support)

---

### Phase 4: Year 2 (Gate 3: 5 customers → Gate 4: 20 customers, ₹13.3L revenue)

**Finance**:
- [ ] Implement formal accounting software (Wave/Tally/Zoho)
- [ ] Monthly closing: 1.5 hours
- [ ] Quarterly cash flow analysis + variance review
- [ ] Plan tax strategy (Startup India tax holiday if eligible)

**Operations**:
- [ ] Transition to full-time support engineer (₹25–35K/month)
- [ ] Implement ticketing system (Jira/Zendesk)
- [ ] Scale production (negotiate multi-supplier strategy)
- [ ] Build customer success playbook (reduce churn <5%)

**Legal**:
- [ ] Convert to LLP/Pvt Ltd (if funding round or >5 employees) – ₹10–15K
- [ ] Implement data protection officer role (DPDP requirement post-Gate 2)
- [ ] Professional indemnity insurance – ₹8–12K/year
- [ ] Annual compliance calendar (GST, ITR, MSME renewal)

**Effort**: 120 hours/year (professional team in place)

---

## COMPLIANCE TIMELINE (Ooru Logix FY: April 1 – March 31)

| Date | Action | Owner | Cost | Notes |
|------|--------|-------|------|-------|
| Monthly (11th) | GSTR-1 (if GST registered) | Finance | ₹0 | Post-GST filing |
| Monthly (20th) | GSTR-3B (if GST registered) | Finance | ₹0 | Post-GST filing |
| Monthly (3rd) | Financial close & monthly report | Finance | ₹0 | Internal |
| Quarterly | Ops review + KPI analysis | Ops | ₹0 | Weekly review compiled |
| Quarterly | Tax planning review | Finance/CA | ₹2K | If engaging CA |
| 31-Jul | Income tax return (ITR) filing | Finance/CA | ₹1–2K | ITR-1 (individual) or ITR-2 (business) |
| 31-Dec | GSTR-9 (if GST registered) | Finance | ₹0 | Annual GST reconciliation |
| Annually | Vendor contract renewal | Ops | ₹0 | Q1 review |
| Annually | Insurance renewal | Finance | ₹5–10K | Product liability (Gate 2+) |

---

## TEMPLATES QUICK REFERENCE

### Finance Templates
1. **Invoice template** (`/templates/invoice-template.md`): Copy, fill in customer & items, email as PDF
2. **Monthly report** (`/templates/monthly-report.md`): Fill with actual numbers each month; track variances
3. **Purchase order** (in SKILL.md Section 2): Use for vendor orders, track in inventory log

### Operations Templates
1. **Vendor directory** (`/templates/vendor-directory.md`): Maintain active list of suppliers with contact info
2. **Weekly ops review** (`/templates/weekly-ops-review.md`): Run every Monday, 30–45 min meeting
3. **QC checklist** (in SKILL.md Section 4): Print & use for each kit assembly

### Legal Templates
1. **MSA** (in SKILL.md Section 5): Customize for each customer; get signed before delivery
2. **Privacy Policy** (in SKILL.md Section 6): Share with customers; mention camera footage explicitly
3. **Employment agreement** (in SKILL.md Section 7): Use when hiring first employee (Gate 2)

---

## KEY METRICS DASHBOARD

**Update weekly** (for ops) and monthly (for board/stakeholder review):

```
CASH & RUNWAY
  Cash on hand: ₹[X] (updated 2x/week from bank)
  Monthly burn: ₹[X] (rolling 3-month average)
  Runway (months): [X.X]
  Status: Red (<3 mo) / Yellow (3–6 mo) / Green (>6 mo)

REVENUE & GROWTH
  MRR (Monthly Recurring Revenue): ₹[X]
    - SaaS customers: [Qty] × ₹2K = ₹[X]
    - Data contracts: [Qty] × ₹500 = ₹[X]
  Hardware YTD: ₹[X] ([Qty] kits @ ₹25K)
  Total YTD revenue: ₹[X]
  Target for FY: ₹13.3L

CUSTOMER METRICS
  Total customers: [Qty] (progress to Gate [X])
  New this month: [Qty]
  Churn: [Qty] / [Churn rate %] (target <5%)
  Satisfaction: [X]/10

OPERATIONS
  Deploy success rate: [X]% (target >95%)
  MTTR (mean time to resolve): [X] hours (target <4)
  SaaS uptime: [X]% (target 99%)
  Inventory days: [X] (target 7–10)

UNIT ECONOMICS
  LTV (Lifetime Value): ₹[X] per customer (target >₹50K)
  Payback period: [X] months (target <12)
  Gross margin: [X]% (target >50%)
  CAC (when spend >₹2K/mo): ₹[X] (target <₹5K)
```

---

## SYSTEM EVOLUTION WITH GATES

### Gate 1 (1st customer, ₹25K+ hardware order)
- Unlock: Foundational confidence in product-market fit
- Finance: Invoice issued, payment received, basic P&L
- Operations: 1st kit assembled & deployed, SLA activated
- Legal: Customer agreement signed, privacy policy provided

### Gate 2 (3 customers, ₹100K+ revenue)
- Unlock: Hiring budget (part-time support engineer)
- Finance: Monthly close cycle, unit economics clear, MRR ₹6K+
- Operations: Weekly ops review, vendor relationships solidified, QC formalized
- Legal: Sole Proprietorship registered, Udyam MSME registered, product liability insurance

### Gate 3 (5 customers, ₹150K+ revenue)
- Unlock: Infrastructure scaling (cloud, support, operations team)
- Finance: GST registration (if ₹20L+ turnover), professional accounting
- Operations: Dedicated ops coordinator hired, KPI dashboard active
- Legal: Consider LLP/Pvt Ltd conversion if funding planned, professional indemnity insurance

### Gate 4 (20 customers, ₹13.3L+ revenue, 1+ year operation)
- Unlock: Series A funding, market expansion, formal leadership
- Finance: CFO-level reporting, multi-scenario forecasting, tax optimization
- Operations: Scaled team (2–3 FTE), automated systems (ticketing, inventory)
- Legal: Formal entity (LLP/Pvt Ltd), Startup India tax holiday, comprehensive IP portfolio

---

## COMMON MISTAKES TO AVOID

1. **Finance**: Not recognizing SaaS revenue as prepaid customers pay (use deferred revenue journal entry)
2. **Finance**: Mixing personal & business expenses (maintain separate records from Day 1)
3. **Finance**: Forgetting to record customer payments received on UPI (check bank statement 2x/week)
4. **Operations**: Single supplier dependency (maintain backup for critical components)
5. **Operations**: Shipping kit without final QC test (use checklist; test every unit)
6. **Legal**: Operating without customer agreement (use MSA template; get signature before delivery)
7. **Legal**: Ignoring camera footage privacy (explicitly mention in Privacy Policy; get customer consent)
8. **Legal**: Failing to track tax deadlines (mark calendar: ITR due 31-Jul, GST monthly, Startup India renewal)

---

## SUPPORT & ESCALATION

**Questions on Finance**:
- Contact: Chartered Accountant (recommended: Bangalore-based startup CA)
- Cost: ₹5–10K/month retainer or ₹1–2K/hour
- When: Monthly review, quarterly tax planning, annual ITR filing

**Questions on Operations**:
- Contact: Vendor directory (established suppliers); internal ops lead
- When: Weekly ops review, incident escalation, vendor issues

**Questions on Legal/Compliance**:
- Contact: Startup lawyer + CA (specialized in GST, data privacy)
- Cost: ₹3–5K/hour or ₹25–50K for document package (MSA, Privacy Policy, Employment agreement)
- When: Customer agreement review, GST registration, entity conversion, IP filing

**Emergency support** (downtime, SLA breach, legal issue):
- Escalate to founder immediately
- Consult vendor directory for emergency suppliers (backup)
- Call CA/lawyer same day

---

## DOCUMENT VERSION CONTROL

| File | Version | Last Updated | Status |
|------|---------|---|---|
| Finance Tracker SKILL | 1.0 | Apr-2026 | Active |
| Invoice Template | 1.0 | Apr-2026 | Active |
| Monthly Report Template | 1.0 | Apr-2026 | Active |
| Ops Manager SKILL | 1.0 | Apr-2026 | Active |
| Vendor Directory Template | 1.0 | Apr-2026 | Active (fill in) |
| Weekly Ops Review Template | 1.0 | Apr-2026 | Active |
| Legal & Compliance SKILL | 1.0 | Apr-2026 | Active |

**Review schedule**: Quarterly (end of each quarter: July, Oct, Jan, Apr)

---

## NEXT STEPS (This Week)

1. [ ] Read through all 7 files (skim at minimum)
2. [ ] Customize invoice template with Ooru Logix details (bank, UPI, address)
3. [ ] Fill in vendor directory with actual supplier contacts (finalize by next ops review)
4. [ ] Schedule weekly ops review (Monday 10 AM IST)
5. [ ] Share invoice template with first customer (for next order)
6. [ ] Get MSA template reviewed by CA or startup lawyer (₹2–3K investment)
7. [ ] Set reminders for GST registration trigger (when approaching ₹20L turnover)

---

**System created for**: Ooru Logix (Bangalore, AI-native startup)
**By**: Claude Code (Anthropic AI)
**For**: Vaishak R N (Founder)
**Date**: April 1, 2026

---

## APPENDIX: FILE STRUCTURE

```
/company/skills/
├── finance-tracker/
│   ├── SKILL.md (733 lines, 25KB) - Core finance system
│   └── templates/
│       ├── invoice-template.md (150 lines, 4.9KB)
│       └── monthly-report.md (200 lines, 13KB)
├── ops-manager/
│   ├── SKILL.md (660 lines, 22KB) - Core operations system
│   └── templates/
│       ├── vendor-directory.md (150 lines, 9.1KB)
│       └── weekly-ops-review.md (150 lines, 9.7KB)
└── legal-compliance/
    └── SKILL.md (1,084 lines, 38KB) - Legal & compliance system
```

**Total**: 7 files, 2,477 lines, ~121KB
**Complete system ready for production use**

