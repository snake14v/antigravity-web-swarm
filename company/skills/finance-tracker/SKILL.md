# Finance Tracker Skill - Ooru Logix

## Overview
This skill manages daily, weekly, and monthly financial operations for Ooru Logix, including revenue tracking, expense management, cash flow forecasting, and tax compliance for an Indian pre-revenue startup.

**Company Profile:**
- Bootstrapped pre-revenue startup (Bangalore-based)
- Revenue model: Hardware (₹25K/kit) + SaaS (₹2K/month) + Data insights (₹500/month)
- Year 1 target: ₹13.3L revenue, 20 customers
- Currently operating under founder's personal account (banking)
- GST registration threshold: ₹20L annual turnover
- Monthly burn rate: ~₹15K (cloud, domains, tools, transport, misc)

---

## 1. DAILY FINANCIAL LOGGING PROTOCOL

### Daily Check-in (5 minutes)
Every business day, log:
- **Orders received** (hardware orders, SaaS signups, data contracts)
- **Payments received** (UPI, bank transfer, Razorpay)
- **Expenses incurred** (any invoices, receipts, reimbursements)
- **Cash position** (bank balance snapshot)

### Entry Format
```
Date: YYYY-MM-DD
Time: HH:MM

REVENUE TODAY:
- Hardware orders: [Qty] kits × ₹25,000 = ₹[Total]
- SaaS activations: [Qty] customers × ₹2,000/month = ₹[MRR increase]
- Data insights: [Qty] contracts × ₹500/month = ₹[MRR increase]
- Other: [Description] = ₹[Amount]
Total Today: ₹[X]

EXPENSES TODAY:
- [Category]: [Description] = ₹[Amount]
Total Today: ₹[X]

CASH RECEIVED TODAY: ₹[X]
Bank balance (updated): ₹[X]
Running balance (month-to-date): ₹[X]
```

### Tools & Platforms
- **Primary logging**: Google Sheets (Finance Tracker tab)
- **Payment tracking**: Razorpay dashboard (for online payments)
- **Bank reconciliation**: Online banking portal
- **Backup**: Monthly export to CSV for audit trail

---

## 2. REVENUE RECOGNITION RULES

### Hardware Revenue (ShopSense Kit @ ₹25,000)
- **Recognition point**: When kit is delivered AND customer accepts/signs receipt
- **Cash vs. Accrual**: Log as accrual when order confirmed, adjust if payment delayed
- **Multiple units**: Each kit = 1 revenue line
- **Bundled sales**: If kit + SaaS combo sold, split revenue proportionally (₹25K hardware + ₹2K × N months SaaS)
- **Returns/Cancellations**: Reverse entry immediately; document reason in memo

### SaaS Revenue (₹2,000/month per customer)
- **Recognition point**: On subscription activation (first payment or when service goes live)
- **Billing cycle**: Monthly, preferably on same date each month (e.g., 1st of month)
- **MRR tracking**: Keep running tally of active subscribers × ₹2,000
- **Churn**: When customer cancels, remove from MRR immediately
- **Upgrades/Add-ons**: Any increase in monthly commitment = revenue recognition immediately

### Data Insights Revenue (₹500/month per customer)
- **Recognition point**: When data sharing agreement signed and API access provisioned
- **Reporting**: Separate line from SaaS (track as distinct revenue stream)
- **Frequency**: Can be standalone or bundled with SaaS (document at point of sale)

### Deferred Revenue
- If customer pays for 3 or 6 months in advance:
  - Record as "Deferred SaaS Revenue" liability when payment received
  - Recognize monthly as service is delivered
  - Only recognize hardware revenue in the month delivered

### Example Entries
```
2026-04-15 - Customer ABC ordered 2 kits + 6-month SaaS
Order value: (2 × ₹25,000) + (6 × ₹2,000) = ₹62,000
Entry: Accrual revenue ₹62,000
  - Hardware revenue: ₹50,000 (when delivered)
  - Deferred SaaS revenue: ₹12,000 (recognize ₹2,000/month over 6 months)

2026-04-20 - Customer ABC kits delivered
Entry: Recognize hardware revenue ₹50,000
Entry: Recognize SaaS revenue ₹2,000 (first month)
```

