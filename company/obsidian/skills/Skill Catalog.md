# Skill Catalog — Ooru Logix Company OS

> **28 executable skills across 4 departments + cross-cutting utilities.**
> Each skill: defined inputs → defined outputs. Side effects only via MCP servers.

---

## How Skills Work

```
AGENT identifies required skill
    │
    ▼
SKILL receives structured INPUT
    │
    ▼
SKILL reads KNOWLEDGE (if needed)
    │
    ▼
SKILL calls MCP SERVER (if external action needed)
    │
    ▼
SKILL returns structured OUTPUT to agent
```

Skills are **pure functions** in the functional programming sense. Given the same inputs, they produce the same outputs. They never hold state — that's the Knowledge layer's job.

---

## Sales Skills

### `lead-qualify`
| Property | Value |
|----------|-------|
| **ID** | `skill-sales-001` |
| **Category** | Sales |
| **Used by** | Deal Closer |
| **Description** | Scores an inbound lead against the ICP criteria and returns a qualification score with recommended action |

| Input | Type | Description |
|-------|------|-------------|
| `lead_name` | string | Shop owner name |
| `shop_type` | string | chai shop, restaurant, kirana, etc. |
| `location` | string | Bangalore area/neighborhood |
| `annual_turnover` | number | Estimated annual revenue (₹) |
| `pain_mentioned` | string | What problem they described |
| `source` | string | WhatsApp, LinkedIn, referral, walk-in |

| Output | Type | Description |
|--------|------|-------------|
| `score` | number (1-10) | ICP fit score |
| `tier` | string | hot / warm / cold |
| `recommended_action` | string | Next step (demo, pilot, nurture, reject) |
| `reasoning` | string | Why this score |
| `draft_response` | string | Suggested reply message |

**Scoring Criteria (from [[Go_To_Market]]):**
- Chai shop in Bangalore 3km radius: +3
- Annual turnover ₹8-12L: +2
- Pain = stock loss / staff trust: +2
- Source = referral: +1
- Owner age 35-55: +1
- Tech-skeptical but profit-hungry: +1

---

### `pilot-track`
| Property | Value |
|----------|-------|
| **ID** | `skill-sales-002` |
| **Category** | Sales |
| **Used by** | Deal Closer, Pipeline Manager |
| **Description** | Updates pilot status, generates day-7 and day-14 reports, recommends conversion action |

| Input | Type | Description |
|-------|------|-------------|
| `customer_id` | string | Customer identifier |
| `pilot_day` | number | Current day of pilot (1-14) |
| `daily_data` | object | Items detected, revenue tracked, anomalies |

| Output | Type | Description |
|--------|------|-------------|
| `pilot_summary` | string | Human-readable summary |
| `shrinkage_estimate` | number | Estimated daily loss (₹) |
| `conversion_recommendation` | string | convert / extend / drop |
| `customer_message` | string | Draft WhatsApp message for shop owner |

---

### `invoice-gen`
| Property | Value |
|----------|-------|
| **ID** | `skill-sales-003` |
| **Category** | Sales |
| **Used by** | Revenue Tracker, Deal Closer |
| **Description** | Generates a ShopSense invoice PDF and payment link |
| **MCP Deps** | `razorpay-mcp` (payment link), `gdrive-mcp` (store PDF) |

| Input | Type | Description |
|-------|------|-------------|
| `customer_name` | string | Business name |
| `customer_phone` | string | WhatsApp number |
| `product_tier` | string | basic / pro / enterprise |
| `amount` | number | Total amount (₹) |
| `payment_terms` | string | full / installment_3 |

| Output | Type | Description |
|--------|------|-------------|
| `invoice_pdf_url` | string | GDrive link to invoice |
| `payment_link` | string | Razorpay payment link |
| `invoice_number` | string | Sequential invoice ID |

---

### `proposal-draft`
| Property | Value |
|----------|-------|
| **ID** | `skill-sales-004` |
| **Category** | Sales |
| **Used by** | Deal Closer, Outreach Writer |
| **Description** | Generates a personalized ShopSense pilot proposal for a specific shop |
| **MCP Deps** | `gdrive-mcp` (store proposal) |

