# Operations Manager Skill - Ooru Logix

## Overview
This skill manages supply chain, inventory, quality control, logistics, and customer support operations for Ooru Logix. It ensures hardware and SaaS services are delivered reliably at scale, with formal KPIs and incident response procedures.

**Key OKR**: Achieve 99% uptime SLA, <4hr response time, <24hr resolution, and 95% deploy success rate.

---

## 1. VENDOR MANAGEMENT FRAMEWORK

### Vendor Categories & Lead Suppliers

#### Category 1: Component Suppliers (RPi, Cameras, PCB)

**Tier-1: Primary Suppliers** (stock regularly, fast shipping)

| Component | Supplier | Lead Time | MOQ | Unit Cost | Quality Rating |
|-----------|----------|-----------|-----|-----------|---|
| Raspberry Pi 4 | Pi India (authorized distributor) | 3–5 days | 5 units | ₹2,000 | 5/5 |
| Camera module (5MP) | Arrow India / ScanSource | 5–7 days | 10 units | ₹800 | 5/5 |
| Power supply (USB-C) | Belkin India | 2–3 days | 20 units | ₹400 | 4/5 |
| Ethernet cables (Cat6) | Local supplier (Bangalore) | Same-day | 50 units | ₹50 | 4/5 |

**Tier-2: Backup Suppliers** (if primary unavailable)

| Component | Backup Supplier | Lead Time | Notes |
|-----------|---|-----------|-------|
| Raspberry Pi 4 | Robocraze | 7–10 days | Higher cost (5–10% premium) |
| Camera | AliExpress (pre-stock locally) | 30 days+ | Long lead; maintain local stock |
| Power supply | Amazon India | 2 days (Prime) | Premium pricing |

#### Category 2: Custom PCB & Assembly

| Service | Supplier | Lead Time | MOQ | Unit Cost | Notes |
|---------|----------|-----------|-----|-----------|-------|
| Custom PCB (design to production) | WYLE Electronics / Jlcpcb | 14–21 days | 50 units | ₹200 | Design iteration: 2–3 weeks |
| PCB Assembly (SMD) | Jlcpcb / Raedec | 10–14 days | 50 units | ₹300 | Test report included |
| Kit Assembly (final) | Local contract manufacturer (Bangalore) | 5–7 days | 5 units | ₹1,600 | QC + packaging included |

#### Category 3: Logistics & Shipping

| Service | Provider | Lead Time | Cost | Coverage |
|---------|----------|-----------|------|----------|
| Local delivery (Bangalore) | Ecom Express | Same-day to 2 days | ₹150/delivery | Bangalore metro |
| Pan-India shipping | DHL / Fedex | 2–5 days | ₹500–1,200 | All metros + towns |
| International (if future) | DHL International | 7–14 days | ₹2,000–5,000 | Any country |

#### Category 4: Cloud & SaaS Services

| Service | Provider | Cost | SLA | Trigger for scaling |
|---------|----------|------|-----|-----|
| Compute (AWS EC2) | Amazon Web Services | ₹1,200/month | 99.99% | Auto-scale based on load |
| Database (RDS/MongoDB) | AWS RDS / MongoDB Atlas | ₹400/month | 99.9% | Backup, redundancy |
| Storage (S3) | AWS S3 | Per GB | 99.99% | Camera footage archival |
| Monitoring | Datadog / New Relic | ₹300/month | SLA tracked | Real-time alerts |

---

### Vendor Scorecard & Evaluation

**Maintained quarterly; evaluates:**

| Criterion | Weight | Target | Current | Trend |
|-----------|--------|--------|---------|-------|
| Quality (defect rate) | 30% | <2% | [X]% | [↑/→/↓] |
| On-time delivery | 25% | >95% | [X]% | [↑/→/↓] |
| Responsiveness (response time <24hr) | 20% | 100% | [X]% | [↑/→/↓] |
| Cost competitiveness | 15% | Within 10% of market | [X]% | [↑/→/↓] |
| Communication & support | 10% | Proactive updates | [Yes/No] | [↑/→/↓] |
| **Overall rating** | | **>80%** | **[X]%** | |

**Action triggers**:
- Rating drops below 70% → Send formal review email + 30-day improvement plan
- Rating remains <70% for 2 consecutive quarters → Shift to backup vendor
- Quality issue (defect rate >5%) → Halt orders; conduct root cause analysis

