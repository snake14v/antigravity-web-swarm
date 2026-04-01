# Knowledge Base — Ooru Logix Company OS

> **Persistent memory that survives across sessions.**
> Agents read before acting, write after completing work.
> Sacred files are append-only — never delete, never overwrite.

---

## Knowledge Architecture

```
knowledge/
├── shopsense/
│   ├── Pilot Tracker.md          ← Active pilots, deal stages, metrics
│   ├── Customer Profiles.md      ← ICP data, individual customer notes
│   ├── Deployment Playbook.md    ← Step-by-step install guide
│   └── Model Accuracy Log.md    ← YOLO model performance over time
│
├── market/
│   ├── Competitive Intel.md      ← Competitor tracking, positioning
│   ├── Bangalore Retail Map.md   ← Target neighborhoods, shop density
│   └── Pricing Intelligence.md   ← Price sensitivity, willingness-to-pay
│
└── operations/
    ├── Finance Ledger.md         ← Revenue, expenses, cash position
    ├── Registration Status.md    ← GST, MSME, trademark progress
    ├── Vendor Directory.md       ← Component suppliers, costs
    └── Team Capacity.md          ← Time allocation, AI agent hours
```

---

## Sacred Files (NEVER Delete)

| File | Rule | Reason |
|------|------|--------|
| `PROGRESS.md` | Append-only | Global work tracker across all agents |
| `PROJECT_MEMORY.md` | Append-only | Cross-session persistent context |
| `Finance Ledger.md` | Append-only | Financial audit trail |
| `Pilot Tracker.md` | Update in-place | Current deal/pilot state of truth |
| `Customer Profiles.md` | Append-only | Customer relationship history |

---

## Knowledge File Templates

### Pilot Tracker

```markdown
# Pilot Tracker — ShopSense

## Active Pipeline

| ID | Customer | Shop Name | Location | Stage | Start Date | Day | Score | Next Action | Owner |
|----|----------|-----------|----------|-------|------------|-----|-------|-------------|-------|
| P-001 | [name] | [shop] | [area] | LEAD / QUALIFIED / DEMO / PILOT / NEGOTIATION / WON / LOST | [date] | [1-14] | [action] | Vaishak |

## Stage Definitions

| Stage | Meaning | Exit Criteria |
|-------|---------|--------------|
| LEAD | New inquiry received | Qualified by lead-qualify skill |
| QUALIFIED | Score ≥ 6, ICP match | Demo scheduled |
| DEMO | Live demo completed | Shop owner agrees to pilot |
| PILOT_ACTIVE | Hardware deployed, collecting data | Day 14 reached |
| PILOT_COMPLETE | 14-day data collected | Conversion decision made |
| NEGOTIATION | Price/terms discussion | Payment received |
| WON | Payment confirmed | Onboarding workflow triggered |
| LOST | Deal did not close | Reason logged, nurture list |

## Conversion Metrics

| Metric | Value | Updated |
|--------|-------|---------|
| Total leads | 0 | [date] |
| Qualified leads | 0 | [date] |
| Demos completed | 0 | [date] |
| Pilots deployed | 0 | [date] |
| Customers won | 0 | [date] |
| Customers lost | 0 | [date] |
| Conversion rate (lead→won) | 0% | [date] |
| Avg deal cycle (days) | — | [date] |

## Lost Deal Log

| ID | Customer | Stage Lost | Reason | Date | Follow-up |
|----|----------|-----------|--------|------|-----------|
| — | — | — | — | — | — |
```

---

### Customer Profiles

```markdown
# Customer Profiles — ShopSense

## Template

### [Customer Name] — [Shop Name]
| Field | Value |
|-------|-------|
| **ID** | C-XXX |
| **Name** | [Owner name] |
| **Shop name** | [Business name] |
| **Shop type** | chai / restaurant / kirana |
| **Location** | [Area, Bangalore] |
| **Phone** | [WhatsApp number] |
| **Annual turnover** | ₹[amount] |
| **Daily footfall** | [number] |
| **Pain points** | [what they told us] |
| **Source** | WhatsApp / LinkedIn / referral / walk-in |
| **Lead score** | [1-10] |
| **Current stage** | [from Pilot Tracker] |
| **First contact** | [date] |
| **Product tier** | basic / pro / enterprise |
| **Payment status** | unpaid / partial / paid |
| **Amount paid** | ₹[amount] |
| **NPS score** | [1-10] |
| **Notes** | [free-form notes from interactions] |

### Interaction Log
| Date | Channel | Summary | Agent |
|------|---------|---------|-------|
| [date] | WhatsApp/Phone/In-person | [what happened] | [who handled] |
```

---

### Finance Ledger