| Input | Type | Description |
|-------|------|-------------|
| `customer_name` | string | Shop owner name |
| `shop_name` | string | Business name |
| `shop_type` | string | chai / restaurant / kirana |
| `estimated_loss` | number | Estimated daily shrinkage (₹) |
| `location` | string | Shop address/area |

| Output | Type | Description |
|--------|------|-------------|
| `proposal_pdf_url` | string | GDrive link |
| `proposal_text` | string | Full proposal content |
| `roi_calculation` | string | Payback period, annual savings |

---

### `objection-handle`
| Property | Value |
|----------|-------|
| **ID** | `skill-sales-005` |
| **Category** | Sales |
| **Used by** | Deal Closer |
| **Description** | Matches an objection to the playbook and generates a response |

| Input | Type | Description |
|-------|------|-------------|
| `objection_text` | string | What the customer said |
| `context` | string | Stage in pipeline, customer history |

| Output | Type | Description |
|--------|------|-------------|
| `objection_category` | string | price / trust / need / timing / competition |
| `response_draft` | string | Recommended reply |
| `proof_point` | string | Data or testimonial to share |
| `fallback_offer` | string | If response doesn't work |

---

### `outreach-draft`
| Property | Value |
|----------|-------|
| **ID** | `skill-sales-006` |
| **Category** | Sales |
| **Used by** | Outreach Writer |
| **Description** | Drafts personalized cold outreach message for a specific prospect |

| Input | Type | Description |
|-------|------|-------------|
| `prospect_name` | string | Person's name |
| `channel` | string | whatsapp / linkedin / email |
| `context` | string | What we know about them |
| `sequence_step` | number | 1 (cold) / 2 (follow-up) / 3 (final) |

| Output | Type | Description |
|--------|------|-------------|
| `message_draft` | string | Full message text |
| `subject_line` | string | For email only |
| `send_time` | string | Recommended send time |
| `cta` | string | The ask/next step |

---

## Marketing Skills

### `linkedin-post`
| Property | Value |
|----------|-------|
| **ID** | `skill-mkt-001` |
| **Category** | Marketing |
| **Used by** | Content Engine |
| **Description** | Generates a LinkedIn post following brand voice and content pillar strategy |

| Input | Type | Description |
|-------|------|-------------|
| `topic` | string | What to write about |
| `pillar` | string | problem / solution / founder / thought-leadership / social-proof |
| `tone` | string | educational / provocative / storytelling / data-driven |
| `include_cta` | boolean | Whether to include call-to-action |

| Output | Type | Description |
|--------|------|-------------|
| `post_text` | string | Full post (max 3000 chars) |
| `hashtags` | string[] | 3-5 relevant hashtags |
| `hook` | string | First line (the scroll-stopper) |
| `image_suggestion` | string | What image to pair with it |
| `best_posting_time` | string | Recommended day/time |

---

### `instagram-caption`
| Property | Value |
|----------|-------|
| **ID** | `skill-mkt-002` |
| **Category** | Marketing |
| **Used by** | Content Engine |
| **Description** | Generates Instagram caption with hashtag set and visual direction |

| Input | Type | Description |
|-------|------|-------------|
| `image_context` | string | What the image shows |
| `content_type` | string | product / behind-scenes / data / testimonial / reel |
| `mood` | string | warm / energetic / serious / playful |

| Output | Type | Description |
|--------|------|-------------|
| `caption` | string | Full caption text |
| `hashtags` | string[] | 15-20 hashtags |
| `alt_text` | string | Accessibility text for image |

---

### `blog-draft`
| Property | Value |
|----------|-------|
| **ID** | `skill-mkt-003` |
| **Category** | Marketing |
| **Used by** | Content Engine |
| **Description** | Drafts a long-form blog article for Medium/Dev.to/company blog |

| Input | Type | Description |
|-------|------|-------------|
| `title` | string | Article title |
| `target_length` | number | Word count target |
| `audience` | string | developers / shop-owners / investors / general |
| `seo_keywords` | string[] | Target keywords |