---

## 2. SUPPLY CHAIN PROTOCOL

### Order Trigger Levels (Reorder Points)

**Components (Managed by BOM tracking):**

| Component | Reorder Point | Safe Stock | Order Qty | Lead Time | Days of stock |
|-----------|---------------|-----------|-----------|-----------|---|
| RPi 4 | 4 units | 4 units | 10 units | 5 days | 1 week |
| Cameras | 8 units | 8 units | 20 units | 7 days | 1 week |
| PCBs | 4 units | 4 units | 50 units | 21 days | 1 week |
| Assembly labor | Per customer order | N/A | Per order | 7 days | N/A |

**Trigger workflow**:
1. Weekly inventory review (every Monday)
2. Check stock level vs. reorder point
3. If <reorder point, issue PO immediately (expedite if <3 days stock)
4. ETA: Lead time + 1 day buffer
5. Verify receipt; document in inventory system

### Procurement Checklist

- [ ] Inventory count (manual count vs. system balance)
- [ ] Compare stock vs. sales forecast (next 4 weeks)
- [ ] Identify shortages (red flags)
- [ ] Issue PO to primary supplier (or backup if needed)
- [ ] Confirm ETA and shipping address
- [ ] Set calendar reminder for expected delivery (2 days before)
- [ ] Prepare receiving bay (space, QC checklist)
- [ ] Confirm payment (net 30 terms if available, prepay if new vendor)

### Purchase Order Template

```
PURCHASE ORDER
PO Number: OL-PO-YYYY-MM-NNNN
Date: DD/MM/YYYY
Required by: DD/MM/YYYY

VENDOR:
[Supplier name]
[Address]
[Contact]
[Email/Phone]

ITEMS:
[Qty] × [Component description] @ ₹[Unit price] = ₹[Total]
[Qty] × [Component description] @ ₹[Unit price] = ₹[Total]

Subtotal: ₹[X]
Taxes (if applicable): ₹[X]
Shipping: ₹[X]
Total: ₹[X]

Payment terms: Net 30
Delivery address: [Ooru Logix, Bangalore]
Special instructions: [Quality cert required, test report, etc.]

Authorized by: Vaishak R N
Signature: ________________
```

---

## 3. INVENTORY TRACKING SYSTEM

### Component Inventory Log (Google Sheet + Monthly Export)

**Columns**:
| Date | Component | Qty In | Qty Out | Balance | Reorder? | Supplier | ETA | Notes |
|------|-----------|--------|---------|---------|----------|----------|-----|-------|
| YYYY-MM-DD | RPi 4 | [Qty] | [Qty] | [Balance] | Y/N | Pi India | YYYY-MM-DD | Ordered on [date] |