---

## 3. EXPENSE CATEGORIZATION

### Cost of Goods Sold (COGS) - Direct costs per kit
| Item | Cost | Notes |
|------|------|-------|
| Raspberry Pi 4 (2×) | ₹4,000 | ~₹2K each from distributor |
| Camera modules (4×) | ₹3,200 | ~₹800 each, stock qty = 20 |
| Power supplies, cables | ₹1,200 | Bulk orders to reduce cost |
| Custom PCB | ₹2,000 | Per 50-unit batch |
| Case/assembly labor | ₹1,600 | Outsourced to contract assembler |
| **Total BOM** | **~₹12,000** | **Target: <₹12K/kit** |

Track COGS in real-time: maintain running inventory cost for kits produced vs. sold.

### Operating Expenses (OpEx)

#### Cloud & Infrastructure (₹2,000/month)
- AWS/GCP compute: ~₹1,200/month
- Database/storage: ~₹400/month
- Monitoring tools: ~₹400/month
- **Action**: Review monthly spend; optimize if >₹2,500

#### Tools & Software (₹3,000/month)
- Domain names: ₹500/month (xgo3d.com + ooru.ai TLDs)
- Project management: ₹1,500/month (Jira, Figma, Notion)
- Communication: ₹500/month (Slack, Twilio)
- Analytics/tracking: ₹500/month (Mixpanel, Segment)
- **Action**: Audit quarterly; cancel unused tools

#### Sales & Marketing (₹2,000/month after scaling)
- Currently bootstrapped (₹0); allocate when MRR >₹10K
- Social media/content: ₹1,000/month
- Sales collateral: ₹500/month
- Demo/POC costs: ₹500/month

#### Transport & Logistics (₹2,000/month)
- Local delivery (Bangalore): ₹800/month
- Long-distance shipment: ₹1,000/month
- Packaging materials: ₹200/month
- **Action**: Negotiate rates once customers >5

#### Employee/Contractor (₹0 currently, trigger at Gate 2)
- First hire: Part-time developer or support engineer
- Threshold: Once MRR >₹20K (3+ customers)
- Salary band: ₹15K–₹30K/month (depends on role)
- Compliance: PF/ESI thresholds kick in at ₹0.5L/month gross payroll

#### R&D (₹5,000/month)
- Hardware R&D: Component testing, PCB iterations
- Software R&D: AI/ML model improvements, new features
- Testing & validation: Quality assurance materials
- Research subscriptions: Industry reports, patent databases

#### Admin & Miscellaneous (₹2,500/month)
- GST compliance software: ₹500/month
- Accounting tools: ₹700/month
- Office space (shared): ₹1,000/month
- Meals, transportation, contingency: ₹300/month

### Expense Log Template
```
Date: YYYY-MM-DD
Category: [COGS / Cloud / Tools / Transport / R&D / Admin]
Description: [Invoice # / Vendor / Item]
Amount: ₹[X]
Payment method: [UPI / Bank / Card]
Receipt/Invoice attached: [Y/N - filename]
Notes: [Vendor name, qty, unit cost if bulk]
```

### Monthly Expense Caps (Trigger alerts if exceeded)
- Cloud: ₹2,500 (12% buffer)
- Tools: ₹3,300 (10% buffer)
- Transport: ₹2,500 (25% buffer - can spike)
- R&D: ₹5,500 (10% buffer)
- **Total monthly budget: ₹16,500** (allows ₹1,500 contingency)

---

## 4. CASH FLOW FORECASTING MODEL

### 3-Month Rolling Forecast
Update monthly with actuals; project 3 months forward.

**Template:**
```
Cash Flow Forecast - April-June 2026

APRIL 2026 (Actual / Forecast)
Opening balance: ₹[X]
  + Hardware sales: [Qty] kits × ₹25K = ₹[X]
  + SaaS MRR: [Qty] customers × ₹2K = ₹[X]
  + Data revenue: [Qty] × ₹500 = ₹[X]
  + Other income (interest, refunds): ₹[X]
  = Total cash inflow: ₹[X]

  - COGS paid: ₹[X] (component purchases)
  - Cloud/infra: ₹[X]
  - Tools/software: ₹[X]
  - Transport: ₹[X]
  - R&D: ₹[X]
  - Admin/misc: ₹[X]
  - Tax payments: ₹[X] (if any advance tax due)
  = Total cash outflow: ₹[X]

Ending balance: ₹[X]
Burn rate (daily): ₹[X ÷ 30]
Runway (months): [Ending balance ÷ daily burn]

Assumptions:
- Payment terms: 30% hardware sales arrive next month (on credit)
- SaaS: 90% of MRR collected monthly; 10% churn
- Expenses: Consistent with prior month ±5%
- Cash not spent on working capital/components
```