| Output | Type | Description |
|--------|------|-------------|
| `article_md` | string | Full article in markdown |
| `meta_description` | string | SEO meta description |
| `internal_links` | string[] | Suggested cross-links |

---

### `brand-review`
| Property | Value |
|----------|-------|
| **ID** | `skill-mkt-004` |
| **Category** | Marketing |
| **Used by** | Brand Guardian |
| **Description** | Audits content against brand voice, tone, and visual guidelines |

| Input | Type | Description |
|-------|------|-------------|
| `content` | string | Text to review |
| `content_type` | string | post / email / proposal / website / ad |

| Output | Type | Description |
|--------|------|-------------|
| `score` | number (1-10) | Brand alignment score |
| `violations` | object[] | List of issues with severity |
| `rewrites` | object[] | Suggested fixes |
| `verdict` | string | approve / revise / reject |

---

### `seo-audit`
| Property | Value |
|----------|-------|
| **ID** | `skill-mkt-005` |
| **Category** | Marketing |
| **Used by** | SEO Strategist |
| **Description** | Audits a page/site for SEO health |
| **MCP Deps** | `vercel-mcp`, `github-mcp` |

| Input | Type | Description |
|-------|------|-------------|
| `url` | string | Page to audit |
| `target_keywords` | string[] | Keywords to check |

| Output | Type | Description |
|--------|------|-------------|
| `score` | number (1-100) | SEO score |
| `issues` | object[] | Problems found with severity |
| `recommendations` | string[] | Prioritized fixes |

---

## Engineering Skills

### `code-review`
| Property | Value |
|----------|-------|
| **ID** | `skill-eng-001` |
| **Category** | Engineering |
| **Used by** | Chief Architect |
| **Description** | Reviews code changes for security, performance, correctness, and style |
| **MCP Deps** | `github-mcp` |

| Input | Type | Description |
|-------|------|-------------|
| `repo` | string | Repository name |
| `pr_number` | number | Pull request number |
| `focus_areas` | string[] | security / performance / correctness / style |

| Output | Type | Description |
|--------|------|-------------|
| `verdict` | string | approve / request-changes / reject |
| `comments` | object[] | Line-level review comments |
| `security_issues` | object[] | Security findings |
| `suggestions` | string[] | Improvement recommendations |

---

### `sprint-plan`
| Property | Value |
|----------|-------|
| **ID** | `skill-eng-002` |
| **Category** | Engineering |
| **Used by** | Sprint Driver |
| **Description** | Generates sprint plan from PROGRESS.md pending chunks |

| Input | Type | Description |
|-------|------|-------------|
| `capacity_hours` | number | Available hours this sprint |
| `priority_override` | string[] | Chunks to prioritize |

| Output | Type | Description |
|--------|------|-------------|
| `sprint_plan` | object[] | Ordered chunk list with estimates |
| `stretch_goals` | string[] | If capacity allows |
| `dependencies` | string[] | Blocking relationships |

---

### `deploy-check`
| Property | Value |
|----------|-------|
| **ID** | `skill-eng-003` |
| **Category** | Engineering |
| **Used by** | QA Sentinel, GitHub Ops |
| **Description** | Pre-deployment verification checklist |
| **MCP Deps** | `github-mcp`, `vercel-mcp` |

| Input | Type | Description |
|-------|------|-------------|
| `repo` | string | Repository |
| `branch` | string | Branch to deploy |
| `target` | string | production / staging |

| Output | Type | Description |
|--------|------|-------------|
| `checklist` | object[] | Pass/fail for each check |
| `ready` | boolean | Safe to deploy? |
| `blockers` | string[] | What's preventing deploy |

---

### `firmware-sync`
| Property | Value |
|----------|-------|
| **ID** | `skill-eng-004` |
| **Category** | Engineering |
| **Used by** | Firmware Bridge |
| **Description** | Validates hardware-software config alignment between Pi nodes |

| Input | Type | Description |
|-------|------|-------------|
| `pi_node` | string | pi1 / pi2 |
| `config_file` | string | Path to config |

| Output | Type | Description |
|--------|------|-------------|
| `sync_status` | string | synced / drift / error |
| `diffs` | object[] | Config differences found |
| `fix_commands` | string[] | Commands to resolve drift |