**Entries**:
- **Qty In**: Purchase order received (include PO #)
- **Qty Out**: Used for assembly (include kit #)
- **Balance**: Running total (should match physical count)

### Finished Goods Inventory (Assembled Kits)

**Tracking**:
| Kit ID | Components Used | Assembly Date | QC Status | Deployment Date | Customer | Revenue Recognized |
|--------|---|---|---|---|---|---|
| OL-KIT-001 | 1×RPi, 4×cam, 1×PCB | 2026-04-10 | Pass | 2026-04-15 | Cust A | 2026-04-15 |

**Status categories**:
- **Built, in QC**: Passed component test, awaiting final test
- **QC Pass**: Ready to ship
- **Shipped**: In transit to customer
- **Deployed**: Installed at customer site
- **Return**: Defective or customer return

### Monthly Inventory Reconciliation

**Procedure** (last day of month):
1. Physical count all components in warehouse
2. Compare to system balance
3. Investigate discrepancies >5% variance
4. Document adjustments (damage, theft, obsolescence)
5. Revalue inventory at cost (FIFO method for component batches)
6. Report inventory balance sheet value to finance

---

## 4. QUALITY CONTROL CHECKLIST

### Incoming Inspection (Vendor QC)

**Upon receipt of components:**

```
INCOMING QC CHECKLIST - [Component Type]
PO Number: OL-PO-YYYY-MM-NNNN
Date received: DD/MM/YYYY
Supplier: [Name]
Qty ordered: [X]
Qty received: [X]

1. VERIFICATION
   - [ ] Packing slip matches PO
   - [ ] Qty matches PO (count sample if bulk)
   - [ ] No visible damage/dents in packaging
   - [ ] Expiration date (if applicable) >6 months

2. FUNCTIONAL TEST (sample 10% or n=3, whichever higher)
   - [ ] Power on/boot (RPi): Successful
   - [ ] Camera test (live feed capture): Successful
   - [ ] Network connectivity: Successful
   - [ ] No pixel defects (visual inspection): Pass
   - [ ] Component cost: ₹[X] (within budget)

3. DEFECT ASSESSMENT
   - [ ] Zero critical defects (fail → return to vendor)
   - [ ] <2% minor defects (acceptable)
   - [ ] Document any defects (note, photo, return RMA)

4. APPROVAL
   - [ ] ACCEPT → Log in inventory, QC status = "OK"
   - [ ] CONDITIONAL → Use only in non-critical orders
   - [ ] REJECT → Initiate return; mark PO as disputed

Inspected by: [Name]
Date: DD/MM/YYYY
Signature: _____________

Notes: [Any issues, supplier contact attempts, resolution]
```

### Assembled Kit QA (Pre-Deployment)

**Before each kit ships to customer:**

```
KIT ASSEMBLY & QC CHECKLIST
Kit ID: OL-KIT-XXX
Assembly date: DD/MM/YYYY
Customer: [Name]

1. COMPONENT VERIFICATION
   - [ ] Bill of Materials (BOM) checklist completed
   - [ ] All 6 components present and counted
     - [ ] 2× Raspberry Pi 4
     - [ ] 4× Camera modules
     - [ ] 1× Custom PCB
     - [ ] Power supplies, cables, case
   - [ ] Serial numbers recorded (if applicable)

2. ASSEMBLY INTEGRITY
   - [ ] PCB properly seated in case
   - [ ] All camera modules securely mounted
   - [ ] Power connections stable
   - [ ] No visible solder defects
   - [ ] Cable management clean

3. FUNCTIONAL TEST (Power-on Test)
   - [ ] RPi boots successfully (both)
   - [ ] All 4 cameras feed live (check via web dashboard)
   - [ ] AI model loads without error
   - [ ] Inference runs (test with sample image)
   - [ ] Network connectivity confirmed (ping test)
   - [ ] System temp <60°C under load
   - [ ] No audio feedback (fans quiet)

4. COSMETIC & PACKAGING
   - [ ] Case is clean, undamaged
   - [ ] Label/branding affixed correctly
   - [ ] Packaging secure (no shift in box)
   - [ ] QC documentation included (test results, serial #s)

5. CUSTOMER DOCUMENTATION
   - [ ] User manual printed & included
   - [ ] Quick start guide included
   - [ ] Warranty card filled out
   - [ ] Support contact info (website, email, phone)

6. SIGN-OFF
   - [ ] All tests PASS → QC status = "Ready to ship"
   - [ ] Any test FAIL → Document failure, investigate root cause
   - [ ] Rework required → Return to assembly; re-QC

Assembled by: [Name]
QC checked by: [Name]
Approval: [Signature]
Date: DD/MM/YYYY

DEFECT LOG (if any):
- [Issue]: [Root cause]: [Rework]: [Status]
```

### SaaS/Software QA Protocol

**For cloud deployments & software updates:**

- [ ] Feature tested on staging environment (not production)
- [ ] All API endpoints tested (manual + automated)
- [ ] Camera integration tested (end-to-end with hardware mock)
- [ ] Performance benchmarked (<200ms API response)
- [ ] Logs reviewed (zero critical errors)
- [ ] Database backup taken before deployment
- [ ] Rollback plan documented (if needed)
- [ ] Deployment executed in maintenance window
- [ ] Smoke tests run on production
- [ ] Monitoring alerts active (1hr post-deploy)

---

## 5. LOGISTICS & DELIVERY PROTOCOL

### Shipping Workflow

```
HARDWARE DEPLOYMENT WORKFLOW

1. ORDER RECEIVED (Customer)
   - Order confirmed via invoice
   - Payment verified
   - Delivery address confirmed

2. KIT ASSEMBLY & QC (5–7 days)
   - Kit built to spec
   - QC passed (see checklist above)
   - Kit status: "Ready to ship"

3. SHIPPING HANDOFF (1–2 days)
   - Address verified via SMS/email
   - Kit packed + label affixed
   - Courier pickup scheduled (same day or next)
   - Tracking # sent to customer via email
   - Founder confirms shipment (log in CRM)

4. IN-TRANSIT (2–5 days depending on distance)
   - Customer notified (tracking link)
   - Proactive SMS at 24hr before expected delivery

5. DELIVERY & INSTALLATION (1–3 days)
   - Kit delivered to site
   - Customer signs delivery receipt (photo for records)
   - Ooru team (or contractor) schedules installation
   - Pre-install checklist:
     - [ ] Power supply available (220V AC)
     - [ ] Network connectivity confirmed (Ethernet or WiFi)
     - [ ] Camera placement discussed with customer
   - Installation executed (30–60 min)
   - System tested at site (capture sample images)
   - Training given (2–4 hours)

6. GO-LIVE (Same day as install)
   - System activated in cloud dashboard
   - SaaS subscription begins (auto-billing)
   - Data insights module enabled
   - Customer given access credentials
   - Support ticket logged (if any issues)

7. POST-DELIVERY (1–7 days)
   - Follow-up call (day 2): "How is the system performing?"
   - Monitor system (logs, uptime)
   - Respond to any installation issues immediately
   - Customer satisfaction survey (day 7)
```

### Delivery Tracking & Proof

**For every shipment**:
- Tracking # stored in CRM + sent to customer
- Daily status check (monitor courier platform)
- Delivery confirmation captured (photo of receipt + customer signature)
- Any delays reported to customer within 4 hours

---

## 6. SLA DEFINITIONS & COMMITMENTS

### Service Level Agreement (Customer-Facing)

**Hardware SLA:**
- **Delivery**: 3 months from order (standard) or expedited (extra ₹5K for 6 weeks)
- **Installation**: Within 5 business days of delivery
- **Warranty**: 1 year from delivery (parts & labor, excludes water/physical damage)
- **Return window**: 7 days for full refund, 30 days for defect replacement

**Software/SaaS SLA:**
- **Uptime**: 99% (cumulative, monthly measurement)
  - Maintenance window: Sundays 2–4 AM IST (excluded from SLA calc)
  - If uptime <99%, customer credits 5% of monthly fee per 1% below target
- **API response time**: <200ms (p95 latency)
- **Data retention**: 2 years (retention policy configurable by customer)

**Support SLA:**
- **Critical** (system down): Response <4 hours, resolution target <24 hours
- **High** (system degraded): Response <8 hours, resolution target <5 business days
- **Normal** (feature request, minor bug): Response <1 business day, resolution <10 days
- **Support hours**: 9 AM–6 PM IST Monday–Friday (email anytime; phone during hours)

---

## 7. INCIDENT MANAGEMENT & ESCALATION

### Incident Categories

**Hardware Incidents:**
1. Kit fails to power on
2. Cameras not capturing images
3. Network connectivity lost
4. Kit overheating (>65°C)
5. Storage full (disk space exhausted)
6. Physical damage (cracked case, spilled liquid)

**Software Incidents:**
1. API returns 5xx errors (system unavailable)
2. Camera feed drops >1 minute
3. AI inference fails or returns incorrect results
4. Data loss (missing historical footage)
5. Performance degradation (>2s API response)
6. Security breach (unauthorized access)

**Customer Incidents:**
1. Customer reports data privacy violation
2. Billing discrepancy (overcharge, duplicate charge)
3. SLA violation (uptime <99% in month)
4. Installation failure (customer site issue)
5. Churn threat (customer considering cancellation)

### Incident Response Protocol

```
INCIDENT TICKET TEMPLATE

ID: INC-YYYY-MM-NNNN
Created: DD/MM/YYYY HH:MM
Reporter: [Customer name / Internal]
Category: [Hardware / Software / Customer]
Severity: [Critical / High / Normal]

DESCRIPTION:
[Customer issue description]

INITIAL DIAGNOSIS:
- [ ] Customer/system details confirmed
- [ ] Issue reproduced (if possible)
- [ ] Logs reviewed
- [ ] Previous similar incidents? [Y/N - link if yes]

RESPONSE TIMELINE:
- Reported: HH:MM
- First response sent: HH:MM (within SLA target)
- Investigation started: HH:MM
- Workaround provided: HH:MM (if applicable)
- Root cause identified: HH:MM
- Fix deployed: HH:MM
- Verified resolved: HH:MM
- Total resolution time: [X] hours

RESOLUTION:
[What was the root cause? What was the fix?]

CUSTOMER COMMUNICATION:
- [ ] Initial acknowledgement sent (within 4 hrs)
- [ ] Status update every 4 hours (if ongoing)
- [ ] Resolution confirmation sent
- [ ] Customer validated fix

POST-INCIDENT:
- [ ] Root cause analysis documented
- [ ] Preventive measure identified
- [ ] Code change / process change executed
- [ ] Team briefed (prevent recurrence)
- [ ] SLA credit calculated (if applicable)

Assigned to: [Team member]
Priority: [Critical / High / Normal]
Status: [Open / In progress / Resolved / Closed]
```

### Escalation Matrix

```
RESPONSE TIME TARGETS & ESCALATION

Critical (Severity 1):
- P95 response: <1 hour (call customer immediately)
- P95 resolution: <4 hours (all-hands response)
- Escalate to: Founder + external support contractor
- SLA credit: 10% if not met

High (Severity 2):
- P95 response: <4 hours
- P95 resolution: <24 hours
- Escalate to: Founder if >8 hours without update
- SLA credit: 5%

Normal (Severity 3):
- P95 response: <24 hours
- P95 resolution: <5 business days
- Escalate to: Founder if no progress in 48 hours
- SLA credit: 2.5% (only if >SLA)
```

---

## 8. WEEKLY OPERATIONS REVIEW TEMPLATE

**Day**: Monday, 10:00 AM IST
**Duration**: 30–45 min
**Attendees**: Founder + operations team (if any)

```
WEEKLY OPS REVIEW - Week of [MM/DD/YYYY]

1. PRODUCTION METRICS
   - Kits built this week: [X] (vs. target [X])
   - Kits QC passed: [X] ([X]% pass rate, target >98%)
   - Kits deployed: [X] (cumulative: [X])
   - Any assembly delays? [Reason + ETA]
   - Any component shortages? [Action taken]

2. DEPLOYMENT STATUS
   - Installations scheduled: [X]
   - Installations completed: [X]
   - Average installation time: [X] hours
   - Customer satisfaction feedback: [Positive/Concerns]
   - Post-installation issues: [X] tickets (all resolved? Y/N)

3. INVENTORY SNAPSHOT
   - Component stockouts: [None / List items]
   - Days of component stock remaining: [X] days
   - Reorder point breached? [Y/N - action]
   - Finished goods inventory: [X] kits (aged >30 days? [List])
   - Inventory write-offs: ₹[X] (damage, obsolescence)

4. VENDOR UPDATES
   - Delayed shipments? [Vendor / ETA / Impact]
   - Quality issues? [Vendor / Defect / RMA status]
   - Cost negotiations? [Status]
   - New vendor evaluation? [Status]

5. SUPPORT TICKETS & INCIDENTS
   - Open tickets: [X] (Critical: [X], High: [X], Normal: [X])
   - Resolved this week: [X]
   - Avg resolution time: [X] hours (target: <24hrs for High)
   - SLA breaches: [None / Detail issue + customer]
   - Recurring issues: [Pattern identified? → Action]

6. CUSTOMER FEEDBACK
   - Customer churn: [X] customers (reason: [List])
   - Net new customers: [X]
   - Satisfaction scores: [X]/10 (target: >8)
   - Major complaints: [List + action]

7. KPI DASHBOARD
   | KPI | Target | This Week | YTD | Status |
   |-----|--------|-----------|-----|--------|
   | Deploy success rate | >95% | [X]% | [X]% | Green/Yellow |
   | MTTR (Mean time to resolve) | <4hrs | [X]hrs | [X]hrs | Green/Yellow |
   | SaaS uptime | 99% | [X]% | [X]% | Green/Yellow |
   | Customer satisfaction | >8/10 | [X]/10 | [X]/10 | Green/Yellow |

8. ACTION ITEMS FROM LAST WEEK
   - [ ] Item 1: [Status - Completed/In progress/Blocked]
   - [ ] Item 2: [Status]
   - [ ] Item 3: [Status]

9. NEW ACTION ITEMS (This Week)
   - [ ] Action 1: [Owner - Due date]
   - [ ] Action 2: [Owner - Due date]
   - [ ] Action 3: [Owner - Due date]

10. RISKS & BLOCKERS
    - [Risk]: [Probability / Impact] → [Mitigation]
    - [Blocker]: [Status / Resolution ETA]

NOTES: [Any decisions, policy changes, approvals]
NEXT REVIEW: [Next Monday, 10 AM IST]
```

---

## 9. KPI DASHBOARD & METRICS

### Core KPIs (Track Weekly)

| KPI | Definition | Target | Frequency | Owner |
|-----|-----------|--------|-----------|-------|
| **Deploy success rate** | % of kits deployed without critical issues | >95% | Weekly | Ops lead |
| **MTTR** | Mean time to resolve support tickets | <4 hrs (Critical) | Weekly | Ops lead |
| **SaaS uptime** | % time system is operational | 99% | Daily (reported weekly) | Eng + Ops |
| **Customer satisfaction** | NPS or post-install survey score | >8/10 | Monthly | Support |
| **Inventory turns** | (COGS / Avg inventory) per month | 2–3x/mo | Weekly | Ops lead |
| **Component lead time** | Days to receive after PO | <10 days avg | Weekly | Procurement |

### Secondary KPIs (Track Monthly)

| KPI | Definition | Target | Calculation |
|-----|-----------|--------|-------------|
| **SLA credit %** | % of revenue refunded due to SLA misses | <0.5% | (Refunded / Revenue) |
| **Supplier quality** | % of components passing QC on arrival | >98% | (Accepted / Received) |
| **On-time delivery %** | % of shipments arriving by promised date | >95% | (On-time / Total) |
| **Churn rate (customers)** | % of customers cancelling SaaS | <5%/mo | (Cancelled / Prev month) |
| **Incident recurrence** | % of incidents that repeat | <10% | (Repeated / Total) |

### Dashboard Updates & Reporting

- **Weekly**: Produce ops review (see template above)
- **Monthly**: Consolidate KPIs; compare to forecast; identify trends
- **Quarterly**: Full ops audit; vendor scorecard reviews; process improvements

---

## 10. PROCESS OPTIMIZATION ROADMAP

### Phase 1 (Months 1–3, pre-Gate 2)
- [ ] Stabilize component sourcing (establish relationships with 2 suppliers per component)
- [ ] Document QC checklists (hardware + software)
- [ ] Implement weekly ops review
- [ ] Set up basic incident tracking (spreadsheet or ticketing)
- [ ] Train assembly partner on SOP

### Phase 2 (Months 4–6, Gate 2 onwards)
- [ ] Transition to formal ticketing system (Jira or Zendesk)
- [ ] Hire part-time operations/support coordinator
- [ ] Implement inventory management system (barcode tracking)
- [ ] Establish KPI dashboard (automated reporting)
- [ ] Negotiate volume discounts with top 2 vendors

### Phase 3 (Months 7–12, scaling to Gate 4)
- [ ] Automated inventory alerts (trigger POs automatically)
- [ ] Dedicated support team (1–2 FTE support engineers)
- [ ] Quality metrics automation (defect tracking, SLA monitoring)
- [ ] Expanded logistics partnerships (multi-region support)
- [ ] Customer portal (self-serve support, documentation)

---

## QUICK REFERENCE

**Weekly Checklist:**
- [ ] Inventory count vs. reorder points
- [ ] Vendor delivery status
- [ ] QC pass rate review
- [ ] Support ticket backlog
- [ ] Ops review meeting
- [ ] Customer satisfaction check

**Monthly Checklist:**
- [ ] Inventory reconciliation
- [ ] Vendor scorecard update
- [ ] KPI analysis & trend report
- [ ] SLA credit calculation
- [ ] Procurement forecast (next 2 months)

**Quarterly Checklist:**
- [ ] Vendor renegotiation (if <70% rating or cost >10% above market)
- [ ] SOP review & updates
- [ ] Process improvement recommendations
- [ ] Capacity planning (if scaling)

---

**Owner**: Vaishak R N (Founder) / Ops Lead (when hired)
**Last updated**: April 2026
**Next review**: May 2026