### Scenario Modeling
Maintain three scenarios:
1. **Base case** (₹10K–15K MRR by Q3)
2. **Optimistic** (₹25K MRR by Q3, assuming 5 enterprise customers)
3. **Pessimistic** (₹5K MRR, churn, delayed payments)

---

## 5. UNIT ECONOMICS DASHBOARD

### Key Metrics to Track

#### Customer Acquisition Cost (CAC)
```
CAC = (Sales & Marketing spend per month) / (New customers acquired)
Target: <₹5,000/customer (since bootstrapped, currently N/A)
Calculation: Once Sales & Marketing spend >₹2K/month
```

#### Lifetime Value (LTV)
```
LTV = (Average hardware sale) + (Average SaaS MRR per customer × expected lifetime) + (Data revenue)
Assumption: 24-month customer lifetime
LTV = ₹25,000 + (₹2,000 × 24) + (₹500 × 24) = ₹85,000 per customer
Target LTV:CAC ratio >3:1
```

#### Gross Margin per Kit
```
Gross margin = (Hardware price - BOM cost - assembly labor) / Hardware price
= (₹25,000 - ₹12,000) / ₹25,000 = 52%
Target: >50%
```

#### Monthly Recurring Revenue (MRR)
```
MRR = (Active SaaS customers × ₹2,000) + (Data contracts × ₹500)
Track weekly; report monthly
Churn rate = (Customers lost) / (Customers at start of month)
Target: Churn <5% (industry benchmark 3–7%)
```

#### Annual Recurring Revenue (ARR)
```
ARR = MRR × 12
Example: 5 SaaS customers = ₹10K MRR = ₹120K ARR
```

#### Burn Rate & Runway
```
Burn rate = (Monthly expenses - MRR) / 1 month
Example: ₹15K expenses - ₹10K MRR = ₹5K burn/month
Runway = Available cash / Burn rate
If cash = ₹75K and burn = ₹5K: Runway = 15 months
```

#### Payback Period
```
Payback period = Hardware kit cost / Monthly SaaS/Data revenue per customer
= ₹25,000 / ₹2,500 = 10 months
Target: <12 months (healthy for B2B SaaS + hardware)
```

### Dashboard Updates
- **Weekly**: MRR, new customers, payment status
- **Monthly**: All metrics; variance analysis vs. forecast
- **Quarterly**: LTV, CAC, payback period; compare to plan

---

## 6. INVOICE GENERATION PROTOCOL

### Invoice Numbering Scheme
- Format: **OL-YYYY-MM-NNNN**
  - OL: Ooru Logix prefix
  - YYYY-MM: Year-month of issue
  - NNNN: Sequential number (0001, 0002, etc.)
- Example: OL-2026-04-0001 (first invoice in April 2026)
- Maintained in master log to prevent duplicates

### Mandatory Invoice Fields (Per Indian GST rules)
Even pre-GST registration, maintain GST-compliant format:
- Invoice number & date
- Seller: Ooru Logix (owner: Vaishak R N) / FOUNDER's PAN (if available)
- Seller's address: Bangalore
- Buyer: Customer name, address, GST (if applicable)
- Item details: Description, HSN code (for GST readiness), Qty, Unit price, Tax treatment
- Payment terms: Net 30 (typical for B2B) or prepaid
- Bank details: Founder's account (until entity registered)
  - Account holder: Vaishak R N
  - Bank: [Insert details]
  - IFSC: [Insert]
  - UPI: [Insert if available]

### Multi-component Invoicing