---

### `bug-triage`
| Property | Value |
|----------|-------|
| **ID** | `skill-eng-005` |
| **Category** | Engineering |
| **Used by** | QA Sentinel, Sprint Driver |
| **Description** | Categorizes, prioritizes, and assigns a bug report |

| Input | Type | Description |
|-------|------|-------------|
| `description` | string | Bug description |
| `severity` | string | critical / major / minor / cosmetic |
| `component` | string | frontend / backend / firmware / model |

| Output | Type | Description |
|--------|------|-------------|
| `priority` | string | P0 / P1 / P2 / P3 |
| `assigned_agent` | string | Which agent/person handles |
| `root_cause_hypothesis` | string | Likely cause |
| `fix_estimate` | string | Time to fix |

---

## Finance & Operations Skills

### `revenue-log`
| Property | Value |
|----------|-------|
| **ID** | `skill-fin-001` |
| **Category** | Finance |
| **Used by** | Revenue Tracker |
| **Description** | Records a revenue event in the Finance Ledger |
| **MCP Deps** | `razorpay-mcp` |

| Input | Type | Description |
|-------|------|-------------|
| `customer_id` | string | Customer identifier |
| `amount` | number | Payment amount (₹) |
| `type` | string | hardware_sale / saas / web_design / other |
| `payment_method` | string | razorpay / bank_transfer / cash / upi |

| Output | Type | Description |
|--------|------|-------------|
| `ledger_entry` | object | Formatted ledger row |
| `running_total` | number | MTD revenue |
| `confirmation` | string | Entry logged message |

---

### `expense-track`
| Property | Value |
|----------|-------|
| **ID** | `skill-fin-002` |
| **Category** | Finance |
| **Used by** | Expense Logger |
| **Description** | Categorizes and records an expense |

| Input | Type | Description |
|-------|------|-------------|
| `amount` | number | Expense amount (₹) |
| `category` | string | components / hosting / tools / marketing / travel / other |
| `description` | string | What was purchased |
| `vendor` | string | Vendor name |

| Output | Type | Description |
|--------|------|-------------|
| `ledger_entry` | object | Formatted expense row |
| `monthly_burn` | number | Updated monthly burn rate |
| `runway_months` | number | Updated runway |

---

### `gst-calc`
| Property | Value |
|----------|-------|
| **ID** | `skill-fin-003` |
| **Category** | Finance |
| **Used by** | Compliance Bot, Revenue Tracker |
| **Description** | Calculates GST liability for a transaction or period |

| Input | Type | Description |
|-------|------|-------------|
| `amount` | number | Base amount (₹) |
| `gst_rate` | number | 5 / 12 / 18 / 28 (%) |
| `type` | string | intra_state / inter_state |

| Output | Type | Description |
|--------|------|-------------|
| `cgst` | number | Central GST (₹) |
| `sgst` | number | State GST (₹) |
| `igst` | number | Integrated GST (₹) |
| `total_with_gst` | number | Grand total |
| `invoice_line` | string | Formatted line for invoice |

---

### `standup-gen`
| Property | Value |
|----------|-------|
| **ID** | `skill-ops-001` |
| **Category** | Operations |
| **Used by** | Daily Dispatcher |
| **Description** | Generates morning standup from PROGRESS.md, Pilot Tracker, Finance Ledger |

| Input | Type | Description |
|-------|------|-------------|
| `date` | string | Date for standup |

| Output | Type | Description |
|--------|------|-------------|
| `standup_text` | string | Formatted standup |
| `priority_tasks` | string[] | Top 3 tasks for today |
| `blockers` | string[] | Active blockers |
| `metrics_snapshot` | object | Pipeline, revenue, content stats |

---

### `weekly-review`
| Property | Value |
|----------|-------|
| **ID** | `skill-ops-002` |
| **Category** | Operations |
| **Used by** | Weekly Reviewer |
| **Description** | Generates comprehensive weekly business review |
| **MCP Deps** | `razorpay-mcp`, `linkedin-mcp`, `github-mcp` |

| Input | Type | Description |
|-------|------|-------------|
| `week_start` | string | Monday date |
| `week_end` | string | Friday date |