```markdown
# Finance Ledger — Ooru Logix

## Revenue Log (Append-Only)

| Date | Customer | Type | Amount (₹) | GST | Net | Method | Invoice # | Notes |
|------|----------|------|-----------|-----|-----|--------|-----------|-------|
| [date] | [name] | hardware_sale / saas / web_design | [amount] | [gst] | [net] | razorpay / bank / cash / upi | [INV-XXX] | [notes] |

## Expense Log (Append-Only)

| Date | Category | Description | Vendor | Amount (₹) | Receipt | Notes |
|------|----------|-------------|--------|-----------|---------|-------|
| [date] | components / hosting / tools / marketing / travel | [what] | [vendor] | [amount] | [Y/N] | [notes] |

## Monthly Summary

| Month | Revenue | Expenses | Net | Cumulative | Runway (months) |
|-------|---------|----------|-----|-----------|----------------|
| Apr 2026 | ₹0 | ₹10,500 | -₹10,500 | -₹10,500 | >12 |

## Cash Position

| Item | Amount (₹) | Updated |
|------|-----------|---------|
| Bank balance | [amount] | [date] |
| Accounts receivable | [amount] | [date] |
| Accounts payable | [amount] | [date] |
| Monthly burn rate | ₹10,500 | [date] |
| Runway | >12 months | [date] |

## Categories Reference
| Category | Examples |
|----------|---------|
| `components` | Pi boards, cameras, enclosures, cables |
| `hosting` | Firebase, Vercel, domain renewals |
| `tools` | Software subscriptions, AI API costs |
| `marketing` | Ads, printed materials, event fees |
| `travel` | Client site visits, chai shop rounds |
| `legal` | Registration fees, trademark filing |
| `salary` | Vaishak draw (when applicable) |
```

---

### Competitive Intel

```markdown
# Competitive Intelligence — Ooru Logix

## Direct Competitors (Edge AI Retail)

| Competitor | Product | Price | Target | Differentiation | Threat Level |
|-----------|---------|-------|--------|----------------|-------------|
| [name] | [product] | [price] | [market] | [how different from us] | Low / Medium / High |

## Adjacent Competitors (Different Approach, Same Problem)

| Competitor | Approach | Why They're Not Us |
|-----------|----------|-------------------|
| Shopify POS | Cloud SaaS, online-first | Needs internet, monthly fees, not for unconnected shops |
| Square | Hardware POS | Western market, expensive, not India-focused |
| Razorpay Shop | Payment terminal | Payment only, no inventory intelligence |
| Dukaan | E-commerce platform | Online shops, not physical retail |

## Our Moat

| Moat Element | Description | Durability |
|-------------|-------------|-----------|
| Offline-first | Works without internet | Strong — hard to replicate without hardware |
| Camera-based | No barcodes, no manual entry | Strong — requires CV expertise |
| One-time cost | No monthly SaaS fees | Medium — could be undercut on hardware price |
| Local knowledge | Deep understanding of Bangalore chai ecosystem | Strong — requires physical presence |
| Open source | Community trust, developer mindshare | Medium — competitors could fork |

## Intel Updates (Append)

| Date | Source | Intel | Impact | Action |
|------|--------|-------|--------|--------|
| [date] | [web/customer/linkedin] | [what we learned] | Low/Med/High | [what to do] |
```

---

### Registration Status

```markdown
# Registration Status — Ooru Logix

## Entity Registration

| Item | Status | Filed Date | Approval Date | Reference # | Notes |
|------|--------|-----------|--------------|------------|-------|
| Sole Proprietorship | ⬜ Pending | — | — | — | — |
| GST Registration | ⬜ Pending | — | — | — | Required for B2B invoicing |
| MSME/Udyam | ⬜ Pending | — | — | — | Online at udyamregistration.gov.in |
| Startup India DPIIT | ⬜ Pending | — | — | — | Tax benefits, easier compliance |
| Trademark "Ooru Logix" | ⬜ Pending | — | — | — | Class 9 + 42 |
| Trademark "ShopSense" | ⬜ Pending | — | — | — | Class 9 + 42 |
| Business bank account | ⬜ Pending | — | — | — | — |
| Shop & Establishment | ⬜ Not needed | — | — | — | If/when physical office |

## Upcoming Deadlines

| Deadline | Date | Action Required | Responsible |
|----------|------|----------------|-------------|
| — | — | — | — |

## Reference
→ Full guide: [[Registration Guide]]
```

---

### Vendor Directory

```markdown
# Vendor Directory — Ooru Logix

## Component Suppliers

| Component | Vendor | Price (₹) | Lead Time | Min Order | Quality | Notes |
|-----------|--------|----------|-----------|-----------|---------|-------|
| Raspberry Pi 4 8GB | [vendor] | ~6,000 | [days] | 1 | [rating] | [notes] |
| Pi Camera Module 3 | [vendor] | ~2,500 | [days] | 1 | [rating] | [notes] |
| ESP32-S3-EYE | [vendor] | ~1,500 | [days] | 1 | [rating] | [notes] |
| 7" DSI Touchscreen | [vendor] | ~3,000 | [days] | 1 | [rating] | [notes] |
| 3D Printed Enclosure | xgo3d (in-house) | ~1,500 | 2 days | 1 | High | In-house production |

## Service Providers

| Service | Provider | Cost | Contract | Notes |
|---------|----------|------|----------|-------|
| Domain (oorulogix.com) | [registrar] | ~₹800/yr | Annual | Auto-renew |
| Domain (xgo3d.com) | [registrar] | ~₹800/yr | Annual | Auto-renew |
| Firebase | Google | Free tier | Pay-as-go | Blaze plan when scaling |
| Vercel | Vercel | Free tier | Pay-as-go | Pro when needed |
```