**Example: Mixed order (Hardware + SaaS + Data)**
```
Invoice OL-2026-04-0025
Customer: ABC Retail Pvt Ltd, Bangalore

Line items:
1. ShopSense Hardware Kit (2 units)
   HSN 8471.30 | Qty: 2 | Unit: ₹25,000 | Subtotal: ₹50,000
   Tax: N/A (pre-GST)

2. SaaS Annual Subscription (12 months)
   HSN 6110.90 | Qty: 1 | Unit: ₹24,000 | Subtotal: ₹24,000
   Tax: N/A (pre-GST)

3. Data Insights (12 months)
   HSN 6110.90 | Qty: 1 | Unit: ₹6,000 | Subtotal: ₹6,000
   Tax: N/A (pre-GST)

Total: ₹80,000
Payment due: Net 30 from date of invoice
```

### Invoice Storage & Numbering Log
Maintain in spreadsheet:
| Invoice # | Date | Customer | Amount | Service Type | Payment Status | Date Paid | Notes |
|-----------|------|----------|--------|--------------|----------------|-----------|-------|
| OL-2026-04-0001 | 2026-04-05 | Customer A | ₹50,000 | Hardware + SaaS | Paid | 2026-04-10 | 2 kits |

---

## 7. PAYMENT TRACKING & RECONCILIATION

### Payment Methods Supported