| Output | Type | Description |
|--------|------|-------------|
| `wbr_document` | string | Full WBR in markdown |
| `kpi_table` | object | Metrics vs targets |
| `wins` | string[] | This week's wins |
| `misses` | string[] | What didn't happen |
| `next_week_priorities` | string[] | Top 5 for next week |
| `gate_progress` | object | Progress toward current gate |

---

### `client-onboard`
| Property | Value |
|----------|-------|
| **ID** | `skill-ops-003` |
| **Category** | Operations |
| **Used by** | Client Success |
| **Description** | Generates and tracks the customer onboarding checklist |
| **MCP Deps** | `whatsapp-mcp`, `gdrive-mcp`, `firebase-mcp` |

| Input | Type | Description |
|-------|------|-------------|
| `customer_name` | string | Business name |
| `customer_phone` | string | WhatsApp number |
| `product_tier` | string | basic / pro / enterprise |
| `install_date` | string | Scheduled installation date |

| Output | Type | Description |
|--------|------|-------------|
| `checklist` | object[] | Onboarding steps with status |
| `welcome_message` | string | WhatsApp welcome template |
| `gdrive_folder` | string | Customer folder URL |
| `firebase_user` | string | Auth user created |

**Onboarding Checklist:**
1. [ ] Payment confirmed
2. [ ] Customer folder created in GDrive
3. [ ] Firebase auth user created
4. [ ] Welcome WhatsApp sent
5. [ ] Hardware kit assembled
6. [ ] Installation scheduled
7. [ ] On-site installation complete
8. [ ] Staff training done (15 min)
9. [ ] Day 1 data verification
10. [ ] Day 3 check-in call
11. [ ] Day 7 data review with owner
12. [ ] Day 14 full assessment

---

### `kpi-dashboard`
| Property | Value |
|----------|-------|
| **ID** | `skill-ops-004` |
| **Category** | Operations |
| **Used by** | Weekly Reviewer, Daily Dispatcher |
| **Description** | Generates current KPI snapshot across all departments |

| Input | Type | Description |
|-------|------|-------------|
| `period` | string | daily / weekly / monthly |

| Output | Type | Description |
|--------|------|-------------|
| `sales_kpis` | object | Leads, pilots, conversions, revenue |
| `marketing_kpis` | object | Posts published, engagement, followers |
| `engineering_kpis` | object | Chunks completed, builds passing, deploy count |
| `finance_kpis` | object | Revenue, expenses, runway, burn rate |
| `gate_status` | object | Current gate, progress %, ETA |

---

## Cross-Cutting Skills

### `email-draft`
| Property | Value |
|----------|-------|
| **ID** | `skill-util-001` |
| **Category** | Utility |
| **Used by** | Multiple agents |
| **Description** | Drafts a professional email following brand voice |

### `doc-gen`
| Property | Value |
|----------|-------|
| **ID** | `skill-util-002` |
| **Category** | Utility |
| **Used by** | Multiple agents |
| **Description** | Generates a formatted document (PDF, DOCX, or MD) |

### `sms-send`
| Property | Value |
|----------|-------|
| **ID** | `skill-util-003` |
| **Category** | Utility |
| **Used by** | Deal Closer, Client Success |
| **Description** | Sends an SMS/WhatsApp message via template |
| **MCP Deps** | `whatsapp-mcp` |

---

## Skill Dependency Map

```
lead-qualify ──→ proposal-draft ──→ invoice-gen
     │                                    │
     ▼                                    ▼
pilot-track ──→ client-onboard ──→ revenue-log
     │
     ▼
objection-handle

linkedin-post ──→ brand-review
instagram-caption ──→ brand-review
blog-draft ──→ brand-review ──→ seo-audit

code-review ──→ deploy-check
sprint-plan ──→ bug-triage
firmware-sync ──→ deploy-check

revenue-log ──→ gst-calc
expense-track ──→ runway-calc (inside expense-track)
standup-gen ──→ kpi-dashboard
weekly-review ──→ kpi-dashboard
```

---

## Tags
#skills #catalog #capabilities #company-os