---

### Team Capacity

```markdown
# Team Capacity — Ooru Logix

## Current Allocation (April 2026)

### Vaishak (Founder) — 50 hrs/week available

| Activity | Hours/Week | % | Priority |
|----------|-----------|---|----------|
| ShopSense development | 20 | 40% | HIGHEST |
| Sales & customer visits | 10 | 20% | HIGH |
| Marketing & content | 5 | 10% | MEDIUM |
| Company ops & admin | 5 | 10% | MEDIUM |
| Strategy & planning | 5 | 10% | MEDIUM |
| Buffer / learning | 5 | 10% | LOW |

### AI Agent Hours (Estimated)

| Agent Group | Sessions/Week | Hrs/Session | Total Hrs |
|-------------|--------------|-------------|-----------|
| Claude (Cowork/Code) | 5 | 2 | 10 |
| Antigravity (Gemini) | 3 | 2 | 6 |
| **Total AI capacity** | 8 | — | **16** |

### Effective Team Output
- Vaishak: 50 hrs/week (decision-making, customer-facing, hardware)
- AI Agents: 16 hrs/week (content, analysis, code, documentation)
- **Total: ~66 hrs/week of productive capacity**

### Capacity Constraints
| Bottleneck | Impact | Mitigation |
|-----------|--------|-----------|
| Vaishak = single point for customer visits | Max 2-3 pilots simultaneously | Hire field engineer at Gate 4 |
| Hardware assembly is manual | Max 3 kits/week | Batch assembly, consider contract manufacturer |
| AI agents can't make phone calls | Sales outreach limited | Vaishak handles all voice, AI handles text |
```

---

### Model Accuracy Log

```markdown
# Model Accuracy Log — ShopSense

## YOLOv8n Models

| Model | Version | mAP@50 | mAP@50-95 | Inference (ms) | Classes | Dataset Size | Date |
|-------|---------|--------|-----------|---------------|---------|-------------|------|
| SmokeSense | v0.1 | — | — | — | — | — | — |
| BrewSense | v0.1 | — | — | — | — | — | — |
| SnackSense | v0.1 | — | — | — | — | — | — |

## Field Accuracy (Post-Deployment)

| Site | Model | True Pos | False Pos | False Neg | Precision | Recall | F1 | Date |
|------|-------|----------|-----------|-----------|-----------|--------|-----|------|
| — | — | — | — | — | — | — | — | — |

## Improvement Log

| Date | Model | Change | Before | After | Notes |
|------|-------|--------|--------|-------|-------|
| — | — | — | — | — | — |
```

---

### Bangalore Retail Map

```markdown
# Bangalore Retail Map — Target Market

## Priority Zones (3km radius from Vaishak's location)

| Zone | Area | Est. Chai Shops | Density | Priority | Status |
|------|------|----------------|---------|----------|--------|
| Z1 | JP Nagar | 15-20 | High | PRIMARY | Scouting |
| Z2 | Jayanagar | 10-15 | Medium | SECONDARY | Not started |
| Z3 | Banashankari | 10-15 | Medium | SECONDARY | Not started |
| Z4 | Kothnur | 5-10 | Low | TERTIARY | Not started |
| Z5 | BTM Layout | 15-20 | High | SECONDARY | Not started |

## Scouted Shops (Append as visited)

| Shop Name | Location | Owner | Contact | Type | Turnover (est.) | Pain | Score | Visited | Notes |
|-----------|----------|-------|---------|------|-----------------|------|-------|---------|-------|
| — | — | — | — | — | — | — | — | — | — |

## Market Sizing (Bangalore)

| Metric | Value | Source |
|--------|-------|--------|
| Total chai shops (Bangalore) | ~5,000-8,000 | Estimate |
| Target-addressable (₹8-12L turnover) | ~2,000-3,000 | Estimate |
| 3km radius count | ~50-80 | Ground observation |
| Year 1 realistic target | 25-30 shops | GTM strategy |
```

---

## Knowledge Update Protocol

1. **Before acting:** Agent reads ALL relevant knowledge files
2. **After completing work:** Agent WRITES results back to appropriate knowledge file
3. **Sacred files:** Append only — never overwrite historical entries
4. **Conflict resolution:** If two agents write to same file, later write appends; never overwrites
5. **Staleness:** If knowledge file not updated in >7 days, Daily Dispatcher flags it

---

## Tags
#knowledge #memory #context #templates #company-os