#### Razorpay (Primary for online)
- **Setup**: Business account (link to founder's PAN)
- **Settlement**: Daily to founder's bank account
- **Fees**: 1.96% + ₹0 (for payments <₹100K)
- **Process**:
  1. Customer pays via Razorpay link
  2. Log payment ID in invoice tracker
  3. Reconcile daily: Razorpay dashboard vs. bank statement
  4. Record in finance tracker: date, amount, customer, Razorpay ref
- **Advantages**: Automated reconciliation, instant settlement

#### UPI (Direct transfer)
- **Setup**: Founder's UPI ID (e.g., vaishak@upi or personal number)
- **Recording**: Manual entry required
  - Timestamp of UPI transfer
  - Customer reference (UTR if available)
  - Amount, net of any bank fees
- **Reconciliation**: Check banking app; cross-reference invoice #
- **Frequency**: Check 2–3x daily during business hours

#### Bank Transfer (NEFT/RTGS)
- **Setup**: Founder's bank account details on invoice
- **Timing**: NEFT = 1 hour; RTGS = instant; typically next day settlement
- **Recording**:
  - Log request when customer confirms transfer
  - Verify in bank statement (online portal)
  - Update invoice status to "Paid" with bank ref # (UPI-ref or NEFT ID)
- **Reconciliation**: Monthly bank statement vs. invoice log

### Payment Status Workflow
```
Invoice issued → Payment expected by [Date]
  ├─ Paid (date & method logged)
  ├─ Partial (% received, balance due date)
  ├─ Pending (within 7 days of due date)
  ├─ Overdue (>7 days; trigger payment reminder)
  └─ Disputed (customer claims issue; investigate)

Action items:
- Pending >7 days: Send reminder email + follow-up call
- Overdue >30 days: Escalate; may impact service delivery
- Bad debt >90 days: Consider write-off (post-GST setup)
```

### Monthly Payment Reconciliation

**Procedure** (do 2–3 days after month-end):
1. Export invoice log (all invoices issued in month)
2. Export Razorpay settlement report
3. Check bank statement (all deposits)
4. Reconcile:
   - All invoices accounted for (issued + paid + pending)
   - No duplicate payments
   - Amounts match invoice values
   - Payment dates reasonable (no >90 day gaps)
5. Document discrepancies (investigate and resolve)
6. Sign off on monthly reconciliation (founder)

---

## 8. MONTHLY CLOSE CHECKLIST

**Due date: 3rd business day of following month**

- [ ] Collect all receipts/invoices (expenses)
- [ ] Reconcile bank statement vs. cash log
- [ ] Review revenue recognition (hardware delivered? SaaS active?)
- [ ] Update MRR, ARR, burn rate
- [ ] Reconcile Razorpay/payment platforms
- [ ] Review invoice log; follow up on overdue payments
- [ ] Categorize all expenses (COGS, OpEx, R&D, etc.)
- [ ] Update 3-month cash flow forecast
- [ ] Calculate unit economics (CAC, LTV, payback)
- [ ] Prepare preliminary P&L (simple: Revenue - Expenses)
- [ ] Flag any unusual transactions or variances
- [ ] Document in monthly report (see template)
- [ ] Schedule founder review (30 min discussion)

**Time estimate: 2–3 hours/month**

---

## 9. TAX PREPARATION & COMPLIANCE

### Current Status (Pre-GST)
- Entity: Unregistered (operating as founder's personal business)
- Tax ID: Founder's PAN (10-digit)
- GST: Not applicable until turnover >₹20L
- Advance tax (Quarterly): Not required (no income yet)

### GST Registration Trigger
**When annual turnover crosses ₹20L (or ₹10L in specific states):**
1. Apply for GST registration at GST portal (gst.gov.in)
2. Required docs:
   - PAN (Aadhar optional if PAN available)
   - Bank account proof
   - Address proof (lease/utility bill)
   - Turnover certificate (self-declaration acceptable)
3. Process time: 3–5 business days
4. Cost: FREE
5. **Action item**: Set up GST-compliant invoicing from Day 1 (use HSN codes, tax fields)

### GST Tax Calculation (Post-registration)
- **Hardware (Devices, Components)**: 5% GST under HSN 8471.30
  - Selling price: ₹25,000
  - GST @ 5%: ₹1,250
  - **Invoice total**: ₹26,250
- **SaaS (Cloud services)**: 18% GST under HSN 6110.90
  - Selling price: ₹2,000/month
  - GST @ 18%: ₹360
  - **Invoice total**: ₹2,360/month
- **Data Services**: 18% GST under HSN 6110.90
  - Selling price: ₹500/month
  - GST @ 18%: ₹90
  - **Invoice total**: ₹590/month

**Input Tax Credit (ITC)**: Once registered, eligible for ITC on purchased components, software, cloud services (must have GST invoice from vendor).

### Tax Calendar (Post-GST Registration)

| Quarter | Filing | Due Date | What | Form |
|---------|--------|----------|------|------|
| Q1 (Apr–Jun) | GSTR-1 | 11th July | Sales | GST portal |
| Q1 | GSTR-3B | 20th July | Tax liability | GST portal |
| Q2 (Jul–Sep) | GSTR-1 | 11th Oct | Sales | GST portal |
| Q2 | GSTR-3B | 20th Oct | Tax liability | GST portal |
| Q3 (Oct–Dec) | GSTR-1 | 11th Jan | Sales | GST portal |
| Q3 | GSTR-3B | 20th Jan | Tax liability | GST portal |
| Q4 (Jan–Mar) | GSTR-1 | 11th Apr | Sales | GST portal |
| Q4 | GSTR-3B | 20th Apr | Tax liability | GST portal |
| Yearly | GSTR-9 | 31st Dec | Annual return | GST portal |

**Simplified: Monthly SaaS charges are GST-liable; hardware may have lower GST if classified as electronics device.**

### TDS (Tax Deducted at Source)
- **Not applicable** unless Ooru Logix acts as service provider to govt/large corporate
- **Recipient of TDS** (if contractor/vendor paid >₹30K/month):
  - Vendor must provide TDS certificate (Form 16A)
  - Claim in personal taxes (if founder's name on payment)
  - Once entity registered, claim via corporate return

### Income Tax Planning (Founder)
- **Filing**: Annual return (ITR) due 31st July (or 30th Sept if audit required)
- **Proof of income**: Invoices, bank statements, GST filings (post-registration)
- **Deductions available**:
  - Office space (rent/lease)
  - Utilities (electricity, internet)
  - Cloud services
  - Travel, meals (if documented)
  - Home office (prorated electricity, rent)
  - Professional fees (CA, legal)
- **Advance tax**: File quarterly if expected tax >₹10K/quarter
  - Calculation: (Estimated profit × tax rate) - Credits
  - Due: 15th Jun, 15th Sep, 15th Dec, 15th Mar

### Startup India Benefits (Register if eligible)
- **Eligibility**: Incorporated entity, <3 years old, turnover <₹25Cr, engaged in innovation
- **Benefits**:
  - Self-certification for labor/environmental laws
  - Reduced patent/trademark filing fees
  - Tax holiday on profits (1st 3 years)
  - Government grants/accelerator access
- **Action**: Apply post-entity registration (LLP or Pvt Ltd)

### MSME Registration (Udyam)
- **Eligibility**: Once investment in plant/machinery >₹1Cr or turnover <₹50Cr
- **Benefits**:
  - Priority sector lending (lower interest rates)
  - Credit guarantee scheme
  - Subsidy on patent/IS certification
  - E-bidding access to govt tenders
- **Action**: Consider if seeking bank loans (trigger: Gate 2, ₹3–5L funding)

---

## 10. FINANCIAL REPORTING TEMPLATES

### Simplified Profit & Loss (Monthly)

**Ooru Logix Financial Summary - [Month Year]**

```
REVENUE
  Hardware sales: ₹[X] ([Qty] kits)
  SaaS recurring: ₹[X] ([Qty] customers × ₹2K)
  Data insights: ₹[X] ([Qty] contracts × ₹500)
  Other revenue: ₹[X]
────────────────────
TOTAL REVENUE: ₹[X]

COST OF GOODS SOLD
  Component purchases: ₹[X]
  Assembly/labor: ₹[X]
────────────────────
TOTAL COGS: ₹[X]

GROSS PROFIT: ₹[X] ([X]% margin)

OPERATING EXPENSES
  Cloud & infrastructure: ₹[X]
  Tools & software: ₹[X]
  Transport & logistics: ₹[X]
  R&D: ₹[X]
  Sales & marketing: ₹[X]
  Admin & miscellaneous: ₹[X]
────────────────────
TOTAL OPEX: ₹[X]

EBITDA (Operating profit): ₹[X]
Depreciation/Amortization: ₹[X]
Interest/Other: ₹[X]
────────────────────
NET PROFIT/LOSS: ₹[X]

KEY METRICS
  MRR: ₹[X]
  ARR: ₹[X] (annualized MRR)
  Burn rate: ₹[X]/day
  Runway: [X] months
  CAC: ₹[X] (if sales spend >0)
  LTV: ₹[X] (estimated)
  Gross margin: [X]%
```

### Simplified Balance Sheet (Quarterly)

**Ooru Logix Balance Sheet - [Quarter]**

```
ASSETS
  Cash in bank: ₹[X]
  Receivables (pending invoices): ₹[X]
  Inventory (components): ₹[X]
  Inventory (finished kits): ₹[X]
  Equipment & assets: ₹[X]
────────────────────
TOTAL ASSETS: ₹[X]

LIABILITIES
  Payables (vendor invoices due): ₹[X]
  Deferred revenue (prepaid SaaS): ₹[X]
  Other liabilities: ₹[X]
────────────────────
TOTAL LIABILITIES: ₹[X]

EQUITY
  Founder's capital contributed: ₹[X]
  Retained earnings (P&L): ₹[X]
────────────────────
TOTAL EQUITY: ₹[X]

CHECK: Assets = Liabilities + Equity
```

### Cash Flow Statement (Monthly)

**Ooru Logix Cash Flow - [Month Year]**

```
OPERATING ACTIVITIES
  Cash from customers: ₹[X]
  Cash from SaaS/data: ₹[X]
  Less: Payments to vendors (COGS): ₹([X])
  Less: Operating expenses paid: ₹([X])
  Less: Taxes paid: ₹([X])
────────────────────
NET OPERATING CASH FLOW: ₹[X]

INVESTING ACTIVITIES
  Equipment/asset purchases: ₹([X])
  Research & development: ₹([X])
────────────────────
NET INVESTING CASH FLOW: ₹([X])

FINANCING ACTIVITIES
  Founder's capital contributed: ₹[X]
  Founder's drawings: ₹([X])
────────────────────
NET FINANCING CASH FLOW: ₹[X]

NET CHANGE IN CASH: ₹[X]
Opening cash balance: ₹[X]
Closing cash balance: ₹[X]
```

### Variance Analysis (Monthly vs. Forecast)

```
REVENUE
                    Forecast  Actual    Variance   %
Hardware            ₹[X]      ₹[X]      ₹[X]       [X]%
SaaS                ₹[X]      ₹[X]      ₹[X]       [X]%
Data                ₹[X]      ₹[X]      ₹[X]       [X]%
────────────────────────────────────────────────────
Total revenue       ₹[X]      ₹[X]      ₹[X]       [X]%

KEY VARIANCE DRIVERS:
- [If revenue <forecast]: Lower-than-expected customer sign-ups
- [If revenue >forecast]: Earlier-than-expected hardware order
- [If COGS >forecast]: Component price increase or higher defect rate
- [If OpEx >forecast]: [Specific spend overage]

ACTIONS FOR NEXT MONTH:
- [Corrective action 1]
- [Corrective action 2]
```

---

## 11. QUARTERLY BUSINESS REVIEW

**Frequency**: End of Q1, Q2, Q3, Q4 (consolidated 3-month review)

**Attendees**: Founder + any advisors/investors

**Agenda**:
1. **Revenue & MRR growth** (trending to ₹13.3L target?)
2. **Customer acquisition** (progress toward 20 customers?)
3. **Unit economics** (LTV, CAC, payback period improving?)
4. **Cash runway** (months of runway remaining?)
5. **Burn rate & cost controls** (OpEx within budget?)
6. **Upcoming gates** (readiness for next growth phase?)
7. **Risks & mitigations** (payment delays, churn, supply chain)
8. **Forecast update** (next quarter + full-year outlook)

**Output**: QBR memo (1 page) shared with stakeholders

---

## 12. FINANCIAL CONTROLS & AUDIT TRAIL

### Segregation of Duties (adapted for single-founder startup)
- **Spending authority**:
  - <₹5,000: Founder approves
  - ₹5,000–₹25,000: Founder approves + documented business case
  - >₹25,000: Requires board approval (once formal governance in place)
- **Payment approval**: Founder only (until CFO/accountant hired)
- **Reconciliation**: CA/accountant (quarterly) vs. founder (monthly)

### Documentation Requirements
- **All expenses**: Receipt/invoice + business purpose
- **All sales**: Invoice + delivery proof (e-signature OK)
- **All payments**: Bank slip + reconciliation entry
- **All receipts**: Stored in folder (physical or digital)
  - Folder naming: /Expenses/YYYY-MM/[Category]-[Description]
  - Example: /Expenses/2026-04/Cloud-AWS-April-Invoice.pdf

### Records Retention
- Keep all financial records for **7 years** (Indian law requirement)
- Monthly backup of digital records (Google Drive + external HDD)
- Bank statements: Archive annually (online portal retention)

---

## Gates & Resource Unlock

| Gate | Trigger | Revenue | Customers | Key Actions |
|------|---------|---------|-----------|-------------|
| Gate 1 | 1st customer order | ₹25K+ | 1 | Receive payment; refine COGS |
| Gate 2 | 3rd customer | ₹100K+ | 3 | Hire part-time support; formalize processes |
| Gate 3 | 5th customer | ₹150K+ | 5 | Scale cloud infrastructure; consider entity registration |
| Gate 4 | 20th customer | ₹13.3L+ | 20 | Register formal entity (LLP/Pvt Ltd); hire leadership team |

---

## Tools & Systems to Set Up

1. **Google Sheets**: Master Finance Tracker (daily/monthly logs)
2. **Razorpay**: Payment gateway + automated settlement
3. **GST compliance tool**: Tally/Busy (post-registration)
4. **Accounting software**: Wave (free) or Zoho Books (₹200/month)
5. **Invoice generator**: Canva/PDF template or Wave built-in
6. **Bank**: Maintain founder's account; migrate post-entity registration
7. **CA/Accountant**: Quarterly reviews; annual tax filing

---

## QUICK REFERENCE: MONTHLY CHECKLIST

- [ ] Daily: Log revenue, expenses, bank balance
- [ ] Weekly: Update cash position; monitor Razorpay/bank transfers
- [ ] By 3rd: Close prior month; reconcile payments; export reports
- [ ] By 10th: Prepare variance analysis; update forecast
- [ ] By 15th: Founder review; document decisions
- [ ] Quarterly: Full QBR; report to any stakeholders
- [ ] Annually: Tax filing; entity registration assessment

---

**Owner**: Vaishak R N (Founder)
**Last updated**: April 2026
**Next review**: May 2026
